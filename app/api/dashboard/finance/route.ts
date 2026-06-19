import { NextRequest, NextResponse } from "next/server";
import {
  ensureDashboardAccess,
  ensureDashboardPermission,
  forbiddenResponse,
  getDashboardUserFromBearerToken,
  unauthorizedResponse,
} from "@/lib/dashboard-api";
import { createPointCalcDashboardServiceClient } from "@/lib/pointcalc-dashboard-supabase";

type FinanceInput = {
  title?: unknown;
  amount?: unknown;
  entryType?: unknown;
  categoryId?: unknown;
  categoryName?: unknown;
  affectsUtkarshBalance?: unknown;
  balanceDirection?: unknown;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanAmount(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.round(value));
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value.trim(), 10);
    if (Number.isFinite(parsed)) {
      return Math.max(0, parsed);
    }
  }

  return Number.NaN;
}

function cleanEntryType(value: unknown): "add" | "subtract" | null {
  return value === "add" || value === "subtract" ? value : null;
}

function cleanBalanceDirection(value: unknown): "increase" | "decrease" | null {
  return value === "increase" || value === "decrease" ? value : null;
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

    if (!ensureDashboardPermission(auth.profile, "finance", "read")) {
      return forbiddenResponse("You do not have read access for finances.");
    }

    const supabase = createPointCalcDashboardServiceClient();

    const [{ data: categories, error: categoriesError }, { data: entries, error: entriesError }, { data: summary, error: summaryError }] =
      await Promise.all([
        supabase
          .from("finance_categories")
          .select("id, name, entry_type, created_at, updated_at")
          .order("entry_type", { ascending: true })
          .order("name", { ascending: true }),
        supabase
          .from("finance_entries")
          .select("id, title, amount, entry_type, category_id, affects_utkarsh_balance, balance_direction, created_by, created_at, updated_at, finance_categories(name)")
          .order("created_at", { ascending: false }),
        supabase.from("finance_summary").select("utkarsh_balance").eq("id", 1).maybeSingle(),
      ]);

    if (categoriesError || entriesError || summaryError) {
      return NextResponse.json(
        {
          error:
            categoriesError?.message ||
            entriesError?.message ||
            summaryError?.message ||
            "Unable to load finances.",
        },
        { status: 400 },
      );
    }

    const items =
      entries?.map((entry) => ({
        ...entry,
        category_name:
          Array.isArray(entry.finance_categories)
            ? entry.finance_categories[0]?.name ?? ""
            : (entry.finance_categories as { name?: string } | null)?.name ?? "",
      })) ?? [];

    const statsMap = new Map<string, number>();
    for (const item of items) {
      const label = item.category_name || "Uncategorized";
      statsMap.set(label, (statsMap.get(label) ?? 0) + Number(item.amount ?? 0));
    }

    const stats = Array.from(statsMap.entries()).map(([label, total]) => ({
      label,
      total,
    }));

    return NextResponse.json({
      categories: categories ?? [],
      items,
      stats,
      utkarshBalance: summary?.utkarsh_balance ?? 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load finances." },
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

    if (!ensureDashboardPermission(auth.profile, "finance", "insert")) {
      return forbiddenResponse("You do not have create access for finances.");
    }

    const body = (await request.json()) as FinanceInput;
    const title = cleanText(body.title);
    const amount = cleanAmount(body.amount);
    const entryType = cleanEntryType(body.entryType);
    const categoryId = cleanText(body.categoryId);
    const categoryName = cleanText(body.categoryName);
    const affectsUtkarshBalance = body.affectsUtkarshBalance === true;
    const balanceDirection = cleanBalanceDirection(body.balanceDirection);

    if (!title || !Number.isFinite(amount) || amount <= 0 || !entryType) {
      return NextResponse.json(
        { error: "Title, amount, and entry type are required." },
        { status: 400 },
      );
    }

    if (!categoryId && !categoryName) {
      return NextResponse.json(
        { error: "Choose a category or add a new one." },
        { status: 400 },
      );
    }

    if (affectsUtkarshBalance && !balanceDirection) {
      return NextResponse.json(
        { error: "Balance direction is required when Utkarsh balance is affected." },
        { status: 400 },
      );
    }

    const supabase = createPointCalcDashboardServiceClient();

    let resolvedCategoryId = categoryId;

    if (!resolvedCategoryId && categoryName) {
      const { data: existingCategory, error: existingCategoryError } = await supabase
        .from("finance_categories")
        .select("id, entry_type")
        .eq("name", categoryName)
        .maybeSingle();

      if (existingCategoryError) {
        return NextResponse.json(
          { error: existingCategoryError.message || "Unable to load category." },
          { status: 400 },
        );
      }

      if (existingCategory) {
        if (existingCategory.entry_type !== entryType) {
          return NextResponse.json(
            { error: "This category already exists under the other finance action." },
            { status: 400 },
          );
        }

        resolvedCategoryId = existingCategory.id;
      } else {
        const { data: insertedCategory, error: categoryInsertError } = await supabase
          .from("finance_categories")
          .insert({
            name: categoryName,
            entry_type: entryType,
          })
          .select("id, entry_type")
          .single();

        if (categoryInsertError || !insertedCategory) {
          return NextResponse.json(
            { error: categoryInsertError?.message || "Unable to save category." },
            { status: 400 },
          );
        }

        resolvedCategoryId = insertedCategory.id;
      }
    }

    if (!resolvedCategoryId) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    const { data: selectedCategory, error: categoryError } = await supabase
      .from("finance_categories")
      .select("id, name, entry_type")
      .eq("id", resolvedCategoryId)
      .single();

    if (categoryError || !selectedCategory) {
      return NextResponse.json(
        { error: categoryError?.message || "Category not found." },
        { status: 400 },
      );
    }

    if (selectedCategory.entry_type !== entryType) {
      return NextResponse.json(
        { error: "Selected category does not match the chosen finance action." },
        { status: 400 },
      );
    }

    const { data: insertedEntry, error: entryError } = await supabase
      .from("finance_entries")
      .insert({
        title,
        amount,
        entry_type: entryType,
        category_id: selectedCategory.id,
        affects_utkarsh_balance: affectsUtkarshBalance,
        balance_direction: affectsUtkarshBalance ? balanceDirection : null,
        created_by: auth.user.id,
      })
      .select("id")
      .single();

    if (entryError || !insertedEntry) {
      return NextResponse.json(
        { error: entryError?.message || "Unable to save finance entry." },
        { status: 400 },
      );
    }

    if (affectsUtkarshBalance && balanceDirection) {
      const { data: currentSummary, error: summaryFetchError } = await supabase
        .from("finance_summary")
        .select("utkarsh_balance")
        .eq("id", 1)
        .single();

      if (summaryFetchError || !currentSummary) {
        return NextResponse.json(
          { error: summaryFetchError?.message || "Unable to load Utkarsh balance." },
          { status: 400 },
        );
      }

      const nextBalance =
        balanceDirection === "increase"
          ? currentSummary.utkarsh_balance + amount
          : currentSummary.utkarsh_balance - amount;

      const { error: summaryUpdateError } = await supabase
        .from("finance_summary")
        .update({ utkarsh_balance: nextBalance })
        .eq("id", 1);

      if (summaryUpdateError) {
        return NextResponse.json(
          { error: summaryUpdateError.message || "Unable to update Utkarsh balance." },
          { status: 400 },
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create finance entry." },
      { status: 500 },
    );
  }
}
