-- Secure clinician <-> patient messaging.
-- One thread per patient; every clinician in the patient's clinic shares it.
-- Access is enforced by the "api" Edge Function (service role); RLS is enabled
-- with no policies so anon/authenticated clients cannot read the table directly,
-- consistent with every other table in this schema.

create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  patient_id  uuid not null references public.patients(id) on delete cascade,
  clinic_id   uuid references public.clinics(id) on delete set null,
  sender_id   uuid not null references public.users(id) on delete cascade,
  sender_role text not null check (sender_role in ('patient', 'clinician')),
  body        text not null,
  read_at     timestamptz,
  created_at  timestamptz not null default now()
);

create index if not exists messages_patient_created_idx on public.messages (patient_id, created_at);
create index if not exists messages_clinic_idx on public.messages (clinic_id);

alter table public.messages enable row level security;
