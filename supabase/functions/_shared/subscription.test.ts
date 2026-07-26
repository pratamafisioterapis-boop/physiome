// Run with: deno test supabase/functions/_shared/subscription.test.ts
//
// These two functions decide who can write. Wrong in one direction and paying
// customers get locked out; wrong in the other and the product is free.

import { strict as assertModule } from "node:assert";
import { canWriteInState, DAY_MS, deriveState, isWriteGated } from "./subscription.ts";

const assert = (v: unknown, m?: string) => assertModule.ok(v, m);
const assertFalse = (v: unknown, m?: string) => assertModule.ok(!v, m);
const assertEquals = <T>(a: T, e: T, m?: string) => assertModule.deepEqual(a, e, m);

const NOW = new Date("2026-07-26T12:00:00Z").getTime();
const at = (days: number) => new Date(NOW + days * DAY_MS);

Deno.test("inside the paid period is active", () => {
  assertEquals(deriveState("active", at(10), at(17), NOW), "active");
  assertEquals(deriveState("trialing", at(3), at(10), NOW), "active");
});

Deno.test("past the period but inside grace is grace, and still writable", () => {
  const state = deriveState("active", at(-2), at(5), NOW);
  assertEquals(state, "grace");
  assert(canWriteInState(state), "grace must still allow writes");
});

Deno.test("past grace is read-only", () => {
  assertEquals(deriveState("past_due", at(-10), at(-3), NOW), "readonly");
  assertFalse(canWriteInState("readonly"));
});

Deno.test("no subscription row at all is 'none' and cannot write", () => {
  assertEquals(deriveState(null, null, null, NOW), "none");
  assertFalse(canWriteInState("none"));
});

Deno.test("cancelled and expired are read-only even if dates say otherwise", () => {
  // The operator or customer said so; the stored status wins here.
  assertEquals(deriveState("cancelled", at(300), at(307), NOW), "readonly");
  assertEquals(deriveState("expired", at(300), at(307), NOW), "readonly");
});

Deno.test("a stale sweep neither grants nor removes access", () => {
  // The cron marks rows past_due/expired. If it never ran, the row still says
  // "active" while the dates have moved on -- access must follow the dates.
  assertEquals(deriveState("active", at(-30), at(-23), NOW), "readonly");
  // And the converse: a row wrongly left as past_due after a payment extended
  // the dates must still be usable.
  assertEquals(deriveState("past_due", at(20), at(27), NOW), "active");
});

Deno.test("boundaries are inclusive of the last moment", () => {
  const exactlyNow = new Date(NOW);
  assertEquals(deriveState("active", exactlyNow, at(7), NOW), "active");
  assertEquals(deriveState("active", at(-1), exactlyNow, NOW), "grace");
  assertEquals(deriveState("active", at(-1), new Date(NOW - 1), NOW), "readonly");
});

Deno.test("reads are never gated", () => {
  for (const path of ["/patients", "/appointments", "/exercise-programs", "/billing/invoices"]) {
    assertFalse(isWriteGated("GET", path, "admin"), `GET ${path} must not be gated`);
    assertFalse(isWriteGated("OPTIONS", path, "admin"));
  }
});

Deno.test("writes are gated by default, for every route", () => {
  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    for (const path of ["/patients", "/appointments", "/soap-notes", "/some-future-route"]) {
      assert(isWriteGated(method, path, "admin"), `${method} ${path} must be gated`);
    }
  }
});

Deno.test("super admin bypasses the gate", () => {
  assertFalse(isWriteGated("POST", "/patients", "super_admin"));
  assertFalse(isWriteGated("DELETE", "/clinics/abc", "super_admin"));
});

Deno.test("recovery paths stay open so a lapsed customer can pay", () => {
  assertFalse(isWriteGated("POST", "/subscription/checkout", "admin"));
  assertFalse(isWriteGated("PATCH", "/auth/update-profile", "admin"));
  assertFalse(isWriteGated("POST", "/push/subscribe", "patient"));
  assertFalse(isWriteGated("PUT", "/user-preferences/language/abc", "therapist"));
});

Deno.test("a patient's own clinical self-reports are never gated", () => {
  // Blocking these because the CLINIC did not pay punishes the patient and
  // loses outcome data that cannot be back-filled.
  for (const path of ["/exercise-logs", "/pain-logs", "/prom-responses"]) {
    assertFalse(isWriteGated("POST", path, "patient"), `${path} must stay open for patients`);
  }
});

Deno.test("self-reports ARE gated for staff, who are the ones being billed", () => {
  assert(isWriteGated("POST", "/pain-logs", "therapist"));
  assert(isWriteGated("POST", "/exercise-logs", "admin"));
});

Deno.test("a patient starting a program IS gated -- that is the paywall", () => {
  assert(isWriteGated("POST", "/program-assignments/self", "patient"));
  // But browsing the catalogue is not.
  assertFalse(isWriteGated("GET", "/exercise-programs/templates", "patient"));
});

Deno.test("exemptions match whole segments, not string prefixes", () => {
  // With naive startsWith, each of these would be silently exempted by a
  // shorter exempt path -- a hole that only opens when someone adds the route,
  // years after anyone last looked at the gate.
  assert(isWriteGated("POST", "/authorisations", "admin"), "/authorisations must not inherit /auth");
  assert(isWriteGated("POST", "/subscriptions-export", "admin"), "must not inherit /subscription");
  assert(isWriteGated("POST", "/pushups", "admin"), "must not inherit /push");
  assert(isWriteGated("POST", "/pain-logs-archive", "patient"), "must not inherit /pain-logs");

  // The real exempt routes still match, with or without sub-paths.
  assertFalse(isWriteGated("POST", "/auth", "admin"));
  assertFalse(isWriteGated("POST", "/auth/register", "admin"));
  assertFalse(isWriteGated("POST", "/subscription/checkout", "admin"));
});
