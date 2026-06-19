alter table public.userdata
add column if not exists dashboard_permissions jsonb not null default '{}'::jsonb;

create table if not exists public.guild_management_players (
  id uuid primary key default gen_random_uuid(),
  player_name text not null,
  in_game_name text not null,
  photo_url text,
  player_uid text not null unique,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_dashboard_table_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists guild_management_players_set_updated_at on public.guild_management_players;
create trigger guild_management_players_set_updated_at
before update on public.guild_management_players
for each row
execute function public.set_dashboard_table_updated_at();

alter table public.guild_management_players enable row level security;

revoke all on public.guild_management_players from anon, authenticated;

comment on column public.userdata.dashboard_permissions is
'JSON permissions map like {"guild_management":["read","insert","update","delete"],"finance":["read","insert","update","delete"],"staff_management":["read","update","delete"]}';
