-- Patient-Reported Outcome Measures (PROMs).
-- Stores a completed instrument response: the raw answers plus the computed
-- score/interpretation, so clinicians can trend outcomes over time.
-- Access is via the "api" Edge Function only (RLS on, no policies), matching
-- the rest of the schema.

create table if not exists public.prom_responses (
  id             uuid primary key default gen_random_uuid(),
  patient_id     uuid not null references public.patients(id) on delete cascade,
  clinic_id      uuid references public.clinics(id) on delete set null,
  instrument     text not null,
  score          numeric,
  max_score      numeric,
  interpretation text,
  answers        jsonb,
  created_at     timestamptz not null default now()
);

create index if not exists prom_responses_patient_created_idx on public.prom_responses (patient_id, created_at);
create index if not exists prom_responses_clinic_idx on public.prom_responses (clinic_id);

alter table public.prom_responses enable row level security;
