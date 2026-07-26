-- SaaS subscription billing for Physiome (clinic / solo practice / individual
-- patient). This is Physiome charging its customers, and is deliberately kept
-- separate from the pre-existing packages/invoices/payments tables, which are
-- a clinic charging its own patients.
--
-- NOTE: public.clinic_subscriptions is DEPRECATED as of this migration. It is
-- backfilled into public.subscriptions below and then never written again. It
-- is intentionally NOT dropped, so rolling back the Edge Function alone is a
-- safe way to undo this release.
--
-- Access is enforced by the "api" Edge Function (service role); RLS is enabled
-- with no policies so anon/authenticated clients cannot read these tables
-- directly, consistent with every other table in this schema.

-- ---------------------------------------------------------------------------
-- Plan catalogue. Prices live here rather than in JSX so they can be corrected
-- without a deploy.
-- ---------------------------------------------------------------------------
create table if not exists public.subscription_plans (
  id                   uuid primary key default gen_random_uuid(),
  code                 text not null unique,
  name_id              text not null,
  name_en              text not null,
  description_id       text,
  description_en       text,
  audience             text not null check (audience in ('clinic', 'solo', 'patient', 'internal')),
  subject_kind         text not null check (subject_kind in ('clinic', 'user')),
  price_idr            integer not null check (price_idr >= 0),
  period_months        integer not null default 0 check (period_months >= 0),
  period_days          integer not null default 0 check (period_days >= 0),
  max_therapists       integer,   -- null = unlimited
  max_active_patients  integer,   -- null = unlimited
  features             jsonb not null default '{"id": [], "en": []}'::jsonb,
  is_public            boolean not null default false,
  is_active            boolean not null default true,
  sort_order           integer not null default 0,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  constraint subscription_plans_has_period check (period_months > 0 or period_days > 0)
);

comment on column public.subscription_plans.is_public is
  'Whether the plan is offered on the public pricing page. Paid plans ship seeded false with placeholder prices, and are switched on from the super-admin console once real prices are set.';

-- ---------------------------------------------------------------------------
-- Subscriptions. One table serves all three market segments via a polymorphic
-- subject: a clinic (covers both multi-therapist clinics and solo practices,
-- which are just clinics with max_therapists = 1) OR an individual user (B2C
-- patients under the house clinic). Exactly one of the two is always set.
--
-- One table rather than two because enforcement has to answer "what governs
-- this actor?" in a single query. Two tables would make every consumer -- the
-- write gate, the cron sweep, the webhook, /auth/me -- branch twice, and those
-- branches would drift.
-- ---------------------------------------------------------------------------
create table if not exists public.subscriptions (
  id                          uuid primary key default gen_random_uuid(),
  clinic_id                   uuid references public.clinics(id) on delete cascade,
  user_id                     uuid references public.users(id) on delete cascade,
  plan_code                   text not null references public.subscription_plans(code),
  status                      text not null default 'trialing'
                                check (status in ('trialing', 'active', 'past_due', 'expired', 'cancelled')),
  current_period_start        timestamptz not null default now(),
  current_period_end          timestamptz not null,
  grace_until                 timestamptz not null,
  cancel_at_period_end        boolean not null default false,
  source                      text not null default 'midtrans'
                                check (source in ('midtrans', 'manual', 'trial')),
  last_payment_transaction_id uuid,
  reminder_stage              text,
  last_reminder_sent_at       timestamptz,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now(),
  constraint subscriptions_subject_xor check (
    (clinic_id is not null and user_id is null) or
    (clinic_id is null and user_id is not null)
  )
);

comment on column public.subscriptions.grace_until is
  'End of the 7-day read-only grace period. Past this point writes are refused with HTTP 402; reads always stay open.';
comment on column public.subscriptions.reminder_stage is
  'Last rung of the reminder ladder sent (h7/h3/h1/expired/grace_end). Reset to NULL on payment so a renewal restarts the ladder.';

create unique index if not exists subscriptions_clinic_uniq
  on public.subscriptions (clinic_id) where clinic_id is not null;
create unique index if not exists subscriptions_user_uniq
  on public.subscriptions (user_id) where user_id is not null;
create index if not exists subscriptions_sweep_idx
  on public.subscriptions (status, current_period_end);
create index if not exists subscriptions_grace_idx
  on public.subscriptions (grace_until);

