-- Web Push subscriptions, one row per browser/device a user has enabled
-- notifications on. Used to push a notification when a chat message arrives
-- (clinician <-> patient messaging). Access is enforced by the "api" Edge
-- Function (service role); RLS is enabled with no policies so anon/
-- authenticated clients cannot read the table directly, consistent with
-- every other table in this schema.

create table if not exists public.push_subscriptions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  endpoint    text not null unique,
  p256dh      text not null,
  auth        text not null,
  created_at  timestamptz not null default now()
);

create index if not exists push_subscriptions_user_idx on public.push_subscriptions (user_id);

alter table public.push_subscriptions enable row level security;
