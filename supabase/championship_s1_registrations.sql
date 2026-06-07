create extension if not exists pgcrypto;

create table if not exists public.championship_s1_registrations (
  id uuid primary key default gen_random_uuid(),
  team_name text not null,
  players jsonb not null,
  joined_whatsapp_group boolean not null default false,
  followed_whatsapp_channel boolean not null default false,
  status text not null default 'verified',
  created_at timestamptz not null default now(),
  constraint championship_s1_player_count
    check (jsonb_typeof(players) = 'array' and jsonb_array_length(players) between 4 and 5)
);

create index if not exists championship_s1_registrations_created_at_idx
  on public.championship_s1_registrations (created_at desc);

alter table public.championship_s1_registrations enable row level security;

drop policy if exists "service role can manage championship season 1 registrations"
  on public.championship_s1_registrations;

create policy "service role can manage championship season 1 registrations"
  on public.championship_s1_registrations
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