-- ---------------------------------------------------------------------------
-- Midtrans orders. One row per checkout attempt.
-- ---------------------------------------------------------------------------
create table if not exists public.payment_transactions (
  id                      uuid primary key default gen_random_uuid(),
  order_id                text not null unique,
  subscription_id         uuid references public.subscriptions(id) on delete set null,
  clinic_id               uuid references public.clinics(id) on delete set null,
  user_id                 uuid references public.users(id) on delete set null,
  plan_code               text not null references public.subscription_plans(code),
  gross_amount            integer not null,
  status                  text not null default 'pending'
                            check (status in ('pending', 'settlement', 'capture', 'deny',
                                              'cancel', 'expire', 'failure', 'refund')),
  payment_type            text,
  midtrans_transaction_id text,
  fraud_status            text,
  snap_token              text,
  snap_redirect_url       text,
  transaction_time        timestamptz,
  settlement_time         timestamptz,
  expires_at              timestamptz,
  signature_verified      boolean not null default false,
  applied_at              timestamptz,
  raw_charge_response     jsonb,
  raw_notification        jsonb,
  created_by              uuid references public.users(id) on delete set null,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

comment on column public.payment_transactions.order_id is
  'The order_id sent to Midtrans. Midtrans requires this to be unique per merchant forever, so a retried payment always mints a new one.';
comment on column public.payment_transactions.applied_at is
  'Idempotency latch. NULL until this payment has extended a subscription, then set exactly once. Midtrans retries notifications; only the first caller past the latch may extend.';

create index if not exists payment_transactions_subject_idx
  on public.payment_transactions (clinic_id, user_id, created_at desc);
create index if not exists payment_transactions_pending_idx
  on public.payment_transactions (status, created_at) where status = 'pending';

alter table public.subscription_plans   enable row level security;
alter table public.subscriptions        enable row level security;
alter table public.payment_transactions enable row level security;

-- ---------------------------------------------------------------------------
-- House clinic marker: the clinic that automatically owns B2C patients who
-- sign up from the public internet. The partial unique index guarantees at
-- most one.
-- ---------------------------------------------------------------------------
alter table public.clinics
  add column if not exists is_house_clinic boolean not null default false;

comment on column public.clinics.is_house_clinic is
  'TRUE for the single clinic that manages direct-to-consumer patients. At most one row may be true.';

create unique index if not exists clinics_single_house_idx
  on public.clinics (is_house_clinic) where is_house_clinic;

-- ---------------------------------------------------------------------------
-- Applying a payment to a subscription.
--
-- This lives in Postgres rather than the Edge Function because the period
-- extension is a read-modify-write. Two concurrent Midtrans retries landing on
-- a warm and a cold isolate would both read the same current_period_end and
-- each add a month. The UPDATE ... WHERE applied_at IS NULL below is an atomic
-- latch: only one caller per order_id ever gets past it.
-- ---------------------------------------------------------------------------
create or replace function public.apply_subscription_payment(p_order_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_txn  public.payment_transactions%rowtype;
  v_plan public.subscription_plans%rowtype;
  v_sub  public.subscriptions%rowtype;
  v_base timestamptz;
  v_end  timestamptz;
  v_found boolean := false;
begin
  update public.payment_transactions
     set applied_at = now(), updated_at = now()
   where order_id = p_order_id
     and applied_at is null
  returning * into v_txn;

  if not found then
    return jsonb_build_object('applied', false, 'reason', 'already_applied_or_unknown');
  end if;

  select * into v_plan from public.subscription_plans where code = v_txn.plan_code;
  if not found then
    return jsonb_build_object('applied', false, 'reason', 'unknown_plan');
  end if;

  select * into v_sub
    from public.subscriptions
   where (v_txn.clinic_id is not null and clinic_id = v_txn.clinic_id)
      or (v_txn.user_id is not null and user_id = v_txn.user_id)
     for update;
  v_found := found;

  -- A paying subject renewing before expiry stacks onto the remaining period.
  -- A trialing subject does not: the unused trial days are dropped so the paid
  -- period starts now.
  if v_found and v_sub.status <> 'trialing' and v_sub.current_period_end > now() then
    v_base := v_sub.current_period_end;
  else
    v_base := now();
  end if;

  v_end := v_base
         + make_interval(months => v_plan.period_months)
         + make_interval(days => v_plan.period_days);

  if v_found then
    update public.subscriptions
       set plan_code = v_plan.code,
           status = 'active',
           current_period_start = case
             when v_sub.status = 'active' and v_sub.current_period_end > now()
               then v_sub.current_period_start
             else now()
           end,
           current_period_end = v_end,
           grace_until = v_end + interval '7 days',
           cancel_at_period_end = false,
           source = 'midtrans',
           last_payment_transaction_id = v_txn.id,
           reminder_stage = null,
           last_reminder_sent_at = null,
           updated_at = now()
     where id = v_sub.id
    returning * into v_sub;
  else
    insert into public.subscriptions
      (clinic_id, user_id, plan_code, status, current_period_start,
       current_period_end, grace_until, source, last_payment_transaction_id)
    values
      (v_txn.clinic_id, v_txn.user_id, v_plan.code, 'active', now(),
       v_end, v_end + interval '7 days', 'midtrans', v_txn.id)
    returning * into v_sub;
  end if;

  update public.payment_transactions
     set subscription_id = v_sub.id, updated_at = now()
   where id = v_txn.id;

  return jsonb_build_object(
    'applied', true,
    'subscription_id', v_sub.id,
    'clinic_id', v_sub.clinic_id,
    'user_id', v_sub.user_id,
    'plan_code', v_sub.plan_code,
    'current_period_end', v_sub.current_period_end,
    'grace_until', v_sub.grace_until
  );
end;
$$;

revoke all on function public.apply_subscription_payment(text) from public;
revoke all on function public.apply_subscription_payment(text) from anon;
revoke all on function public.apply_subscription_payment(text) from authenticated;
