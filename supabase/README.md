# Championship Supabase Setup

The Season 1 registration API uses a separate Supabase project from the main
GLENN app database.

Add these environment variables to `.env` locally and to the website deployment:

```bash
CHAMPIONSHIP_SUPABASE_URL=
CHAMPIONSHIP_SUPABASE_SERVICE_ROLE_KEY=
```

Run `championship_s1_registrations.sql` in that separate Supabase project's SQL
editor before opening registrations.
