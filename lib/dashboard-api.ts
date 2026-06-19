import { NextResponse } from "next/server";
import {
  createPointCalcDashboardAuthClient,
  getDashboardProfileByUserId,
} from "@/lib/pointcalc-dashboard-supabase";
import {
  hasDashboardAction,
  type DashboardAction,
  type DashboardProfile,
  type DashboardSectionKey,
} from "@/lib/dashboard-permissions";

export async function getDashboardUserFromBearerToken(
  authHeader: string | null,
) {
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const accessToken = authHeader.slice(7);
  if (!accessToken) {
    return null;
  }

  const supabase = createPointCalcDashboardAuthClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return null;
  }

  const profile = await getDashboardProfileByUserId(user.id);
  if (!profile) {
    return null;
  }

  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email ?? profile.email,
    },
    profile,
  };
}

export function ensureDashboardAccess(profile: DashboardProfile) {
  return profile.hasAccess;
}

export function ensureDashboardPermission(
  profile: DashboardProfile,
  section: DashboardSectionKey,
  action: DashboardAction,
) {
  return hasDashboardAction(profile.permissions, section, action);
}

export function unauthorizedResponse(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbiddenResponse(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}
