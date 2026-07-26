// Pure subscription logic, kept out of api/index.ts so it can be unit tested.
//
// These two functions decide who can write. Getting either wrong either locks
// out paying customers or gives the product away, so they are covered by tests
// rather than only by manual checking.

export type EntitlementState = "active" | "grace" | "readonly" | "none";

export const GRACE_DAYS = 7;
export const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Derive access state from timestamps rather than reading `status`.
 *
 * Deliberate: the nightly sweep is what maintains `status`, and if it fails for
 * a week nobody should get free access and nobody should be wrongly locked out.
 * `status` is for reporting; these timestamps are the truth.
 *
 * An explicitly cancelled or expired subscription is the one case where the
 * stored status wins, because the operator (or the customer) said so.
 */
export function deriveState(
  status: string | null,
  currentPeriodEnd: Date | null,
  graceUntil: Date | null,
  now: number = Date.now(),
): EntitlementState {
  if (!status) return "none";
  if (status === "cancelled" || status === "expired") return "readonly";
  if (currentPeriodEnd && now <= currentPeriodEnd.getTime()) return "active";
  if (graceUntil && now <= graceUntil.getTime()) return "grace";
  return "readonly";
}

/** Grace still allows writing; that is the whole point of a grace period. */
export function canWriteInState(state: EntitlementState): boolean {
  return state === "active" || state === "grace";
}

// Route groups a lapsed customer still needs in order to recover, plus those
// with their own authorization model.
const EXEMPT_SEGMENTS = new Set(["auth", "subscription", "push", "user-preferences", "super-admin"]);

// A patient's own clinical self-reports. Never gated by the CLINIC's billing
// state: blocking a pain diary because the clinic forgot to pay punishes the
// wrong person and permanently loses outcome data that cannot be back-filled.
const PATIENT_SELF_REPORT_SEGMENTS = new Set(["exercise-logs", "pain-logs", "prom-responses"]);

/**
 * Should this request be checked against the subscription?
 *
 * Keyed on HTTP method, not an enumerated route list, so it covers every
 * handler that exists today and every one added later, and maps exactly onto
 * "existing data stays readable, nothing new can be created or changed".
 *
 * Exemptions match the FIRST PATH SEGMENT exactly, not a string prefix. With
 * prefix matching a future route named `/authorisations` would be silently
 * exempted by `/auth` -- a hole that only opens years later, when nobody is
 * looking at this file.
 */
export function isWriteGated(method: string, path: string, role: string): boolean {
  if (method === "GET" || method === "OPTIONS" || method === "HEAD") return false;
  if (role === "super_admin") return false;

  const head = path.split("/").filter(Boolean)[0] ?? "";
  if (EXEMPT_SEGMENTS.has(head)) return false;
  if (role === "patient" && PATIENT_SELF_REPORT_SEGMENTS.has(head)) return false;
  return true;
}
