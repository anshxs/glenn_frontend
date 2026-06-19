import { NextRequest, NextResponse } from "next/server";
import {
  ensureDashboardAccess,
  ensureDashboardPermission,
  forbiddenResponse,
  getDashboardUserFromBearerToken,
  unauthorizedResponse,
} from "@/lib/dashboard-api";
import { uploadDashboardImage } from "@/lib/dashboard-imagekit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const uploadHistory = new Map<string, number[]>();
const maxUploadsPerMinute = 8;
const maxUploadsPerHour = 60;

function cleanOldEntries(userId: string) {
  const now = Date.now();
  const uploads = uploadHistory.get(userId) || [];
  const filtered = uploads.filter((timestamp) => now - timestamp < 3600000);

  if (filtered.length > 0) {
    uploadHistory.set(userId, filtered);
  } else {
    uploadHistory.delete(userId);
  }
}

function rateLimitError(userId: string) {
  cleanOldEntries(userId);
  const now = Date.now();
  const uploads = uploadHistory.get(userId) || [];
  const uploadsLastMinute = uploads.filter((timestamp) => now - timestamp < 60000).length;

  if (uploadsLastMinute >= maxUploadsPerMinute) {
    return `Rate limit exceeded: max ${maxUploadsPerMinute} uploads per minute.`;
  }

  if (uploads.length >= maxUploadsPerHour) {
    return `Rate limit exceeded: max ${maxUploadsPerHour} uploads per hour.`;
  }

  return null;
}

function recordUpload(userId: string) {
  const uploads = uploadHistory.get(userId) || [];
  uploads.push(Date.now());
  uploadHistory.set(userId, uploads);
}

function sanitizeFolder(value: FormDataEntryValue | null) {
  const folder =
    typeof value === "string" && value.trim()
      ? value.trim()
      : "dashboard/players";

  return folder.replace(/[^a-zA-Z0-9/_-]/g, "").replace(/^\/+/, "") || "dashboard/players";
}

async function looksLikeImage(file: File) {
  if (file.type.startsWith("image/")) {
    return true;
  }

  const lowerName = file.name.toLowerCase();
  return /\.(jpe?g|png|webp|gif)$/i.test(lowerName);
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

    if (
      !ensureDashboardPermission(auth.profile, "guild_management", "insert") &&
      !ensureDashboardPermission(auth.profile, "guild_management", "update")
    ) {
      return forbiddenResponse("You do not have permission to upload player images.");
    }

    const rateError = rateLimitError(auth.user.id);
    if (rateError) {
      return NextResponse.json({ error: rateError }, { status: 429 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = sanitizeFolder(formData.get("folder"));

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (!(await looksLikeImage(file))) {
      return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be 8 MB or smaller." },
        { status: 400 },
      );
    }

    const result = await uploadDashboardImage({
      file,
      folder,
      prefix: "glenn_dashboard",
      tags: ["glenn-dashboard", "guild-player"],
    });

    recordUpload(auth.user.id);

    return NextResponse.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
      filePath: result.filePath,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to upload image.",
      },
      { status: 500 },
    );
  }
}
