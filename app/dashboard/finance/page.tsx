"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, Filter, Plus, Wallet, X } from "lucide-react";
import { DashboardLogin } from "@/components/dashboard/dashboard-login";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { useDashboardAuth } from "@/components/dashboard/dashboard-auth-context";
import { hasDashboardAction } from "@/lib/dashboard-permissions";

type FinanceCategory = {
  id: string;
  name: string;
  entry_type: "add" | "subtract";
};

type FinanceEntry = {
  id: string;
  title: string;
  amount: number;
  entry_type: "add" | "subtract";
  category_id: string;
  category_name: string;
  affects_utkarsh_balance: boolean;
  balance_direction: "increase" | "decrease" | null;
  created_at: string;
};

const emptyFinanceForm = {
  title: "",
  amount: "",
  categoryId: "",
  newCategoryName: "",
  affectsUtkarshBalance: false,
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatEntryDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getUtkarshLabel(direction: "increase" | "decrease" | null) {
  if (direction === "increase") {
    return "received";
  }

  if (direction === "decrease") {
    return "paid";
  }

  return "";
}

function getBalanceCardClass(value: number) {
  if (value < 0) {
    return "border-red-200 bg-red-50";
  }

  if (value > 0) {
    return "border-emerald-200 bg-emerald-50";
  }

  return "border-black/10 bg-[#fafaf7]";
}

function getBalanceTextClass(value: number) {
  if (value < 0) {
    return "text-red-700";
  }

  if (value > 0) {
    return "text-emerald-700";
  }

  return "text-black";
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition focus:border-black/25",
        props.className,
      )}
    />
  );
}

function getCategoryTotal(entries: FinanceEntry[], categoryName: string) {
  return entries
    .filter((entry) => entry.category_name.trim().toUpperCase() === categoryName.trim().toUpperCase())
    .reduce((sum, entry) => sum + Number(entry.amount ?? 0), 0);
}

function getTeamKey(categoryName: string) {
  const cleanName = categoryName.trim().replace(/\s+/g, " ");
  const parts = cleanName.split(" ");
  if (parts.length < 2) {
    return null;
  }

  const prefix = parts[0]?.toUpperCase();
  if (!prefix || !["SCRIMS", "PP", "SALARY"].includes(prefix)) {
    return null;
  }

  const rest = parts.slice(1);
  if (rest[0]?.toUpperCase() === "GLENN") {
    rest.shift();
  }

  const teamName = rest.join(" ").trim();
  if (!teamName) {
    return null;
  }

  return {
    prefix: prefix as "SCRIMS" | "PP" | "SALARY",
    teamName,
  };
}

type TeamCard = {
  teamName: string;
  scrims: number;
  pp: number;
  salary: number;
};

