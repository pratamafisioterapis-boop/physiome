// Supabase Edge Function: "api"
// Replaces the old Express + Prisma + MySQL backend (apps/api) entirely.
// All data access happens here with the service-role key; RLS on every
// table denies anon/authenticated access directly, so this function is the
// only door into the database (mirrors the old Express-only-access model).

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

// Web Push (chat notifications). Optional: if unset, push sends are silently
// skipped (chat itself still works via polling) rather than erroring.
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY") || "";
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY") || "";
const VAPID_CONTACT_EMAIL = Deno.env.get("VAPID_CONTACT_EMAIL") || "mailto:support@physiome.app";
if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_CONTACT_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

const admin: SupabaseClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// signInWithPassword mutates the calling client's in-memory session, and
// `admin` is a module-level singleton reused across warm invocations. If we
// ever called it on `admin`, every later `.from()` call on this same warm
// instance would silently run as that end user (role "authenticated")
// instead of service_role. Always sign in on a fresh, throwaway client.
function freshAuthClient(): SupabaseClient {
  return createClient(SUPABASE_URL, ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function err(status: number, message: string) {
  return json({ error: message, message }, status);
}

// Like `err`, but carries a machine-readable `code` plus context. The client
// needs this to tell 402 "subscription lapsed" apart from 402 "plan limit
// reached" and route the user to the right screen.
function errCode(status: number, message: string, extra: Record<string, unknown>) {
  return json({ error: message, message, ...extra }, status);
}

class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type AuthCtx = {
  userId: string;
  role: string;
  clinicId: string | null;
  // Populated by the write gate in the router so downstream limit checks in
  // the same request don't have to re-query the subscription.
  entitlement?: Entitlement;
};

async function requireAuth(req: Request): Promise<AuthCtx> {
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.split(" ")[1];
  if (!token) throw new HttpError(401, "Unauthorized: No token provided");

  const { data, error } = await admin.auth.getUser(token);
  if (error || !data?.user) throw new HttpError(401, "Unauthorized: Invalid or expired token");

  const { data: profile, error: profileError } = await admin
    .from("users")
    .select("id, role, clinic_id")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) throw new HttpError(401, "Unauthorized: User not found");

  return { userId: profile.id, role: profile.role, clinicId: profile.clinic_id };
}

function requireSuperAdmin(ctx: AuthCtx) {
  if (ctx.role !== "super_admin") throw new HttpError(403, "Forbidden: super_admins only");
}

// Billing (clinic -> its own patients) is staff-only. The UI already hides
// these screens from patients, but the UI is not a security boundary: without
// this check any authenticated patient could read and write their whole
// clinic's invoices, payments, and price list.
function requireClinician(ctx: AuthCtx) {
  if (!["admin", "therapist", "super_admin"].includes(ctx.role)) {
    throw new HttpError(403, "Forbidden: clinic staff only");
  }
}

function bad(msg: string): never {
  throw new HttpError(400, msg);
}

function notFound(msg = "Not found"): never {
  throw new HttpError(404, msg);
}

function unwrap<T>(res: { data: T; error: { message: string } | null }): T {
  if (res.error) throw new HttpError(500, res.error.message);
  return res.data;
}

// ---------- subscription entitlement ----------

// The kill switch. Enforcement ships off so the payment flow can be proven in
// production before anything starts refusing writes; flipping this env var in
// the dashboard turns it on (or back off) with no redeploy.
const ENFORCEMENT_ENABLED = (Deno.env.get("SUBSCRIPTION_ENFORCEMENT") || "").toLowerCase() === "true";

const GRACE_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

type EntitlementState = "active" | "grace" | "readonly" | "none";

type Entitlement = {
  subjectKind: "clinic" | "user" | "none";
  subjectId: string | null;
  planCode: string | null;
  planName: string | null;
  audience: string | null;
  status: string;
  state: EntitlementState;
  currentPeriodEnd: string | null;
  graceUntil: string | null;
  daysRemaining: number;
  daysUntilLockout: number;
  canWrite: boolean;
  enforced: boolean;
  limits: { maxTherapists: number | null; maxActivePatients: number | null };
};

const NO_ENTITLEMENT: Entitlement = {
  subjectKind: "none",
  subjectId: null,
  planCode: null,
  planName: null,
  audience: null,
  status: "none",
  state: "none",
  currentPeriodEnd: null,
  graceUntil: null,
  daysRemaining: 0,
  daysUntilLockout: 0,
  canWrite: false,
  enforced: ENFORCEMENT_ENABLED,
  limits: { maxTherapists: null, maxActivePatients: null },
};

// Which subscription governs this caller? A B2C patient has their own
// per-user subscription; a patient who joined via a clinic invite code is
// covered by their clinic, so we fall back to that.
async function resolveSubscriptionRow(ctx: AuthCtx) {
  const selectCols = "*, subscription_plans(code, name_id, name_en, audience, max_therapists, max_active_patients)";

  if (ctx.role === "patient") {
    const { data: own } = await admin
      .from("subscriptions")
      .select(selectCols)
      .eq("user_id", ctx.userId)
      .maybeSingle();
    if (own) return own;
  }

  if (!ctx.clinicId) return null;

  const { data: clinicSub } = await admin
    .from("subscriptions")
    .select(selectCols)
    .eq("clinic_id", ctx.clinicId)
    .maybeSingle();
  return clinicSub ?? null;
}

// `state` is derived from timestamps rather than read off `status`. That is
// deliberate: if the nightly sweep fails for a week, nobody gets free access
// and nobody gets wrongly locked out either. `status` is for reporting.
function computeEntitlement(row: Record<string, unknown> | null): Entitlement {
  if (!row) return { ...NO_ENTITLEMENT };

  const plan = (row.subscription_plans ?? null) as Record<string, unknown> | null;
  const status = String(row.status ?? "none");
  const periodEnd = row.current_period_end ? new Date(String(row.current_period_end)) : null;
  const graceUntil = row.grace_until ? new Date(String(row.grace_until)) : null;
  const now = Date.now();

  let state: EntitlementState;
  if (status === "cancelled" || status === "expired") {
    state = "readonly";
  } else if (periodEnd && now <= periodEnd.getTime()) {
    state = "active";
  } else if (graceUntil && now <= graceUntil.getTime()) {
    state = "grace";
  } else {
    state = "readonly";
  }

  return {
    subjectKind: row.clinic_id ? "clinic" : "user",
    subjectId: String(row.clinic_id ?? row.user_id ?? ""),
    planCode: plan ? String(plan.code) : String(row.plan_code ?? ""),
    planName: plan ? String(plan.name_id) : null,
    audience: plan ? String(plan.audience) : null,
    status,
    state,
    currentPeriodEnd: periodEnd ? periodEnd.toISOString() : null,
    graceUntil: graceUntil ? graceUntil.toISOString() : null,
    daysRemaining: periodEnd ? Math.ceil((periodEnd.getTime() - now) / DAY_MS) : 0,
    daysUntilLockout: graceUntil ? Math.ceil((graceUntil.getTime() - now) / DAY_MS) : 0,
    canWrite: state === "active" || state === "grace",
    enforced: ENFORCEMENT_ENABLED,
    limits: {
      maxTherapists: plan?.max_therapists != null ? Number(plan.max_therapists) : null,
      maxActivePatients: plan?.max_active_patients != null ? Number(plan.max_active_patients) : null,
    },
  };
}

async function getEntitlement(ctx: AuthCtx): Promise<Entitlement> {
  if (ctx.role === "super_admin") {
    return {
      ...NO_ENTITLEMENT,
      subjectKind: "none",
      status: "internal",
      state: "active",
      canWrite: true,
    };
  }
  return computeEntitlement(await resolveSubscriptionRow(ctx));
}

// ---------- auth routes ----------

async function authRegister(body: Record<string, unknown>) {
  const {
    clinicName,
    fullName,
    email,
    password,
    phone,
    inviteCode,
    accountType,
    packagePlan,
    paymentMethod,
  } = body as Record<string, string>;

  if (!email || !password || !fullName) bad("email, password, and fullName are required");

  const { data: existing } = await admin.from("users").select("id").eq("email", email).maybeSingle();
  if (existing) return err(400, "Email is already registered");

  let clinicId: string | null = null;
  let userRole = "admin";
  let inviteId: string | null = null;

  if (accountType === "therapist" || accountType === "patient") {
    if (!inviteCode) bad(`An invite code from your clinic is required to sign up as a ${accountType}`);

    const { data: codeData } = await admin
      .from("invite_codes")
      .select("*")
      .eq("code", inviteCode)
      .eq("is_active", true)
      .maybeSingle();

    if (!codeData || (codeData.expires_at && new Date() > new Date(codeData.expires_at))) {
      return err(400, "Invalid or expired invite code");
    }
    if (codeData.role !== accountType) {
      return err(400, `This invite code is for a different role (${codeData.role}). Ask your clinic for a ${accountType} invite code.`);
    }
    if (!codeData.clinic_id) {
      return err(400, "This invite code isn't linked to a clinic. Please ask your clinic administrator for a new one.");
    }

    clinicId = codeData.clinic_id;
    userRole = codeData.role;
    inviteId = codeData.id;
  } else {
    if (!clinicName) bad("Clinic name is required");
    const { data: newClinic, error: clinicError } = await admin
      .from("clinics")
      .insert({ name: clinicName })
      .select()
      .single();
    if (clinicError) throw new HttpError(500, clinicError.message);
    clinicId = newClinic.id;
  }

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createError || !created?.user) throw new HttpError(500, createError?.message || "Failed to create account");

  const { data: userRow, error: userError } = await admin
    .from("users")
    .insert({
      id: created.user.id,
      email,
      fullName,
      phone: phone || null,
      role: userRole,
      clinic_id: clinicId,
      invite_code_id: inviteId,
    })
    .select()
    .single();

  if (userError) {
    await admin.auth.admin.deleteUser(created.user.id);
    throw new HttpError(500, userError.message);
  }

  if (inviteId) {
    await admin.from("invite_codes").update({ used_by: userRow.id, is_active: false }).eq("id", inviteId);
  }

  if (userRole === "patient") {
    const { error: patientError } = await admin
      .from("patients")
      .insert({ userId: userRow.id, name: fullName, email, phone: phone || null, clinic_id: clinicId });
    if (patientError) {
      await admin.auth.admin.deleteUser(created.user.id);
      await admin.from("users").delete().eq("id", userRow.id);
      throw new HttpError(500, patientError.message);
    }
  }

  if (!inviteId) {
    await admin.from("clinics").update({ created_by: userRow.id }).eq("id", clinicId);
    await admin.from("clinic_subscriptions").insert({
      clinic_id: clinicId,
      status: packagePlan === "demo-14" ? "active" : "pending",
      plan: packagePlan || "demo-14",
      payment_method: paymentMethod || "transfer",
      started_at: new Date().toISOString(),
      ended_at: packagePlan === "demo-14" ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() : null,
    });
  }

  const { data: signInData, error: signInError } = await freshAuthClient().auth.signInWithPassword({ email, password });
  if (signInError || !signInData?.session) throw new HttpError(500, "Registered but failed to create session");

  return json(
    {
      message: "Registration successful",
      token: signInData.session.access_token,
      refreshToken: signInData.session.refresh_token,
      user: { id: userRow.id, fullName: userRow.fullName, role: userRow.role, clinic_id: clinicId },
    },
    201,
  );
}

async function authLogin(body: Record<string, unknown>) {
  const { email, password } = body as Record<string, string>;
  if (!email || !password) bad("email and password are required");

  const { data: signInData, error: signInError } = await freshAuthClient().auth.signInWithPassword({ email, password });
  if (signInError || !signInData?.session) return err(401, "Invalid email or password");

  const { data: user, error: userError } = await admin
    .from("users")
    .select("id, fullName, role, clinic_id")
    .eq("id", signInData.user.id)
    .maybeSingle();

  if (userError) throw new HttpError(500, userError.message);
  if (!user) return err(401, "Invalid email or password");

  const { data: therapist } = await admin.from("therapists").select("id").eq("userId", user.id).maybeSingle();

  // Embedded here as well as in /auth/me, otherwise a freshly logged-in
  // session has no subscription state until the next page refresh.
  const subscription = await getEntitlement({
    userId: user.id,
    role: user.role,
    clinicId: user.clinic_id,
  });

  return json({
    message: "Login successful",
    token: signInData.session.access_token,
    refreshToken: signInData.session.refresh_token,
    user: {
      id: user.id,
      fullName: user.fullName,
      role: user.role,
      clinic_id: user.clinic_id,
      therapistId: therapist?.id,
      subscription,
    },
  });
}

