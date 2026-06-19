import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  normalizeDashboardPermissions,
  type DashboardProfile,
} from "@/lib/dashboard-permissions";

const dashboardSupabaseUrl = process.env.CHAMPIONSHIP_SUPABASE_URL;
const dashboardSupabaseServiceRoleKey =
  process.env.CHAMPIONSHIP_SUPABASE_SERVICE_ROLE_KEY;

function requireEnv(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

export type PointCalcDashboardUserRow = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  has_access: boolean;
  dashboard_permissions: unknown;
};

export type GuildManagementPlayerRow = {
  id: string;
  player_name: string;
  in_game_name: string;
  photo_url: string | null;
  player_uid: string;
  created_at: string;
  updated_at: string;
};

export type FinanceCategoryRow = {
  id: string;
  name: string;
  entry_type: "add" | "subtract";
  created_at: string;
  updated_at: string;
};

export type FinanceEntryRow = {
  id: string;
  title: string;
  amount: number;
  entry_type: "add" | "subtract";
  category_id: string;
  category_name?: string;
  affects_utkarsh_balance: boolean;
  balance_direction: "increase" | "decrease" | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export function createPointCalcDashboardAuthClient(): SupabaseClient {
  return createClient(
    requireEnv(dashboardSupabaseUrl, "CHAMPIONSHIP_SUPABASE_URL"),
    requireEnv(
      dashboardSupabaseServiceRoleKey,
      "CHAMPIONSHIP_SUPABASE_SERVICE_ROLE_KEY",
    ),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}

export function createPointCalcDashboardServiceClient(): SupabaseClient {
  return createClient(
    requireEnv(dashboardSupabaseUrl, "CHAMPIONSHIP_SUPABASE_URL"),
    requireEnv(
      dashboardSupabaseServiceRoleKey,
      "CHAMPIONSHIP_SUPABASE_SERVICE_ROLE_KEY",
    ),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}

export async function getDashboardProfileByUserId(userId: string) {
  const client = createPointCalcDashboardServiceClient();
  const { data, error } = await client
    .from("userdata")
    .select("id, email, name, phone, has_access, dashboard_permissions")
    .eq("id", userId)
    .maybeSingle<PointCalcDashboardUserRow>();

  if (error) {
    throw new Error(error.message || "Unable to load dashboard user.");
  }

  if (!data) {
    return null;
  }

  const profile: DashboardProfile = {
    id: data.id,
    email: data.email,
    name: data.name,
    phone: data.phone,
    hasAccess: data.has_access,
    permissions: normalizeDashboardPermissions(data.dashboard_permissions),
  };

  return profile;
}
