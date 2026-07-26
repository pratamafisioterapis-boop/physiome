-- Seed the plan catalogue.
--
-- IMPORTANT: every paid plan is seeded with a PLACEHOLDER price and
-- is_public = false. The numbers below are carried over from the landing page
-- copy and are not confirmed commercial prices; the B2C patient price has no
-- source in the codebase at all. Nothing is offered for sale until real prices
-- are entered and is_public is switched on from /super-admin/plans.
--
-- Free plans (trials, internal) are seeded is_public = false too: they are
-- granted by the signup flow, never chosen from a pricing page.
--
-- Idempotent: re-running updates the definition but never resurrects
-- is_public, so a re-run cannot silently republish a plan an operator hid.

insert into public.subscription_plans
  (code, name_id, name_en, description_id, description_en, audience, subject_kind,
   price_idr, period_months, period_days, max_therapists, max_active_patients,
   features, is_public, is_active, sort_order)
values
  ('trial-14',
   'Uji Coba 14 Hari', '14-Day Trial',
   'Akses penuh selama 14 hari untuk klinik baru.', 'Full access for 14 days for new clinics.',
   'clinic', 'clinic', 0, 0, 14, 2, 20,
   '{"id": ["Akses penuh 14 hari", "Maksimal 2 fisioterapis", "Maksimal 20 pasien aktif"], "en": ["Full access for 14 days", "Up to 2 therapists", "Up to 20 active patients"]}'::jsonb,
   false, true, 0),

  ('patient-trial-7',
   'Uji Coba Pasien 7 Hari', '7-Day Patient Trial',
   'Coba program latihan mandiri selama 7 hari.', 'Try a self-guided exercise program for 7 days.',
   'patient', 'user', 0, 0, 7, null, null,
   '{"id": ["Akses program latihan 7 hari", "Pemantauan nyeri dan progres"], "en": ["7 days of exercise program access", "Pain and progress tracking"]}'::jsonb,
   false, true, 1),

  ('solo-monthly',
   'Praktek Mandiri', 'Solo Practice',
   'Untuk fisioterapis yang berpraktik sendiri.', 'For physiotherapists practising on their own.',
   'solo', 'clinic', 399000, 1, 0, 1, 50,
   '{"id": ["1 fisioterapis", "Maksimal 50 pasien aktif", "Library latihan lengkap", "Catatan SOAP"], "en": ["1 physiotherapist", "Up to 50 active patients", "Full exercise library", "SOAP notes"]}'::jsonb,
   false, true, 10),

  ('clinic-monthly',
   'Klinik Bulanan', 'Clinic Monthly',
   'Untuk klinik dengan beberapa fisioterapis.', 'For clinics with several physiotherapists.',
   'clinic', 'clinic', 899000, 1, 0, 5, null,
   '{"id": ["Hingga 5 fisioterapis", "Pasien tanpa batas", "Generator program AI", "Telehealth"], "en": ["Up to 5 physiotherapists", "Unlimited patients", "AI program generator", "Telehealth"]}'::jsonb,
   false, true, 20),

  ('clinic-quarterly',
   'Klinik 3 Bulan', 'Clinic Quarterly',
   'Paket klinik untuk 3 bulan.', 'Clinic plan billed every 3 months.',
   'clinic', 'clinic', 2427000, 3, 0, 5, null,
   '{"id": ["Semua fitur paket bulanan", "Dibayar per 3 bulan"], "en": ["Everything in the monthly plan", "Billed quarterly"]}'::jsonb,
   false, true, 21),

  ('clinic-yearly',
   'Klinik Tahunan', 'Clinic Yearly',
   'Paket klinik untuk 12 bulan.', 'Clinic plan billed every 12 months.',
   'clinic', 'clinic', 8630000, 12, 0, 5, null,
   '{"id": ["Semua fitur paket bulanan", "Dibayar per tahun"], "en": ["Everything in the monthly plan", "Billed yearly"]}'::jsonb,
   false, true, 22),

  ('patient-monthly',
   'Pasien Bulanan', 'Patient Monthly',
   'Program latihan mandiri dengan pendampingan terapis Kaffah.', 'Self-guided exercise programs reviewed by a Kaffah therapist.',
   'patient', 'user', 49000, 1, 0, null, null,
   '{"id": ["Program latihan terstruktur", "Ditinjau fisioterapis", "Pemantauan nyeri dan progres"], "en": ["Structured exercise programs", "Reviewed by a physiotherapist", "Pain and progress tracking"]}'::jsonb,
   false, true, 30),

  ('internal-permanent',
   'Internal', 'Internal',
   'Akses internal tanpa batas waktu. Tidak dijual.', 'Internal, non-expiring access. Not for sale.',
   'internal', 'clinic', 0, 1200, 0, null, null,
   '{"id": [], "en": []}'::jsonb,
   false, true, 999)

on conflict (code) do update set
  name_id             = excluded.name_id,
  name_en             = excluded.name_en,
  description_id      = excluded.description_id,
  description_en      = excluded.description_en,
  audience            = excluded.audience,
  subject_kind        = excluded.subject_kind,
  period_months       = excluded.period_months,
  period_days         = excluded.period_days,
  max_therapists      = excluded.max_therapists,
  max_active_patients = excluded.max_active_patients,
  features            = excluded.features,
  sort_order          = excluded.sort_order,
  updated_at          = now();
  -- price_idr, is_public and is_active are deliberately NOT updated here:
  -- once an operator sets a real price or publishes a plan, re-running this
  -- migration must not overwrite that with the placeholder.