export default function FinancePage() {
  const auth = useDashboardAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<FinanceCategory[]>([]);
  const [entries, setEntries] = useState<FinanceEntry[]>([]);
  const [utkarshBalance, setUtkarshBalance] = useState(0);
  const [loadingFinance, setLoadingFinance] = useState(false);
  const [message, setMessage] = useState("");
  const [dialogType, setDialogType] = useState<"add" | "subtract" | null>(null);
  const [financeForm, setFinanceForm] = useState(emptyFinanceForm);
  const [savingEntry, setSavingEntry] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>([]);

  const addCategories = useMemo(
    () => categories.filter((category) => category.entry_type === "add"),
    [categories],
  );
  const subtractCategories = useMemo(
    () => categories.filter((category) => category.entry_type === "subtract"),
    [categories],
  );
  const allCategoryNames = useMemo(
    () => Array.from(new Set(categories.map((category) => category.name))).sort((a, b) => a.localeCompare(b)),
    [categories],
  );

  useEffect(() => {
    setSelectedCategoryNames((current) => (current.length ? current : allCategoryNames));
  }, [allCategoryNames]);

  async function loadFinance() {
    if (!auth.token) return;

    setLoadingFinance(true);
    setMessage("");

    const response = await fetch("/api/dashboard/finance", {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    const data = (await response.json()) as {
      categories?: FinanceCategory[];
      items?: FinanceEntry[];
      utkarshBalance?: number;
      error?: string;
    };

    if (!response.ok) {
      setMessage(data.error || "Unable to load finances.");
      setLoadingFinance(false);
      return;
    }

    setCategories(data.categories ?? []);
    setEntries(data.items ?? []);
    setUtkarshBalance(data.utkarshBalance ?? 0);
    setLoadingFinance(false);
  }

  useEffect(() => {
    if (auth.token && auth.profile) {
      void loadFinance();
    }
  }, [auth.token, auth.profile]);

  async function handleSubmit() {
    if (!auth.token || !dialogType) return;

    setSavingEntry(true);
    setMessage("");

    const response = await fetch("/api/dashboard/finance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        title: financeForm.title,
        amount: financeForm.amount,
        entryType: dialogType,
        categoryId: financeForm.categoryId,
        categoryName: financeForm.newCategoryName,
        affectsUtkarshBalance: financeForm.affectsUtkarshBalance,
        balanceDirection: financeForm.affectsUtkarshBalance
          ? dialogType === "add"
            ? "increase"
            : "decrease"
          : null,
      }),
    });

    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setMessage(data.error || "Unable to save finance entry.");
      setSavingEntry(false);
      return;
    }

    setDialogType(null);
    setFinanceForm(emptyFinanceForm);
    setMessage(dialogType === "add" ? "Amount added." : "Amount subtracted.");
    await loadFinance();
    setSavingEntry(false);
  }

  const selectedCategorySet = useMemo(
    () => new Set(selectedCategoryNames.map((name) => name.toUpperCase())),
    [selectedCategoryNames],
  );

  const filterIsAll =
    allCategoryNames.length > 0 && selectedCategoryNames.length === allCategoryNames.length;

  const filteredEntries = useMemo(() => {
    if (filterIsAll) {
      return entries;
    }

    return entries.filter((entry) =>
      selectedCategorySet.has(entry.category_name.trim().toUpperCase()),
    );
  }, [entries, filterIsAll, selectedCategorySet]);

  const spentTotal = useMemo(
    () =>
      filteredEntries.reduce((sum, entry) => {
        const amount = Number(entry.amount ?? 0);
        return sum + (entry.entry_type === "add" ? amount : -amount);
      }, 0),
    [filteredEntries],
  );

  const totalSpent = useMemo(
    () =>
      filteredEntries
        .filter((entry) => entry.entry_type === "subtract")
        .reduce((sum, entry) => sum + Number(entry.amount ?? 0), 0),
    [filteredEntries],
  );

  const totalEarned = useMemo(
    () =>
      filteredEntries
        .filter((entry) => entry.entry_type === "add")
        .reduce((sum, entry) => sum + Number(entry.amount ?? 0), 0),
    [filteredEntries],
  );

  const overallTotal = useMemo(() => spentTotal + utkarshBalance, [spentTotal, utkarshBalance]);
  const overallTotalLabel = overallTotal >= 0 ? "Profit" : "Total Loss";

  const teamCards = useMemo(() => {
    const map = new Map<string, TeamCard>();

    for (const entry of filteredEntries) {
      const teamMeta = getTeamKey(entry.category_name);
      if (!teamMeta) {
        continue;
      }

      const key = teamMeta.teamName.toUpperCase();
      const current = map.get(key) ?? {
        teamName: teamMeta.teamName,
        scrims: 0,
        pp: 0,
        salary: 0,
      };

      if (teamMeta.prefix === "SCRIMS") {
        current.scrims += Number(entry.amount ?? 0);
      }
      if (teamMeta.prefix === "PP") {
        current.pp += Number(entry.amount ?? 0);
      }
      if (teamMeta.prefix === "SALARY") {
        current.salary += Number(entry.amount ?? 0);
      }

      map.set(key, current);
    }

    return Array.from(map.values()).sort((a, b) => a.teamName.localeCompare(b.teamName));
  }, [filteredEntries]);

  if (!auth.profile) {
    return (
      <DashboardLogin
        booting={auth.booting}
        email={auth.email}
        setEmail={auth.setEmail}
        password={auth.password}
        setPassword={auth.setPassword}
        error={auth.error}
        loading={auth.loading}
        onSubmit={auth.handleLogin}
      />
    );
  }

  const profile = auth.profile;
  const canInsert = hasDashboardAction(profile.permissions, "finance", "insert");
  const canRead = hasDashboardAction(profile.permissions, "finance", "read");
  const visibleCategories = dialogType === "add" ? addCategories : subtractCategories;

  return (
    <DashboardShell
      profile={profile}
      availableSections={auth.availableSections}
      onLogout={auth.handleLogout}
      title="Finances"
      subtitle="Track entries, team buckets, and the Utkarsh balance."
      mobileSidebarOpen={mobileSidebarOpen}
      setMobileSidebarOpen={setMobileSidebarOpen}
    >
      {message ? (
        <div className="mb-4 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/70">
          {message}
        </div>
      ) : null}

      {!canRead ? (
        <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-5 text-sm text-black/60">
          You do not have read access for finances.
        </div>
      ) : loadingFinance ? (
        <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-black/10 bg-[#fafaf7]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" />
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-black">Category filter</p>
              <p className="text-xs text-black/50">
                {filterIsAll
                  ? "Showing all categories"
                  : `${selectedCategoryNames.length} categories selected`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-4 text-sm text-black"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
          </div>

          {filterIsAll ? (
            <>
              <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
                <div
                  className={cn(
                    "rounded-2xl border p-3 min-w-0",
                    getBalanceCardClass(overallTotal),
                  )}
                >
                  <p className="text-xs text-black/55">{overallTotalLabel}</p>
                  <p className={cn("mt-1 text-lg font-semibold", getBalanceTextClass(overallTotal))}>
                    {formatCurrency(overallTotal)}
                  </p>
                </div>

                <div
                  className={cn(
                    "rounded-2xl border p-3 min-w-0",
                    getBalanceCardClass(utkarshBalance),
                  )}
                >
                  <div className="flex items-center gap-2">
                    {/* <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
                      <Wallet className="h-4 w-4" />
                    </div> */}
                    <div>
                      <p className="text-xs text-black/55">Utkarsh Balance</p>
                      <p
                        className={cn(
                          "text-lg font-semibold",
                          getBalanceTextClass(utkarshBalance),
                        )}
                      >
                        {formatCurrency(utkarshBalance)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-3 min-w-0">
                  <p className="text-xs text-black/55">Promotion</p>
                  <p className="mt-1 text-lg font-semibold text-black">
                    {formatCurrency(getCategoryTotal(filteredEntries, "Promotion"))}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-3 min-w-0">
                  <p className="text-xs text-black/55">Other</p>
                  <p className="mt-1 text-lg font-semibold text-black">
                    {formatCurrency(getCategoryTotal(filteredEntries, "Other"))}
                  </p>
                </div>
              </div>

              {teamCards.length ? (
                <div className="mt-4 grid gap-3 xl:grid-cols-2">
                  {teamCards.map((team) => {
                    const teamTotal = team.pp - team.scrims - team.salary;

                    return (
                      <div
                        key={team.teamName}
                        className="rounded-[1.5rem] border border-black/10 bg-[#fafaf7] p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h3 className="mt-1 text-lg font-semibold text-black">
                              {team.teamName}
                            </h3>
                          </div>
                          <p className={cn("text-sm font-bold", getBalanceTextClass(teamTotal))}>
                            {formatCurrency(teamTotal)}
                          </p>
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <div className="rounded-xl border border-black/10 bg-white p-3">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-black/45">
                              Scrims
                            </p>
                            <p className="mt-1 text-base font-semibold text-black">
                              {formatCurrency(team.scrims)}
                            </p>
                          </div>
                          <div className="rounded-xl border border-black/10 bg-white p-3">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-black/45">
                              PP
                            </p>
                            <p className="mt-1 text-base font-semibold text-black">
                              {formatCurrency(team.pp)}
                            </p>
                          </div>
                          <div className="rounded-xl border border-black/10 bg-white p-3">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-black/45">
                              Salary
                            </p>
                            <p className="mt-1 text-base font-semibold text-black">
                              {formatCurrency(team.salary)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </>
          ) : (
            <div className="grid gap-2 md:grid-cols-3">
              <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-3">
                <p className="text-xs text-black/55">{overallTotalLabel}</p>
                <p className={cn("mt-1 text-lg font-semibold", getBalanceTextClass(overallTotal))}>
                  {formatCurrency(overallTotal)}
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-3">
                <p className="text-xs text-black/55">Spent</p>
                <p className="mt-1 text-lg font-semibold text-black">
                  {formatCurrency(totalSpent)}
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-3">
                <p className="text-xs text-black/55">Earned</p>
                <p className="mt-1 text-lg font-semibold text-black">
                  {formatCurrency(totalEarned)}
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 rounded-[1.5rem] border border-black/10 bg-[#fafaf7] p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-black">Recent entries</p>
                <p className="text-sm text-black/50">Latest finance activity</p>
              </div>
              <div className="text-sm text-black/45">{filteredEntries.length} total</div>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white">
              {filteredEntries.length ? (
                <>
                  <div className="grid grid-cols-[1.1fr_.9fr_.7fr] gap-3 border-b border-black/8 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-black/40 sm:grid-cols-[1.2fr_1fr_.7fr_.8fr]">
                    <div>Entry</div>
                    <div>Category</div>
                    <div className="text-right">Amount</div>
                    <div className="hidden text-right sm:block">Date</div>
                  </div>
                  {filteredEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="grid grid-cols-[1.1fr_.9fr_.7fr] gap-3 border-b border-black/6 px-3 py-2.5 last:border-b-0 sm:grid-cols-[1.2fr_1fr_.7fr_.8fr]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-black sm:text-sm">
                          {entry.title}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] text-black/45 sm:hidden">
                          {formatEntryDate(entry.created_at)}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[11px] text-black/60 sm:text-xs">
                          {entry.category_name}
                        </p>
                        {entry.affects_utkarsh_balance && entry.balance_direction ? (
                          <p className="mt-0.5 truncate text-[10px] text-black/40">
                            Utkarsh {getUtkarshLabel(entry.balance_direction)}
                          </p>
                        ) : null}
                      </div>
                      <div
                        className={cn(
                          "text-right text-xs font-semibold sm:text-sm",
                          entry.entry_type === "add" ? "text-emerald-600" : "text-red-600",
                        )}
                      >
                        {entry.entry_type === "add" ? "+" : "-"}
                        {formatCurrency(entry.amount)}
                      </div>
                      <div className="hidden text-right text-xs text-black/45 sm:block">
                        {formatEntryDate(entry.created_at)}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="p-5 text-sm text-black/50">
                  No finance entries for the selected categories.
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {canInsert ? (
        <div className="fixed bottom-6 right-6 z-20 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setFinanceForm(emptyFinanceForm);
              setDialogType("subtract");
            }}
            className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-4 text-sm font-medium text-white shadow-lg"
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            Subtract
          </button>
          <button
            type="button"
            onClick={() => {
              setFinanceForm(emptyFinanceForm);
              setDialogType("add");
            }}
            className="inline-flex h-12 items-center justify-center rounded-full bg-green-600 px-4 text-sm font-medium text-white shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </button>
        </div>
      ) : null}

      {filterOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-4 sm:items-center">
          <div className="w-full max-w-lg rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-black">Filter categories</h3>
                <p className="text-sm text-black/50">Select one or more categories.</p>
              </div>
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategoryNames(allCategoryNames)}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 px-4 text-sm text-black"
              >
                Select all
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategoryNames([])}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 px-4 text-sm text-black"
              >
                Clear
              </button>
            </div>

            <div className="mt-4 max-h-[360px] space-y-2 overflow-y-auto">
              {allCategoryNames.map((categoryName) => {
                const checked = selectedCategoryNames.includes(categoryName);

                return (
                  <label
                    key={categoryName}
                    className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#fafaf7] px-4 py-3"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) => {
                        setSelectedCategoryNames((current) =>
                          event.target.checked
                            ? [...current, categoryName]
                            : current.filter((item) => item !== categoryName),
                        );
                      }}
                    />
                    <span className="text-sm text-black">{categoryName}</span>
                  </label>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                if (!selectedCategoryNames.length) {
                  setSelectedCategoryNames(allCategoryNames);
                }
                setFilterOpen(false);
              }}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-black px-4 text-sm font-medium text-white"
            >
              Apply filter
            </button>
          </div>
        </div>
      ) : null}

      {dialogType ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-4 sm:items-center">
          <div className="w-full max-w-lg rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-black">
                  {dialogType === "add" ? "Add amount" : "Subtract amount"}
                </h3>
                <p className="text-sm text-black/50">
                  {dialogType === "add"
                    ? "Create an incoming finance entry."
                    : "Create an outgoing finance entry."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (savingEntry) return;
                  setDialogType(null);
                  setFinanceForm(emptyFinanceForm);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              <Field
                value={financeForm.title}
                onChange={(event) =>
                  setFinanceForm((current) => ({ ...current, title: event.target.value }))
                }
                placeholder="Title"
              />
              <Field
                type="number"
                min="0"
                inputMode="numeric"
                value={financeForm.amount}
                onChange={(event) =>
                  setFinanceForm((current) => ({ ...current, amount: event.target.value }))
                }
                placeholder="Amount"
              />

              <select
                value={financeForm.categoryId}
                onChange={(event) =>
                  setFinanceForm((current) => ({ ...current, categoryId: event.target.value }))
                }
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none"
              >
                <option value="">Choose category</option>
                {visibleCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <Field
                value={financeForm.newCategoryName}
                onChange={(event) =>
                  setFinanceForm((current) => ({
                    ...current,
                    newCategoryName: event.target.value,
                  }))
                }
                placeholder="Or add new category"
              />

              <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#fafaf7] px-4 py-3">
                <input
                  type="checkbox"
                  checked={financeForm.affectsUtkarshBalance}
                  onChange={(event) =>
                    setFinanceForm((current) => ({
                      ...current,
                      affectsUtkarshBalance: event.target.checked,
                    }))
                  }
                />
                <span className="text-sm text-black">
                  {dialogType === "add"
                    ? "Paid by Utkarsh, increase Utkarsh balance"
                    : "Paid to Utkarsh, decrease Utkarsh balance"}
                </span>
              </label>

              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={savingEntry}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-4 text-sm font-medium text-white disabled:opacity-60"
              >
                {savingEntry ? "Saving..." : dialogType === "add" ? "Add entry" : "Subtract entry"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}
