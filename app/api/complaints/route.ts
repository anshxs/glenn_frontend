import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type ComplaintInput = {
  complaintType?: unknown;
  sourceContext?: unknown;
  targetName?: unknown;
  targetPhone?: unknown;
  complaintText?: unknown;
};

const usersTable = "userdata";
const complaintsTable = "management_complaints";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Main Supabase keys are not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from(usersTable)
      .select("name, phone")
      .not("name", "is", null)
      .not("phone", "is", null);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === "42P01" ? 500 : 400 },
      );
    }

    const seen = new Set<string>();
    const people =
      (data ?? [])
        .map((row) => ({
          name: cleanText(row?.name),
          phone: cleanText(row?.phone),
        }))
        .filter((player) => player.name && player.phone)
        .filter((player) => {
          const key = `${player.name}::${player.phone}`;
          if (seen.has(key)) {
            return false;
          }
          seen.add(key);
          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ ok: true, people });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load people." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: ComplaintInput;

  try {
    body = (await request.json()) as ComplaintInput;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseClient();
    const complaintType = cleanText(body.complaintType);
    const sourceContext = cleanText(body.sourceContext) || "general";
    const targetName = cleanText(body.targetName);
    const targetPhone = cleanText(body.targetPhone);
    const complaintText = cleanText(body.complaintText);

    if (
      complaintType !== "management_member" &&
      complaintType !== "management_general"
    ) {
      return NextResponse.json(
        { error: "Choose a valid complaint type." },
        { status: 400 },
      );
    }

    if (!complaintText) {
      return NextResponse.json(
        { error: "Complaint text is required." },
        { status: 400 },
      );
    }

    if (
      complaintType === "management_member" &&
      (!targetName || !targetPhone)
    ) {
      return NextResponse.json(
        { error: "Choose a person for a management complaint." },
        { status: 400 },
      );
    }

    const payload =
      complaintType === "management_general"
        ? {
            complaint_type: complaintType,
            source_context: sourceContext,
            target_name: null,
            target_phone: null,
            complaint_text: complaintText,
            status: "open",
          }
        : {
            complaint_type: complaintType,
            source_context: sourceContext,
            target_name: targetName,
            target_phone: targetPhone,
            complaint_text: complaintText,
            status: "open",
          };

    const { data, error } = await supabase
      .from(complaintsTable)
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === "42P01" ? 500 : 400 },
      );
    }

    return NextResponse.json({ ok: true, complaintId: data.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Complaint failed." },
      { status: 500 },
    );
  }
}
