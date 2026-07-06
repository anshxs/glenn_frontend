"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Download, Plus, Trash2, Users } from "lucide-react";

import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";

type TeamRow = {
  id: string;
  serialNumber: string;
  name: string;
  phone: string;
  teamName: string;
  groupName: string;
  checks: [boolean, boolean, boolean, boolean];
};

type StoredTeamsState = {
  teams: TeamRow[];
  groups: string[];
};

const STORAGE_KEY = "glenn-teams-list";

function withSerialNumbers(rows: TeamRow[]): TeamRow[] {
  return rows.map((row, index) => ({
    ...row,
    serialNumber: String(index + 1),
  }));
}

function createEmptyTeam(nextIndex: number): TeamRow {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    serialNumber: String(nextIndex),
    name: "",
    phone: "",
    teamName: "",
    groupName: "",
    checks: [false, false, false, false],
  };
}

function normalizeGroups(values: unknown): string[] {
  if (!Array.isArray(values)) {
    return [];
  }

  return Array.from(
    new Set(
      values
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  );
}

function getCompletedChecks(checks: TeamRow["checks"]) {
  return checks.filter(Boolean).length;
}

function getRowTone(team: TeamRow) {
  const completedChecks = getCompletedChecks(team.checks);
  const hasTeamName = team.teamName.trim().length > 0;

  if (completedChecks === 4 && hasTeamName) {
    return "bg-[#e6f8df]";
  }

  if (completedChecks >= 2 || hasTeamName) {
    return "bg-[#fff4cc]";
  }

  return "bg-[#ffe1df]";
}

export default function TeamsListPage() {
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<TeamRow | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        setTeams([createEmptyTeam(1)]);
        setGroups([]);
        setIsLoaded(true);
        return;
      }

      const parsed = JSON.parse(stored) as StoredTeamsState | TeamRow[];
      const parsedTeams = Array.isArray(parsed) ? parsed : parsed.teams;
      const parsedGroups = Array.isArray(parsed) ? [] : normalizeGroups(parsed.groups);

      const normalizedTeams = Array.isArray(parsedTeams)
        ? withSerialNumbers(
            parsedTeams.map((row, index) => ({
              id:
                typeof row?.id === "string" && row.id
                  ? row.id
                  : `${Date.now()}-${index}`,
              serialNumber: String(index + 1),
              name: typeof row?.name === "string" ? row.name : "",
              phone: typeof row?.phone === "string" ? row.phone : "",
              teamName: typeof row?.teamName === "string" ? row.teamName : "",
              groupName: typeof row?.groupName === "string" ? row.groupName : "",
              checks: [
                Boolean(row?.checks?.[0]),
                Boolean(row?.checks?.[1]),
                Boolean(row?.checks?.[2]),
                Boolean(row?.checks?.[3]),
              ] as [boolean, boolean, boolean, boolean],
            })),
          )
        : [createEmptyTeam(1)];

      const derivedGroups = Array.from(
        new Set(
          [...parsedGroups, ...normalizedTeams.map((team) => team.groupName.trim())].filter(
            Boolean,
          ),
        ),
      );

      setTeams(normalizedTeams.length > 0 ? normalizedTeams : [createEmptyTeam(1)]);
      setGroups(derivedGroups);
    } catch {
      setTeams([createEmptyTeam(1)]);
      setGroups([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const payload: StoredTeamsState = {
      teams,
      groups,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [groups, isLoaded, teams]);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const query = searchQuery.trim().toLowerCase();
      const completedChecks = getCompletedChecks(team.checks);
      const isComplete = completedChecks === 4 && team.teamName.trim().length > 0;
      const isPartial = !isComplete && (completedChecks > 0 || team.teamName.trim().length > 0);
      const isPending = !isComplete && !isPartial;

      const matchesSearch =
        !query ||
        team.name.toLowerCase().includes(query) ||
        team.phone.toLowerCase().includes(query) ||
        team.teamName.toLowerCase().includes(query) ||
        team.groupName.toLowerCase().includes(query);

      const matchesGroup =
        groupFilter === "all" ||
        (groupFilter === "ungrouped"
          ? team.groupName.trim().length === 0
          : team.groupName === groupFilter);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "complete" && isComplete) ||
        (statusFilter === "partial" && isPartial) ||
        (statusFilter === "pending" && isPending);

      return matchesSearch && matchesGroup && matchesStatus;
    });
  }, [groupFilter, searchQuery, statusFilter, teams]);

  function updateTeam(
    id: string,
    field: "name" | "phone" | "teamName" | "groupName",
    value: string,
  ) {
    setTeams((current) =>
      current.map((team) => (team.id === id ? { ...team, [field]: value } : team)),
    );

    if (field === "groupName") {
      const normalized = value.trim();
      if (normalized) {
        setGroups((current) =>
          current.includes(normalized) ? current : [...current, normalized],
        );
      }
    }
  }

  function toggleCheck(id: string, index: number) {
    setTeams((current) =>
      current.map((team) => {
        if (team.id !== id) {
          return team;
        }

        const nextChecks = [...team.checks] as [boolean, boolean, boolean, boolean];
        nextChecks[index] = !nextChecks[index];
        return { ...team, checks: nextChecks };
      }),
    );
  }

  function addTeam() {
    setTeams((current) => withSerialNumbers([...current, createEmptyTeam(current.length + 1)]));
  }

  function addGroup() {
    const normalized = newGroupName.trim();

    if (!normalized) {
      return;
    }

    setGroups((current) => (current.includes(normalized) ? current : [...current, normalized]));
    setNewGroupName("");
  }

  function confirmDeleteTeam() {
    if (!teamToDelete) {
      return;
    }

    setTeams((current) => {
      const filtered = current.filter((team) => team.id !== teamToDelete.id);

      if (filtered.length === 0) {
        return [createEmptyTeam(1)];
      }

      return withSerialNumbers(filtered);
    });

    setTeamToDelete(null);
  }

  function exportJson() {
    const payload: StoredTeamsState = { teams, groups };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "teams-list.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function handleInput(
    id: string,
    field: "name" | "phone" | "teamName" | "groupName",
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    updateTeam(id, field, event.target.value);
  }

  return (
    <main className="flex min-h-screen flex-col bg-white text-black">
      <LandingHeader />

      <section className="flex-1 px-3 py-3 sm:px-4 lg:px-5">
        <div className="border border-black/10 bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.06)] sm:p-5">
          <div className="flex flex-col gap-4 border-b border-black/10 pb-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-black/40">
                  Teams List
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                  Local teams tracker
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-black/55">
                  Track team status, assign groups, filter quickly, and keep
                  everything saved in local storage on this device.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={addTeam}
                  className="inline-flex items-center gap-2 border border-black bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  <Plus className="h-4 w-4" />
                  Add team
                </button>
                <button
                  type="button"
                  onClick={exportJson}
                  className="inline-flex items-center gap-2 border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black transition hover:border-black/25"
                >
                  <Download className="h-4 w-4" />
                  Export JSON
                </button>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search name, phone, team, group"
                  className="w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
                />
                <select
                  value={groupFilter}
                  onChange={(event) => setGroupFilter(event.target.value)}
                  className="w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
                >
                  <option value="all">All groups</option>
                  <option value="ungrouped">Ungrouped</option>
                  {groups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
                >
                  <option value="all">All status</option>
                  <option value="complete">Complete</option>
                  <option value="partial">Partial</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="border border-black/10 bg-[#fbfbf7] p-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={newGroupName}
                    onChange={(event) => setNewGroupName(event.target.value)}
                    placeholder="Create group"
                    className="flex-1 border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
                  />
                  <button
                    type="button"
                    onClick={addGroup}
                    className="inline-flex items-center justify-center gap-2 border border-black bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    <Users className="h-4 w-4" />
                    Add group
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <div className="min-w-[1260px]">
              <div className="grid grid-cols-[90px_1fr_1fr_1.15fr_180px_repeat(4,70px)_70px] gap-2 border border-black/10 bg-black px-3 py-3 text-[11px] uppercase tracking-[0.18em] text-white/80">
                <span>S No.</span>
                <span>Name</span>
                <span>Phone</span>
                <span>Team Name</span>
                <span>Group</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>Del</span>
              </div>

              <div className="border-x border-b border-black/10">
                {filteredTeams.map((team) => (
                  <div
                    key={team.id}
                    className={`grid grid-cols-[90px_1fr_1fr_1.15fr_180px_repeat(4,70px)_70px] gap-2 border-t border-black/10 px-3 py-3 ${getRowTone(
                      team,
                    )}`}
                  >
                    <div className="flex h-[42px] items-center border border-black/10 bg-white/60 px-3 text-sm font-medium text-black/70">
                      {team.serialNumber}
                    </div>
                    <input
                      value={team.name}
                      onChange={(event) => handleInput(team.id, "name", event)}
                      placeholder="Name"
                      className="min-w-0 border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-black/30"
                    />
                    <input
                      value={team.phone}
                      onChange={(event) => handleInput(team.id, "phone", event)}
                      placeholder="Phone"
                      className="min-w-0 border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-black/30"
                    />
                    <input
                      value={team.teamName}
                      onChange={(event) => handleInput(team.id, "teamName", event)}
                      placeholder="Team name"
                      className="min-w-0 border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-black/30"
                    />
                    <select
                      value={team.groupName}
                      onChange={(event) => handleInput(team.id, "groupName", event)}
                      className="min-w-0 border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-black/30"
                    >
                      <option value="">No group</option>
                      {groups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>

                    {team.checks.map((checked, checkIndex) => (
                      <button
                        key={`${team.id}-${checkIndex}`}
                        type="button"
                        onClick={() => toggleCheck(team.id, checkIndex)}
                        className={`flex h-[42px] items-center justify-center border text-lg transition ${
                          checked
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-white text-black/32 hover:border-black/25"
                        }`}
                        aria-label={`Toggle check ${checkIndex + 1} for ${team.teamName || team.name || "team"}`}
                      >
                        {checked ? "✓" : ""}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setTeamToDelete(team)}
                      className="flex h-[42px] items-center justify-center border border-black/10 bg-white text-black transition hover:border-black/25 hover:text-red-600"
                      aria-label={`Delete row ${team.serialNumber}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {filteredTeams.length === 0 ? (
                  <div className="border-t border-black/10 bg-[#fbfbf7] px-4 py-8 text-center text-sm text-black/55">
                    No teams match the current filters.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {teamToDelete ? (
        <div className="fixed inset-0 z-[12000] flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-md border border-black bg-white p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
            <p className="text-[11px] uppercase tracking-[0.22em] text-black/40">
              Confirm Delete
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black">
              Remove this team?
            </h2>

            <div className="mt-5 border border-black/10 bg-[#fbfbf7] p-4">
              <div className="grid gap-3 text-sm text-black/75">
                <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                  <span className="uppercase tracking-[0.14em] text-black/40">S No.</span>
                  <span className="font-medium text-black">{teamToDelete.serialNumber}</span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                  <span className="uppercase tracking-[0.14em] text-black/40">Name</span>
                  <span className="font-medium text-right text-black">
                    {teamToDelete.name || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                  <span className="uppercase tracking-[0.14em] text-black/40">Phone</span>
                  <span className="font-medium text-right text-black">
                    {teamToDelete.phone || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-black/10 pb-2">
                  <span className="uppercase tracking-[0.14em] text-black/40">Team</span>
                  <span className="font-medium text-right text-black">
                    {teamToDelete.teamName || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="uppercase tracking-[0.14em] text-black/40">Group</span>
                  <span className="font-medium text-right text-black">
                    {teamToDelete.groupName || "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={confirmDeleteTeam}
                className="inline-flex items-center justify-center border border-black bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Delete team
              </button>
              <button
                type="button"
                onClick={() => setTeamToDelete(null)}
                className="inline-flex items-center justify-center border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black transition hover:border-black/25"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <LandingFooter />
    </main>
  );
}
