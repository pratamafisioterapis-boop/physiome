-- Web Push subscriptions, so the "api" Edge Function can notify a user's
-- browser(s) about new chat messages even when the app isn't open.
-- One row per browser/device subscription; a user can have several (phone +
-- desktop, etc). Access is enforced by the "api" Edge Function (service
-- role); RLS is enabled with no policies, consistent with every other table.

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
