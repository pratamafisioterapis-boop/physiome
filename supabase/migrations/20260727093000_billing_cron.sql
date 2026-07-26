-- Nightly subscription sweep: expiry, reminder ladder, stuck-payment
-- reconciliation.
--
-- APPLY THIS ONLY AFTER the "subscription-cron" Edge Function is deployed and
-- the secret below exists; otherwise the job POSTs into the void every night.
--
-- ONE-TIME MANUAL STEP -- the secret cannot live in a committed migration.
-- Run this once in the SQL editor with a value of your choosing, and set the
-- SAME value as the CRON_SECRET Edge Function secret:
--
--   select vault.create_secret('<random-string>', 'physiome_cron_secret',
--                              'Shared secret for the subscription-cron function');
--
-- To rotate it later:
--
--   select vault.update_secret(
--     (select id from vault.secrets where name = 'physiome_cron_secret'),
--     '<new-random-string>');

create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- Idempotent reschedule: unschedule first so re-running this migration
-- replaces the job rather than erroring on the duplicate name.
do $$
begin
  if exists (select 1 from cron.job where jobname = 'physiome-subscription-sweep') then
    perform cron.unschedule('physiome-subscription-sweep');
  end if;
end $$;

-- 01:05 UTC = 08:05 WIB. Early enough that a reminder lands at the start of
-- the working day in Indonesia.
select cron.schedule(
  'physiome-subscription-sweep',
  '5 1 * * *',
  $cron$
  select net.http_post(
    url := 'https://kulmcujbxkjjpppyorxp.supabase.co/functions/v1/subscription-cron',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (
        select decrypted_secret
        from vault.decrypted_secrets
        where name = 'physiome_cron_secret'
      )
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 60000
  );
  $cron$
);

-- Inspect runs with:
--   select * from cron.job_run_details
--    where jobid = (select jobid from cron.job where jobname = 'physiome-subscription-sweep')
--    order by start_time desc limit 10;
