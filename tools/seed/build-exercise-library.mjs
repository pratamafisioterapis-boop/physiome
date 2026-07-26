#!/usr/bin/env node
// Builds the global exercise library migration from the JSON source of truth in
// supabase/seed. Run it after editing any file there:
//
//   node tools/seed/build-exercise-library.mjs
//
// It writes:
//   supabase/migrations/20260725120100_seed_global_exercise_library.sql
//   docs/exercise_library.md   (human-readable catalogue with the evidence used)
//
// Library rows are global: clinic_id stays NULL, which the API already exposes
// to every clinic (see supabase/functions/api/index.ts). IDs are derived from
// the slug so re-running the generator upserts the same rows instead of
// duplicating them.

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const exercisesDir = join(root, 'supabase', 'seed', 'exercises');
const programsDir = join(root, 'supabase', 'seed', 'programs');
const sqlOut = join(root, 'supabase', 'migrations', '20260725120100_seed_global_exercise_library.sql');
const docsOut = join(root, 'docs', 'exercise_library.md');

const NAMESPACE = 'physiome.exercise-library.v1';

/** Deterministic UUID (RFC 4122 v3 layout) so re-runs upsert instead of duplicating. */
function uuidFor(kind, slug) {
  const bytes = createHash('md5').update(`${NAMESPACE}:${kind}:${slug}`).digest();
  bytes[6] = (bytes[6] & 0x0f) | 0x30;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString('hex');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function readJsonDir(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .flatMap((f) => {
      const parsed = JSON.parse(readFileSync(join(dir, f), 'utf8'));
      if (!Array.isArray(parsed)) throw new Error(`${f} must contain a JSON array`);
      return parsed;
    });
}

const q = (value) => (value === null || value === undefined || value === '' ? 'NULL' : `'${String(value).replace(/'/g, "''")}'`);
const num = (value) => (value === null || value === undefined || value === '' ? 'NULL' : Number(value));
const arr = (values) =>
  !Array.isArray(values) || values.length === 0
    ? `'{}'::text[]`
    : `ARRAY[${values.map((v) => q(v)).join(', ')}]::text[]`;
const jsonb = (value) => `${q(JSON.stringify(value))}::jsonb`;

const exercises = readJsonDir(exercisesDir);
const programs = readJsonDir(programsDir);

// ---------------------------------------------------------------- validation
const bySlug = new Map();
for (const ex of exercises) {
  for (const field of ['slug', 'name', 'body_region', 'difficulty', 'instructions']) {
    if (!ex[field]) throw new Error(`Exercise "${ex.slug ?? ex.name}" is missing required field "${field}"`);
  }
  if (!['Beginner', 'Intermediate', 'Advanced'].includes(ex.difficulty)) {
    throw new Error(`Exercise "${ex.slug}" has invalid difficulty "${ex.difficulty}"`);
  }
  if (bySlug.has(ex.slug)) throw new Error(`Duplicate exercise slug: ${ex.slug}`);
  bySlug.set(ex.slug, ex);
}

const programSlugs = new Set();
for (const program of programs) {
  for (const field of ['slug', 'name', 'description', 'body_region', 'exercises']) {
    if (!program[field]) throw new Error(`Program "${program.slug ?? program.name}" is missing required field "${field}"`);
  }
  if (programSlugs.has(program.slug)) throw new Error(`Duplicate program slug: ${program.slug}`);
  programSlugs.add(program.slug);
  if (!program.exercises.length) throw new Error(`Program "${program.slug}" has no exercises`);
  for (const item of program.exercises) {
    if (!bySlug.has(item.slug)) {
      throw new Error(`Program "${program.slug}" references unknown exercise slug "${item.slug}"`);
    }
  }
}

// ------------------------------------------------------------------ SQL body
const lines = [];
lines.push('-- Global, evidence-based exercise & rehabilitation protocol library.');
lines.push('--');
lines.push('-- GENERATED FILE - do not edit by hand.');
lines.push('-- Source: supabase/seed/exercises/*.json and supabase/seed/programs/*.json');
lines.push('-- Regenerate with: node tools/seed/build-exercise-library.mjs');
lines.push('--');
lines.push(`-- ${exercises.length} exercises, ${programs.length} protocol templates.`);
lines.push('-- clinic_id IS NULL marks a row as global: readable by every clinic and');
lines.push('-- not editable from a clinic account (enforced in the api Edge Function).');
lines.push('-- Every entry carries the guideline or trial its dosage comes from in');
lines.push('-- evidence_source, so clinicians can check the basis of what they prescribe.');
lines.push('--');
lines.push('-- Statement-per-table (not per-row) so the file stays applicable as a single');
lines.push('-- migration; no explicit BEGIN/COMMIT so it can also be executed as a block.');
lines.push('');
lines.push('-- ------------------------------------------------------------- exercises');
lines.push(`insert into public.exercises (
  id, slug, name, name_id, description, description_en, body_region, category, difficulty,
  movement_type, starting_position, target_muscles, equipment_needed, instructions, instructions_en,
  contraindications, progression_tips, default_sets, default_reps, default_hold_seconds,
  default_rest_seconds, default_frequency, evidence_level, evidence_source, tags, clinic_id
) values`);

const exerciseRows = exercises.map((ex) => {
  const id = uuidFor('exercise', ex.slug);
  return `-- ${ex.name}
(
  '${id}', ${q(ex.slug)}, ${q(ex.name)}, ${q(ex.name_id)}, ${q(ex.description)}, ${q(ex.description_en)},
  ${q(ex.body_region)}, ${q(ex.category)}, ${q(ex.difficulty)}, ${q(ex.movement_type)}, ${q(ex.starting_position)},
  ${q(ex.target_muscles)}, ${arr(ex.equipment_needed)}, ${q(ex.instructions)}, ${q(ex.instructions_en)},
  ${q(ex.contraindications)}, ${q(ex.progression_tips)}, ${num(ex.default_sets)}, ${num(ex.default_reps)},
  ${num(ex.default_hold_seconds)}, ${num(ex.default_rest_seconds)}, ${q(ex.default_frequency)},
  ${q(ex.evidence_level)}, ${q(ex.evidence_source)}, ${arr(ex.tags)}, null
)`;
});

{
  lines.push(exerciseRows.join(',\n'));
  lines.push(`on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  name_id = excluded.name_id,
  description = excluded.description,
  description_en = excluded.description_en,
  body_region = excluded.body_region,
  category = excluded.category,
  difficulty = excluded.difficulty,
  movement_type = excluded.movement_type,
  starting_position = excluded.starting_position,
  target_muscles = excluded.target_muscles,
  equipment_needed = excluded.equipment_needed,
  instructions = excluded.instructions,
  instructions_en = excluded.instructions_en,
  contraindications = excluded.contraindications,
  progression_tips = excluded.progression_tips,
  default_sets = excluded.default_sets,
  default_reps = excluded.default_reps,
  default_hold_seconds = excluded.default_hold_seconds,
  default_rest_seconds = excluded.default_rest_seconds,
  default_frequency = excluded.default_frequency,
  evidence_level = excluded.evidence_level,
  evidence_source = excluded.evidence_source,
  tags = excluded.tags,
  updated_at = now();`);
  lines.push('');
}

lines.push('-- ----------------------------------------------------- protocol templates');
lines.push(`insert into public.exercise_programs (
  id, slug, name, description, description_en, indication, phase, body_region, clinical_goal,
  expected_duration, frequency, difficulty, precautions, progression_criteria, patient_education,
  evidence_level, evidence_source, tags, exercises, status, clinic_id, ai_generated
) values`);

const programRows = programs.map((program) => {
  const id = uuidFor('program', program.slug);
  const items = program.exercises.map((item) => {
    const ex = bySlug.get(item.slug);
    const entry = {
      id: uuidFor('exercise', item.slug),
      slug: item.slug,
      name: ex.name,
      name_id: ex.name_id ?? null,
      sets: item.sets ?? ex.default_sets ?? 1,
      reps: item.reps ?? ex.default_reps ?? 1,
      repetitions: item.reps ?? ex.default_reps ?? 1,
      hold_duration: item.hold_duration ?? ex.default_hold_seconds ?? 0,
      rest_between_sets: item.rest_between_sets ?? ex.default_rest_seconds ?? 30,
      prepare_time: item.prepare_time ?? 5,
      work_time: item.work_time ?? 0,
      cycles: item.cycles ?? 1,
      rest_time: item.rest_time ?? 0,
      permission_mode: item.permission_mode ?? 'Patient Controlled',
      notes: item.notes ?? '',
    };
    return entry;
  });

  return `-- ${program.name}
(
  '${id}', ${q(program.slug)}, ${q(program.name)}, ${q(program.description)}, ${q(program.description_en)},
  ${q(program.indication)}, ${q(program.phase)}, ${q(program.body_region)}, ${q(program.clinical_goal)},
  ${q(program.expected_duration)}, ${q(program.frequency)}, ${q(program.difficulty)}, ${q(program.precautions)},
  ${q(program.progression_criteria)}, ${q(program.patient_education)}, ${q(program.evidence_level)},
  ${q(program.evidence_source)}, ${arr(program.tags)}, ${jsonb(items)}, 'Active', null, false
)`;
});

lines.push(programRows.join(',\n'));
lines.push(`on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  description = excluded.description,
  description_en = excluded.description_en,
  indication = excluded.indication,
  phase = excluded.phase,
  body_region = excluded.body_region,
  clinical_goal = excluded.clinical_goal,
  expected_duration = excluded.expected_duration,
  frequency = excluded.frequency,
  difficulty = excluded.difficulty,
  precautions = excluded.precautions,
  progression_criteria = excluded.progression_criteria,
  patient_education = excluded.patient_education,
  evidence_level = excluded.evidence_level,
  evidence_source = excluded.evidence_source,
  tags = excluded.tags,
  exercises = excluded.exercises,
  status = excluded.status,
  updated_at = now();`);
lines.push('');

writeFileSync(sqlOut, lines.join('\n'), 'utf8');

// ------------------------------------------------------------------- catalogue
const byRegion = new Map();
for (const ex of exercises) {
  const key = ex.body_region;
  if (!byRegion.has(key)) byRegion.set(key, []);
  byRegion.get(key).push(ex);
}

const doc = [];
doc.push('# Physiome Exercise & Protocol Library');
doc.push('');
doc.push('<!-- GENERATED FILE - regenerate with: node tools/seed/build-exercise-library.mjs -->');
doc.push('');
doc.push(`Global library shipped with Physiome: **${exercises.length} exercises** and **${programs.length} protocol templates**.`);
doc.push('');
doc.push('Every entry is written from a published clinical practice guideline or trial, and stores that');
doc.push('source in `evidence_source`. Patient-facing text (`instructions`, `contraindications`,');
doc.push('`progression_tips`) is Indonesian; `instructions_en` carries the English version. Rows are');
doc.push('global (`clinic_id IS NULL`): every clinic can read and prescribe them, and no clinic can edit');
doc.push('them — clinics stay free to add their own exercises on top.');
doc.push('');
doc.push('Evidence levels: **A** = RCT or clinical practice guideline, **B** = cohort/consensus, **C** = expert or mechanistic rationale.');
doc.push('');
doc.push('## Editing the library');
doc.push('');
doc.push('1. Edit the JSON in `supabase/seed/exercises/` or `supabase/seed/programs/`.');
doc.push('2. Run `node tools/seed/build-exercise-library.mjs`.');
doc.push('3. Apply `supabase/migrations/20260725120100_seed_global_exercise_library.sql`.');
doc.push('');
doc.push('The generator validates required fields, rejects duplicate slugs, and fails if a program');
doc.push('references an exercise slug that does not exist. IDs are derived from the slug, so re-running');
doc.push('updates rows in place rather than creating duplicates.');
doc.push('');
doc.push('## Demonstration media');
doc.push('');
doc.push('Written instructions tell a patient what to do; they still need to see the position. Every');
doc.push('exercise can carry two kinds of demonstration media, and the cards fall back in this order:');
doc.push('');
doc.push('1. `video_url` + `thumbnail_url` — a demonstration video (Kelola video latihan).');
doc.push('2. `demo_photos` — ordered step photos `[{url, caption, caption_en}]` (Foto peragaan).');
doc.push('3. Neither — the card shows a placeholder icon.');
doc.push('');
doc.push('Photos are shot by the clinic and uploaded per exercise from the Exercise Library page');
doc.push('(camera button on the card). Array order is step order, and it is meant to line up with the');
doc.push('numbered lines in `instructions` — the upload form pre-fills each caption from the matching');
doc.push('instruction step. The "Peragaan" filter lists exercises that still have no media at all,');
doc.push('which is the shot list for a photo session.');
doc.push('');
doc.push('`demo_photos` is written only through `/exercises/:id/demo-photos`; that endpoint owns the');
doc.push('storage objects and deletes the ones a change orphans, so a plain exercise update ignores it.');
doc.push('');
doc.push('## Protocol templates');
doc.push('');
doc.push('| Protocol | Indication | Duration | Evidence source |');
doc.push('| --- | --- | --- | --- |');
for (const p of programs) {
  const cell = (s) => String(s ?? '').replace(/\|/g, '\\|');
  doc.push(`| ${cell(p.name)} | ${cell(p.indication)} | ${cell(p.expected_duration)} | ${cell(p.evidence_source)} |`);
}
doc.push('');
doc.push('## Exercises by body region');
doc.push('');
for (const [region, list] of [...byRegion.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  doc.push(`### ${region} (${list.length})`);
  doc.push('');
  doc.push('| Exercise | Difficulty | Type | Default dose | Evidence |');
  doc.push('| --- | --- | --- | --- | --- |');
  for (const ex of list) {
    const dose = [
      ex.default_sets ? `${ex.default_sets} set` : null,
      ex.default_reps ? `${ex.default_reps} rep` : null,
      ex.default_hold_seconds ? `tahan ${ex.default_hold_seconds}s` : null,
      ex.default_frequency,
    ]
      .filter(Boolean)
      .join(' × ');
    const cell = (s) => String(s ?? '').replace(/\|/g, '\\|');
    doc.push(`| ${cell(ex.name)} | ${cell(ex.difficulty)} | ${cell(ex.movement_type)} | ${cell(dose)} | ${cell(ex.evidence_level)} — ${cell(ex.evidence_source)} |`);
  }
  doc.push('');
}

mkdirSync(dirname(docsOut), { recursive: true });
writeFileSync(docsOut, doc.join('\n'), 'utf8');

console.log(`Wrote ${exercises.length} exercises and ${programs.length} programs`);
console.log(`  SQL:  ${sqlOut}`);
console.log(`  Docs: ${docsOut}`);
