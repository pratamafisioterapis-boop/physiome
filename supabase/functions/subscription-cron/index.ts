// Supabase Edge Function: "subscription-cron"
//
// Nightly sweep invoked by pg_cron via pg_net. Three jobs, all idempotent so a
// double run in one day is harmless:
//
//   1. Advance subscription statuses (reporting only -- enforcement derives
//      state from timestamps and never depends on this having run).
//   2. Send the reminder ladder, deduplicated by subscriptions.reminder_stage.
//   3. Reconcile payments stuck in "pending", which is what makes a lost
//      webhook a non-event rather than a support ticket.
//
// Deploy with verify_jwt = false; authentication is the x-cron-secret header.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";
import { fetchTransactionStatus, mapTransactionStatus, toStoredStatus } from "../_shared/midtrans.ts";
import { sendWebPush } from "../_shared/push.ts";
import { reminderEmail, sendBillingEmail, type ReminderStage } from "../_shared/mailer.ts";

const admin: SupabaseClient = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const CRON_SECRET = Deno.env.get("CRON_SECRET") || "";
const APP_BASE_URL = Deno.env.get("APP_BASE_URL") || "https://physiome.ruangdata.online";

const DAY_MS = 24 * 60 * 60 * 1000;

// Escalation order. A rung only fires if its index is higher than the rung
// already recorded, so reruns cannot re-send and a skipped day cannot cause
// a lower rung to fire after a higher one.
const STAGES: ReminderStage[] = ["h7", "h3", "h1", "expired", "grace_end"];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Which rung, if any, is due for this subscription right now? */
function dueStage(periodEnd: Date, graceUntil: Date, now: number): ReminderStage | null {
  const daysToEnd = Math.ceil((periodEnd.getTime() - now) / DAY_MS);
  const daysToLockout = Math.ceil((graceUntil.getTime() - now) / DAY_MS);

  if (now > graceUntil.getTime()) return null;      // already locked out; stop nagging
  if (now > periodEnd.getTime()) {
    return daysToLockout <= 2 ? "grace_end" : "expired";
  }
  if (daysToEnd <= 1) return "h1";
  if (daysToEnd <= 3) return "h3";
  if (daysToEnd <= 7) return "h7";
  return null;
}

async function advanceStatuses(): Promise<{ pastDue: number; expired: number }> {
  const nowIso = new Date().toISOString();

  const { count: pastDue } = await admin
    .from("subscriptions")
    .update({ status: "past_due", updated_at: nowIso }, { count: "exact" })
    .in("status", ["active", "trialing"])
    .lt("current_period_end", nowIso);

  const { count: expired } = await admin
    .from("subscriptions")
    .update({ status: "expired", updated_at: nowIso }, { count: "exact" })
    .in("status", ["past_due", "active", "trialing"])
    .lt("grace_until", nowIso);

  return { pastDue: pastDue ?? 0, expired: expired ?? 0 };
}