async function authForgotPassword(body: Record<string, unknown>) {
  const { email, redirectTo } = body as Record<string, string>;
  if (!email) bad("email is required");

  // Always respond with a generic success message so we never reveal
  // whether an email is registered.
  await admin.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo || undefined,
  });

  return json({ message: "If an account exists for that email, a reset link has been sent." });
}

async function authResetPassword(body: Record<string, unknown>) {
  const { accessToken, password } = body as Record<string, string>;
  if (!accessToken || !password) bad("accessToken and password are required");
  if (password.length < 8) bad("Password must be at least 8 characters");

  const { data, error } = await admin.auth.getUser(accessToken);
  if (error || !data?.user) return err(401, "This reset link is invalid or has expired");

  const { error: updateError } = await admin.auth.admin.updateUserById(data.user.id, { password });
  if (updateError) throw new HttpError(500, updateError.message);

  return json({ message: "Password updated successfully" });
}

async function authMe(ctx: AuthCtx) {
  const { data: user } = await admin
    .from("users")
    .select("id, fullName, role, clinic_id, email, therapists(id)")
    .eq("id", ctx.userId)
    .single();
  if (!user) return notFound("User not found");
  const subscription = await getEntitlement(ctx);
  return json({ ...user, therapistId: user.therapists?.[0]?.id, therapists: undefined, subscription });
}

async function authUpdateProfile(ctx: AuthCtx, body: Record<string, unknown>) {
  const { fullName, specialization, licenseNumber, phone, address, city } = body as Record<string, string>;

  if (fullName) await admin.from("users").update({ fullName }).eq("id", ctx.userId);

  if (specialization || licenseNumber) {
    const { data: existing } = await admin.from("therapists").select("id").eq("userId", ctx.userId).maybeSingle();
    if (existing) {
      await admin.from("therapists").update({ specialization, licenseNumber }).eq("id", existing.id);
    } else {
      await admin.from("therapists").insert({
        userId: ctx.userId,
        clinic_id: ctx.clinicId,
        specialization,
        licenseNumber,
        status: "Active",
      });
    }
  }

  if (ctx.role === "admin" && (phone || address || city) && ctx.clinicId) {
    await admin.from("clinics").update({ phone, address, city }).eq("id", ctx.clinicId);
  }

  const { data: updated } = await admin.from("users").select("id, fullName, role, clinic_id, email").eq("id", ctx.userId).single();
  return json(updated);
}

// ---------- patients ----------

async function listPatients(ctx: AuthCtx) {
  const { data } = await admin.from("patients").select("*").eq("clinic_id", ctx.clinicId).order("created_at", { ascending: false });
  return json(data ?? []);
}

async function getPatient(ctx: AuthCtx, id: string) {
  const { data } = await admin.from("patients").select("*").eq("id", id).eq("clinic_id", ctx.clinicId).maybeSingle();
  if (!data) return notFound("Patient not found");
  return json(data);
}

async function createPatient(ctx: AuthCtx, body: Record<string, unknown>) {
  const { name, email, phone, gender, birth_date, ...rest } = body as Record<string, string>;
  const normalizedGender = typeof gender === "string" ? gender.toLowerCase() : undefined;

  const { data: patient, error } = await admin
    .from("patients")
    .insert({
      name,
      email,
      phone,
      gender: normalizedGender || null,
      birth_date: birth_date || null,
      clinic_id: ctx.clinicId,
      ...rest,
    })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);

  if (email) {
    const { data: existingUser } = await admin.from("users").select("id").eq("email", email).maybeSingle();
    if (!existingUser) {
      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email,
        password: phone || "Patient123!",
        email_confirm: true,
      });
      if (!createError && created?.user) {
        const { data: newUser } = await admin
          .from("users")
          .insert({ id: created.user.id, email, fullName: name, phone, role: "patient", clinic_id: ctx.clinicId })
          .select()
          .single();
        if (newUser) await admin.from("patients").update({ userId: newUser.id }).eq("id", patient.id);
      }
    }
  }

  return json(patient, 201);
}

async function updatePatient(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  const { gender, birth_date, ...data } = body as Record<string, string>;
  if (gender !== undefined) (data as Record<string, unknown>).gender = typeof gender === "string" ? gender.toLowerCase() : null;
  if (birth_date !== undefined) (data as Record<string, unknown>).birth_date = birth_date || null;

  const { data: updated, error } = await admin
    .from("patients")
    .update(data)
    .eq("id", id)
    .eq("clinic_id", ctx.clinicId)
    .select()
    .maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!updated) return notFound("Patient not found");
  return json(updated);
}

async function deletePatient(ctx: AuthCtx, id: string) {
  const { data: patient } = await admin.from("patients").select("email").eq("id", id).eq("clinic_id", ctx.clinicId).maybeSingle();
  if (!patient) return notFound("Patient not found");

  if (patient.email) {
    const { data: linkedUser } = await admin
      .from("users")
      .select("id")
      .eq("email", patient.email)
      .eq("clinic_id", ctx.clinicId)
      .eq("role", "patient")
      .maybeSingle();
    if (linkedUser) {
      await admin.auth.admin.deleteUser(linkedUser.id).catch(() => {});
      await admin.from("users").delete().eq("id", linkedUser.id);
    }
  }

  await admin.from("patients").delete().eq("id", id);
  return json({ message: "Patient and associated user account deleted successfully" });
}

// ---------- therapists ----------

async function listTherapists(ctx: AuthCtx) {
  const { data } = await admin
    .from("therapists")
    .select("*, users!therapists_userId_fkey(fullName, email, phone, role)")
    .eq("clinic_id", ctx.clinicId)
    .order("created_at", { ascending: false });

  const formatted = (data ?? []).map((t: Record<string, any>) => ({
    id: t.id,
    userId: t.userId,
    fullName: t.users?.fullName,
    email: t.users?.email,
    phone: t.users?.phone,
    role: t.users?.role,
    specialization: t.specialization,
    licenseNumber: t.licenseNumber,
    status: t.status,
    created_at: t.created_at,
  }));
  return json(formatted);
}

async function getTherapist(ctx: AuthCtx, id: string) {
  const { data } = await admin
    .from("therapists")
    .select("*, users!therapists_userId_fkey(fullName, email, phone, role, created_at)")
    .eq("id", id)
    .eq("clinic_id", ctx.clinicId)
    .maybeSingle();
  if (!data) return notFound("Therapist not found");
  return json({ ...data, fullName: data.users?.fullName, email: data.users?.email, phone: data.users?.phone, role: data.users?.role });
}

async function createTherapist(ctx: AuthCtx, body: Record<string, unknown>) {
  const { fullName, email, password, phone, specialization, licenseNumber } = body as Record<string, string>;
  if (!fullName || !email || !password) bad("Full name, email, and password are required");

  const { data: created, error: createError } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (createError || !created?.user) throw new HttpError(500, createError?.message || "Failed to create account");

  const { data: newUser, error: userError } = await admin
    .from("users")
    .insert({ id: created.user.id, email, fullName, phone, role: "therapist", clinic_id: ctx.clinicId })
    .select()
    .single();
  if (userError) {
    await admin.auth.admin.deleteUser(created.user.id);
    throw new HttpError(500, userError.message);
  }

  const { data: newTherapist, error: therapistError } = await admin
    .from("therapists")
    .insert({ userId: newUser.id, specialization, licenseNumber, clinic_id: ctx.clinicId, status: "Active" })
    .select()
    .single();
  if (therapistError) throw new HttpError(500, therapistError.message);

  return json({ message: "Therapist and User created successfully", data: newTherapist }, 201);
}

