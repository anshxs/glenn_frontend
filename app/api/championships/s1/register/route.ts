import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type PlayerInput = {
  name?: unknown;
  phone?: unknown;
  uid?: unknown;
  ign?: unknown;
};

type RegisterInput = {
  teamName?: unknown;
  players?: unknown;
  joinedGroup?: unknown;
  followedChannel?: unknown;
};

const tableName = "championship_s1_registrations";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validatePlayer(player: PlayerInput, index: number, required: boolean) {
  const name = cleanText(player.name);
  const phone = cleanText(player.phone);
  const uid = cleanText(player.uid);
  const ign = cleanText(player.ign);
  const hasAnyValue = Boolean(name || phone || uid || ign);

  if (!required && !hasAnyValue) {
    return null;
  }

  if (!name || !phone || !uid || !ign) {
    throw new Error(`Player ${index + 1} needs name, phone, UID, and IGN.`);
  }

  return { name, phone, uid, ign };
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.CHAMPIONSHIP_SUPABASE_URL;
  const serviceRoleKey = process.env.CHAMPIONSHIP_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      {
        error:
          "Championship Supabase keys are not configured. Add CHAMPIONSHIP_SUPABASE_URL and CHAMPIONSHIP_SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 500 },
    );
  }

  let body: RegisterInput;

  try {
    body = (await request.json()) as RegisterInput;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const teamName = cleanText(body.teamName);

    if (!teamName) {
      return NextResponse.json(
        { error: "Team name is required." },
        { status: 400 },
      );
    }

    if (!Array.isArray(body.players) || body.players.length !== 5) {
      return NextResponse.json(
        { error: "Exactly 5 player slots are required." },
        { status: 400 },
      );
    }

    if (body.joinedGroup !== true || body.followedChannel !== true) {
      return NextResponse.json(
        {
          error:
            "You are not in the WhatsApp group/channel yet. Open both links before verification.",
        },
        { status: 400 },
      );
    }

    const players = body.players
      .map((player, index) =>
        validatePlayer(player as PlayerInput, index, index < 4),
      )
      .filter(Boolean);

    if (players.length < 4) {
      return NextResponse.json(
        { error: "Minimum 4 players are mandatory." },
        { status: 400 },
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase
      .from(tableName)
      .insert({
        team_name: teamName,
        players,
        joined_whatsapp_group: true,
        followed_whatsapp_channel: true,
        status: "verified",
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === "42P01" ? 500 : 400 },
      );
    }

    return NextResponse.json({ ok: true, registrationId: data.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed." },
      { status: 400 },
    );
  }
}
