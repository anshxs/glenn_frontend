import { NextResponse } from "next/server";
import { createPointCalcDashboardServiceClient } from "@/lib/pointcalc-dashboard-supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const supabase = createPointCalcDashboardServiceClient();
    const { data, error } = await supabase
      .from("guild_management_players")
      .select(
        "id, player_name, in_game_name, photo_url, player_uid, date_of_birth, address, contact_number, created_at, updated_at",
      )
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ items: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load guild army." },
      { status: 500 },
    );
  }
}