async function updateTherapist(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  const { fullName, email, phone, specialization, licenseNumber, status, password } = body as Record<string, string>;

  const { data: therapist } = await admin.from("therapists").select("userId").eq("id", id).eq("clinic_id", ctx.clinicId).maybeSingle();
  if (!therapist) return notFound("Therapist not found");

  const userUpdate: Record<string, unknown> = { fullName, email, phone };
  await admin.from("users").update(userUpdate).eq("id", therapist.userId);

  if (password && password.trim() !== "") {
    await admin.auth.admin.updateUserById(therapist.userId, { password });
  }

  const { data: updated, error } = await admin
    .from("therapists")
    .update({ specialization, licenseNumber, status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);

  return json({ message: "Therapist updated successfully", data: updated });
}

async function deleteTherapist(ctx: AuthCtx, id: string) {
  const { data: therapist } = await admin.from("therapists").select("userId").eq("id", id).eq("clinic_id", ctx.clinicId).maybeSingle();
  if (!therapist) return notFound("Therapist not found");

  await admin.from("therapists").delete().eq("id", id);
  await admin.auth.admin.deleteUser(therapist.userId).catch(() => {});
  await admin.from("users").delete().eq("id", therapist.userId);

  return json({ message: "Therapist and user account deleted successfully" });
}

// ---------- appointments ----------

async function listAppointments(ctx: AuthCtx, params: URLSearchParams) {
  let query = admin
    .from("appointments")
    .select("*, patient:patients(id, name), therapist:therapists(id, user:users!therapists_userId_fkey(fullName))")
    .eq("clinic_id", ctx.clinicId);

  const therapistId = params.get("therapist_id");
  if (therapistId) query = query.eq("therapist_id", therapistId);
  const date = params.get("date");
  if (date) query = query.eq("date", date.slice(0, 10));
  const statusNe = params.get("status!");
  if (statusNe) query = query.neq("status", statusNe);
  const status = params.get("status");
  if (status) query = query.eq("status", status);

  const { data } = await query.order("date", { ascending: false });
  return json(data ?? []);
}

async function getAppointment(ctx: AuthCtx, id: string) {
  const { data } = await admin
    .from("appointments")
    .select("*, patient:patients(*), therapist:therapists(*, user:users!therapists_userId_fkey(fullName, email, phone))")
    .eq("id", id)
    .eq("clinic_id", ctx.clinicId)
    .maybeSingle();
  if (!data) return notFound("Appointment not found");
  return json(data);
}

async function createAppointment(ctx: AuthCtx, body: Record<string, unknown>) {
  const { patient_id, therapist_id, date, time, duration, notes, status } = body as Record<string, string>;
  const { data, error } = await admin
    .from("appointments")
    .insert({
      patient_id,
      therapist_id: therapist_id || null,
      clinic_id: ctx.clinicId,
      date,
      time,
      duration: parseInt(duration as unknown as string) || 30,
      notes,
      status: status || "Scheduled",
    })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function updateAppointment(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  const { patient_id, therapist_id, date, time, duration, notes, status } = body as Record<string, string>;
  const { data, error } = await admin
    .from("appointments")
    .update({
      ...(patient_id !== undefined && { patient_id }),
      ...(therapist_id !== undefined && { therapist_id }),
      ...(date !== undefined && { date }),
      ...(time !== undefined && { time }),
      ...(duration !== undefined && { duration: parseInt(duration as unknown as string) }),
      ...(notes !== undefined && { notes }),
      ...(status !== undefined && { status }),
    })
    .eq("id", id)
    .eq("clinic_id", ctx.clinicId)
    .select()
    .maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!data) return notFound("Appointment not found");
  return json(data);
}

async function deleteAppointment(ctx: AuthCtx, id: string) {
  await admin.from("appointments").delete().eq("id", id).eq("clinic_id", ctx.clinicId);
  return json({ message: "Appointment deleted successfully" });
}

// ---------- exercises ----------

async function listExercises(ctx: AuthCtx) {
  // ctx.clinicId is null for super_admin (no clinic) - "clinic_id.eq.<null>" isn't valid
  // UUID syntax for PostgREST, so build the OR clause only when there's a real clinic to match.
  let query = admin.from("exercises").select("*");
  query = ctx.clinicId ? query.or(`clinic_id.eq.${ctx.clinicId},clinic_id.is.null`) : query.is("clinic_id", null);
  const { data } = await query.order("name", { ascending: true });
  return json(data ?? []);
}

async function getExercise(ctx: AuthCtx, id: string) {
  let query = admin.from("exercises").select("*").eq("id", id);
  query = ctx.clinicId ? query.or(`clinic_id.eq.${ctx.clinicId},clinic_id.is.null`) : query.is("clinic_id", null);
  const { data } = await query.maybeSingle();
  if (!data) return notFound("Exercise not found");
  return json(data);
}

async function createExercise(ctx: AuthCtx, body: Record<string, unknown>) {
  const { data, error } = await admin
    .from("exercises")
    .insert({ ...body, clinic_id: ctx.clinicId, created_by: ctx.userId })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

// Global templates (clinic_id null) may only be edited by super_admin; clinics
// may only edit their own rows. Returns the row so callers can inspect it.
async function requireWritableExercise(ctx: AuthCtx, id: string) {
  const { data: exercise } = await admin.from("exercises").select("*").eq("id", id).maybeSingle();
  if (!exercise) notFound("Exercise not found");
  if (ctx.role !== "super_admin" && exercise.clinic_id !== ctx.clinicId) {
    throw new HttpError(403, "You do not have permission to edit this exercise. Global templates cannot be modified.");
  }
  return exercise as Record<string, any>;
}

async function updateExercise(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  if (Object.keys(body).length === 0) bad("No data provided for update");
  await requireWritableExercise(ctx, id);
  const { data, error } = await admin.from("exercises").update(body).eq("id", id).select().single();
  if (error) throw new HttpError(500, error.message);
  return json(data);
}

async function deleteExercise(ctx: AuthCtx, id: string) {
  const { data: exercise } = await admin.from("exercises").select("video_url, thumbnail_url").eq("id", id).maybeSingle();

  if (ctx.role === "super_admin") {
    await admin.from("exercises").delete().eq("id", id);
  } else {
    await admin.from("exercises").delete().eq("id", id).eq("clinic_id", ctx.clinicId);
  }

  // Don't leave the storage objects behind once the row referencing them is gone.
  await removeVideoAssetIfOrphan(exercise?.video_url);
  await removeVideoAssetIfOrphan(exercise?.thumbnail_url);
  return json({ message: "Exercise deleted successfully" });
}

// ---------- exercise programs ----------

async function listProgramTemplates() {
  const { data } = await admin.from("exercise_programs").select("*").is("clinic_id", null).eq("status", "Active").order("name", { ascending: true });
  const formatted = (data ?? []).map((t: Record<string, any>) => ({ ...t, exercisesCount: Array.isArray(t.exercises) ? t.exercises.length : 0 }));
  return json(formatted);
}

async function listExercisePrograms(ctx: AuthCtx) {
  const { data } = await admin.from("exercise_programs").select("*").eq("clinic_id", ctx.clinicId).order("created_at", { ascending: false });
  return json(data ?? []);
}

async function createExerciseProgram(ctx: AuthCtx, body: Record<string, unknown>) {
  const { name, description, exercises, status, clinical_goal, body_region, expected_duration, ai_generated, ai_confidence_score, ai_prompt } = body as Record<string, unknown>;
  const { data, error } = await admin
    .from("exercise_programs")
    .insert({ name, description, clinical_goal, body_region, expected_duration, exercises, status: status || "Active", ai_generated, ai_confidence_score, ai_prompt, clinic_id: ctx.clinicId, created_by: ctx.userId })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function getExerciseProgram(ctx: AuthCtx, id: string) {
  let query = admin.from("exercise_programs").select("*").eq("id", id);
  if (ctx.role !== "super_admin") query = query.or(`clinic_id.eq.${ctx.clinicId},clinic_id.is.null`);
  const { data } = await query.maybeSingle();
  if (!data) return notFound("Program not found");
  if (typeof data.exercises === "string") data.exercises = JSON.parse(data.exercises);
  return json(data);
}

async function updateExerciseProgram(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  const { name, description, exercises, status, clinical_goal, body_region, expected_duration } = body as Record<string, unknown>;
  let query = admin
    .from("exercise_programs")
    .update({ name, description, clinical_goal, body_region, expected_duration, exercises, status })
    .eq("id", id);
  if (ctx.role !== "super_admin") query = query.eq("clinic_id", ctx.clinicId);
  const { data, error } = await query.select().maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!data) return notFound("Program not found");
  return json(data);
}

async function deleteExerciseProgram(ctx: AuthCtx, id: string) {
  let query = admin.from("exercise_programs").delete().eq("id", id);
  if (ctx.role !== "super_admin") query = query.eq("clinic_id", ctx.clinicId);
  await query;
  return json({ message: "Program deleted successfully" });
}

// ---------- program assignments ----------

async function listProgramAssignments(ctx: AuthCtx, url: URL) {
  let query = admin.from("program_assignments").select("*, patient:patients(*)");

  if (ctx.role === "patient") {
    const { data: user } = await admin.from("users").select("email").eq("id", ctx.userId).single();
    query = query.eq("patient.email", user?.email);
  } else if (url.searchParams.get("patient_id")) {
    query = query.eq("patient_id", url.searchParams.get("patient_id")!).eq("clinic_id", ctx.clinicId);
  } else {
    query = query.eq("clinic_id", ctx.clinicId);
  }

  const { data: assignments, error } = await query.order("created_at", { ascending: false });
  if (error) throw new HttpError(500, error.message);

  const formatted = await Promise.all(
    (assignments ?? []).map(async (asg: Record<string, any>) => {
      const { data: prog } = await admin.from("exercise_programs").select("name").eq("id", asg.program_id).maybeSingle();
      return { ...asg, program_name: prog?.name || "Unnamed Program" };
    }),
  );
  return json(formatted);
}

async function myExercises(ctx: AuthCtx) {
  const { data: user } = await admin.from("users").select("email").eq("id", ctx.userId).single();
  const { data: patient } = await admin.from("patients").select("id").eq("email", user?.email).maybeSingle();
  if (!patient) return notFound("Patient profile not found.");

  const { data: assignments } = await admin
    .from("program_assignments")
    .select("program_id")
    .eq("patient_id", patient.id)
    .eq("status", "Active");

  const programIds = [...new Set((assignments ?? []).map((a: Record<string, any>) => a.program_id).filter(Boolean))];
  if (programIds.length === 0) return json([]);

  const { data: programs } = await admin.from("exercise_programs").select("exercises").in("id", programIds);

  let all: Record<string, any>[] = [];
  (programs ?? []).forEach((p: Record<string, any>) => {
    let ex = p.exercises || [];
    if (typeof ex === "string") ex = JSON.parse(ex);
    all = all.concat(ex);
  });

  const uniqueIds = [...new Set(all.map((e) => e.id).filter(Boolean))];
  const { data: details } = await admin.from("exercises").select("*").in("id", uniqueIds);
  return json(details ?? []);
}

async function getProgramAssignment(ctx: AuthCtx, id: string) {
  const { data: user } = await admin.from("users").select("email").eq("id", ctx.userId).maybeSingle();

  const { data: assignment } = await admin
    .from("program_assignments")
    .select("*, patient:patients(*)")
    .eq("id", id)
    .maybeSingle();

  if (!assignment) return notFound("Assignment not found");
  const ownsByClinic = assignment.clinic_id === ctx.clinicId;
  const ownsByPatientEmail = assignment.patient?.email && assignment.patient.email === user?.email;
  if (!ownsByClinic && !ownsByPatientEmail) return notFound("Assignment not found");

  const { data: program } = await admin.from("exercise_programs").select("*").eq("id", assignment.program_id).maybeSingle();
  if (!program) return notFound("Program template not found");

  let programExercises = program.exercises || [];
  if (typeof programExercises === "string") programExercises = JSON.parse(programExercises);

  const exerciseIds = programExercises.map((e: Record<string, any>) => e.id).filter(Boolean);
  const { data: exerciseDetails } = await admin.from("exercises").select("*").in("id", exerciseIds.length ? exerciseIds : ["00000000-0000-0000-0000-000000000000"]);

  const combined = programExercises.map((pe: Record<string, any>) => {
    const details = (exerciseDetails ?? []).find((d: Record<string, any>) => d.id === pe.id);
    return {
      ...pe,
      repetitions: pe.reps || 0,
      work_time: pe.work_time || 0,
      hold_duration: pe.holdTime || pe.hold_duration || 0,
      sets: pe.sets || 3,
      details: details || { name: pe.name, instructions: pe.notes, video_url: pe.video_url },
    };
  });

  return json({ ...assignment, program_name: program.name, description: program.description, exercises: combined });
}

async function createProgramAssignment(ctx: AuthCtx, body: Record<string, unknown>) {
  const { program_id, patient_id, start_date, end_date, therapist_notes, status } = body as Record<string, string>;
  if (!program_id || !patient_id || !start_date || !end_date) bad("Program ID, Patient ID, Start Date, and End Date are required.");

  const { data, error } = await admin
    .from("program_assignments")
    .insert({ program_id, patient_id, start_date, end_date, therapist_notes, status: status || "Active", clinic_id: ctx.clinicId })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

// ---------- soap notes ----------

async function listSoapNotes(ctx: AuthCtx, patientId: string) {
  const { data } = await admin
    .from("soap_notes")
    .select("*, patients!inner(clinic_id)")
    .eq("patient_id", patientId)
    .eq("patients.clinic_id", ctx.clinicId)
    .order("created_at", { ascending: false });
  return json((data ?? []).map(({ patients: _p, ...rest }: Record<string, any>) => rest));
}

async function createSoapNote(ctx: AuthCtx, body: Record<string, unknown>) {
  const { patient_id, subjective, objective, assessment, plan } = body as Record<string, string>;
  const { data: patient } = await admin.from("patients").select("id").eq("id", patient_id).eq("clinic_id", ctx.clinicId).maybeSingle();
  if (!patient) return err(403, "Access denied");

  const { data, error } = await admin
    .from("soap_notes")
    .insert({ patient_id, therapist_id: ctx.userId, subjective, objective, assessment, plan })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function updateSoapNote(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  const { subjective, objective, assessment, plan } = body as Record<string, string>;
  const { data: note } = await admin.from("soap_notes").select("id, patients!inner(clinic_id)").eq("id", id).maybeSingle();
  if (!note || (note as Record<string, any>).patients?.clinic_id !== ctx.clinicId) return notFound("SOAP note not found");

  const { data, error } = await admin
    .from("soap_notes")
    .update({ subjective, objective, assessment, plan })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data);
}

async function deleteSoapNote(ctx: AuthCtx, id: string) {
  const { data: note } = await admin.from("soap_notes").select("id, patients!inner(clinic_id)").eq("id", id).maybeSingle();
  if (!note || (note as Record<string, any>).patients?.clinic_id !== ctx.clinicId) return notFound("SOAP note not found");

  await admin.from("soap_notes").delete().eq("id", id);
  return json({ message: "SOAP note deleted successfully" });
}

// ---------- soap history (AI-generated SOAP drafts) ----------

async function listSoapHistory(ctx: AuthCtx, url: URL) {
  let query = admin.from("soap_history").select("*").eq("therapist_id", ctx.userId).eq("deleted", false);
  const patientId = url.searchParams.get("patient_id");
  if (patientId) query = query.eq("patient_id", patientId);
  const { data } = await query.order("created_at", { ascending: false });
  return json(data ?? []);
}

async function createSoapHistory(ctx: AuthCtx, body: Record<string, unknown>) {
  const { patient_id, input_notes, generated_soap } = body as Record<string, unknown>;
  const { data, error } = await admin
    .from("soap_history")
    .insert({ therapist_id: ctx.userId, patient_id, input_notes, generated_soap })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function deleteSoapHistory(ctx: AuthCtx, id: string) {
  const { data, error } = await admin
    .from("soap_history")
    .update({ deleted: true })
    .eq("id", id)
    .eq("therapist_id", ctx.userId)
    .select()
    .maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!data) return notFound("SOAP history entry not found");
  return json({ message: "SOAP history entry deleted" });
}

// ---------- categories ----------

async function listCategories(ctx: AuthCtx) {
  const { data } = await admin
    .from("categories")
    .select("*")
    .or(`clinic_id.eq.${ctx.clinicId},clinic_id.is.null`)
    .order("name", { ascending: true });
  return json(data ?? []);
}

async function createCategory(ctx: AuthCtx, body: Record<string, unknown>) {
  const { data, error } = await admin.from("categories").insert({ ...body, clinic_id: ctx.clinicId }).select().single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function updateCategory(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  const { data, error } = await admin.from("categories").update(body).eq("id", id).eq("clinic_id", ctx.clinicId).select().maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!data) return notFound("Category not found");
  return json(data);
}

async function deleteCategory(ctx: AuthCtx, id: string) {
  await admin.from("categories").delete().eq("id", id).eq("clinic_id", ctx.clinicId);
  return json({ message: "Category deleted successfully" });
}

// ---------- service packages (catalog, distinct from patient_packages) ----------

async function listPackages(ctx: AuthCtx) {
  requireClinician(ctx);
  const { data } = await admin.from("packages").select("*").eq("clinic_id", ctx.clinicId).order("created_at", { ascending: false });
  return json(data ?? []);
}

async function createPackage(ctx: AuthCtx, body: Record<string, unknown>) {
  requireClinician(ctx);
  const { data, error } = await admin.from("packages").insert({ ...body, clinic_id: ctx.clinicId }).select().single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function updatePackage(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  requireClinician(ctx);
  const { data, error } = await admin.from("packages").update(body).eq("id", id).eq("clinic_id", ctx.clinicId).select().maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!data) return notFound("Package not found");
  return json(data);
}

async function deletePackage(ctx: AuthCtx, id: string) {
  requireClinician(ctx);
  await admin.from("packages").delete().eq("id", id).eq("clinic_id", ctx.clinicId);
  return json({ message: "Package deleted successfully" });
}

// ---------- AI program generation history ----------

async function listAiGenerationHistory(ctx: AuthCtx) {
  const { data } = await admin
    .from("ai_generation_history")
    .select("*, exercise_programs(name)")
    .eq("user_id", ctx.userId)
    .order("created_at", { ascending: false });
  return json(data ?? []);
}

async function createAiGenerationHistory(ctx: AuthCtx, body: Record<string, unknown>) {
  const { data, error } = await admin
    .from("ai_generation_history")
    .insert({ ...body, user_id: ctx.userId, clinic_id: ctx.clinicId })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function deleteAiGenerationHistory(ctx: AuthCtx, id: string) {
  await admin.from("ai_generation_history").delete().eq("id", id).eq("user_id", ctx.userId);
  return json({ message: "Deleted successfully" });
}

async function clearAiGenerationHistory(ctx: AuthCtx) {
  await admin.from("ai_generation_history").delete().eq("user_id", ctx.userId);
  return json({ message: "History cleared" });
}

// ---------- invite codes (admin management) ----------

function requireAdmin(ctx: AuthCtx) {
  if (ctx.role !== "admin" && ctx.role !== "super_admin") throw new HttpError(403, "Forbidden: admins only");
}

const INVITE_ROLES = ["admin", "therapist", "patient"];

async function listInviteCodes(ctx: AuthCtx) {
  requireAdmin(ctx);
  let query = admin.from("invite_codes").select("*, users!invite_codes_used_by_fkey(fullName, email)");
  if (ctx.role !== "super_admin") query = query.eq("clinic_id", ctx.clinicId);
  const { data } = await query.order("created_at", { ascending: false });
  return json(data ?? []);
}

async function createInviteCode(ctx: AuthCtx, body: Record<string, unknown>) {
  requireAdmin(ctx);
  if (!ctx.clinicId) bad("You must belong to a clinic to create invite codes");
  const { code, role, expires_at } = body as Record<string, string>;
  if (role && !INVITE_ROLES.includes(role)) bad("Invalid role");
  const { data, error } = await admin
    .from("invite_codes")
    .insert({
      code: code || crypto.randomUUID().slice(0, 8).toUpperCase(),
      role: role || "therapist",
      expires_at: expires_at || null,
      clinic_id: ctx.clinicId,
    })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function updateInviteCode(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  requireAdmin(ctx);
  const { is_active, expires_at } = body as Record<string, unknown>;
  let query = admin
    .from("invite_codes")
    .update({ ...(is_active !== undefined && { is_active }), ...(expires_at !== undefined && { expires_at }) })
    .eq("id", id);
  if (ctx.role !== "super_admin") query = query.eq("clinic_id", ctx.clinicId);
  const { data, error } = await query.select().maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!data) return notFound("Invite code not found");
  return json(data);
}

async function deleteInviteCode(ctx: AuthCtx, id: string) {
  requireAdmin(ctx);
  let query = admin.from("invite_codes").delete().eq("id", id);
  if (ctx.role !== "super_admin") query = query.eq("clinic_id", ctx.clinicId);
  await query;
  return json({ message: "Invite code deleted successfully" });
}

// ---------- translation status ----------

async function listTranslationStatus() {
  const { data } = await admin.from("translation_status").select("*").order("completion_percentage", { ascending: false });
  return json(data ?? []);
}

// ---------- exercise logs / pain logs ----------

async function listExerciseLogs(ctx: AuthCtx, url: URL) {
  let query = admin.from("exercise_logs").select("*").eq("clinic_id", ctx.clinicId);
  const patientId = url.searchParams.get("patient_id");
  if (patientId) query = query.eq("patient_id", patientId);
  const { data } = await query.order("session_date", { ascending: false });
  return json(data ?? []);
}

async function createExerciseLog(ctx: AuthCtx, body: Record<string, unknown>) {
  const { program_id, exercises_completed, sets_completed, pain_before, pain_after, duration, adherence_rate, completion_percentage, notes } =
    body as Record<string, string>;

  // Resolve the real patient row id. Patients authenticate as users, so the
  // client only knows its user id — never trust a client-supplied patient_id.
  // We look the patient up server-side (same pattern as createPainLog), which
  // also fixes the FK violation that previously made every session save fail.
  let patient_id = (body as Record<string, string>).patient_id;
  if (ctx.role === "patient") {
    const { data: user } = await admin.from("users").select("email").eq("id", ctx.userId).single();
    const { data: patient } = await admin.from("patients").select("id").eq("email", user?.email).maybeSingle();
    if (!patient) return notFound("Patient profile not found");
    patient_id = patient.id;
  } else if (patient_id) {
    // Therapist/admin logging on behalf of a patient: scope to their clinic.
    const { data: patient } = await admin.from("patients").select("id").eq("id", patient_id).eq("clinic_id", ctx.clinicId).maybeSingle();
    if (!patient) return err(403, "Access denied to patient");
  } else {
    bad("patient_id is required");
  }

  const { data, error } = await admin
    .from("exercise_logs")
    .insert({
      patient_id,
      program_id,
      clinic_id: ctx.clinicId,
      exercises_completed: parseInt(exercises_completed as unknown as string) || 0,
      sets_completed: parseInt(sets_completed as unknown as string) || 0,
      pain_before: parseInt(pain_before as unknown as string) || 0,
      pain_after: parseInt(pain_after as unknown as string) || 0,
      duration_seconds: parseInt(duration as unknown as string) || 0,
      adherence_rate: parseInt(adherence_rate as unknown as string) || 0,
      completion_percentage: parseInt(completion_percentage as unknown as string) || 0,
      notes,
    })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function createPainLog(ctx: AuthCtx, body: Record<string, unknown>) {
  const { pain_level, location, notes } = body as Record<string, string>;
  const { data: user } = await admin.from("users").select("email").eq("id", ctx.userId).single();
  const { data: patient } = await admin.from("patients").select("id").eq("email", user?.email).maybeSingle();
  if (!patient) return notFound("Patient profile not found");

  const { data, error } = await admin
    .from("pain_logs")
    .insert({ patient_id: patient.id, clinic_id: ctx.clinicId, pain_level: parseInt(pain_level as unknown as string), location, notes })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function listPainLogs(ctx: AuthCtx, url: URL) {
  let query = admin.from("pain_logs").select("*").eq("clinic_id", ctx.clinicId);
  const patientId = url.searchParams.get("patient_id");
  if (patientId) query = query.eq("patient_id", patientId);
  const { data } = await query.order("created_at", { ascending: false });
  return json(data ?? []);
}

// ---------- remote therapeutic monitoring (RTM) ----------

// Current consecutive-day streak from a set of ISO date strings (one per day
// a session happened). Counts back from today (or yesterday, so a not-yet-
// exercised today doesn't break an otherwise live streak).
function streakFromDates(isoDates: string[]): number {
  const days = [...new Set(isoDates.map((d) => new Date(d).toISOString().slice(0, 10)))].sort().reverse();
  if (days.length === 0) return 0;
  const dayMs = 86400000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const mostRecent = new Date(days[0]);
  mostRecent.setHours(0, 0, 0, 0);
  const gap = Math.round((today.getTime() - mostRecent.getTime()) / dayMs);
  if (gap > 1) return 0; // last session was 2+ days ago — streak broken
  let streak = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const cur = new Date(days[i]);
    prev.setHours(0, 0, 0, 0);
    cur.setHours(0, 0, 0, 0);
    if (Math.round((prev.getTime() - cur.getTime()) / dayMs) === 1) streak++;
    else break;
  }
  return streak;
}

// Per-patient monitoring rollup for the clinician RTM dashboard. Aggregates the
// last 30 days of exercise logs and pain logs for every patient with an active
// program, and flags who needs attention.
async function rtmDashboard(ctx: AuthCtx) {
  const since = new Date(Date.now() - 30 * 86400000).toISOString();

  const [{ data: assignments }, { data: patients }, { data: logs }, { data: pains }] = await Promise.all([
    admin.from("program_assignments").select("patient_id, program_id, status").eq("clinic_id", ctx.clinicId).eq("status", "Active"),
    admin.from("patients").select("id, name, email").eq("clinic_id", ctx.clinicId),
    admin.from("exercise_logs").select("*").eq("clinic_id", ctx.clinicId).gte("session_date", since).order("session_date", { ascending: false }),
    admin.from("pain_logs").select("patient_id, pain_level, created_at").eq("clinic_id", ctx.clinicId).gte("created_at", since).order("created_at", { ascending: false }),
  ]);

  const activePatientIds = [...new Set((assignments ?? []).map((a: Record<string, any>) => a.patient_id).filter(Boolean))];
  const patientById = new Map((patients ?? []).map((p: Record<string, any>) => [p.id, p]));
  const logsByPatient = new Map<string, Record<string, any>[]>();
  (logs ?? []).forEach((l: Record<string, any>) => {
    if (!logsByPatient.has(l.patient_id)) logsByPatient.set(l.patient_id, []);
    logsByPatient.get(l.patient_id)!.push(l);
  });
  const painByPatient = new Map<string, Record<string, any>[]>();
  (pains ?? []).forEach((p: Record<string, any>) => {
    if (!painByPatient.has(p.patient_id)) painByPatient.set(p.patient_id, []);
    painByPatient.get(p.patient_id)!.push(p);
  });

  const now = Date.now();
  const rows = activePatientIds.map((pid: string) => {
    const patient = patientById.get(pid) || { id: pid, name: "Unknown patient" };
    const plogs = logsByPatient.get(pid) ?? [];
    const sessions30 = plogs.length;
    const sessions7 = plogs.filter((l) => now - new Date(l.session_date).getTime() <= 7 * 86400000).length;
    const adherence = sessions30
      ? Math.round(plogs.reduce((s, l) => s + (l.completion_percentage || 0), 0) / sessions30)
      : 0;
    const lastSession = plogs[0]?.session_date ?? null;
    const daysSinceLast = lastSession ? Math.floor((now - new Date(lastSession).getTime()) / 86400000) : null;
    const streak = streakFromDates(plogs.map((l) => l.session_date));

    // Pain trend: combine reported pain_after from sessions and standalone pain logs.
    const painPoints = [
      ...plogs.filter((l) => l.pain_after != null).map((l) => ({ v: l.pain_after, t: l.session_date })),
      ...(painByPatient.get(pid) ?? []).map((p) => ({ v: p.pain_level, t: p.created_at })),
    ].sort((a, b) => new Date(a.t).getTime() - new Date(b.t).getTime());
    const painLatest = painPoints.length ? painPoints[painPoints.length - 1].v : null;
    const painFirst = painPoints.length ? painPoints[0].v : null;
    const painTrend = painLatest != null && painFirst != null ? painLatest - painFirst : null;

    // Status flag drives the clinician's triage list.
    let status: "on_track" | "at_risk" | "inactive" | "new";
    if (sessions30 === 0) status = "new";
    else if (daysSinceLast != null && daysSinceLast >= 4) status = "inactive";
    else if (adherence < 50 || sessions7 === 0) status = "at_risk";
    else status = "on_track";

    return {
      patient_id: pid,
      name: patient.name,
      email: patient.email ?? null,
      adherence,
      sessions_7d: sessions7,
      sessions_30d: sessions30,
      streak,
      last_session: lastSession,
      days_since_last: daysSinceLast,
      pain_latest: painLatest,
      pain_trend: painTrend,
      status,
    };
  });

  const severity: Record<string, number> = { inactive: 0, at_risk: 1, new: 2, on_track: 3 };
  rows.sort((a, b) => severity[a.status] - severity[b.status] || b.adherence - a.adherence);

  const summary = {
    active_patients: rows.length,
    at_risk: rows.filter((r) => r.status === "at_risk" || r.status === "inactive").length,
    avg_adherence: rows.length ? Math.round(rows.reduce((s, r) => s + r.adherence, 0) / rows.length) : 0,
    sessions_7d: rows.reduce((s, r) => s + r.sessions_7d, 0),
  };

  return json({ summary, patients: rows });
}

// ---------- videos ----------

const VIDEO_BUCKET = "videos";
const VIDEO_PUBLIC_MARKER = `/storage/v1/object/public/${VIDEO_BUCKET}/`;

// super_admin has no clinic, so their uploads live under "global/" and their
// rows carry clinic_id NULL - the same convention the exercise library uses.
function videoFolder(ctx: AuthCtx) {
  return ctx.clinicId ?? "global";
}

// Rows a caller may read: their own clinic's videos plus the global library.
function scopeVideoQuery(ctx: AuthCtx, query: any) {
  return ctx.clinicId ? query.or(`clinic_id.eq.${ctx.clinicId},clinic_id.is.null`) : query.is("clinic_id", null);
}

async function uploadVideoAsset(ctx: AuthCtx, file: File, fallbackExt: string) {
  const ext = (file.name.split(".").pop() || fallbackExt).toLowerCase().replace(/[^a-z0-9]/g, "") || fallbackExt;
  const objectPath = `${videoFolder(ctx)}/${crypto.randomUUID()}.${ext}`;
  const { error: uploadError } = await admin.storage
    .from(VIDEO_BUCKET)
    .upload(objectPath, file, { contentType: file.type || undefined, upsert: false });
  if (uploadError) throw new HttpError(500, `Upload error: ${uploadError.message}`);
  return admin.storage.from(VIDEO_BUCKET).getPublicUrl(objectPath).data.publicUrl;
}

// Only removes files we actually host; external links (YouTube etc.) are left alone.
async function removeVideoAsset(fileUrl: string | null | undefined) {
  if (!fileUrl) return;
  const idx = fileUrl.indexOf(VIDEO_PUBLIC_MARKER);
  if (idx === -1) return;
  const objectPath = decodeURIComponent(fileUrl.slice(idx + VIDEO_PUBLIC_MARKER.length).split("?")[0]);
  await admin.storage.from(VIDEO_BUCKET).remove([objectPath]).catch(() => {});
}

// A storage object may be referenced by several exercises and/or a library row;
// only delete it once nothing points at it any more.
async function removeVideoAssetIfOrphan(fileUrl: string | null | undefined) {
  if (!fileUrl || fileUrl.indexOf(VIDEO_PUBLIC_MARKER) === -1) return;
  // Separate .eq() probes rather than one .or() string: the value is a URL and
  // would have to be escaped for PostgREST's filter grammar.
  const probes = await Promise.all(
    (["exercises", "videos"] as const).flatMap((table) =>
      (["video_url", "thumbnail_url"] as const).map((column) =>
        admin.from(table).select("id").eq(column, fileUrl).limit(1),
      ),
    ),
  );
  if (probes.some((p) => (p.data?.length ?? 0) > 0)) return;
  await removeVideoAsset(fileUrl);
}

async function listVideos(ctx: AuthCtx) {
  const query = scopeVideoQuery(ctx, admin.from("videos").select("*"));
  const { data } = await query.order("created_at", { ascending: false });
  return json(data ?? []);
}

async function deleteVideo(ctx: AuthCtx, id: string) {
  const { data: video } = await admin.from("videos").select("*").eq("id", id).maybeSingle();
  if (!video) return err(404, "Video not found");
  // Clinics may only delete their own rows; the global library is super_admin's.
  if (ctx.role !== "super_admin" && video.clinic_id !== ctx.clinicId) {
    return err(403, "You do not have permission to delete this video.");
  }

  await admin.from("videos").delete().eq("id", id);
  await removeVideoAssetIfOrphan(video.video_url);
  await removeVideoAssetIfOrphan(video.thumbnail_url);

  return json({ message: "Video deleted successfully" });
}

// Accepts multipart (video_file / thumbnail_file) or JSON (video_url).
type VideoPayload = {
  name: string;
  description: string;
  duration: number;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  addToLibrary: boolean;
};

async function readVideoPayload(ctx: AuthCtx, req: Request): Promise<VideoPayload> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("video_file");
    const thumb = form.get("thumbnail_file");

    const videoUrl = file instanceof File && file.size > 0
      ? await uploadVideoAsset(ctx, file, "mp4")
      : String(form.get("video_url") || "").trim() || null;

    const thumbnailUrl = thumb instanceof File && thumb.size > 0
      ? await uploadVideoAsset(ctx, thumb, "jpg")
      : String(form.get("thumbnail_url") || "").trim() || null;

    return {
      name: String(form.get("name") || "").trim(),
      description: String(form.get("description") || "").trim(),
      duration: parseInt(String(form.get("duration") || "0")) || 0,
      videoUrl,
      thumbnailUrl,
      addToLibrary: String(form.get("add_to_library") || "") === "true",
    };
  }

  const body = await req.json().catch(() => ({} as Record<string, unknown>)) as Record<string, any>;
  return {
    name: String(body.name || "").trim(),
    description: String(body.description || "").trim(),
    duration: parseInt(body.duration) || 0,
    videoUrl: body.video_url ? String(body.video_url).trim() : null,
    thumbnailUrl: body.thumbnail_url ? String(body.thumbnail_url).trim() : null,
    addToLibrary: body.add_to_library === true,
  };
}

async function insertVideoRow(ctx: AuthCtx, payload: VideoPayload) {
  const { data, error } = await admin
    .from("videos")
    .insert({
      name: payload.name,
      description: payload.description,
      duration: payload.duration,
      video_url: payload.videoUrl,
      thumbnail_url: payload.thumbnailUrl,
      clinic_id: ctx.clinicId,
      created_by: ctx.userId,
    })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return data;
}

async function createVideo(ctx: AuthCtx, req: Request) {
  const payload = await readVideoPayload(ctx, req);
  if (!payload.name) bad("Video name is required");
  if (!payload.videoUrl) bad("A video file or video URL is required");
  return json(await insertVideoRow(ctx, payload), 201);
}

// ---------- exercise video (single-step upload + link) ----------

// One call does the whole job: store the file, link it to the exercise, and
// clean up whatever the exercise pointed at before. Works for super_admin
// (global exercises) and for clinics (their own exercises).
async function setExerciseVideo(ctx: AuthCtx, exerciseId: string, req: Request) {
  const exercise = await requireWritableExercise(ctx, exerciseId);
  const payload = await readVideoPayload(ctx, req);

  if (!payload.videoUrl) bad("A video file, library video, or video URL is required");

  const previousVideoUrl = exercise.video_url as string | null;
  const previousThumbnailUrl = exercise.thumbnail_url as string | null;

  // The poster always travels with the video it belongs to, so a thumbnail from
  // the previous video can never be left stranded on the card.
  const update = { video_url: payload.videoUrl, thumbnail_url: payload.thumbnailUrl };

  const { data, error } = await admin.from("exercises").update(update).eq("id", exerciseId).select().single();
  if (error) throw new HttpError(500, error.message);

  if (payload.addToLibrary) {
    await insertVideoRow(ctx, { ...payload, name: payload.name || String(exercise.name || "Exercise video") });
  }

  if (previousVideoUrl && previousVideoUrl !== payload.videoUrl) await removeVideoAssetIfOrphan(previousVideoUrl);
  if (previousThumbnailUrl && previousThumbnailUrl !== payload.thumbnailUrl) await removeVideoAssetIfOrphan(previousThumbnailUrl);

  return json(data);
}

async function deleteExerciseVideo(ctx: AuthCtx, exerciseId: string) {
  const exercise = await requireWritableExercise(ctx, exerciseId);

  const { data, error } = await admin
    .from("exercises")
    .update({ video_url: null, thumbnail_url: null })
    .eq("id", exerciseId)
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);

  await removeVideoAssetIfOrphan(exercise.video_url as string | null);
  await removeVideoAssetIfOrphan(exercise.thumbnail_url as string | null);

  return json(data);
}

// ---------- clinics / dashboard ----------

async function createClinic(ctx: AuthCtx, body: Record<string, unknown>) {
  const { name, phone, address, city } = body as Record<string, string>;
  if (!name) bad("Clinic name is required");
  const { data, error } = await admin.from("clinics").insert({ name, phone, address, city, created_by: ctx.userId }).select().single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function getClinic(id: string) {
  const { data } = await admin.from("clinics").select("*").eq("id", id).maybeSingle();
  if (!data) return notFound("Clinic not found");
  return json(data);
}

async function patientStats(ctx: AuthCtx) {
  const { data: user } = await admin.from("users").select("email").eq("id", ctx.userId).single();
  const { data: patient } = await admin.from("patients").select("id").eq("email", user?.email).maybeSingle();

  if (!patient) return json({ programs: [], appointments: [], adherence: 0, streak: 0 });

  const [{ data: assignments }, { data: upcoming }, { data: logs }] = await Promise.all([
    admin.from("program_assignments").select("*").eq("patient_id", patient.id).eq("status", "Active").order("created_at", { ascending: false }).limit(5),
    admin
      .from("appointments")
      .select("*, therapist:therapists(*, users!therapists_userId_fkey(fullName))")
      .eq("patient_id", patient.id)
      .gte("date", new Date().toISOString().slice(0, 10))
      .order("date", { ascending: true })
      .limit(3),
    admin.from("exercise_logs").select("*").eq("patient_id", patient.id).order("session_date", { ascending: false }),
  ]);

  const programsWithNames = await Promise.all(
    (assignments ?? []).map(async (asg: Record<string, any>) => {
      const { data: prog } = await admin.from("exercise_programs").select("name, expected_duration").eq("id", asg.program_id).maybeSingle();
      return { ...asg, program_name: prog?.name || "Recovery Program", expected_duration: prog?.expected_duration };
    }),
  );

  const totalCompletion = (logs ?? []).reduce((sum: number, l: Record<string, any>) => sum + (l.completion_percentage || 0), 0);
  const adherence = logs?.length ? Math.round(totalCompletion / logs.length) : 0;

  let streak = 0;
  if (logs?.length) {
    const uniqueDates = [...new Set(logs.map((l: Record<string, any>) => new Date(l.session_date).toISOString().split("T")[0]))].sort().reverse();
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    for (const d of uniqueDates) {
      const date = new Date(d as string);
      date.setHours(0, 0, 0, 0);
      const diffDays = Math.round(Math.abs((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)));
      if (diffDays === streak) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (diffDays > streak) break;
    }
  }

  return json({ programs: programsWithNames, appointments: upcoming ?? [], adherence, streak, lastPainReduction: 2 });
}

async function adminStats(ctx: AuthCtx) {
  const today = new Date().toISOString().slice(0, 10);
  const since = new Date(Date.now() - 30 * 86400000).toISOString();
  const [patients, therapists, programs, appts, exercises, assignments, logs] = await Promise.all([
    admin.from("patients").select("id", { count: "exact", head: true }).eq("clinic_id", ctx.clinicId),
    admin.from("therapists").select("id", { count: "exact", head: true }).eq("clinic_id", ctx.clinicId),
    admin.from("exercise_programs").select("id", { count: "exact", head: true }).eq("clinic_id", ctx.clinicId).eq("status", "Active"),
    admin.from("appointments").select("id", { count: "exact", head: true }).eq("clinic_id", ctx.clinicId).eq("date", today),
    admin.from("exercises").select("id", { count: "exact", head: true }).eq("clinic_id", ctx.clinicId),
    admin.from("program_assignments").select("id", { count: "exact", head: true }).eq("clinic_id", ctx.clinicId).eq("status", "Active"),
    admin.from("exercise_logs").select("completion_percentage").eq("clinic_id", ctx.clinicId).gte("session_date", since),
  ]);

  // Real clinic-wide adherence: average session completion over the last 30 days.
  const logRows = logs.data ?? [];
  const adherence = logRows.length
    ? Math.round(logRows.reduce((s: number, l: Record<string, any>) => s + (l.completion_percentage || 0), 0) / logRows.length)
    : 0;

  return json({
    patients: patients.count ?? 0,
    therapists: therapists.count ?? 0,
    programs: programs.count ?? 0,
    appointments: appts.count ?? 0,
    exercises: exercises.count ?? 0,
    assignedPrograms: assignments.count ?? 0,
    adherence,
  });
}

// ---------- billing ----------

async function listInvoices(ctx: AuthCtx) {
  requireClinician(ctx);
  const { data } = await admin.from("invoices").select("*, patients(name)").eq("clinic_id", ctx.clinicId).order("invoiceDate", { ascending: false });
  return json(data ?? []);
}

async function getInvoice(ctx: AuthCtx, id: string) {
  requireClinician(ctx);
  const { data } = await admin.from("invoices").select("*, patients(name), payments(*)").eq("id", id).eq("clinic_id", ctx.clinicId).maybeSingle();
  if (!data) return notFound("Invoice not found");
  return json(data);
}

async function createInvoice(ctx: AuthCtx, body: Record<string, unknown>) {
  requireClinician(ctx);
  const { patientId, therapistId, invoiceDate, dueDate, totalAmount, packageType } = body as Record<string, string>;
  const invoiceNumber = `INV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const { data, error } = await admin
    .from("invoices")
    .insert({
      invoiceNumber,
      patientId,
      therapistId,
      invoiceDate,
      dueDate,
      totalAmount: parseInt(totalAmount as unknown as string),
      packageType,
      clinic_id: ctx.clinicId,
    })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function updateInvoice(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  requireClinician(ctx);
  const data = { ...body } as Record<string, unknown>;
  if (data.totalAmount !== undefined) data.totalAmount = parseInt(data.totalAmount as string);
  if (data.amountPaid !== undefined) data.amountPaid = parseInt(data.amountPaid as string);

  const { data: updated, error } = await admin.from("invoices").update(data).eq("id", id).eq("clinic_id", ctx.clinicId).select().maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!updated) return notFound("Invoice not found");
  return json(updated);
}

async function deleteInvoice(ctx: AuthCtx, id: string) {
  requireClinician(ctx);
  await admin.from("invoices").delete().eq("id", id).eq("clinic_id", ctx.clinicId);
  return json({ message: "Invoice deleted" });
}

async function listPayments(ctx: AuthCtx) {
  requireClinician(ctx);
  const { data } = await admin
    .from("payments")
    .select("*, invoices!inner(invoiceNumber, clinic_id), patients(name)")
    .eq("invoices.clinic_id", ctx.clinicId)
    .order("paymentDate", { ascending: false });
  return json(data ?? []);
}

async function createPayment(ctx: AuthCtx, body: Record<string, unknown>) {
  requireClinician(ctx);
  const { invoiceId, patientId, paymentAmount, paymentDate, paymentMethod, referenceNumber, notes } = body as Record<string, string>;
  const { data: invoice } = await admin.from("invoices").select("id").eq("id", invoiceId).eq("clinic_id", ctx.clinicId).maybeSingle();
  if (!invoice) return err(403, "Access denied to invoice");

  const { data, error } = await admin
    .from("payments")
    .insert({ invoiceId, patientId, paymentAmount: parseInt(paymentAmount as unknown as string), paymentDate, paymentMethod, referenceNumber, notes })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function listPatientPackages(ctx: AuthCtx) {
  requireClinician(ctx);
  const { data } = await admin
    .from("patient_packages")
    .select("*, patients!inner(name, clinic_id)")
    .eq("patients.clinic_id", ctx.clinicId)
    .order("created_at", { ascending: false });
  return json(data ?? []);
}

async function createPatientPackage(ctx: AuthCtx, body: Record<string, unknown>) {
  requireClinician(ctx);
  const { patientId, packageId, totalSessions, expiryDate } = body as Record<string, string>;
  const { data: patient } = await admin.from("patients").select("id").eq("id", patientId).eq("clinic_id", ctx.clinicId).maybeSingle();
  if (!patient) return err(403, "Access denied to patient");

  const { data, error } = await admin
    .from("patient_packages")
    .insert({ patientId, packageId, totalSessions: parseInt(totalSessions as unknown as string), expiryDate: expiryDate || null, status: "Active" })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

// ---------- subscriptions (Physiome charging its customers) ----------

// Public: the pricing page has to render before anyone logs in. Only plans an
// operator has explicitly published are returned, so the placeholder prices
// the catalogue ships with are never shown to a buyer.
async function listPublicPlans(url: URL) {
  const audience = url.searchParams.get("audience");
  let query = admin
    .from("subscription_plans")
    .select("code, name_id, name_en, description_id, description_en, audience, price_idr, period_months, period_days, max_therapists, max_active_patients, features")
    .eq("is_public", true)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (audience) query = query.eq("audience", audience);

  const { data, error } = await query;
  if (error) throw new HttpError(500, error.message);
  return json(data ?? []);
}

async function getMySubscription(ctx: AuthCtx) {
  const entitlement = await getEntitlement(ctx);
  const usage = await countPlanUsage(ctx);
  return json({ ...entitlement, usage });
}

// Usage is reported next to the plan limits so the billing page can show
// "3 of 5 therapists" without a second round trip.
async function countPlanUsage(ctx: AuthCtx): Promise<{ therapists: number; activePatients: number }> {
  if (!ctx.clinicId) return { therapists: 0, activePatients: 0 };

  const [{ count: therapists }, { count: activePatients }] = await Promise.all([
    admin
      .from("therapists")
      .select("id", { count: "exact", head: true })
      .eq("clinic_id", ctx.clinicId)
      .eq("status", "Active"),
    admin
      .from("patients")
      .select("id", { count: "exact", head: true })
      .eq("clinic_id", ctx.clinicId)
      .eq("status", "Active"),
  ]);

  return { therapists: therapists ?? 0, activePatients: activePatients ?? 0 };
}

async function listMyTransactions(ctx: AuthCtx) {
  const query = admin
    .from("payment_transactions")
    .select("order_id, plan_code, gross_amount, status, payment_type, settlement_time, created_at, snap_redirect_url, expires_at")
    .order("created_at", { ascending: false })
    .limit(50);

  // A patient only ever sees their own orders. Note a B2C patient's clinic_id
  // is the house clinic, so scoping them by clinic would show them every other
  // B2C patient's payments.
  const scoped = ctx.role === "patient" || !ctx.clinicId
    ? query.eq("user_id", ctx.userId)
    : query.eq("clinic_id", ctx.clinicId);

  const { data, error } = await scoped;
  if (error) throw new HttpError(500, error.message);
  return json(data ?? []);
}

// ---------- language preferences ----------

async function getLanguagePreference(ctx: AuthCtx, userId: string) {
  if (ctx.userId !== userId && ctx.role !== "admin") return err(403, "Forbidden");

  let { data: pref } = await admin.from("user_language_preferences").select("*").eq("userId", userId).maybeSingle();
  if (!pref) {
    const { data } = await admin
      .from("user_language_preferences")
      .insert({ userId, preferred_language: "en", app_language: "en", exercise_language: "en", reminder_language: "en" })
      .select()
      .single();
    pref = data;
  }
  return json(pref);
}

async function createLanguagePreference(ctx: AuthCtx, body: Record<string, unknown>) {
  const { userId, user_id, preferred_language, app_language, exercise_language, reminder_language } = body as Record<string, string>;
  const targetId = userId || user_id;
  if (ctx.userId !== targetId && ctx.role !== "admin") return err(403, "Forbidden: Anda hanya dapat membuat preferensi bahasa untuk diri sendiri.");

  const { data, error } = await admin
    .from("user_language_preferences")
    .insert({ userId: targetId, preferred_language, app_language, exercise_language, reminder_language })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function updateLanguagePreference(ctx: AuthCtx, userId: string, body: Record<string, unknown>) {
  if (ctx.userId !== userId && ctx.role !== "admin") return err(403, "Forbidden: Anda hanya dapat memperbarui preferensi bahasa Anda sendiri.");

  const { data: existing } = await admin.from("user_language_preferences").select("*").eq("userId", userId).maybeSingle();
  if (!existing) return notFound("Preferensi bahasa tidak ditemukan.");

  const { data, error } = await admin.from("user_language_preferences").update(body).eq("userId", userId).select().single();
  if (error) throw new HttpError(500, error.message);
  return json(data);
}

// ---------- super admin ----------

async function superAdminListClinics(ctx: AuthCtx) {
  requireSuperAdmin(ctx);
  const { data: clinics } = await admin.from("clinics").select("*");
  const clinicIds = (clinics ?? []).map((c: Record<string, any>) => c.id);

  const { data: subs } = await admin.from("clinic_subscriptions").select("*").in("clinic_id", clinicIds.length ? clinicIds : ["00000000-0000-0000-0000-000000000000"]);
  const { data: admins } = await admin.from("users").select("id, email, fullName, clinic_id").eq("role", "admin").in("clinic_id", clinicIds.length ? clinicIds : ["00000000-0000-0000-0000-000000000000"]);

  const result = (clinics ?? []).map((c: Record<string, any>) => ({
    ...c,
    subscription: (subs ?? []).find((s: Record<string, any>) => s.clinic_id === c.id) || null,
    admins: (admins ?? []).filter((a: Record<string, any>) => a.clinic_id === c.id),
  }));
  return json(result);
}

async function superAdminSubscribe(ctx: AuthCtx, clinicId: string, body: Record<string, unknown>) {
  requireSuperAdmin(ctx);
  const { plan = "basic", payment_method = "manual" } = body as Record<string, string>;

  const { data: existing } = await admin.from("clinic_subscriptions").select("id").eq("clinic_id", clinicId).maybeSingle();
  let result;
  if (existing) {
    const { data } = await admin
      .from("clinic_subscriptions")
      .update({ status: "active", plan, payment_method, started_at: new Date().toISOString(), ended_at: null })
      .eq("id", existing.id)
      .select()
      .single();
    result = data;
  } else {
    const { data } = await admin
      .from("clinic_subscriptions")
      .insert({ clinic_id: clinicId, status: "active", plan, payment_method, started_at: new Date().toISOString() })
      .select()
      .single();
    result = data;
  }
  return json(result);
}

async function superAdminCancel(ctx: AuthCtx, clinicId: string) {
  requireSuperAdmin(ctx);
  // `count` is only populated when the option is requested explicitly;
  // without it this always reported 0 rows updated even on success.
  const { error, count } = await admin
    .from("clinic_subscriptions")
    .update({ status: "cancelled", ended_at: new Date().toISOString() }, { count: "exact" })
    .eq("clinic_id", clinicId);
  if (error) throw new HttpError(500, error.message);
  return json({ success: true, updated: count ?? 0 });
}

async function superAdminGetPaymentSettings(ctx: AuthCtx) {
  requireSuperAdmin(ctx);
  const { data } = await admin.from("billing_settings").select("*").order("id", { ascending: true });
  return json(data ?? []);
}

async function superAdminSavePaymentSettings(ctx: AuthCtx, body: Record<string, unknown>) {
  requireSuperAdmin(ctx);
  const { id, bank_name, account_name, account_number, transfer_instructions } = body as Record<string, unknown>;

  let result;
  if (id) {
    const { data } = await admin
      .from("billing_settings")
      .update({ bank_name, account_name, account_number, transfer_instructions, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .maybeSingle();
    result = data ??
      (await admin
        .from("billing_settings")
        .insert({ bank_name, account_name, account_number, transfer_instructions, updated_at: new Date().toISOString() })
        .select()
        .single()).data;
  } else {
    const { data } = await admin
      .from("billing_settings")
      .insert({ bank_name, account_name, account_number, transfer_instructions, updated_at: new Date().toISOString() })
      .select()
      .single();
    result = data;
  }
  return json(result);
}

async function superAdminCreateClinic(ctx: AuthCtx, body: Record<string, unknown>) {
  requireSuperAdmin(ctx);
  const { name, phone, address, city } = body as Record<string, string>;
  if (!name) bad("Clinic name is required");
  const { data, error } = await admin.from("clinics").insert({ name, phone, address, city }).select().single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function superAdminUpdateClinic(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  requireSuperAdmin(ctx);
  const { name, phone, address, city } = body as Record<string, unknown>;
  const { data, error } = await admin
    .from("clinics")
    .update({ ...(name !== undefined && { name }), ...(phone !== undefined && { phone }), ...(address !== undefined && { address }), ...(city !== undefined && { city }), updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data);
}

async function superAdminDeleteClinic(ctx: AuthCtx, id: string) {
  requireSuperAdmin(ctx);
  const { error } = await admin.from("clinics").delete().eq("id", id);
  if (error) {
    if (error.code === "23503") {
      return err(409, "Cannot delete this clinic while it still has admins, therapists, or patients assigned to it. Remove or reassign them first.");
    }
    throw new HttpError(500, error.message);
  }
  return json({ success: true, message: "Clinic deleted" });
}

async function superAdminListUsers(ctx: AuthCtx) {
  requireSuperAdmin(ctx);
  const { data } = await admin.from("users").select("id, email, fullName, role, clinic_id, phone, created_at, updated_at");
  return json(data ?? []);
}

const SUPPORTED_ROLES = ["admin", "therapist", "patient", "super_admin"];

async function superAdminCreateUser(ctx: AuthCtx, body: Record<string, unknown>) {
  requireSuperAdmin(ctx);
  const { email, password, fullName, role, clinic_id, phone } = body as Record<string, string>;
  if (!email || !password || !fullName || !role) bad("Email, password, fullName, and role are required");
  if (!SUPPORTED_ROLES.includes(role)) bad("Invalid role");
  if (role === "super_admin") bad("Only one super_admin account is allowed");
  if (!clinic_id) bad("Clinic is required for admin, therapist, and patient roles");

  const { data: existing } = await admin.from("users").select("id").eq("email", email).maybeSingle();
  if (existing) return err(400, "User already exists");

  const { data: created, error: createError } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (createError || !created?.user) throw new HttpError(500, createError?.message || "Failed to create account");

  const { data: user, error } = await admin
    .from("users")
    .insert({ id: created.user.id, email, fullName, role, clinic_id, phone: phone || null })
    .select()
    .single();
  if (error) {
    await admin.auth.admin.deleteUser(created.user.id);
    throw new HttpError(500, error.message);
  }

  return json({ id: user.id, email: user.email, fullName: user.fullName, role: user.role, clinic_id: user.clinic_id, phone: user.phone }, 201);
}

async function superAdminUpdateUser(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  requireSuperAdmin(ctx);
  const { email, fullName, role, clinic_id, phone } = body as Record<string, string>;
  if (role && !SUPPORTED_ROLES.includes(role)) bad("Invalid role");

  const { data: target } = await admin.from("users").select("role").eq("id", id).maybeSingle();
  if (!target) return notFound("User not found");
  if (target.role === "super_admin" && role && role !== "super_admin") bad("Cannot change the super_admin account's role");
  if (role === "super_admin" && target.role !== "super_admin") bad("Only one super_admin account is allowed");
  if (role && role !== "super_admin" && !clinic_id) bad("Clinic is required for admin, therapist, and patient roles");

  const normalizedClinicId = clinic_id === "" ? null : clinic_id;
  const { data: user, error } = await admin
    .from("users")
    .update({
      ...(email !== undefined && { email }),
      ...(fullName !== undefined && { fullName }),
      ...(role !== undefined && { role }),
      ...(clinic_id !== undefined && { clinic_id: normalizedClinicId }),
      ...(phone !== undefined && { phone }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  if (email) await admin.auth.admin.updateUserById(id, { email }).catch(() => {});

  return json({ id: user.id, email: user.email, fullName: user.fullName, role: user.role, clinic_id: user.clinic_id, phone: user.phone });
}

async function superAdminDeleteUser(ctx: AuthCtx, id: string) {
  requireSuperAdmin(ctx);
  const { data: target } = await admin.from("users").select("role").eq("id", id).maybeSingle();
  if (target?.role === "super_admin") return err(400, "Cannot delete the super_admin account");

  const { error } = await admin.from("users").delete().eq("id", id);
  if (error) {
    if (error.code === "23503") {
      return err(409, "Cannot delete this user because other records (e.g. a clinic, exercises, or SOAP notes) still reference them. Remove those first.");
    }
    throw new HttpError(500, error.message);
  }
  await admin.auth.admin.deleteUser(id).catch(() => {});
  return json({ success: true, message: "User deleted" });
}

// ---------- messages (secure clinician <-> patient chat) ----------

// A "thread" is one patient. Every clinician in the patient's clinic shares
// that thread. All access flows through this function (service role), so we
// enforce ownership here rather than via RLS.

// Matching on `userId` first matters: email is not unique across clinics, so
// the old email-only lookup could hand a patient the chart of a same-email
// patient in a different clinic. The email fallback stays for legacy rows
// created before `patients.userId` was populated.
async function resolvePatientForUser(ctx: AuthCtx): Promise<{ id: string } | null> {
  const { data: byUserId } = await admin
    .from("patients")
    .select("id")
    .eq("userId", ctx.userId)
    .maybeSingle();
  if (byUserId) return byUserId;

  const { data: user } = await admin.from("users").select("email").eq("id", ctx.userId).single();
  if (!user?.email) return null;

  const { data: patient } = await admin
    .from("patients")
    .select("id")
    .eq("email", user.email)
    .eq("clinic_id", ctx.clinicId)
    .maybeSingle();
  return patient ?? null;
}

// ---------- push notifications (chat) ----------

async function subscribePush(ctx: AuthCtx, body: Record<string, unknown>) {
  const { endpoint, keys } = body as { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
  if (!endpoint || !keys?.p256dh || !keys?.auth) bad("Invalid push subscription");

  const { error } = await admin
    .from("push_subscriptions")
    .upsert({ user_id: ctx.userId, endpoint, p256dh: keys.p256dh, auth: keys.auth }, { onConflict: "endpoint" });
  if (error) throw new HttpError(500, error.message);
  return json({ success: true });
}

async function unsubscribePush(ctx: AuthCtx, body: Record<string, unknown>) {
  const { endpoint } = body as Record<string, string>;
  if (!endpoint) bad("endpoint is required");
  await admin.from("push_subscriptions").delete().eq("user_id", ctx.userId).eq("endpoint", endpoint);
  return json({ success: true });
}

// Given who just sent a chat message, resolve who should be notified: the
// other side of the (shared, per-patient) thread.
async function resolveMessageRecipients(senderRole: string, patientId: string, clinicId: string | null): Promise<string[]> {
  if (senderRole === "patient") {
    if (!clinicId) return [];
    const { data } = await admin.from("users").select("id").eq("clinic_id", clinicId).in("role", ["admin", "therapist"]);
    return (data ?? []).map((u: Record<string, any>) => u.id);
  }
  const { data: patient } = await admin.from("patients").select("email").eq("id", patientId).maybeSingle();
  if (!patient?.email) return [];
  const { data: user } = await admin.from("users").select("id").eq("email", patient.email).eq("role", "patient").maybeSingle();
  return user ? [user.id] : [];
}

async function sendChatPushNotification(userIds: string[], payload: Record<string, unknown>) {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY || userIds.length === 0) return;

  const { data: subs } = await admin.from("push_subscriptions").select("*").in("user_id", userIds);
  if (!subs?.length) return;

  await Promise.all(
    subs.map(async (sub: Record<string, any>) => {
      const subscription = { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } };
      try {
        await webpush.sendNotification(subscription, JSON.stringify(payload));
      } catch (e: any) {
        if (e?.statusCode === 404 || e?.statusCode === 410) {
          await admin.from("push_subscriptions").delete().eq("id", sub.id);
        } else {
          console.error("push send error", e?.message || e);
        }
      }
    }),
  );
}

async function listMessages(ctx: AuthCtx, url: URL) {
  let patientId = url.searchParams.get("patient_id") || "";

  if (ctx.role === "patient") {
    const patient = await resolvePatientForUser(ctx);
    if (!patient) return notFound("Patient profile not found");
    patientId = patient.id;
  } else {
    if (!patientId) bad("patient_id is required");
    const { data: patient } = await admin.from("patients").select("id").eq("id", patientId).eq("clinic_id", ctx.clinicId).maybeSingle();
    if (!patient) return err(403, "Access denied to patient");
  }

  const { data } = await admin.from("messages").select("*").eq("patient_id", patientId).order("created_at", { ascending: true });

  // Mark the other party's messages as read now that they've been fetched.
  // A patient reads clinician messages; a clinician reads patient messages.
  const readAt = new Date().toISOString();
  const markQuery = admin.from("messages").update({ read_at: readAt }).eq("patient_id", patientId).is("read_at", null);
  await (ctx.role === "patient" ? markQuery.neq("sender_role", "patient") : markQuery.eq("sender_role", "patient"));

  return json(data ?? []);
}

async function createMessage(ctx: AuthCtx, body: Record<string, unknown>) {
  const { body: text } = body as Record<string, string>;
  if (!text || !text.trim()) bad("Message body is required");

  let patientId = (body as Record<string, string>).patient_id || "";
  let clinicId = ctx.clinicId;

  if (ctx.role === "patient") {
    const patient = await resolvePatientForUser(ctx);
    if (!patient) return notFound("Patient profile not found");
    patientId = patient.id;
  } else {
    if (!patientId) bad("patient_id is required");
    const { data: patient } = await admin.from("patients").select("id, clinic_id").eq("id", patientId).eq("clinic_id", ctx.clinicId).maybeSingle();
    if (!patient) return err(403, "Access denied to patient");
    clinicId = patient.clinic_id;
  }

  const senderRole = ctx.role === "patient" ? "patient" : "clinician";
  const { data, error } = await admin
    .from("messages")
    .insert({ patient_id: patientId, clinic_id: clinicId, sender_id: ctx.userId, sender_role: senderRole, body: text.trim() })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);

  // Awaited (not fire-and-forget): the edge runtime can freeze/terminate the
  // isolate once the response is returned, so a detached promise here could
  // simply never run to completion.
  try {
    const recipients = await resolveMessageRecipients(senderRole, patientId, clinicId);
    await sendChatPushNotification(recipients, {
      title: senderRole === "patient" ? "Pesan baru dari pasien" : "Pesan baru dari terapis Anda",
      body: text.trim().slice(0, 120),
      url: senderRole === "patient" ? `/messages?patient_id=${patientId}` : "/patient/messages",
    });
  } catch (e) {
    console.error("chat push notification failed", e);
  }

  return json(data, 201);
}

// Thread list. Clinicians get one row per patient that has messages (with the
// last message + how many unread from the patient). Patients get a single-row
// summary of their own thread.
async function listMessageThreads(ctx: AuthCtx) {
  if (ctx.role === "patient") {
    const patient = await resolvePatientForUser(ctx);
    if (!patient) return json([]);
    const { data: msgs } = await admin.from("messages").select("*").eq("patient_id", patient.id).order("created_at", { ascending: false });
    const last = (msgs ?? [])[0] ?? null;
    const unread = (msgs ?? []).filter((m: Record<string, any>) => m.sender_role !== "patient" && !m.read_at).length;
    return json(last ? [{ patient_id: patient.id, last_message: last.body, last_at: last.created_at, unread }] : []);
  }

  const { data: msgs } = await admin
    .from("messages")
    .select("patient_id, body, sender_role, read_at, created_at, patients!inner(name, clinic_id)")
    .eq("patients.clinic_id", ctx.clinicId)
    .order("created_at", { ascending: false });

  const byPatient = new Map<string, Record<string, any>>();
  (msgs ?? []).forEach((m: Record<string, any>) => {
    const existing = byPatient.get(m.patient_id);
    if (!existing) {
      byPatient.set(m.patient_id, {
        patient_id: m.patient_id,
        name: m.patients?.name || "Patient",
        last_message: m.body,
        last_at: m.created_at,
        unread: 0,
      });
    }
    const row = byPatient.get(m.patient_id)!;
    if (m.sender_role === "patient" && !m.read_at) row.unread += 1;
  });

  return json([...byPatient.values()].sort((a, b) => new Date(b.last_at).getTime() - new Date(a.last_at).getTime()));
}

// ---------- PROMs (patient-reported outcome measures) ----------

// Scoring is computed client-side from the instrument definition; we store the
// answers plus the resulting score/interpretation so clinicians can trend them.
async function listPromResponses(ctx: AuthCtx, url: URL) {
  if (ctx.role === "patient") {
    const patient = await resolvePatientForUser(ctx);
    if (!patient) return json([]);
    const { data } = await admin.from("prom_responses").select("*").eq("patient_id", patient.id).order("created_at", { ascending: false });
    return json(data ?? []);
  }
  let query = admin.from("prom_responses").select("*").eq("clinic_id", ctx.clinicId);
  const patientId = url.searchParams.get("patient_id");
  if (patientId) query = query.eq("patient_id", patientId);
  const { data } = await query.order("created_at", { ascending: false });
  return json(data ?? []);
}

async function createPromResponse(ctx: AuthCtx, body: Record<string, unknown>) {
  const { instrument, score, max_score, interpretation, answers } = body as Record<string, unknown>;
  if (!instrument) bad("instrument is required");

  let patientId = (body as Record<string, string>).patient_id;
  let clinicId = ctx.clinicId;
  if (ctx.role === "patient") {
    const patient = await resolvePatientForUser(ctx);
    if (!patient) return notFound("Patient profile not found");
    patientId = patient.id;
  } else {
    if (!patientId) bad("patient_id is required");
    const { data: p } = await admin.from("patients").select("id, clinic_id").eq("id", patientId).eq("clinic_id", ctx.clinicId).maybeSingle();
    if (!p) return err(403, "Access denied to patient");
    clinicId = p.clinic_id;
  }

  const { data, error } = await admin
    .from("prom_responses")
    .insert({
      patient_id: patientId,
      clinic_id: clinicId,
      instrument: String(instrument),
      score: score != null ? Number(score) : null,
      max_score: max_score != null ? Number(max_score) : null,
      interpretation: interpretation != null ? String(interpretation) : null,
      answers: answers ?? null,
    })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

// ---------- router ----------

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  const url = new URL(req.url);
  let path = url.pathname.replace(/^\/functions\/v1\/api/, "").replace(/^\/api/, "");
  if (!path) path = "/";
  const method = req.method;
  const segments = path.split("/").filter(Boolean);

  const body = async () => {
    try {
      return await req.clone().json();
    } catch {
      return {};
    }
  };

  try {
    // Public routes
    if (path === "/health" && method === "GET") return json({ status: "ok" });
    if (path === "/auth/register" && method === "POST") return await authRegister(await body());
    if (path === "/auth/login" && method === "POST") return await authLogin(await body());
    if (path === "/auth/forgot-password" && method === "POST") return await authForgotPassword(await body());
    if (path === "/auth/reset-password" && method === "POST") return await authResetPassword(await body());
    // Public: the pricing page renders before login.
    if (path === "/subscription/plans" && method === "GET") return await listPublicPlans(url);

    // Everything below requires auth
    const ctx = await requireAuth(req);

    if (path === "/auth/me" && method === "GET") return await authMe(ctx);
    if (path === "/auth/update-profile" && method === "PATCH") return await authUpdateProfile(ctx, await body());

    if (segments[0] === "clinics") {
      if (method === "POST" && segments.length === 1) return await createClinic(ctx, await body());
      if (method === "GET" && segments.length === 2) return await getClinic(segments[1]);
    }

    if (segments[0] === "dashboard") {
      if (segments[1] === "patient-stats" && method === "GET") return await patientStats(ctx);
      if (segments[1] === "admin-stats" && method === "GET") return await adminStats(ctx);
      if (segments[1] === "rtm" && method === "GET") return await rtmDashboard(ctx);
    }

    if (segments[0] === "patients") {
      if (method === "GET" && segments.length === 1) return await listPatients(ctx);
      if (method === "GET" && segments.length === 2) return await getPatient(ctx, segments[1]);
      if (method === "POST" && segments.length === 1) return await createPatient(ctx, await body());
      if (method === "PUT" && segments.length === 2) return await updatePatient(ctx, segments[1], await body());
      if (method === "DELETE" && segments.length === 2) return await deletePatient(ctx, segments[1]);
    }

    if (segments[0] === "therapists") {
      if (method === "GET" && segments.length === 1) return await listTherapists(ctx);
      if (method === "GET" && segments.length === 2) return await getTherapist(ctx, segments[1]);
      if (method === "POST" && segments.length === 1) return await createTherapist(ctx, await body());
      if (method === "PUT" && segments.length === 2) return await updateTherapist(ctx, segments[1], await body());
      if (method === "DELETE" && segments.length === 2) return await deleteTherapist(ctx, segments[1]);
    }

    if (segments[0] === "appointments") {
      if (method === "GET" && segments.length === 1) return await listAppointments(ctx, url.searchParams);
      if (method === "GET" && segments.length === 2) return await getAppointment(ctx, segments[1]);
      if (method === "POST" && segments.length === 1) return await createAppointment(ctx, await body());
      if (method === "PUT" && segments.length === 2) return await updateAppointment(ctx, segments[1], await body());
      if (method === "DELETE" && segments.length === 2) return await deleteAppointment(ctx, segments[1]);
    }

    if (segments[0] === "exercises") {
      // /exercises/:id/video - upload a file (multipart) or link a URL (JSON)
      // and attach it to the exercise in a single call.
      if (segments.length === 3 && segments[2] === "video") {
        if (method === "POST" || method === "PUT") return await setExerciseVideo(ctx, segments[1], req);
        if (method === "DELETE") return await deleteExerciseVideo(ctx, segments[1]);
      }
      if (method === "GET" && segments.length === 1) return await listExercises(ctx);
      if (method === "GET" && segments.length === 2) return await getExercise(ctx, segments[1]);
      if (method === "POST" && segments.length === 1) return await createExercise(ctx, await body());
      if (method === "PUT" && segments.length === 2) return await updateExercise(ctx, segments[1], await body());
      if (method === "DELETE" && segments.length === 2) return await deleteExercise(ctx, segments[1]);
    }

    if (segments[0] === "exercise-programs") {
      if (segments[1] === "templates" && method === "GET") return await listProgramTemplates();
      if (method === "GET" && segments.length === 1) return await listExercisePrograms(ctx);
      if (method === "POST" && segments.length === 1) return await createExerciseProgram(ctx, await body());
      if (method === "GET" && segments.length === 2) return await getExerciseProgram(ctx, segments[1]);
      if (method === "PUT" && segments.length === 2) return await updateExerciseProgram(ctx, segments[1], await body());
      if (method === "DELETE" && segments.length === 2) return await deleteExerciseProgram(ctx, segments[1]);
    }

    if (segments[0] === "program-assignments") {
      if (segments[1] === "my-exercises" && method === "GET") return await myExercises(ctx);
      if (method === "GET" && segments.length === 1) return await listProgramAssignments(ctx, url);
      if (method === "GET" && segments.length === 2) return await getProgramAssignment(ctx, segments[1]);
      if (method === "POST" && segments.length === 1) return await createProgramAssignment(ctx, await body());
    }

    if (segments[0] === "soap-notes") {
      if (segments[1] === "patient" && method === "GET") return await listSoapNotes(ctx, segments[2]);
      if (method === "POST" && segments.length === 1) return await createSoapNote(ctx, await body());
      if (method === "PUT" && segments.length === 2) return await updateSoapNote(ctx, segments[1], await body());
      if (method === "DELETE" && segments.length === 2) return await deleteSoapNote(ctx, segments[1]);
    }

    if (segments[0] === "soap-history") {
      if (method === "GET" && segments.length === 1) return await listSoapHistory(ctx, url);
      if (method === "POST" && segments.length === 1) return await createSoapHistory(ctx, await body());
      if (method === "DELETE" && segments.length === 2) return await deleteSoapHistory(ctx, segments[1]);
    }

    if (segments[0] === "categories") {
      if (method === "GET" && segments.length === 1) return await listCategories(ctx);
      if (method === "POST" && segments.length === 1) return await createCategory(ctx, await body());
      if (method === "PUT" && segments.length === 2) return await updateCategory(ctx, segments[1], await body());
      if (method === "DELETE" && segments.length === 2) return await deleteCategory(ctx, segments[1]);
    }

    if (segments[0] === "packages") {
      if (method === "GET" && segments.length === 1) return await listPackages(ctx);
      if (method === "POST" && segments.length === 1) return await createPackage(ctx, await body());
      if (method === "PUT" && segments.length === 2) return await updatePackage(ctx, segments[1], await body());
      if (method === "DELETE" && segments.length === 2) return await deletePackage(ctx, segments[1]);
    }

    if (segments[0] === "ai-generation-history") {
      if (method === "GET" && segments.length === 1) return await listAiGenerationHistory(ctx);
      if (method === "POST" && segments.length === 1) return await createAiGenerationHistory(ctx, await body());
      if (method === "DELETE" && segments.length === 1) return await clearAiGenerationHistory(ctx);
      if (method === "DELETE" && segments.length === 2) return await deleteAiGenerationHistory(ctx, segments[1]);
    }

    if (segments[0] === "invite-codes") {
      if (method === "GET" && segments.length === 1) return await listInviteCodes(ctx);
      if (method === "POST" && segments.length === 1) return await createInviteCode(ctx, await body());
      if (method === "PUT" && segments.length === 2) return await updateInviteCode(ctx, segments[1], await body());
      if (method === "DELETE" && segments.length === 2) return await deleteInviteCode(ctx, segments[1]);
    }

    if (segments[0] === "translation-status" && method === "GET") return await listTranslationStatus();

    if (segments[0] === "exercise-logs") {
      if (method === "GET" && segments.length === 1) return await listExerciseLogs(ctx, url);
      if (method === "POST" && segments.length === 1) return await createExerciseLog(ctx, await body());
    }

    if (segments[0] === "pain-logs") {
      if (method === "GET" && segments.length === 1) return await listPainLogs(ctx, url);
      if (method === "POST" && segments.length === 1) return await createPainLog(ctx, await body());
    }

    if (segments[0] === "messages") {
      if (segments[1] === "threads" && method === "GET") return await listMessageThreads(ctx);
      if (method === "GET" && segments.length === 1) return await listMessages(ctx, url);
      if (method === "POST" && segments.length === 1) return await createMessage(ctx, await body());
    }

    if (segments[0] === "push") {
      if (segments[1] === "subscribe" && method === "POST") return await subscribePush(ctx, await body());
      if (segments[1] === "unsubscribe" && method === "POST") return await unsubscribePush(ctx, await body());
    }

    if (segments[0] === "prom-responses") {
      if (method === "GET" && segments.length === 1) return await listPromResponses(ctx, url);
      if (method === "POST" && segments.length === 1) return await createPromResponse(ctx, await body());
    }

    if (segments[0] === "videos") {
      if (method === "GET" && segments.length === 1) return await listVideos(ctx);
      if (method === "POST" && segments.length === 1) return await createVideo(ctx, req);
      if (method === "DELETE" && segments.length === 2) return await deleteVideo(ctx, segments[1]);
    }

    if (segments[0] === "billing") {
      if (segments[1] === "invoices") {
        if (method === "GET" && segments.length === 2) return await listInvoices(ctx);
        if (method === "GET" && segments.length === 3) return await getInvoice(ctx, segments[2]);
        if (method === "POST" && segments.length === 2) return await createInvoice(ctx, await body());
        if (method === "PUT" && segments.length === 3) return await updateInvoice(ctx, segments[2], await body());
        if (method === "DELETE" && segments.length === 3) return await deleteInvoice(ctx, segments[2]);
      }
      if (segments[1] === "payments") {
        if (method === "GET" && segments.length === 2) return await listPayments(ctx);
        if (method === "POST" && segments.length === 2) return await createPayment(ctx, await body());
      }
      if (segments[1] === "patient-packages") {
        if (method === "GET" && segments.length === 2) return await listPatientPackages(ctx);
        if (method === "POST" && segments.length === 2) return await createPatientPackage(ctx, await body());
      }
    }

    if (segments[0] === "subscription") {
      if (segments[1] === "me" && method === "GET") return await getMySubscription(ctx);
      if (segments[1] === "transactions" && method === "GET" && segments.length === 2) return await listMyTransactions(ctx);
    }

    if (segments[0] === "user-preferences" && segments[1] === "language") {
      if (method === "GET" && segments.length === 3) return await getLanguagePreference(ctx, segments[2]);
      if (method === "POST" && segments.length === 2) return await createLanguagePreference(ctx, await body());
      if (method === "PUT" && segments.length === 3) return await updateLanguagePreference(ctx, segments[2], await body());
    }

    if (segments[0] === "super-admin") {
      if (segments[1] === "clinics") {
        if (method === "GET" && segments.length === 2) return await superAdminListClinics(ctx);
        if (method === "POST" && segments.length === 2) return await superAdminCreateClinic(ctx, await body());
        if (method === "PUT" && segments.length === 3) return await superAdminUpdateClinic(ctx, segments[2], await body());
        if (method === "DELETE" && segments.length === 3) return await superAdminDeleteClinic(ctx, segments[2]);
        if (segments[3] === "subscribe" && method === "POST") return await superAdminSubscribe(ctx, segments[2], await body());
        if (segments[3] === "cancel" && method === "POST") return await superAdminCancel(ctx, segments[2]);
      }
      if (segments[1] === "payment-settings") {
        if (method === "GET") return await superAdminGetPaymentSettings(ctx);
        if (method === "POST") return await superAdminSavePaymentSettings(ctx, await body());
      }
      if (segments[1] === "users") {
        if (method === "GET" && segments.length === 2) return await superAdminListUsers(ctx);
        if (method === "POST" && segments.length === 2) return await superAdminCreateUser(ctx, await body());
        if (method === "PUT" && segments.length === 3) return await superAdminUpdateUser(ctx, segments[2], await body());
        if (method === "DELETE" && segments.length === 3) return await superAdminDeleteUser(ctx, segments[2]);
      }
    }

    return err(404, `No route for ${method} ${path}`);
  } catch (e) {
    if (e instanceof HttpError) return err(e.status, e.message);
    console.error(e);
    return err(500, e instanceof Error ? e.message : "Internal server error");
  }
});
