-- Run this on an existing database to add staff management support.
-- No schema column is needed here because PointCalc access should use
-- the existing public.userdata.has_access field.

comment on column public.userdata.dashboard_permissions is
'JSON permissions map like {"guild_management":["read","insert","update","delete"],"finance":["read","insert","update","delete"],"staff_management":["read","update","delete"]}';
