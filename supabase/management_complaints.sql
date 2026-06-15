create extension if not exists pgcrypto;

create table if not exists public.management_complaints (
  id uuid primary key default gen_random_uuid(),
  complaint_type text not null
    check (complaint_type in ('management_member', 'management_general')),
  source_context text not null default 'general',
  target_name text,
  target_phone text,
  complaint_text text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  constraint management_complaints_target_required
    check (
      (complaint_type = 'management_general' and target_name is null and target_phone is null)
      or
      (complaint_type = 'management_member' and target_name is not null and target_phone is not null)
    )
);

create index if not exists management_complaints_created_at_idx
  on public.management_complaints (created_at desc);

alter table public.management_complaints enable row level security;

drop policy if exists "service role can manage management complaints"
  on public.management_complaints;

create policy "service role can manage management complaints"
  on public.management_complaints
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
