// Supabase Edge Function: "midtrans-webhook"
//
// Deliberately separate from the "api" function. Supabase's gateway verifies a
// JWT/apikey header before the handler runs unless verify_jwt is disabled for
// the function, and Midtrans will never send one. Routing the webhook through
// "api" would force that relaxation onto the entire ~2500-line surface; here it
// is scoped to a small file that authenticates every request itself, using the
// SHA-512 signature Midtrans includes in the body.
//
// Deploy with verify_jwt = false (see supabase/config.toml).

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";
import {
  mapTransactionStatus,
  toStoredStatus,
  verifyNotificationSignature,
} from "../_shared/midtrans.ts";
import { sendWebPush } from "../_shared/push.ts";
import { sendBillingEmail, receiptEmail } from "../_shared/mailer.ts";

const admin: SupabaseClient = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "https://physiome.ruangdata.online";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Who should be told about this payment? */
async function notifyRecipients(
  clinicId: string | null,
  userId: string | null,
): Promise<{ ids: string[]; emails: string[]; name: string | null }> {
  const query = admin.from("users").select("id, email, fullName");
  const { data } = clinicId
    ? await query.eq("clinic_id", clinicId).eq("role", "admin")
    : await query.eq("id", userId ?? "");

  const rows = data ?? [];
  return {
    ids: rows.map((r: Record<string, string>) => r.id),
    emails: rows.map((r: Record<string, string>) => r.email).filter(Boolean),
    name: rows[0]?.fullName ?? null,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let notif: Record<string, unknown>;
  try {
    notif = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  // Authentication. Deliberately NOT 200: a wrong server key should surface as
  // failures in the Midtrans dashboard rather than silently doing nothing.
  let signatureOk = false;
  try {
    signatureOk = await verifyNotificationSignature(notif);
  } catch (e) {
    console.error("signature verification error", e);
    return json({ error: "Signature verification unavailable" }, 500);
  }
  if (!signatureOk) {
    console.warn("rejected notification with bad signature", notif.order_id);
    return json({ error: "Invalid signature" }, 401);
  }

  const orderId = String(notif.order_id);
  const transactionStatus = notif.transaction_status as string | undefined;
  const fraudStatus = notif.fraud_status as string | undefined;

  const { data: txn } = await admin
    .from("payment_transactions")
    .select("*")
    .eq("order_id", orderId)
    .maybeSingle();

  // Unknown order: 200 so Midtrans stops retrying. Returning non-2xx for
  // notifications we deliberately ignore creates an endless retry storm.
  if (!txn) {
    console.warn("notification for unknown order_id", orderId);
    return json({ received: true, applied: false, reason: "unknown_order" });
  }

  // A notification whose amount disagrees with our own record is either
  // tampered with or from a different merchant. Record nothing, change
  // nothing, but do not ask for a retry.
  const notifiedAmount = Math.round(parseFloat(String(notif.gross_amount)));
  if (Number.isFinite(notifiedAmount) && notifiedAmount !== Number(txn.gross_amount)) {
    console.error("gross_amount mismatch", orderId, notifiedAmount, txn.gross_amount);
    return json({ received: true, applied: false, reason: "amount_mismatch" });
  }

  const outcome = mapTransactionStatus(transactionStatus, fraudStatus);

  await admin
    .from("payment_transactions")
    .update({
      status: toStoredStatus(transactionStatus),
      payment_type: (notif.payment_type as string) ?? null,
      midtrans_transaction_id: (notif.transaction_id as string) ?? null,
      fraud_status: fraudStatus ?? null,
      transaction_time: notif.transaction_time
        ? new Date(String(notif.transaction_time)).toISOString()
        : null,
      settlement_time: notif.settlement_time
        ? new Date(String(notif.settlement_time)).toISOString()
        : null,
      signature_verified: true,
      raw_notification: notif,
      updated_at: new Date().toISOString(),
    })
    .eq("order_id", orderId);

  if (outcome === "refunded") {
    // Recorded, but access is never revoked automatically: auto-revoking on a
    // disputed chargeback is worse than a human review.
    console.warn("refund/chargeback recorded, access left untouched", orderId);
    return json({ received: true, applied: false, reason: "refund_recorded" });
  }

  if (outcome !== "paid") {
    return json({ received: true, applied: false, reason: outcome });
  }

  // The extension itself. Latched by payment_transactions.applied_at inside
  // the RPC, so Midtrans retries and the reconciliation poller can all race
  // here safely -- only the first one through extends the period.
  const { data: result, error } = await admin.rpc("apply_subscription_payment", {
    p_order_id: orderId,
  });

  if (error) {
    // A genuine internal failure: 500 asks Midtrans to retry.
    console.error("apply_subscription_payment failed", orderId, error.message);
    return json({ error: "Failed to apply payment" }, 500);
  }

  const applied = Boolean((result as Record<string, unknown> | null)?.applied);
  if (applied) {
    const recipients = await notifyRecipients(txn.clinic_id, txn.user_id);
    const periodEnd = String((result as Record<string, unknown>).current_period_end ?? "");

    await Promise.allSettled([
      sendWebPush(admin, recipients.ids, {
        title: "Pembayaran diterima",
        body: "Langganan Physiome Anda sudah aktif kembali.",
        url: `${APP_BASE_URL}/billing`,
      }),
      sendBillingEmail(
        recipients.emails,
        receiptEmail({
          name: recipients.name,
          orderId,
          planCode: txn.plan_code,
          grossAmount: Number(txn.gross_amount),
          periodEnd,
          appBaseUrl: APP_BASE_URL,
        }),
      ),
    ]);
  }

  return json({ received: true, applied, result });
});
