Migration scripts for PocketBase -> Prisma

Files:

- `migrate_from_pocketbase_sample.js`: sample per-collection migration script.

Usage (example):

```bash
# ensure .env contains DATABASE_URL and other env vars
cd apps/api
node scripts/migrate_from_pocketbase_sample.js users
```

Notes:

- Adapt field mappings to your actual PocketBase exports under `apps/pocketbase/pb_data/`.
- Always run on staging first and back up your DB.
