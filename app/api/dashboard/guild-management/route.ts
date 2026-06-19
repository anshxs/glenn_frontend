import { NextRequest, NextResponse } from "next/server";
import {
  ensureDashboardAccess,
  ensureDashboardPermission,
  forbiddenResponse,
  getDashboardUserFromBearerToken,
  unauthorizedResponse,
} from "@/lib/dashboard-api";
import { createPointCalcDashboardServiceClient } from "@/lib/pointcalc-dashboard-supabase";

type GuildPlayerInput = {
  playerName?: unknown;
  inGameName?: unknown;
  photoUrl?: unknown;
  playerUid?: unknown;
  dateOfBirth?: unknown;
  address?: unknown;
  contactNumber?: unknown;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
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

    if (!ensureDashboardPermission(auth.profile, "guild_management", "read")) {
      return forbiddenResponse("You do not have read access for guild management.");
    }

    const supabase = createPointCalcDashboardServiceClient();
    const { data, error } = await supabase
      .from("guild_management_players")
      .select("id, player_name, in_game_name, photo_url, player_uid, date_of_birth, address, contact_number, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ items: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load players." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
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

    if (!ensureDashboardPermission(auth.profile, "guild_management", "insert")) {
      return forbiddenResponse("You do not have create access for guild management.");
    }

    const body = (await request.json()) as GuildPlayerInput;
    const playerName = cleanText(body.playerName);
    const inGameName = cleanText(body.inGameName);
    const photoUrl = cleanText(body.photoUrl);
    const playerUid = cleanText(body.playerUid);
    const dateOfBirth = cleanText(body.dateOfBirth);
    const address = cleanText(body.address);
    const contactNumber = cleanText(body.contactNumber);

    if (!playerName || !inGameName || !playerUid) {
      return NextResponse.json(
        { error: "Player name, in-game name, and UID are required." },
        { status: 400 },
      );
    }

    const supabase = createPointCalcDashboardServiceClient();
    const { data, error } = await supabase
      .from("guild_management_players")
      .insert({
        player_name: playerName,
        in_game_name: inGameName,
        photo_url: photoUrl || null,
        player_uid: playerUid,
        date_of_birth: dateOfBirth || null,
        address: address || null,
        contact_number: contactNumber || null,
        created_by: auth.user.id,
      })
      .select("id, player_name, in_game_name, photo_url, player_uid, date_of_birth, address, contact_number, created_at, updated_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ item: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create player." },
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

    if (!ensureDashboardPermission(auth.profile, "guild_management", "update")) {
      return forbiddenResponse("You do not have update access for guild management.");
    }

    const body = (await request.json()) as GuildPlayerInput & { id?: unknown };
    const id = cleanText(body.id);
    const playerName = cleanText(body.playerName);
    const inGameName = cleanText(body.inGameName);
    const photoUrl = cleanText(body.photoUrl);
    const playerUid = cleanText(body.playerUid);
    const dateOfBirth = cleanText(body.dateOfBirth);
    const address = cleanText(body.address);
    const contactNumber = cleanText(body.contactNumber);

    if (!id || !playerName || !inGameName || !playerUid) {
      return NextResponse.json(
        { error: "Id, player name, in-game name, and UID are required." },
        { status: 400 },
      );
    }

    const supabase = createPointCalcDashboardServiceClient();
    const { data, error } = await supabase
      .from("guild_management_players")
      .update({
        player_name: playerName,
        in_game_name: inGameName,
        photo_url: photoUrl || null,
        player_uid: playerUid,
        date_of_birth: dateOfBirth || null,
        address: address || null,
        contact_number: contactNumber || null,
      })
      .eq("id", id)
      .select("id, player_name, in_game_name, photo_url, player_uid, date_of_birth, address, contact_number, created_at, updated_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ item: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update player." },
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

    if (!ensureDashboardPermission(auth.profile, "guild_management", "delete")) {
      return forbiddenResponse("You do not have delete access for guild management.");
    }

    const id = request.nextUrl.searchParams.get("id")?.trim() ?? "";
    if (!id) {
      return NextResponse.json({ error: "Player id is required." }, { status: 400 });
    }

    const supabase = createPointCalcDashboardServiceClient();
    const { error } = await supabase
      .from("guild_management_players")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to delete player." },
      { status: 500 },
    );
  }
}
