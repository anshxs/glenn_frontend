import { NextRequest, NextResponse } from "next/server";
import {
  ensureDashboardAccess,
  ensureDashboardPermission,
  forbiddenResponse,
  getDashboardUserFromBearerToken,
  unauthorizedResponse,
} from "@/lib/dashboard-api";
import {
  createPointCalcDashboardServiceClient,
  type PointCalcDashboardUserRow,
} from "@/lib/pointcalc-dashboard-supabase";
import {
  dashboardActions,
  dashboardSections,
  normalizeDashboardPermissions,
  type DashboardPermissions,
} from "@/lib/dashboard-permissions";

type StaffUpdateBody = {
  id?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  hasAccess?: unknown;
  dashboardPermissions?: unknown;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanBoolean(value: unknown) {
  return value === true;
}

function normalizePermissionsInput(value: unknown): DashboardPermissions {
  return normalizeDashboardPermissions(value);
}

export async function GET(request: NextRequest) {
  try {
    const auth = await getDashboardUserFromBearerToken(
      request.headers.get("authorization"),
    );

    if (!auth) {
      return unauthorizedResponse();
    }

    if (!ensureDashboardAccess(auth.profile)) {
      return forbiddenResponse("Dashboard access is disabled for this user.");
    }

    if (!ensureDashboardPermission(auth.profile, "staff_management", "read")) {
      return forbiddenResponse("You do not have read access for staff management.");
    }

    const supabase = createPointCalcDashboardServiceClient();
    const { data, error } = await supabase
      .from("userdata")
      .select("id, email, name, phone, has_access, dashboard_permissions")
      .order("name", { ascending: true })
      .order("email", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const items = ((data ?? []) as PointCalcDashboardUserRow[]).map((row) => ({
      id: row.id,
      email: row.email,
      name: row.name,
      phone: row.phone,
      hasAccess: row.has_access,
      dashboardPermissions: normalizeDashboardPermissions(row.dashboard_permissions),
    }));

    return NextResponse.json({
      items,
      sections: dashboardSections,
      actions: dashboardActions,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load staff users." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await getDashboardUserFromBearerToken(
      request.headers.get("authorization"),
    );

    if (!auth) {
      return unauthorizedResponse();
    }

    if (!ensureDashboardAccess(auth.profile)) {
      return forbiddenResponse("Dashboard access is disabled for this user.");
    }

    if (!ensureDashboardPermission(auth.profile, "staff_management", "update")) {
      return forbiddenResponse("You do not have update access for staff management.");
    }

    const body = (await request.json()) as StaffUpdateBody;
    const id = cleanText(body.id);
    const name = cleanText(body.name);
    const email = cleanText(body.email).toLowerCase();
    const phone = cleanText(body.phone);
    const hasAccess = cleanBoolean(body.hasAccess);
    const dashboardPermissions = normalizePermissionsInput(body.dashboardPermissions);

    if (!id || !email) {
      return NextResponse.json(
        { error: "User id and email are required." },
        { status: 400 },
      );
    }

    const supabase = createPointCalcDashboardServiceClient();
    const { data, error } = await supabase
      .from("userdata")
      .update({
        name: name || null,
        email,
        phone: phone || null,
        has_access: hasAccess,
        dashboard_permissions: dashboardPermissions,
      })
      .eq("id", id)
      .select("id, email, name, phone, has_access, dashboard_permissions")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: error?.message || "Unable to update user." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      item: {
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        hasAccess: data.has_access,
        dashboardPermissions: normalizeDashboardPermissions(data.dashboard_permissions),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update user." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await getDashboardUserFromBearerToken(
      request.headers.get("authorization"),
    );

    if (!auth) {
      return unauthorizedResponse();
    }

    if (!ensureDashboardAccess(auth.profile)) {
      return forbiddenResponse("Dashboard access is disabled for this user.");
    }

    if (!ensureDashboardPermission(auth.profile, "staff_management", "delete")) {
      return forbiddenResponse("You do not have delete access for staff management.");
    }

    const id = request.nextUrl.searchParams.get("id")?.trim() ?? "";
    if (!id) {
      return NextResponse.json({ error: "User id is required." }, { status: 400 });
    }

    const supabase = createPointCalcDashboardServiceClient();
    const { error } = await supabase
      .from("userdata")
      .update({
        has_access: false,
        dashboard_permissions: {},
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to reset user access." },
      { status: 500 },
    );
  }
}
