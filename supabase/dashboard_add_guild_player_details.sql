-- Run this on an existing database to add more player fields for guild management.

alter table public.guild_management_players
add column if not exists date_of_birth date;

alter table public.guild_management_players
add column if not exists address text;

alter table public.guild_management_players
add column if not exists contact_number text;
