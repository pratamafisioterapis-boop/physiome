-- Backfill for the subscription rollout, plus the schema the direct-to-consumer
-- patient flow needs.
--
-- Runs after 20260727090000 (tables) and 20260727090100 (plan catalogue).

-- ---------------------------------------------------------------------------
-- 1. Move the legacy clinic_subscriptions rows into public.subscriptions.
--
-- Deliberately generous: every clinic that is live today gets a year, so that
-- turning enforcement on cannot lock out an existing customer. Super admin
-- adjusts individual clinics afterwards from the console.
-- ---------------------------------------------------------------------------
insert into public.subscriptions
  (clinic_id, plan_code, status, current_period_start, current_period_end, grace_until, source)
select
  cs.clinic_id,
  case cs.plan
    when 'yearly'    then 'clinic-yearly'
    when 'quarterly' then 'clinic-quarterly'
    else 'clinic-monthly'
  end,
  case when cs.status = 'active' then 'active' else 'expired' end,
  coalesce(cs.started_at, cs.created_at, now()),
  case when cs.status = 'active'
       then now() + interval '365 days'
       else coalesce(cs.ended_at, now())
  end,
  case when cs.status = 'active'
       then now() + interval '372 days'
       else coalesce(cs.ended_at, now()) + interval '7 days'
  end,
  'manual'
from public.clinic_subscriptions cs
where cs.clinic_id is not null
  and not exists (
    select 1 from public.subscriptions s where s.clinic_id = cs.clinic_id
  );

-- ---------------------------------------------------------------------------
-- 2. Mark the house clinic and give it non-expiring internal access.
--
-- Its demo-14 trial would otherwise lapse and lock the operator out of their
-- own product the moment enforcement is switched on.
-- ---------------------------------------------------------------------------
update public.clinics
   set is_house_clinic = true, updated_at = now()
 where id = '49b9166d-ccf1-41b0-8a3e-a71f997cfe87';

update public.subscriptions
   set plan_code = 'internal-permanent',
       status = 'active',
       current_period_end = now() + interval '100 years',
       grace_until = now() + interval '100 years',
       source = 'manual',
       updated_at = now()
 where clinic_id = '49b9166d-ccf1-41b0-8a3e-a71f997cfe87';

-- ---------------------------------------------------------------------------
-- 3. Give every clinic admin a therapists row.
--
-- appointments.therapist_id is a FK to therapists.id, but signup only ever
-- created a users row. A clinic owner who also treats patients -- the normal
-- case for a solo practice -- therefore had nothing to book appointments
-- against. authUpdateProfile already creates this row lazily when a
-- specialization is saved; this makes it eager and consistent.
-- ---------------------------------------------------------------------------
insert into public.therapists ("userId", clinic_id, status)
select u.id, u.clinic_id, 'Active'
from public.users u
where u.role = 'admin'
  and u.clinic_id is not null
  and not exists (
    select 1 from public.therapists t where t."userId" = u.id
  );

-- ---------------------------------------------------------------------------
-- 4. Direct-to-consumer patients pick their own program from the global
-- library, then a Kaffah therapist reviews it. The assignment goes live
-- immediately -- the patient never waits on a queue -- but it is flagged so
-- the review queue can find it.
-- ---------------------------------------------------------------------------
alter table public.program_assignments
  add column if not exists self_selected boolean not null default false,
  add column if not exists review_status text not null default 'not_required',
  add column if not exists reviewed_by uuid references public.users(id) on delete set null,
  add column if not exists reviewed_at timestamptz,
  add column if not exists review_notes text;

do $$
begin
  alter table public.program_assignments
    add constraint program_assignments_review_status_chk
    check (review_status in ('not_required', 'pending', 'approved', 'modified'));
exception
  when duplicate_object then null;
end $$;

comment on column public.program_assignments.self_selected is
  'TRUE when a direct-to-consumer patient chose this program themselves rather than a therapist prescribing it.';

create index if not exists program_assignments_review_queue_idx
  on public.program_assignments (clinic_id, review_status)
  where review_status = 'pending';

-- ---------------------------------------------------------------------------
-- 5. Red-flag screening for self-guided patients.
--
-- Self-selecting exercise without a clinician carries real clinical risk. A
-- patient must clear screening and accept the disclaimer before the programme
-- catalogue opens to them; a red flag routes them to a therapist instead.
-- ---------------------------------------------------------------------------
create table if not exists public.patient_screenings (
  id                     uuid primary key default gen_random_uuid(),
  patient_id             uuid not null references public.patients(id) on delete cascade,
  answers                jsonb not null default '{}'::jsonb,
  red_flags              text[] not null default '{}',
  cleared                boolean not null default false,
  disclaimer_accepted_at timestamptz,
  created_at             timestamptz not null default now()
);

create index if not exists patient_screenings_patient_idx
  on public.patient_screenings (patient_id, created_at desc);

alter table public.patient_screenings enable row level security;
