import { NextRequest, NextResponse } from "next/server";
import { getDashboardUserFromBearerToken, unauthorizedResponse } from "@/lib/dashboard-api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const auth = await getDashboardUserFromBearerToken(
      request.headers.get("authorization"),
    );

    if (!auth) {
      return unauthorizedResponse("Missing or invalid bearer token.");
    }

    return NextResponse.json({
      authenticated: true,
      user: auth.user,
      profile: auth.profile,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to load dashboard profile.",
      },
      { status: 500 },
    );
  }
}
