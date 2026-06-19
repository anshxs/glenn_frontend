import { NextResponse } from "next/server";
import { createPointCalcDashboardServiceClient } from "@/lib/pointcalc-dashboard-supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isTeamExpenseCategory(categoryName: string) {
  const normalized = categoryName.trim().toUpperCase();
  return normalized.startsWith("SCRIMS") || normalized.startsWith("SALARY");
}

export async function GET() {
  try {
    const supabase = createPointCalcDashboardServiceClient();
    const { data, error } = await supabase
      .from("finance_entries")
      .select("amount, entry_type, finance_categories(name)")
      .eq("entry_type", "subtract");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    let totalInvested = 0;
    let teamExpenses = 0;
    let otherExpenses = 0;

    for (const entry of data ?? []) {
      const amount = Number(entry.amount ?? 0);
      const categoryName = Array.isArray(entry.finance_categories)
        ? entry.finance_categories[0]?.name ?? ""
        : (entry.finance_categories as { name?: string } | null)?.name ?? "";

      totalInvested += amount;

      if (isTeamExpenseCategory(categoryName)) {
        teamExpenses += amount;
      } else {
        otherExpenses += amount;
      }
    }

    return NextResponse.json({
      totalInvested,
      teamExpenses,
      otherExpenses,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to load investment summary.",
      },
      { status: 500 },
    );
  }
}
