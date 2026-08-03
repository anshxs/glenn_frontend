import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const pointCalcSupabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_POINTCALC_SUPABASE_URL ||
  process.env.POINTCALC_SUPABASE_URL ||
  "https://uihvridcuqcacpkoopru.supabase.co";
const pointCalcSupabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_POINTCALC_SUPABASE_ANON_KEY ||
  process.env.POINTCALC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpaHZyaWRjdXFjYWNwa29vcHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NzEwMjgsImV4cCI6MjA3MzM0NzAyOH0.5UL_My89bFqfdchCsYvmWMNqv7v-a901GT8GKwNUvYo";
const pointCalcSupabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.POINTCALC_SUPABASE_SERVICE_ROLE_KEY;

function requireEnv(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

export function createPointCalcAccountBrowserClient(): SupabaseClient {
  return createClient(
    requireEnv(
      pointCalcSupabaseUrl,
      "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_POINTCALC_SUPABASE_URL or POINTCALC_SUPABASE_URL",
    ),
    requireEnv(
      pointCalcSupabaseAnonKey,
      "NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_POINTCALC_SUPABASE_ANON_KEY or POINTCALC_SUPABASE_ANON_KEY",
    ),
  );
}

export function createPointCalcAccountServiceClient(): SupabaseClient {
  return createClient(
    requireEnv(
      pointCalcSupabaseUrl,
      "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_POINTCALC_SUPABASE_URL or POINTCALC_SUPABASE_URL",
    ),
    requireEnv(
      pointCalcSupabaseServiceRoleKey,
      "SUPABASE_SERVICE_ROLE_KEY or POINTCALC_SUPABASE_SERVICE_ROLE_KEY",
    ),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
