-- Run this on an existing database where the finance dashboard module
-- was already created and you want to remove it safely.

drop trigger if exists finance_entries_set_updated_at on public.finance_entries;
drop table if exists public.finance_entries;

comment on column public.userdata.dashboard_permissions is
'JSON permissions map like {"guild_management":["read","insert","update","delete"]}';

-- Optional cleanup for existing users who still have finance permissions saved.
update public.userdata
set dashboard_permissions = dashboard_permissions - 'finance'
where dashboard_permissions ? 'finance';
