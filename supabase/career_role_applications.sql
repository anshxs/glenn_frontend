create extension if not exists pgcrypto;

drop table if exists public.career_applications cascade;

create table if not exists public.scrims_host_pt_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_name text not null,
  applicant_phone text not null,
  experience_months integer not null check (experience_months >= 0),
  availability jsonb not null,
  is_flexible boolean not null default false,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists scrims_host_pt_applications_created_at_idx
  on public.scrims_host_pt_applications (created_at desc);

alter table public.scrims_host_pt_applications enable row level security;

drop policy if exists "service role can manage scrims host pt applications"
  on public.scrims_host_pt_applications;

create policy "service role can manage scrims host pt applications"
  on public.scrims_host_pt_applications
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create table if not exists public.graphic_designer_editor_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_name text not null,
  applicant_phone text not null,
  experience_months integer not null check (experience_months >= 0),
  description text not null,
  page_url text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists graphic_designer_editor_applications_created_at_idx
  on public.graphic_designer_editor_applications (created_at desc);

alter table public.graphic_designer_editor_applications enable row level security;

drop policy if exists "service role can manage graphic designer editor applications"
  on public.graphic_designer_editor_applications;

create policy "service role can manage graphic designer editor applications"
  on public.graphic_designer_editor_applications
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
