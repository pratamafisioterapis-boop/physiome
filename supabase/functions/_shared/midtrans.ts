// Midtrans integration shared by the "api" function (checkout + status
// reconciliation) and the "midtrans-webhook" function (notifications).
//
// The signature algorithm and the status mapping live here rather than being
// duplicated: the webhook and the reconciliation poller must agree exactly. If
// they drift, payments silently stop being applied.
//
// NOTE: this is deliberately NOT the Midtrans Subscription/Recurring API. That
// API only supports credit cards and GoPay tokenization -- QRIS cannot
// auto-debit. So we issue one Snap transaction per billing cycle and keep the
// period bookkeeping ourselves.

const IS_PRODUCTION = (Deno.env.get("MIDTRANS_IS_PRODUCTION") || "").toLowerCase() === "true";

export const MIDTRANS_SNAP_URL = IS_PRODUCTION
  ? "https://app.midtrans.com/snap/v1/transactions"
  : "https://app.sandbox.midtrans.com/snap/v1/transactions";

const MIDTRANS_API_BASE = IS_PRODUCTION
  ? "https://api.midtrans.com/v2"
  : "https://api.sandbox.midtrans.com/v2";

// QRIS is the only method offered. Which channel string renders a QRIS-only
// page depends on the merchant's configuration ("other_qris", "qris", or
// "gopay"), so it stays overridable without a redeploy.
export const ENABLED_PAYMENTS = (Deno.env.get("MIDTRANS_ENABLED_PAYMENTS") || "other_qris")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function serverKey(): string {
  const key = Deno.env.get("MIDTRANS_SERVER_KEY");
  if (!key) throw new Error("MIDTRANS_SERVER_KEY is not configured");
  return key;
}

// Midtrans uses HTTP Basic with the server key as the username and an EMPTY
// password -- hence the trailing colon.
function authHeader(): string {
  return `Basic ${btoa(`${serverKey()}:`)}`;
}

export type SnapResult = {
  token: string;
  redirect_url: string;
  raw: Record<string, unknown>;
};

export type SnapChargeInput = {
  orderId: string;
  grossAmount: number;
  itemId: string;
  itemName: string;
  customer: { name?: string | null; email?: string | null; phone?: string | null };
  finishUrl: string;
  expiryMinutes?: number;
};

export async function snapCreateTransaction(input: SnapChargeInput): Promise<SnapResult> {
  const [firstName, ...rest] = (input.customer.name || "Pelanggan").trim().split(/\s+/);

  const payload = {
    transaction_details: {
      order_id: input.orderId,
      // IDR has no minor unit; Midtrans rejects a fractional gross_amount.
      gross_amount: Math.round(input.grossAmount),
    },
    item_details: [{
      id: input.itemId,
      price: Math.round(input.grossAmount),
      quantity: 1,
      name: input.itemName.slice(0, 50),
    }],
    customer_details: {
      first_name: firstName,
      last_name: rest.join(" ") || undefined,
      email: input.customer.email || undefined,
      phone: input.customer.phone || undefined,
    },
    enabled_payments: ENABLED_PAYMENTS,
    expiry: { unit: "minutes", duration: input.expiryMinutes ?? 60 },
    callbacks: { finish: input.finishUrl },
  };

  const res = await fetch(MIDTRANS_SNAP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify(payload),
  });

  const raw = await res.json().catch(() => ({}));
  if (!res.ok || !raw?.token) {
    const detail = Array.isArray(raw?.error_messages) ? raw.error_messages.join("; ") : res.statusText;
    throw new Error(`Midtrans Snap failed (${res.status}): ${detail}`);
  }

  return { token: raw.token, redirect_url: raw.redirect_url, raw };
}

/** Poll Midtrans for the authoritative state of an order. Used to recover from lost webhooks. */
export async function fetchTransactionStatus(orderId: string): Promise<Record<string, unknown> | null> {
  const res = await fetch(`${MIDTRANS_API_BASE}/${encodeURIComponent(orderId)}/status`, {
    headers: { Accept: "application/json", Authorization: authHeader() },
  });
  if (res.status === 404) return null;
  const raw = await res.json().catch(() => null);
  if (!res.ok) return null;
  return raw;
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * sha512(order_id + status_code + gross_amount + server_key)
 *
 * Both `status_code` ("200") and `gross_amount` ("899000.00") arrive as
 * STRINGS. They must be concatenated exactly as Midtrans sent them -- parsing
 * gross_amount to a number and re-stringifying it yields "899000", a different
 * digest, and every notification then fails verification. This is the single
 * most common cause of signature bugs.
 */
export async function verifyNotificationSignature(
  notif: Record<string, unknown>,
): Promise<boolean> {
  const orderId = notif.order_id;
  const statusCode = notif.status_code;
  const grossAmount = notif.gross_amount;
  const provided = notif.signature_key;

  if (
    typeof orderId !== "string" || typeof statusCode !== "string" ||
    typeof grossAmount !== "string" || typeof provided !== "string"
  ) {
    return false;
  }

  const payload = `${orderId}${statusCode}${grossAmount}${serverKey()}`;
  const digest = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(payload));
  return timingSafeEqual(toHex(digest), provided.toLowerCase());
}

export type PaymentOutcome = "paid" | "pending" | "failed" | "refunded" | "unknown";

/** Map a Midtrans transaction_status onto what it means for entitlement. */
export function mapTransactionStatus(
  transactionStatus: string | undefined,
  fraudStatus?: string | undefined,
): PaymentOutcome {
  switch (transactionStatus) {
    case "settlement":
      return "paid";
    case "capture":
      // QRIS should never produce `capture` (it is a card flow), but handle it
      // defensively rather than dropping a real payment on the floor.
      if (fraudStatus === "accept") return "paid";
      if (fraudStatus === "challenge") return "pending";
      return "failed";
    case "pending":
      return "pending";
    case "deny":
    case "cancel":
    case "expire":
    case "failure":
      return "failed";
    case "refund":
    case "partial_refund":
    case "chargeback":
    case "partial_chargeback":
      return "refunded";
    default:
      return "unknown";
  }
}

/** The value stored in payment_transactions.status, constrained by a CHECK. */
export function toStoredStatus(transactionStatus: string | undefined): string {
  const allowed = ["pending", "settlement", "capture", "deny", "cancel", "expire", "failure", "refund"];
  if (transactionStatus && allowed.includes(transactionStatus)) return transactionStatus;
  if (transactionStatus === "partial_refund" || transactionStatus === "chargeback") return "refund";
  return "pending";
}

/**
 * Midtrans requires order_id to be unique per merchant FOREVER -- a failed
 * attempt cannot be retried under the same id -- so every checkout mints a new
 * one. Kept well under the 50-character limit.
 */
export function generateOrderId(subjectKind: "clinic" | "user", subjectId: string, planCode: string): string {
  const prefix = subjectKind === "clinic" ? "C" : "U";
  const short = subjectId.replace(/-/g, "").slice(0, 6);
  return `PHY-${prefix}${short}-${planCode}-${Date.now()}`;
}
