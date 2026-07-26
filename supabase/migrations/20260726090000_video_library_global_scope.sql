-- Video library: allow globally-scoped videos (super_admin uploads).
--
-- `videos.clinic_id` was NOT NULL, which made the whole video flow impossible
-- for super_admin: their profile has `clinic_id IS NULL` (they own the global
-- exercise library, not a clinic), so every attempt to store a video row for a
-- global exercise failed. This mirrors what `exercises` already does:
--   clinic_id IS NULL  -> global library, visible to every clinic
--   clinic_id = <uuid> -> owned by that clinic only
--
-- The API (supabase/functions/api) is the only writer, so scoping stays there.

alter table public.videos
  alter column clinic_id drop not null;

comment on column public.videos.clinic_id is
  'Owning clinic. NULL = global video library (uploaded by super_admin), readable by every clinic.';

-- Track who uploaded a video so the library can be audited / filtered later.
alter table public.videos
  add column if not exists created_by uuid references public.users (id) on delete set null;

create index if not exists videos_clinic_id_idx on public.videos (clinic_id);
