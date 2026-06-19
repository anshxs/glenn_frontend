import { NextRequest, NextResponse } from "next/server";
import {
  createPointCalcDashboardAuthClient,
  getDashboardProfileByUserId,
} from "@/lib/pointcalc-dashboard-supabase";

type LoginBody = {
  email?: string;
  password?: string;
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginBody;
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const supabase = createPointCalcDashboardAuthClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      return NextResponse.json(
        { error: error?.message ?? "Unable to sign in." },
        { status: 401 },
      );
    }

    const profile = await getDashboardProfileByUserId(data.user.id);

    if (!profile) {
      return NextResponse.json(
        { error: "No dashboard profile found for this user." },
        { status: 403 },
      );
    }

    return NextResponse.json({
      authenticated: true,
      session: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at,
      },
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      profile,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to sign in right now.",
      },
      { status: 500 },
    );
  }
}
