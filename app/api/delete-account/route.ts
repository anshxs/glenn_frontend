import { NextRequest, NextResponse } from "next/server";

import { createPointCalcAccountServiceClient } from "@/lib/pointcalc-account-supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type DeleteTarget = {
  table: string;
  columns: string[];
};

const DELETE_TARGETS: DeleteTarget[] = [
  { table: "community_comment_likes", columns: ["user_id"] },
  { table: "community_comments", columns: ["user_id"] },
  { table: "community_likes", columns: ["user_id"] },
  { table: "community_messages", columns: ["user_id"] },
  { table: "directmsgs", columns: ["sender_id", "receiver_id"] },
  { table: "blocked_users", columns: ["blocked_id", "blocker_id"] },
  { table: "followers", columns: ["follower_id", "following_id"] },
  { table: "user_notifications", columns: ["user_id"] },
  { table: "user_stories", columns: ["user_id"] },
  { table: "user_game_profiles", columns: ["user_id"] },
  { table: "user_feedback", columns: ["user_id"] },
  { table: "user_gem_checkins", columns: ["user_id"] },
  { table: "user_gem_weekly_spins", columns: ["user_id"] },
  { table: "user_gem_mini_game_plays", columns: ["user_id"] },
  { table: "user_map_strategies", columns: ["user_id"] },
  { table: "user_referrals", columns: ["referrer_user_id", "referred_user_id"] },
  { table: "team_builder_interactions", columns: ["actor_id", "target_id"] },
  { table: "tournament_participants", columns: ["user_id"] },
  { table: "tournament_results", columns: ["user_id"] },
  { table: "rewarded_ad_claim_sessions", columns: ["user_id"] },
  { table: "transactions", columns: ["user_id"] },
  { table: "wallets", columns: ["user_id"] },
  { table: "world_chat_messages", columns: ["user_id"] },
  { table: "world_chat_reads", columns: ["user_id"] },
  { table: "game_world_chat_reads", columns: ["user_id"] },
  { table: "chat_group_members", columns: ["user_id"] },
  { table: "chat_group_invites", columns: ["invited_user_id", "invited_by"] },
  { table: "chat_group_messages", columns: ["user_id"] },
  { table: "chat_groups", columns: ["owner_id"] },
  { table: "organiser_requests", columns: ["user_id"] },
  { table: "organisers", columns: ["user_id"] },
  { table: "organiser_transactions", columns: ["organiser_id"] },
  { table: "organisers_flagged", columns: ["organiser_id"] },
  { table: "orders", columns: ["user_id"] },
  { table: "editor_orders", columns: ["user_id"] },
  { table: "editor_order_ratings", columns: ["user_id"] },
  { table: "editor_free_edit_claims", columns: ["user_id"] },
  { table: "designers", columns: ["user_id"] },
  { table: "paymentissues", columns: ["user_id"] },
  { table: "user_task_reward_claims", columns: ["user_id"] },
  { table: "user_daily_task_reward_claims", columns: ["user_id"] },
  { table: "user_sponsored_task_status", columns: ["user_id"] },
  { table: "user_quiz_responses", columns: ["user_id"] },
];

const POST_DELETE_TARGETS: DeleteTarget[] = [
  { table: "notifications", columns: ["user_id"] },
  { table: "app_security_flags", columns: ["user_id"] },
  { table: "app_error_logs", columns: ["user_id"] },
  { table: "sensitive_userdata", columns: ["id"] },
  { table: "userdata", columns: ["id"] },
  { table: "pointcalc_final_standings", columns: ["user_id"] },
];

function isIgnorableDeleteError(error: unknown) {
  const messageParts: string[] = [];

  if (error instanceof Error) {
    messageParts.push(error.message);
  } else if (typeof error === "object" && error !== null) {
    const maybeError = error as {
      message?: unknown;
      details?: unknown;
      hint?: unknown;
      code?: unknown;
    };

    if (typeof maybeError.message === "string") messageParts.push(maybeError.message);
    if (typeof maybeError.details === "string") messageParts.push(maybeError.details);
    if (typeof maybeError.hint === "string") messageParts.push(maybeError.hint);
    if (typeof maybeError.code === "string") messageParts.push(maybeError.code);
  } else {
    messageParts.push(String(error));
  }

  const message = messageParts.join(" ").toLowerCase();

  return (
    message.includes("relation") ||
    message.includes("column") ||
    message.includes("schema cache") ||
    message.includes("does not exist") ||
    message.includes("could not find the") ||
    message.includes("pgrst")
  );
}

async function deleteByColumn(
  client: ReturnType<typeof createPointCalcAccountServiceClient>,
  table: string,
  column: string,
  userId: string,
) {
  const { error } = await client.from(table).delete().eq(column, userId);

  if (error && !isIgnorableDeleteError(error)) {
    throw new Error(`${table}.${column}: ${error.message}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Missing bearer token." },
        { status: 401 },
      );
    }

    const accessToken = authHeader.slice(7);
    const supabase = createPointCalcAccountServiceClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: userError?.message ?? "Invalid session.",
        },
        { status: 401 },
      );
    }

    for (const target of DELETE_TARGETS) {
      for (const column of target.columns) {
        await deleteByColumn(supabase, target.table, column, user.id);
      }
    }

    let usedSoftDelete = false;

    const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(user.id);
    if (deleteAuthError) {
      const { error: softDeleteError } = await supabase.auth.admin.deleteUser(
        user.id,
        true,
      );

      if (softDeleteError) {
        throw new Error(`auth.users: ${deleteAuthError.message}`);
      }

      usedSoftDelete = true;
    }

    for (const target of POST_DELETE_TARGETS) {
      for (const column of target.columns) {
        await deleteByColumn(supabase, target.table, column, user.id);
      }
    }

    return NextResponse.json({
      success: true,
      deletedUserId: user.id,
      mode: usedSoftDelete ? "soft-delete" : "hard-delete",
      message: usedSoftDelete
        ? "Your account has been deleted from sign-in access and linked app data was cleaned up."
        : "Your account and linked data have been deleted.",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      {
        error: "Delete failed",
        message:
          error instanceof Error
            ? error.message
            : "Unable to delete the account right now.",
      },
      { status: 500 },
    );
  }
}
