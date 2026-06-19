"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, ShieldCheck, UserRound, X } from "lucide-react";
import { DashboardLogin } from "@/components/dashboard/dashboard-login";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { useDashboardAuth } from "@/components/dashboard/dashboard-auth-context";
import {
  dashboardActions,
  dashboardSections,
  hasDashboardAction,
  type DashboardAction,
  type DashboardPermissions,
  type DashboardSectionKey,
} from "@/lib/dashboard-permissions";

type StaffUser = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  hasAccess: boolean;
  dashboardPermissions: DashboardPermissions;
};

const emptyEditState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  hasAccess: false,
  dashboardPermissions: {} as DashboardPermissions,
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatSectionLabel(section: DashboardSectionKey) {
  return section.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function StaffManagementPage() {
  const auth = useDashboardAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [message, setMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [savingUser, setSavingUser] = useState(false);
  const [resettingUserId, setResettingUserId] = useState<string | null>(null);
  const [editState, setEditState] = useState(emptyEditState);
  const [search, setSearch] = useState("");

  async function loadUsers() {
    if (!auth.token) return;
    setLoadingUsers(true);
    setMessage("");

    const response = await fetch("/api/dashboard/staff-management", {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    const data = (await response.json()) as { items?: StaffUser[]; error?: string };

    if (!response.ok) {
      setMessage(data.error || "Unable to load staff users.");
      setLoadingUsers(false);
      return;
    }

    setStaffUsers(data.items ?? []);
    setLoadingUsers(false);
  }

  useEffect(() => {
    if (auth.token && auth.profile) {
      void loadUsers();
    }
  }, [auth.token, auth.profile]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return staffUsers;
    }

    return staffUsers.filter((user) =>
      [user.name ?? "", user.email, user.phone ?? ""].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [search, staffUsers]);

  function togglePermission(section: DashboardSectionKey, action: DashboardAction) {
    setEditState((current) => {
      const currentActions = current.dashboardPermissions[section] ?? [];
      const nextActions = currentActions.includes(action)
        ? currentActions.filter((item) => item !== action)
        : [...currentActions, action];

      const nextPermissions: DashboardPermissions = { ...current.dashboardPermissions };
      if (nextActions.length) {
        nextPermissions[section] = nextActions;
      } else {
        delete nextPermissions[section];
      }

      return {
        ...current,
        dashboardPermissions: nextPermissions,
      };
    });
  }

  async function saveUser() {
    if (!auth.token) return;
    setSavingUser(true);
    setMessage("");

    const response = await fetch("/api/dashboard/staff-management", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(editState),
    });
    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(data.error || "Unable to update user.");
      setSavingUser(false);
      return;
    }

    setDialogOpen(false);
    setEditState(emptyEditState);
    setMessage("User updated.");
    await loadUsers();
    setSavingUser(false);
  }

  async function resetUserAccess(id: string) {
    if (!auth.token) return;
    setResettingUserId(id);
    setMessage("");

    const response = await fetch(`/api/dashboard/staff-management?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(data.error || "Unable to reset user access.");
      setResettingUserId(null);
      return;
    }

    setMessage("User access reset.");
    await loadUsers();
    setResettingUserId(null);
  }

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
  const canRead = hasDashboardAction(profile.permissions, "staff_management", "read");
  const canUpdate = hasDashboardAction(profile.permissions, "staff_management", "update");
  const canDelete = hasDashboardAction(profile.permissions, "staff_management", "delete");

  return (
    <DashboardShell
      profile={profile}
      availableSections={auth.availableSections}
      onLogout={auth.handleLogout}
      title="Staff Management"
      subtitle="Manage user access, permissions, and profile details."
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
          You do not have read access for staff management.
        </div>
      ) : (
        <>
          <div className="mb-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-black/40">Staff Users</p>
              <p className="mt-2 text-xl font-semibold text-black">{staffUsers.length}</p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-black/40">Dashboard Access</p>
              <p className="mt-2 text-xl font-semibold text-black">
                {staffUsers.filter((user) => user.hasAccess).length}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-[#fafaf7] p-3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, or phone"
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none"
            />
          </div>

          {loadingUsers ? (
            <div className="mt-4 flex min-h-[220px] items-center justify-center rounded-2xl border border-black/10 bg-[#fafaf7]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" />
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black/60">
                          <UserRound className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-black">
                            {user.name || "Unnamed user"}
                          </p>
                          <p className="truncate text-xs text-black/55">{user.email}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        <span className={cn(
                          "rounded-full px-2.5 py-1",
                          user.hasAccess ? "bg-black text-white" : "bg-black/5 text-black/50",
                        )}>
                          Access {user.hasAccess ? "On" : "Off"}
                        </span>
                        {Object.keys(user.dashboardPermissions).length ? (
                          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-700">
                            {Object.keys(user.dashboardPermissions).length} sections
                          </span>
                        ) : (
                          <span className="rounded-full bg-black/5 px-2.5 py-1 text-black/50">
                            No sections
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {canUpdate ? (
                        <button
                          type="button"
                          onClick={() => {
                            setEditState({
                              id: user.id,
                              name: user.name || "",
                              email: user.email,
                              phone: user.phone || "",
                              hasAccess: user.hasAccess,
                              dashboardPermissions: user.dashboardPermissions,
                            });
                            setDialogOpen(true);
                          }}
                          className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white px-4 text-sm text-black"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </button>
                      ) : null}
                      {canDelete ? (
                        <button
                          type="button"
                          disabled={resettingUserId === user.id}
                          onClick={() => void resetUserAccess(user.id)}
                          className="inline-flex h-10 items-center justify-center rounded-xl bg-red-100 px-4 text-sm text-red-700 disabled:opacity-60"
                        >
                          {resettingUserId === user.id ? "Resetting..." : "Reset access"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {dialogOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-4 sm:items-center">
          <div className="w-full max-w-3xl rounded-[2rem] border border-black/10 bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-black">Edit staff user</h3>
                <p className="text-sm text-black/50">
                  Update profile details, access, and permissions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (savingUser) return;
                  setDialogOpen(false);
                  setEditState(emptyEditState);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                value={editState.name}
                onChange={(event) =>
                  setEditState((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Name"
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none"
              />
              <input
                value={editState.email}
                onChange={(event) =>
                  setEditState((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="Email"
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none"
              />
              <input
                value={editState.phone}
                onChange={(event) =>
                  setEditState((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder="Phone"
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none"
              />
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#fafaf7] px-4 py-3">
                <input
                  type="checkbox"
                  checked={editState.hasAccess}
                  onChange={(event) =>
                    setEditState((current) => ({
                      ...current,
                      hasAccess: event.target.checked,
                    }))
                  }
                />
                <span className="text-sm text-black">Allow access</span>
              </label>
            </div>

            <div className="mt-4">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-black/60" />
                <p className="text-sm font-medium text-black">Section permissions</p>
              </div>

              <div className="space-y-3">
                {dashboardSections.map((section) => (
                  <div
                    key={section}
                    className="rounded-2xl border border-black/10 bg-[#fafaf7] p-4"
                  >
                    <p className="text-sm font-medium text-black">{formatSectionLabel(section)}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {dashboardActions.map((action) => {
                        const checked =
                          editState.dashboardPermissions[section]?.includes(action) ?? false;

                        return (
                          <button
                            key={action}
                            type="button"
                            onClick={() => togglePermission(section, action)}
                            className={cn(
                              "inline-flex h-9 items-center justify-center rounded-full border px-3 text-xs uppercase tracking-[0.12em]",
                              checked
                                ? "border-black bg-black text-white"
                                : "border-black/10 bg-white text-black/60",
                            )}
                          >
                            {action}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => void saveUser()}
              disabled={savingUser}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-black px-4 text-sm font-medium text-white disabled:opacity-60"
            >
              {savingUser ? "Saving..." : "Save user"}
            </button>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}
