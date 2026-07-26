-- Demonstration photos for exercises.
--
-- Every exercise in the library carries step-by-step written instructions, but
-- a patient following a home programme needs to SEE the position. Video is the
-- richest answer and the flow for it already exists — it is also the slowest to
-- produce, so most of the 173 library entries will have none for a long time.
--
-- A clinic can photograph a model performing each step in an afternoon. This
-- column stores those photos so the exercise card always has something to show:
-- video when it exists, demonstration photos when it does not.
--
-- Shape (array order IS the step order, matching the numbered `instructions`):
--   [
--     { "url": "https://.../abc.jpg", "caption": "Posisi awal: ...",
--       "caption_en": "Starting position: ..." },
--     ...
--   ]
--
-- jsonb rather than a child table: the photos are only ever read and written as
-- a complete ordered set belonging to one exercise, which is exactly the shape
-- `exercise_programs.exercises` already uses.

alter table public.exercises
  add column if not exists demo_photos jsonb not null default '[]'::jsonb;

comment on column public.exercises.demo_photos is
  'Ordered step-by-step demonstration photos: [{url, caption, caption_en}]. Array order = step order. Shown on exercise cards when the exercise has no video.';

-- Guard against a shape the API cannot render. Kept deliberately loose (the
-- caption fields are optional) so adding a field later does not need a new
-- migration.
alter table public.exercises
  drop constraint if exists exercises_demo_photos_is_array;

alter table public.exercises
  add constraint exercises_demo_photos_is_array
  check (jsonb_typeof(demo_photos) = 'array');

-- Public bucket for the photos. Writes only ever happen through the api Edge
-- Function with the service role, so no storage policy is needed for uploads;
-- `public = true` is what lets an <img> tag load them without a signed URL.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'exercise-photos',
  'exercise-photos',
  true,
  10485760, -- 10 MB per photo
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
