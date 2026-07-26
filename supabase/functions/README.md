# Supabase Edge Functions

| Function | Purpose | `verify_jwt` |
|---|---|---|
| `api` | The whole REST surface. Public endpoints (login, register, password reset, `/subscription/plans`) are handled before `requireAuth`; everything else is gated there. | `false` |
| `midtrans-webhook` | Receives Midtrans payment notifications. Authenticates each request with the SHA-512 signature in the body. | `false` |
| `subscription-cron` | Nightly sweep: expiry, reminder ladder, stuck-payment reconciliation. Authenticated with `x-cron-secret`. | `false` |

`_shared/` is not deployed as a function (the underscore prefix excludes it);
sibling functions import from it with a relative path.

## Environment variables

Set as Supabase project secrets — never committed.

| Name | Used by | Notes |
|---|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY` | all | Provided by the platform |
| `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_CONTACT_EMAIL` | `api`, `subscription-cron` | Web Push. Optional; sends are skipped if unset |
| `MIDTRANS_SERVER_KEY` | `api`, `midtrans-webhook` | Snap charge auth + notification signature |
| `MIDTRANS_CLIENT_KEY` | — | Reserved for a future Snap.js popup; the redirect flow does not need it |
| `MIDTRANS_IS_PRODUCTION` | `api`, `midtrans-webhook` | `"true"` switches from sandbox to production URLs |
| `MIDTRANS_ENABLED_PAYMENTS` | `api` | Defaults to `other_qris`. Which channel renders a QRIS-only page depends on merchant config, so it is overridable without a redeploy |
| `APP_BASE_URL` | `api`, `midtrans-webhook`, `subscription-cron` | Used to build the Snap finish URL and email links |
| `SUBSCRIPTION_ENFORCEMENT` | `api` | Kill switch. `"true"` turns the write gate on; anything else leaves it off |
| `CRON_SECRET` | `subscription-cron` | Shared secret for the `x-cron-secret` header |
| `RESEND_API_KEY`, `BILLING_EMAIL_FROM` | `midtrans-webhook`, `subscription-cron` | Billing email. Optional; sends are logged and skipped if unset |

## Local checks

There is no CI in this repo, so run these by hand before deploying.

Typecheck (needs Deno):

```sh
deno check --node-modules-dir=auto supabase/functions/api/index.ts
deno check --node-modules-dir=auto supabase/functions/midtrans-webhook/index.ts
deno check --node-modules-dir=auto supabase/functions/subscription-cron/index.ts
```

Unit tests for the Midtrans signature and status mapping — the two things that,
if wrong, silently stop payments from being applied:

```sh
MIDTRANS_SERVER_KEY=anything deno test --allow-env supabase/functions/_shared/midtrans.test.ts
```

## Deploying

```sh
supabase functions deploy api
supabase functions deploy midtrans-webhook
supabase functions deploy subscription-cron
```

`supabase/config.toml` carries the `verify_jwt` settings, but it is only read by
the CLI. If you deploy from the dashboard instead, set `verify_jwt = false` on
each of the three functions there — `midtrans-webhook` in particular will reject
every Midtrans notification if the platform gateway demands an `apikey` header.

After deploying, point the Midtrans dashboard's notification URL at:

```
https://<project-ref>.supabase.co/functions/v1/midtrans-webhook
```