async function sendReminders(): Promise<{ sent: number; stages: Record<string, number> }> {
  const now = Date.now();
  const horizon = new Date(now + 8 * DAY_MS).toISOString();

  // Only rows that could plausibly need a reminder: period ending within 8
  // days, and not yet past the point where we stop nagging.
  const { data: subs } = await admin
    .from("subscriptions")
    .select("*, subscription_plans(code, name_id)")
    .neq("status", "cancelled")
    .lt("current_period_end", horizon)
    .gt("grace_until", new Date(now).toISOString());

  const stages: Record<string, number> = {};
  let sent = 0;

  for (const sub of subs ?? []) {
    const periodEnd = new Date(sub.current_period_end);
    const graceUntil = new Date(sub.grace_until);
    const stage = dueStage(periodEnd, graceUntil, now);
    if (!stage) continue;

    const previousIndex = sub.reminder_stage ? STAGES.indexOf(sub.reminder_stage) : -1;
    if (STAGES.indexOf(stage) <= previousIndex) continue;

    // Free plans have nothing to renew into; point them at the pricing page.
    const planCode = sub.subscription_plans?.code ?? sub.plan_code ?? null;

    const { data: recipients } = sub.clinic_id
      ? await admin.from("users").select("id, email, fullName").eq("clinic_id", sub.clinic_id).eq("role", "admin")
      : await admin.from("users").select("id, email, fullName").eq("id", sub.user_id);

    const rows = recipients ?? [];
    if (rows.length === 0) continue;

    const email = reminderEmail({
      stage,
      name: rows[0]?.fullName ?? null,
      planCode,
      periodEnd: sub.current_period_end,
      graceUntil: sub.grace_until,
      daysUntilLockout: Math.max(0, Math.ceil((graceUntil.getTime() - now) / DAY_MS)),
      appBaseUrl: APP_BASE_URL,
    });

    await Promise.allSettled([
      sendBillingEmail(rows.map((r: Record<string, string>) => r.email).filter(Boolean), email),
      sendWebPush(admin, rows.map((r: Record<string, string>) => r.id), {
        title: email.subject,
        body: "Buka Physiome untuk memperpanjang langganan.",
        url: `${APP_BASE_URL}/billing`,
      }),
    ]);

    // Recorded after sending: a crash mid-send re-sends next run rather than
    // silently swallowing the only reminder the customer would have got.
    await admin
      .from("subscriptions")
      .update({
        reminder_stage: stage,
        last_reminder_sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", sub.id);

    stages[stage] = (stages[stage] ?? 0) + 1;
    sent += 1;
  }

  return { sent, stages };
}

async function reconcileStuckPayments(): Promise<{ checked: number; applied: number }> {
  const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { data: pending } = await admin
    .from("payment_transactions")
    .select("order_id")
    .eq("status", "pending")
    .lt("created_at", cutoff)
    .limit(100);

  let applied = 0;

  for (const txn of pending ?? []) {
    let remote: Record<string, unknown> | null = null;
    try {
      remote = await fetchTransactionStatus(txn.order_id);
    } catch (e) {
      console.error("reconcile lookup failed", txn.order_id, e);
      continue;
    }
    if (!remote) continue;

    const transactionStatus = remote.transaction_status as string | undefined;

    await admin
      .from("payment_transactions")
      .update({
        status: toStoredStatus(transactionStatus),
        payment_type: (remote.payment_type as string) ?? null,
        midtrans_transaction_id: (remote.transaction_id as string) ?? null,
        fraud_status: (remote.fraud_status as string) ?? null,
        settlement_time: remote.settlement_time
          ? new Date(String(remote.settlement_time)).toISOString()
          : null,
        raw_notification: remote,
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", txn.order_id);

    if (mapTransactionStatus(transactionStatus, remote.fraud_status as string | undefined) !== "paid") {
      continue;
    }

    // Same latched RPC the webhook uses, so a webhook that arrives at the same
    // moment cannot double-extend.
    const { data: result, error } = await admin.rpc("apply_subscription_payment", {
      p_order_id: txn.order_id,
    });
    if (error) {
      console.error("reconcile apply failed", txn.order_id, error.message);
      continue;
    }
    if ((result as Record<string, unknown> | null)?.applied) applied += 1;
  }

  return { checked: pending?.length ?? 0, applied };
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  if (!CRON_SECRET) {
    console.error("CRON_SECRET is not configured; refusing to run");
    return json({ error: "Not configured" }, 500);
  }
  if (req.headers.get("x-cron-secret") !== CRON_SECRET) {
    return json({ error: "Unauthorized" }, 401);
  }

  const startedAt = Date.now();
  try {
    const statuses = await advanceStatuses();
    const reminders = await sendReminders();
    const reconciliation = await reconcileStuckPayments();

    const summary = { statuses, reminders, reconciliation, ms: Date.now() - startedAt };
    console.log("subscription sweep", JSON.stringify(summary));
    return json({ ok: true, ...summary });
  } catch (e) {
    console.error("subscription sweep failed", e);
    return json({ error: e instanceof Error ? e.message : "Sweep failed" }, 500);
  }
});
