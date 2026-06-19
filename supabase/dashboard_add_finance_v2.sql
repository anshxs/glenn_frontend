-- Run this on an existing database to add the finance dashboard module back.

create table if not exists public.finance_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  entry_type text not null check (entry_type in ('add', 'subtract')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.finance_entries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  amount integer not null check (amount >= 0),
  entry_type text not null check (entry_type in ('add', 'subtract')),
  category_id uuid not null references public.finance_categories (id) on delete restrict,
  affects_utkarsh_balance boolean not null default false,
  balance_direction text check (balance_direction in ('increase', 'decrease')),
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint finance_entries_utkarsh_direction_check
    check (
      (affects_utkarsh_balance = false and balance_direction is null)
      or (affects_utkarsh_balance = true and balance_direction in ('increase', 'decrease'))
    )
);

create table if not exists public.finance_summary (
  id integer primary key default 1,
  utkarsh_balance integer not null default 0,
  updated_at timestamptz not null default timezone('utc', now()),
  constraint finance_summary_singleton check (id = 1)
);

insert into public.finance_summary (id, utkarsh_balance)
values (1, 0)
on conflict (id) do nothing;

create or replace function public.set_dashboard_table_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists finance_categories_set_updated_at on public.finance_categories;
create trigger finance_categories_set_updated_at
before update on public.finance_categories
for each row
execute function public.set_dashboard_table_updated_at();

drop trigger if exists finance_entries_set_updated_at on public.finance_entries;
create trigger finance_entries_set_updated_at
before update on public.finance_entries
for each row
execute function public.set_dashboard_table_updated_at();

drop trigger if exists finance_summary_set_updated_at on public.finance_summary;
create trigger finance_summary_set_updated_at
before update on public.finance_summary
for each row
execute function public.set_dashboard_table_updated_at();

alter table public.finance_categories enable row level security;
alter table public.finance_entries enable row level security;
alter table public.finance_summary enable row level security;

revoke all on public.finance_categories from anon, authenticated;
revoke all on public.finance_entries from anon, authenticated;
revoke all on public.finance_summary from anon, authenticated;

insert into public.finance_categories (name, entry_type)
values
  ('Prize Pool', 'add'),
  ('PP GLENN XTREME', 'add'),
  ('Scrims', 'subtract'),
  ('SCRIMS GLENN X', 'subtract'),
  ('SCRIMS GLENN XTREME', 'subtract'),
  ('SCRIMS GLENN KIWIS', 'subtract'),
  ('SCRIMS GLENN ALPHA', 'subtract'),
  ('Salary', 'subtract'),
  ('SALARY GLENN XTREME', 'subtract'),
  ('Promotion', 'subtract'),
  ('Other', 'subtract')
on conflict (name) do nothing;

comment on column public.userdata.dashboard_permissions is
'JSON permissions map like {"guild_management":["read","insert","update","delete"],"finance":["read","insert","update","delete"]}';
