-- Schema support for the global, evidence-based exercise & protocol library.
--
-- Two things happen here:
--   1. `exercises` gains the clinical metadata a real rehab library needs
--      (bilingual patient instructions, default dosage, evidence provenance).
--   2. `exercise_programs` gains the protocol metadata that turns a list of
--      exercises into a prescribable program (indication, phase, progression
--      criteria, precautions, source).
--
-- Every column is nullable/additive so existing clinic-owned rows and the
-- current API (which spreads the request body straight into the table) keep
-- working untouched. Rows with clinic_id IS NULL are the global library: the
-- API already exposes them to every clinic (see supabase/functions/api).

-- ---------------------------------------------------------------- exercises
alter table public.exercises
  add column if not exists name_id              text,
  add column if not exists description_en       text,
  add column if not exists instructions_en      text,
  add column if not exists movement_type        text,
  add column if not exists starting_position    text,
  add column if not exists default_sets         integer,
  add column if not exists default_reps         integer,
  add column if not exists default_hold_seconds integer,
  add column if not exists default_rest_seconds integer,
  add column if not exists default_frequency    text,
  add column if not exists evidence_level       text,
  add column if not exists evidence_source      text,
  add column if not exists tags                 text[];

comment on column public.exercises.name_id              is 'Indonesian exercise name shown to patients (name stays the clinical/English term).';
comment on column public.exercises.instructions         is 'Step-by-step patient instructions, Indonesian.';
comment on column public.exercises.instructions_en      is 'Step-by-step patient instructions, English.';
comment on column public.exercises.movement_type        is 'Mobility | Stretch | Strength | Motor control | Balance | Aerobic | Breathing | Neurodynamic.';
comment on column public.exercises.starting_position    is 'Supine | Prone | Side-lying | Sitting | Standing | Quadruped | Half-kneeling.';
comment on column public.exercises.default_frequency    is 'Default prescription frequency, e.g. "1x/hari" or "3x/minggu".';
comment on column public.exercises.evidence_level       is 'A = RCT/CPG-backed, B = cohort/consensus, C = expert/mechanistic rationale.';
comment on column public.exercises.evidence_source      is 'Citation the dosage and indication are drawn from.';

-- Slug identifies a library entry across clinics; only the global library is
-- constrained (clinics stay free to name their own copies whatever they like).
create unique index if not exists exercises_global_slug_key
  on public.exercises (slug)
  where clinic_id is null;

create index if not exists exercises_body_region_idx on public.exercises (body_region);
create index if not exists exercises_category_idx    on public.exercises (category);
create index if not exists exercises_tags_idx        on public.exercises using gin (tags);

-- -------------------------------------------------------- exercise_programs
alter table public.exercise_programs
  add column if not exists slug                 text,
  add column if not exists description_en       text,
  add column if not exists indication           text,
  add column if not exists phase                text,
  add column if not exists frequency            text,
  add column if not exists difficulty           text,
  add column if not exists precautions          text,
  add column if not exists progression_criteria text,
  add column if not exists patient_education    text,
  add column if not exists evidence_level       text,
  add column if not exists evidence_source      text,
  add column if not exists tags                 text[];

comment on column public.exercise_programs.indication           is 'Clinical condition/diagnosis the protocol is written for.';
comment on column public.exercise_programs.phase                is 'Rehab phase this program covers, e.g. "Fase 1 (0-4 minggu)".';
comment on column public.exercise_programs.frequency            is 'How often the patient performs the whole session.';
comment on column public.exercise_programs.precautions          is 'Red flags / stop rules the patient must know, Indonesian.';
comment on column public.exercise_programs.progression_criteria is 'Objective criteria to move on to the next phase.';
comment on column public.exercise_programs.patient_education    is 'Key education points the therapist should reinforce.';
comment on column public.exercise_programs.evidence_source      is 'Guideline or trial the protocol is based on.';

create unique index if not exists exercise_programs_global_slug_key
  on public.exercise_programs (slug)
  where clinic_id is null;
