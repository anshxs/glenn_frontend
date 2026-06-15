import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type ApplyInput = {
  roleSlug?: unknown;
  applicantName?: unknown;
  applicantPhone?: unknown;
  experienceMonths?: unknown;
  availability?: unknown;
  isFlexible?: unknown;
  description?: unknown;
  pageUrl?: unknown;
};

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

export async function POST(request: Request) {
  let body: ApplyInput;

  try {
    body = (await request.json()) as ApplyInput;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const roleSlug = cleanText(body.roleSlug);
    const applicantName = cleanText(body.applicantName);
    const applicantPhone = cleanText(body.applicantPhone);
    const experienceMonths = Number(body.experienceMonths);
    const description = cleanText(body.description);
    const pageUrl = cleanText(body.pageUrl);
    const availability =
      typeof body.availability === "object" && body.availability !== null
        ? body.availability
        : null;
    const isFlexible = body.isFlexible === true;

    if (!roleSlug) {
      return NextResponse.json(
        { error: "Role is required." },
        { status: 400 },
      );
    }

    if (!applicantName || !applicantPhone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(experienceMonths) || experienceMonths < 0) {
      return NextResponse.json(
        { error: "Experience in months must be a valid number." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseClient();
    let data: { id: string } | null = null;
    let error: { message: string; code?: string } | null = null;

    if (roleSlug === "scrims-host-pt-maker") {
      if (!availability || Object.keys(availability).length === 0) {
        return NextResponse.json(
          { error: "Choose availability before submitting." },
          { status: 400 },
        );
      }

      const result = await supabase
        .from("scrims_host_pt_applications")
        .insert({
          applicant_name: applicantName,
          applicant_phone: applicantPhone,
          experience_months: experienceMonths,
          availability,
          is_flexible: isFlexible,
          status: "new",
        })
        .select("id")
        .single();

      data = result.data;
      error = result.error;
    } else if (roleSlug === "graphic-designer-editor") {
      if (!description) {
        return NextResponse.json(
          { error: "Description is required." },
          { status: 400 },
        );
      }

      if (!pageUrl) {
        return NextResponse.json(
          { error: "Page URL is required." },
          { status: 400 },
        );
      }

      const result = await supabase
        .from("graphic_designer_editor_applications")
        .insert({
          applicant_name: applicantName,
          applicant_phone: applicantPhone,
          experience_months: experienceMonths,
          description,
          page_url: pageUrl,
          status: "new",
        })
        .select("id")
        .single();

      data = result.data;
      error = result.error;
    } else {
      return NextResponse.json(
        { error: "Unsupported role." },
        { status: 400 },
      );
    }

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.code === "42P01" ? 500 : 400 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Application failed." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, applicationId: data.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Application failed." },
      { status: 500 },
    );
  }
}
