// Supabase Edge Function: "api"
// Replaces the old Express + Prisma + MySQL backend (apps/api) entirely.
// All data access happens here with the service-role key; RLS on every
// table denies anon/authenticated access directly, so this function is the
// only door into the database (mirrors the old Express-only-access model).

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin: SupabaseClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

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

class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type AuthCtx = { userId: string; role: string; clinicId: string | null };

async function requireAuth(req: Request): Promise<AuthCtx> {
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.split(" ")[1];
  console.log(`DEBUG requireAuth: authHeader=${JSON.stringify(authHeader)}`);
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

// ---------- auth routes ----------

async function authRegister(body: Record<string, unknown>) {
  const {
    clinicName,
    fullName,
    email,
    password,
    inviteCode,
    packagePlan,
    paymentMethod,
  } = body as Record<string, string>;

  if (!email || !password || !fullName) bad("email, password, and fullName are required");

  const { data: existing } = await admin.from("users").select("id").eq("email", email).maybeSingle();
  if (existing) return err(400, "Email is already registered");

  let clinicId: string | null = null;
  let userRole = "admin";
  let inviteId: string | null = null;

  if (inviteCode) {
    const { data: codeData } = await admin
      .from("invite_codes")
      .select("*")
      .eq("code", inviteCode)
      .eq("is_active", true)
      .maybeSingle();

    if (!codeData || (codeData.expires_at && new Date() > new Date(codeData.expires_at))) {
      return err(400, "Invalid or expired invite code");
    }

    const { data: inviter } = await admin
      .from("users")
      .select("clinic_id")
      .eq("invite_code_id", codeData.id)
      .maybeSingle();

    clinicId = inviter?.clinic_id ?? null;
    userRole = codeData.role || "therapist";
    inviteId = codeData.id;
  } else {
    const { data: newClinic, error: clinicError } = await admin
      .from("clinics")
      .insert({ name: clinicName || `${fullName}'s Clinic` })
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

  if (!inviteCode) {
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

  const { data: signInData, error: signInError } = await admin.auth.signInWithPassword({ email, password });
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

  const { data: signInData, error: signInError } = await admin.auth.signInWithPassword({ email, password });
  if (signInError || !signInData?.session) return err(401, "Invalid email or password");

  const { data: user } = await admin
    .from("users")
    .select("id, fullName, role, clinic_id, therapists(id)")
    .eq("id", signInData.user.id)
    .single();

  if (!user) return err(401, "Invalid email or password");

  return json({
    message: "Login successful",
    token: signInData.session.access_token,
    refreshToken: signInData.session.refresh_token,
    user: {
      id: user.id,
      fullName: user.fullName,
      role: user.role,
      clinic_id: user.clinic_id,
      therapistId: user.therapists?.[0]?.id,
    },
  });
}

async function authMe(ctx: AuthCtx) {
  const { data: user } = await admin
    .from("users")
    .select("id, fullName, role, clinic_id, email, therapists(id)")
    .eq("id", ctx.userId)
    .single();
  if (!user) return notFound("User not found");
  return json({ ...user, therapistId: user.therapists?.[0]?.id, therapists: undefined });
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

async function listAppointments(ctx: AuthCtx) {
  const { data } = await admin
    .from("appointments")
    .select("*, patient:patients(id, name), therapist:therapists(id, users!therapists_userId_fkey(fullName))")
    .eq("clinic_id", ctx.clinicId)
    .order("date", { ascending: false });
  return json(data ?? []);
}

async function getAppointment(ctx: AuthCtx, id: string) {
  const { data } = await admin
    .from("appointments")
    .select("*, patient:patients(*), therapist:therapists(*, users!therapists_userId_fkey(fullName, email, phone))")
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
  const { data } = await admin
    .from("exercises")
    .select("*")
    .or(`clinic_id.eq.${ctx.clinicId},clinic_id.is.null`)
    .order("name", { ascending: true });
  return json(data ?? []);
}

async function getExercise(ctx: AuthCtx, id: string) {
  const { data } = await admin.from("exercises").select("*").eq("id", id).or(`clinic_id.eq.${ctx.clinicId},clinic_id.is.null`).maybeSingle();
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

async function updateExercise(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  if (Object.keys(body).length === 0) bad("No data provided for update");
  const { data: exercise } = await admin.from("exercises").select("clinic_id").eq("id", id).maybeSingle();
  if (!exercise) return notFound("Exercise not found");
  if (exercise.clinic_id !== ctx.clinicId) {
    return err(403, "You do not have permission to edit this exercise. Global templates cannot be modified.");
  }
  const { data, error } = await admin.from("exercises").update(body).eq("id", id).select().single();
  if (error) throw new HttpError(500, error.message);
  return json(data);
}

async function deleteExercise(ctx: AuthCtx, id: string) {
  await admin.from("exercises").delete().eq("id", id).eq("clinic_id", ctx.clinicId);
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
  const { name, description, exercises, status, clinical_goal, body_region, expected_duration } = body as Record<string, unknown>;
  const { data, error } = await admin
    .from("exercise_programs")
    .insert({ name, description, clinical_goal, body_region, expected_duration, exercises, status: status || "Active", clinic_id: ctx.clinicId, created_by: ctx.userId })
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
  const { data } = await admin.from("packages").select("*").eq("clinic_id", ctx.clinicId).order("created_at", { ascending: false });
  return json(data ?? []);
}

async function createPackage(ctx: AuthCtx, body: Record<string, unknown>) {
  const { data, error } = await admin.from("packages").insert({ ...body, clinic_id: ctx.clinicId }).select().single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function updatePackage(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  const { data, error } = await admin.from("packages").update(body).eq("id", id).eq("clinic_id", ctx.clinicId).select().maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!data) return notFound("Package not found");
  return json(data);
}

async function deletePackage(ctx: AuthCtx, id: string) {
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

async function listInviteCodes(ctx: AuthCtx) {
  requireAdmin(ctx);
  const { data } = await admin
    .from("invite_codes")
    .select("*, users!invite_codes_used_by_fkey(fullName, email)")
    .order("created_at", { ascending: false });
  return json(data ?? []);
}

async function createInviteCode(ctx: AuthCtx, body: Record<string, unknown>) {
  requireAdmin(ctx);
  const { code, role, expires_at } = body as Record<string, string>;
  const { data, error } = await admin
    .from("invite_codes")
    .insert({ code: code || crypto.randomUUID().slice(0, 8).toUpperCase(), role: role || "therapist", expires_at: expires_at || null })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
}

async function updateInviteCode(ctx: AuthCtx, id: string, body: Record<string, unknown>) {
  requireAdmin(ctx);
  const { data, error } = await admin.from("invite_codes").update(body).eq("id", id).select().maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!data) return notFound("Invite code not found");
  return json(data);
}

async function deleteInviteCode(ctx: AuthCtx, id: string) {
  requireAdmin(ctx);
  await admin.from("invite_codes").delete().eq("id", id);
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
  const { program_id, patient_id, exercises_completed, sets_completed, pain_before, pain_after, duration, adherence_rate, completion_percentage, notes } =
    body as Record<string, string>;
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

// ---------- videos ----------

async function listVideos(ctx: AuthCtx) {
  const { data } = await admin.from("videos").select("*").eq("clinic_id", ctx.clinicId).order("created_at", { ascending: false });
  return json(data ?? []);
}

async function deleteVideo(ctx: AuthCtx, id: string) {
  const { data: video } = await admin.from("videos").select("*").eq("id", id).eq("clinic_id", ctx.clinicId).maybeSingle();
  if (!video) return err(404, "Video not found");

  await admin.from("videos").delete().eq("id", id);

  const removeFromStorage = async (fileUrl: string | null) => {
    if (!fileUrl) return;
    const marker = "/storage/v1/object/public/videos/";
    const idx = fileUrl.indexOf(marker);
    if (idx === -1) return;
    const objectPath = fileUrl.slice(idx + marker.length);
    await admin.storage.from("videos").remove([objectPath]).catch(() => {});
  };
  await removeFromStorage(video.video_url);
  await removeFromStorage(video.thumbnail_url);

  return json({ message: "Video deleted successfully" });
}

async function createVideo(ctx: AuthCtx, req: Request) {
  const contentType = req.headers.get("content-type") || "";
  let name = "";
  let description = "";
  let duration = 0;
  let videoUrl: string | null = null;
  let thumbnailUrl: string | null = null;

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    name = String(form.get("name") || "");
    description = String(form.get("description") || "");
    duration = parseInt(String(form.get("duration") || "0")) || 0;

    const file = form.get("video_file");
    if (file instanceof File) {
      const ext = file.name.split(".").pop() || "mp4";
      const objectPath = `${ctx.clinicId}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await admin.storage.from("videos").upload(objectPath, file, { contentType: file.type });
      if (uploadError) throw new HttpError(500, `Upload error: ${uploadError.message}`);
      const { data: pub } = admin.storage.from("videos").getPublicUrl(objectPath);
      videoUrl = pub.publicUrl;
    } else {
      videoUrl = String(form.get("video_url") || "") || null;
    }
    thumbnailUrl = String(form.get("thumbnail_url") || "") || null;
  } else {
    const body = await req.json().catch(() => ({}));
    name = body.name;
    description = body.description;
    duration = parseInt(body.duration) || 0;
    videoUrl = body.video_url || null;
    thumbnailUrl = body.thumbnail_url || null;
  }

  if (!name) bad("Video name is required");
  if (!ctx.clinicId) return err(403, "Clinic ID not found in token");

  const { data, error } = await admin
    .from("videos")
    .insert({ name, description, duration, video_url: videoUrl, thumbnail_url: thumbnailUrl, clinic_id: ctx.clinicId })
    .select()
    .single();
  if (error) throw new HttpError(500, error.message);
  return json(data, 201);
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
  const [patients, therapists, programs, appts] = await Promise.all([
    admin.from("patients").select("id", { count: "exact", head: true }).eq("clinic_id", ctx.clinicId),
    admin.from("therapists").select("id", { count: "exact", head: true }).eq("clinic_id", ctx.clinicId),
    admin.from("exercise_programs").select("id", { count: "exact", head: true }).eq("clinic_id", ctx.clinicId).eq("status", "Active"),
    admin.from("appointments").select("id", { count: "exact", head: true }).eq("clinic_id", ctx.clinicId).eq("date", today),
  ]);
  return json({
    patients: patients.count ?? 0,
    therapists: therapists.count ?? 0,
    programs: programs.count ?? 0,
    appointments: appts.count ?? 0,
    adherence: 72,
  });
}

// ---------- billing ----------

async function listInvoices(ctx: AuthCtx) {
  const { data } = await admin.from("invoices").select("*, patients(name)").eq("clinic_id", ctx.clinicId).order("invoiceDate", { ascending: false });
  return json(data ?? []);
}

async function getInvoice(ctx: AuthCtx, id: string) {
  const { data } = await admin.from("invoices").select("*, patients(name), payments(*)").eq("id", id).eq("clinic_id", ctx.clinicId).maybeSingle();
  if (!data) return notFound("Invoice not found");
  return json(data);
}

async function createInvoice(ctx: AuthCtx, body: Record<string, unknown>) {
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
  const data = { ...body } as Record<string, unknown>;
  if (data.totalAmount !== undefined) data.totalAmount = parseInt(data.totalAmount as string);
  if (data.amountPaid !== undefined) data.amountPaid = parseInt(data.amountPaid as string);

  const { data: updated, error } = await admin.from("invoices").update(data).eq("id", id).eq("clinic_id", ctx.clinicId).select().maybeSingle();
  if (error) throw new HttpError(500, error.message);
  if (!updated) return notFound("Invoice not found");
  return json(updated);
}

async function deleteInvoice(ctx: AuthCtx, id: string) {
  await admin.from("invoices").delete().eq("id", id).eq("clinic_id", ctx.clinicId);
  return json({ message: "Invoice deleted" });
}

async function listPayments(ctx: AuthCtx) {
  const { data } = await admin
    .from("payments")
    .select("*, invoices!inner(invoiceNumber, clinic_id), patients(name)")
    .eq("invoices.clinic_id", ctx.clinicId)
    .order("paymentDate", { ascending: false });
  return json(data ?? []);
}

async function createPayment(ctx: AuthCtx, body: Record<string, unknown>) {
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
  const { data } = await admin
    .from("patient_packages")
    .select("*, patients!inner(name, clinic_id)")
    .eq("patients.clinic_id", ctx.clinicId)
    .order("created_at", { ascending: false });
  return json(data ?? []);
}

async function createPatientPackage(ctx: AuthCtx, body: Record<string, unknown>) {
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
  const { error, count } = await admin
    .from("clinic_subscriptions")
    .update({ status: "cancelled", ended_at: new Date().toISOString() })
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
  await admin.from("clinics").delete().eq("id", id);
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
  if (role !== "super_admin" && !clinic_id) bad("Clinic is required for admin, therapist, and patient roles");

  const { data: existing } = await admin.from("users").select("id").eq("email", email).maybeSingle();
  if (existing) return err(400, "User already exists");

  const { data: created, error: createError } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (createError || !created?.user) throw new HttpError(500, createError?.message || "Failed to create account");

  const { data: user, error } = await admin
    .from("users")
    .insert({ id: created.user.id, email, fullName, role, clinic_id: role === "super_admin" ? null : clinic_id, phone: phone || null })
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
  await admin.auth.admin.deleteUser(id).catch(() => {});
  await admin.from("users").delete().eq("id", id);
  return json({ success: true, message: "User deleted" });
}

// ---------- router ----------

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  const url = new URL(req.url);
  let path = url.pathname.replace(/^\/functions\/v1\/api/, "");
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

  console.log(`DEBUG incoming: method=${method} path=${JSON.stringify(path)} pathname=${JSON.stringify(url.pathname)}`);

  try {
    // Public routes
    if (path === "/health" && method === "GET") return json({ status: "ok" });
    if (path === "/auth/register" && method === "POST") return await authRegister(await body());
    if (path === "/auth/login" && method === "POST") return await authLogin(await body());

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
      if (method === "GET" && segments.length === 1) return await listAppointments(ctx);
      if (method === "GET" && segments.length === 2) return await getAppointment(ctx, segments[1]);
      if (method === "POST" && segments.length === 1) return await createAppointment(ctx, await body());
      if (method === "PUT" && segments.length === 2) return await updateAppointment(ctx, segments[1], await body());
      if (method === "DELETE" && segments.length === 2) return await deleteAppointment(ctx, segments[1]);
    }

    if (segments[0] === "exercises") {
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
      if (method === "POST" && segments.length === 1) return await createPainLog(ctx, await body());
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
