// Run with:
//   MIDTRANS_SERVER_KEY=<any> deno test supabase/functions/_shared/midtrans.test.ts
//
// Covers the notification signature and status mapping -- the two things that,
// if wrong, silently stop payments from being applied.

import { strict as assertModule } from "node:assert";
import {
  generateOrderId,
  mapTransactionStatus,
  toStoredStatus,
  verifyNotificationSignature,
} from "./midtrans.ts";

const SERVER_KEY = Deno.env.get("MIDTRANS_SERVER_KEY")!;

const assert = (value: unknown, msg?: string) => assertModule.ok(value, msg);
const assertFalse = (value: unknown, msg?: string) => assertModule.ok(!value, msg);
const assertEquals = <T>(actual: T, expected: T, msg?: string) =>
  assertModule.deepEqual(actual, expected, msg);

/** Produce a signature exactly the way Midtrans does. */
async function sign(orderId: string, statusCode: string, grossAmount: string): Promise<string> {
  const payload = `${orderId}${statusCode}${grossAmount}${SERVER_KEY}`;
  const digest = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function notification(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    order_id: "PHY-Cabc123-clinic-monthly-1753500000000",
    status_code: "200",
    gross_amount: "899000.00",
    transaction_status: "settlement",
    ...overrides,
  };
}

Deno.test("accepts a correctly signed notification", async () => {
  const notif = notification();
  notif.signature_key = await sign(
    notif.order_id as string,
    notif.status_code as string,
    notif.gross_amount as string,
  );
  assert(await verifyNotificationSignature(notif));
});

Deno.test("rejects a tampered signature", async () => {
  const notif = notification();
  const good = await sign("PHY-Cabc123-clinic-monthly-1753500000000", "200", "899000.00");
  // Flip one hex character.
  notif.signature_key = (good[0] === "a" ? "b" : "a") + good.slice(1);
  assertFalse(await verifyNotificationSignature(notif));
});

Deno.test("rejects when the amount was altered in transit", async () => {
  const notif = notification();
  notif.signature_key = await sign(
    notif.order_id as string,
    notif.status_code as string,
    "899000.00",
  );
  notif.gross_amount = "1000.00";
  assertFalse(await verifyNotificationSignature(notif));
});

Deno.test("gross_amount must be used verbatim, not renormalised", async () => {
  // The classic bug: parsing "899000.00" to a number and re-stringifying it
  // yields "899000", a different digest, and every notification then fails.
  // This asserts the two really are distinct, so the verbatim rule matters.
  const withDecimals = await sign("X", "200", "899000.00");
  const withoutDecimals = await sign("X", "200", "899000");
  assert(withDecimals !== withoutDecimals);
});

Deno.test("rejects a notification with no signature at all", async () => {
  assertFalse(await verifyNotificationSignature(notification()));
});

Deno.test("rejects non-string fields", async () => {
  const notif = notification({ gross_amount: 899000, signature_key: "abc" });
  assertFalse(await verifyNotificationSignature(notif));
});

Deno.test("maps transaction statuses onto entitlement outcomes", () => {
  assertEquals(mapTransactionStatus("settlement"), "paid");
  assertEquals(mapTransactionStatus("capture", "accept"), "paid");
  assertEquals(mapTransactionStatus("capture", "challenge"), "pending");
  assertEquals(mapTransactionStatus("capture", "deny"), "failed");
  assertEquals(mapTransactionStatus("pending"), "pending");
  assertEquals(mapTransactionStatus("expire"), "failed");
  assertEquals(mapTransactionStatus("cancel"), "failed");
  assertEquals(mapTransactionStatus("deny"), "failed");
  assertEquals(mapTransactionStatus("refund"), "refunded");
  assertEquals(mapTransactionStatus("chargeback"), "refunded");
  assertEquals(mapTransactionStatus(undefined), "unknown");
});

Deno.test("stored status always satisfies the CHECK constraint", () => {
  const allowed = ["pending", "settlement", "capture", "deny", "cancel", "expire", "failure", "refund"];
  for (const s of [...allowed, "partial_refund", "chargeback", "weird", undefined]) {
    assert(allowed.includes(toStoredStatus(s)), `${s} produced an invalid stored status`);
  }
});

Deno.test("order ids are unique and within Midtrans' 50-char limit", () => {
  const a = generateOrderId("clinic", "49b9166d-ccf1-41b0-8a3e-a71f997cfe87", "clinic-quarterly");
  assert(a.length <= 50, `order_id too long: ${a.length}`);
  assert(a.startsWith("PHY-C"));

  const b = generateOrderId("user", "1f694ecb-b8cb-4f36-aac6-8282fce5fe9c", "patient-monthly");
  assert(b.startsWith("PHY-U"));
  assert(a !== b);

  // No hyphens leak from the uuid into the id's own delimiter scheme.
  assertEquals(a.split("-")[1], "C49b916");
});
