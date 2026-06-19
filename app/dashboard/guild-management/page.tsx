"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Camera, Pencil, Plus, Trash2, User, X } from "lucide-react";
import { DashboardLogin } from "@/components/dashboard/dashboard-login";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { useDashboardAuth } from "@/components/dashboard/dashboard-auth-context";
import { hasDashboardAction } from "@/lib/dashboard-permissions";

type GuildPlayer = {
  id: string;
  player_name: string;
  in_game_name: string;
  photo_url: string | null;
  player_uid: string;
  date_of_birth: string | null;
  address: string | null;
  contact_number: string | null;
};

const emptyGuildForm = {
  id: "",
  playerName: "",
  inGameName: "",
  photoUrl: "",
  playerUid: "",
  dateOfBirth: "",
  address: "",
  contactNumber: "",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
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

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-4xl border border-black/10 bg-[#fcfcfa] p-4">{children}</div>;
}

export default function GuildManagementPage() {
  const auth = useDashboardAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [guildPlayers, setGuildPlayers] = useState<GuildPlayer[]>([]);
  const [guildForm, setGuildForm] = useState(emptyGuildForm);
  const [sectionMessage, setSectionMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingPlayer, setSavingPlayer] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletingPlayerId, setDeletingPlayerId] = useState<string | null>(null);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [playerPendingDelete, setPlayerPendingDelete] = useState<GuildPlayer | null>(null);

  async function loadSection() {
    if (!auth.token) return;
    setLoadingPlayers(true);
    const response = await fetch("/api/dashboard/guild-management", {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    const data = (await response.json()) as { items?: GuildPlayer[]; error?: string };
    if (!response.ok) {
      setSectionMessage(data.error || "Unable to load section.");
      setLoadingPlayers(false);
      return;
    }
    setGuildPlayers(data.items ?? []);
    setLoadingPlayers(false);
  }

  useEffect(() => {
    if (auth.token && auth.profile) {
      void loadSection();
    }
  }, [auth.token, auth.profile]);

  async function handleGuildImageUpload(file: File) {
    if (!auth.token) return;
    setUploadingImage(true);
    setSectionMessage("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "dashboard/players");
      const response = await fetch("/api/dashboard/upload-image", {
        method: "POST",
        headers: { Authorization: `Bearer ${auth.token}` },
        body: formData,
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to upload image.");
      }
      setGuildForm((current) => ({ ...current, photoUrl: data.url ?? "" }));
      setSectionMessage("Player image uploaded.");
    } catch (error) {
      setSectionMessage(error instanceof Error ? error.message : "Unable to upload image.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function submitGuildForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auth.token) return;

    setSavingPlayer(true);
    const method = guildForm.id ? "PATCH" : "POST";
    const response = await fetch("/api/dashboard/guild-management", {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(guildForm),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setSectionMessage(data.error || "Unable to save player.");
      setSavingPlayer(false);
      return;
    }

    const wasEditing = Boolean(guildForm.id);
    setGuildForm(emptyGuildForm);
    setDialogOpen(false);
    setSectionMessage(wasEditing ? "Player updated." : "Player added.");
    await loadSection();
    setSavingPlayer(false);
  }

  async function deleteGuildPlayer(id: string) {
    if (!auth.token) return;
    setDeletingPlayerId(id);
    const response = await fetch(`/api/dashboard/guild-management?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setSectionMessage(data.error || "Unable to delete player.");
      setDeletingPlayerId(null);
      return;
    }
    setSectionMessage("Player deleted.");
    await loadSection();
    setDeletingPlayerId(null);
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
  const canManagePlayers =
    hasDashboardAction(profile.permissions, "guild_management", "insert") ||
    hasDashboardAction(profile.permissions, "guild_management", "update");

  return (
    <DashboardShell
      profile={profile}
      availableSections={auth.availableSections}
      onLogout={auth.handleLogout}
      title="Guild Management"
      subtitle="Players, UIDs, and team records."
      mobileSidebarOpen={mobileSidebarOpen}
      setMobileSidebarOpen={setMobileSidebarOpen}
    >
      {sectionMessage ? (
        <div className="mb-4 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black/70">
          {sectionMessage}
        </div>
      ) : null}

      <div className="mb-4 flex items-center justify-between rounded-2xl border border-black/10 bg-[#fafaf7] px-4 py-3">
        <div>
          <p className="text-sm font-medium text-black">Total Players</p>
          <p className="text-xs text-black/50">Current guild roster</p>
        </div>
        <div className="text-2xl font-semibold text-black">
          {loadingPlayers ? "..." : guildPlayers.length}
        </div>
      </div>

      {loadingPlayers ? (
        <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-black/10 bg-[#fafaf7]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" />
        </div>
      ) : (
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {guildPlayers.map((player) => (
          <Card key={player.id}>
            <div className="space-y-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full border border-black/10 bg-white">
                  {player.photo_url ? (
                    <img
                      src={player.photo_url}
                      alt={player.player_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-black/35">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-black">
                    {player.player_name}
                  </h3>
                  <p className="truncate text-xs text-black/60">{player.in_game_name}</p>
                  <p className="truncate text-xs text-black/45">UID: {player.player_uid}</p>
                  {player.contact_number ? (
                    <p className="truncate text-xs text-black/45">
                      Contact: {player.contact_number}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex gap-2">
                {hasDashboardAction(profile.permissions, "guild_management", "update") ? (
                  <button
                    type="button"
                    disabled={deletingPlayerId === player.id}
                    onClick={() => {
                      setGuildForm({
                        id: player.id,
                        playerName: player.player_name,
                        inGameName: player.in_game_name,
                        photoUrl: player.photo_url ?? "",
                        playerUid: player.player_uid,
                        dateOfBirth: player.date_of_birth ?? "",
                        address: player.address ?? "",
                        contactNumber: player.contact_number ?? "",
                      });
                      setDialogOpen(true);
                    }}
                    className="inline-flex h-9 items-center justify-center rounded-lg border border-black/10 px-3 text-sm text-black disabled:opacity-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                ) : null}
                {hasDashboardAction(profile.permissions, "guild_management", "delete") ? (
                  <button
                    type="button"
                    disabled={deletingPlayerId === player.id}
                    onClick={() => setPlayerPendingDelete(player)}
                    className="inline-flex min-w-[96px] h-9 items-center justify-center rounded-lg border border-black/10 px-3 text-sm text-black disabled:opacity-50"
                  >
                    {deletingPlayerId === player.id ? (
                      "Deleting..."
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                ) : null}
              </div>
            </div>
          </Card>
        ))}
      </div>
      )}

      {canManagePlayers ? (
        <button
          type="button"
          onClick={() => {
            setGuildForm(emptyGuildForm);
            setDialogOpen(true);
          }}
          className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:opacity-90"
          aria-label="Add player"
        >
          <Plus className="h-5 w-5" />
        </button>
      ) : null}

      {dialogOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-black/10 bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-black">
                {guildForm.id ? "Edit Player" : "Add Player"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  if (savingPlayer) return;
                  setDialogOpen(false);
                  setGuildForm(emptyGuildForm);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form className="mt-4 grid gap-3" onSubmit={submitGuildForm}>
              <Field
                value={guildForm.playerName}
                onChange={(e) =>
                  setGuildForm((c) => ({ ...c, playerName: e.target.value }))
                }
                placeholder="Player name"
              />
              <Field
                value={guildForm.inGameName}
                onChange={(e) =>
                  setGuildForm((c) => ({ ...c, inGameName: e.target.value }))
                }
                placeholder="In-game name"
              />
              <Field
                value={guildForm.playerUid}
                onChange={(e) =>
                  setGuildForm((c) => ({ ...c, playerUid: e.target.value }))
                }
                placeholder="UID"
              />
              <Field
                type="date"
                value={guildForm.dateOfBirth}
                onChange={(e) =>
                  setGuildForm((c) => ({ ...c, dateOfBirth: e.target.value }))
                }
                placeholder="Date of birth"
              />
              <Field
                value={guildForm.contactNumber}
                onChange={(e) =>
                  setGuildForm((c) => ({ ...c, contactNumber: e.target.value }))
                }
                placeholder="Contact number"
                inputMode="tel"
              />
              <Field
                value={guildForm.address}
                onChange={(e) =>
                  setGuildForm((c) => ({ ...c, address: e.target.value }))
                }
                placeholder="Address"
              />
              <div className="rounded-xl border border-dashed border-black/15 bg-white p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black">Player image</p>
                    <p className="text-xs text-black/50">Upload directly to ImageKit</p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black">
                    <Camera className="mr-2 h-4 w-4" />
                    {uploadingImage ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void handleGuildImageUpload(file);
                        event.target.value = "";
                      }}
                    />
                  </label>
                </div>
                {guildForm.photoUrl ? (
                  <div className="mt-3 overflow-hidden rounded-xl border border-black/10 bg-white">
                    <img
                      src={guildForm.photoUrl}
                      alt="Player"
                      className="h-28 w-full object-cover"
                    />
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={savingPlayer}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-black px-4 text-sm font-medium text-white disabled:opacity-60"
              >
                <Plus className="mr-2 h-4 w-4" />
                {savingPlayer
                  ? guildForm.id
                    ? "Updating..."
                    : "Adding..."
                  : guildForm.id
                    ? "Update"
                    : "Add"}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {playerPendingDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-5 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-black">Delete player?</h3>
                <p className="mt-1 text-sm text-black/60">
                  This will remove <span className="font-medium text-black">{playerPendingDelete.player_name}</span> from guild management.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                disabled={deletingPlayerId === playerPendingDelete.id}
                onClick={() => setPlayerPendingDelete(null)}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 px-4 text-sm text-black disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingPlayerId === playerPendingDelete.id}
                onClick={async () => {
                  await deleteGuildPlayer(playerPendingDelete.id);
                  setPlayerPendingDelete(null);
                }}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-medium text-white disabled:opacity-60"
              >
                {deletingPlayerId === playerPendingDelete.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}
