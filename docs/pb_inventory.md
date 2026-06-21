# PocketBase Inventory

This file summarizes the PocketBase artifacts found in `apps/pocketbase` to support migration planning.

## Locations
- Migrations: `apps/pocketbase/pb_migrations/` (many files, see folder)
- Hooks: `apps/pocketbase/pb_hooks/` (see list below)
- Types/definitions: `apps/pocketbase/database-types.d.ts`

## Hook files
- builder-mailer.pb.js
- custom-migrations-cmd.pb.js
- external-dashboard.pb.js

## Core collections (inferred from migration filenames)
These are the main collections and features found (non-exhaustive):

- clinics
- therapists
- users (with many updates: full_name, assigned_therapist_id, medical_history, emergency_contact, notifications)
- patients
- appointments
- exercises
- exercise_programs
- program_templates
- assigned_programs / assigned_programs
- exercise_completions / exercise_progress / patient_exercises
- categories
- exercise_statistics
- videos
- programs
- patient_programs
- patient_achievements / achievements
- assessment types/questions/responses/summaries/history
- SOAPNotes / SOAPHistory / SOAP attachments
- packages / patientPackages / sessions
- invoices / payments / billingSettings
- telehealth_sessions and session notes
- education content / articles / translations
- notification templates / notification_preferences
- analytics events / patient/therapist analytics
- invite_codes
- patient_messages / conversations
- translations and i18n related tables
- user_roles / user_permissions / user_sessions
- timer_templates / auto_progression_plans / recovery_timer_configs

## Seeds and updates
There are multiple seed scripts (e.g., seeding assessment questions, exercises, demo users) and many index/rule updates.

## Notes & next actions
- The migrations folder contains many `created_*`, `add_*`, `update_*`, and `seed_*` files. Use these to reconstruct exact collection schemas if needed.
- `pb_hooks` contains application logic (mailer, custom migration commands, external dashboard integration) that must be reviewed and ported to server-side Express middleware or jobs.
- `database-types.d.ts` provides the PB schema/field definitions; it is a helpful reference for exact field types and collection rules.

## Quick commands
To inspect files locally:

```bash
ls -la apps/pocketbase/pb_migrations | wc -l
ls -la apps/pocketbase/pb_hooks
sed -n '1,120p' apps/pocketbase/database-types.d.ts
```

---
Generated during migration planning on 2026-06-21.
