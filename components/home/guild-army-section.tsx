"use client";

import { useEffect, useState } from "react";
import { User, X } from "lucide-react";

type GuildArmyPlayer = {
  id: string;
  player_name: string;
  in_game_name: string;
  photo_url: string | null;
  player_uid: string;
  date_of_birth: string | null;
  address: string | null;
  contact_number: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "Not added";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function GuildArmySection() {
  const [players, setPlayers] = useState<GuildArmyPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<GuildArmyPlayer | null>(null);

  useEffect(() => {
    async function loadPlayers() {
      try {
        const response = await fetch("/api/guild-army", { cache: "no-store" });
        const data = (await response.json()) as {
          items?: GuildArmyPlayer[];
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error || "Unable to load guild army.");
        }

        setPlayers(data.items ?? []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load guild army.");
      } finally {
        setLoading(false);
      }
    }

    void loadPlayers();
  }, []);

  return (
    <section
      className="mt-16 w-full bg-white py-10 text-black"
      style={{ fontFamily: '"Anton", sans-serif' }}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-black/55 sm:text-base">
        OUR BUDDIES
      </p>
      <h2 className="mt-2 text-3xl font-normal uppercase tracking-[0.06em] sm:text-4xl lg:text-5xl">
        GLENN ARMY{" "}
        <span className="text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.95)]">
          SOLDIERS
        </span>
      </h2>

      {loading ? (
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-square bg-black/6" />
              <div className="mt-2 h-3 bg-black/8" />
              <div className="mt-1 h-3 w-3/4 bg-black/6" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mt-8 border border-black/10 px-4 py-5 text-sm text-black/60">
          {error}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {players.map((player) => (
            <button
              key={player.id}
              type="button"
              onClick={() => setSelectedPlayer(player)}
              className="min-w-0 text-left"
            >
              <div className="aspect-square overflow-hidden border border-black/10 bg-black/4">
                {player.photo_url ? (
                  <img
                    src={player.photo_url}
                    alt={player.player_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-black/30">
                    <User className="h-6 w-6" />
                  </div>
                )}
              </div>
              <p className="mt-2 truncate text-xs font-normal uppercase text-black sm:text-sm">
                {player.player_name}
              </p>
              <p className="truncate text-[11px] uppercase text-black/55 sm:text-xs">
                {player.in_game_name}
              </p>
            </button>
          ))}
        </div>
      )}

      {selectedPlayer ? (
        <div className="fixed inset-0 z-50 bg-black/45" onClick={() => setSelectedPlayer(null)}>
          <div className="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
            <div
              className="w-full rounded-t-[2rem] bg-white p-4 sm:max-w-xl sm:rounded-[2rem] sm:border sm:border-black/10 sm:p-5"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-black/10 sm:hidden" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-normal uppercase text-black">
                    {selectedPlayer.player_name}
                  </p>
                  <p className="text-sm uppercase text-black/55">
                    {selectedPlayer.in_game_name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPlayer(null)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 overflow-hidden border border-black/10 bg-black/4">
                {selectedPlayer.photo_url ? (
                  <img
                    src={selectedPlayer.photo_url}
                    alt={selectedPlayer.player_name}
                    className="aspect-square w-full object-cover sm:aspect-[4/3]"
                  />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center text-black/30 sm:aspect-[4/3]">
                    <User className="h-8 w-8" />
                  </div>
                )}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="border border-black/10 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-black/45">UID</p>
                  <p className="mt-2 text-sm uppercase text-black">{selectedPlayer.player_uid}</p>
                </div>
                <div className="border border-black/10 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-black/45">
                    Date Of Birth
                  </p>
                  <p className="mt-2 text-sm uppercase text-black">
                    {formatDate(selectedPlayer.date_of_birth)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
