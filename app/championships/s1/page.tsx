"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  ExternalLink,
  Loader2,
  Medal,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

import { LandingHeader } from "@/components/home/landing-header";

const downloadHref =
  "https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn.apk";
const groupHref =
  "https://chat.whatsapp.com/K7HvplKHEJZ8Xcwrk6MHtZ?mode=gi_t";
const channelHref = "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h";
const whatsappLogoSrc = "/whatslogo.webp";
// const instagramLogoSrc = "/instalogo.webp";

type Step = "intro" | "form" | "whatsapp" | "success";

type Player = {
  name: string;
  phone: string;
  uid: string;
  ign: string;
};

type RegistrationDraft = {
  step?: Step;
  teamName?: string;
  players?: Player[];
  joinedGroup?: boolean;
  followedChannel?: boolean;
};

const emptyPlayer: Player = {
  name: "",
  phone: "",
  uid: "",
  ign: "",
};

const fieldLabels = [
  ["name", "Player name"],
  ["phone", "Phone"],
  ["uid", "UID"],
  ["ign", "IGN"],
] as const;

const draftStorageKey = "glenn_championship_s1_registration_draft";

function inputModeFor(field: keyof Player) {
  return field === "phone" || field === "uid" ? "numeric" : "text";
}

function getEmptyPlayers() {
  return Array.from({ length: 5 }, () => ({ ...emptyPlayer }));
}

function cleanText(value: string) {
  return value.trim();
}

function readDraft(): RegistrationDraft | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const savedDraft = window.localStorage.getItem(draftStorageKey);
    return savedDraft ? (JSON.parse(savedDraft) as RegistrationDraft) : null;
  } catch {
    return null;
  }
}

function validateTeamDetails(teamName: string, players: Player[]) {
  if (!cleanText(teamName)) {
    return "Team name is required.";
  }

  for (let index = 0; index < players.length; index += 1) {
    const player = players[index];
    const required = index < 4;
    const values = {
      name: cleanText(player.name),
      phone: cleanText(player.phone),
      uid: cleanText(player.uid),
      ign: cleanText(player.ign),
    };
    const hasAnyValue = Boolean(
      values.name || values.phone || values.uid || values.ign,
    );

    if (!required && !hasAnyValue) {
      continue;
    }

    if (!values.name || !values.phone || !values.uid || !values.ign) {
      return `Player ${index + 1} needs name, phone, UID, and IGN.`;
    }
  }

  return "";
}

export default function ChampionshipSeasonOnePage() {
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState<Player[]>(getEmptyPlayers);
  const [joinedGroup, setJoinedGroup] = useState(false);
  const [followedChannel, setFollowedChannel] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const completedPlayers = useMemo(
    () =>
      players.filter((player) =>
        [player.name, player.phone, player.uid, player.ign].every((value) =>
          value.trim(),
        ),
      ).length,
    [players],
  );

  useEffect(() => {
    queueMicrotask(() => {
      const draft = readDraft();

      if (draft) {
        if (draft.step && draft.step !== "success") {
          setStep(draft.step);
        }

        if (typeof draft.teamName === "string") {
          setTeamName(draft.teamName);
        }

        if (Array.isArray(draft.players)) {
          setPlayers(
            getEmptyPlayers().map((player, index) => ({
              ...player,
              ...draft.players?.[index],
            })),
          );
        }

        setJoinedGroup(draft.joinedGroup || false);
        setFollowedChannel(draft.followedChannel || false);
      }

      setDraftLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!draftLoaded || step === "success") {
      return;
    }

    window.localStorage.setItem(
      draftStorageKey,
      JSON.stringify({
        step,
        teamName,
        players,
        joinedGroup,
        followedChannel,
      }),
    );
  }, [draftLoaded, followedChannel, joinedGroup, players, step, teamName]);

  function updatePlayer(index: number, field: keyof Player, value: string) {
    setPlayers((current) =>
      current.map((player, playerIndex) =>
        playerIndex === index ? { ...player, [field]: value } : player,
      ),
    );
  }

  function goToStep(nextStep: Step) {
    setMessage("");
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleProceed(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const validationError = validateTeamDetails(teamName, players);

    if (validationError) {
      setMessage(validationError);
      return;
    }

    goToStep("whatsapp");
  }

  async function handleVerify() {
    setMessage("");

    const validationError = validateTeamDetails(teamName, players);

    if (validationError) {
      setMessage(validationError);
      goToStep("form");
      return;
    }

    if (!joinedGroup || !followedChannel) {
      setMessage(
        "You are not in this group/channel yet. Open both WhatsApp links first, otherwise your registration will not be counted.",
      );
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await fetch("/api/championships/s1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName,
          players,
          joinedGroup,
          followedChannel,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        registrationId?: string;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Registration failed.");
      }

      setRegistrationId(result.registrationId || "");
      window.localStorage.removeItem(draftStorageKey);
      goToStep("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <LandingHeader activeHref="/" />

      <section className="mx-auto w-full max-w-7xl px-6 pb-32 pt-10 sm:px-8 lg:px-12 lg:pt-24">
        {step === "intro" && (
          <div className="mx-auto max-w-6xl">
            <div className="border-t border-black pt-8">
              <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-black/55">
                    Registration Open
                  </p>
                  <h1
                    className="mt-4 text-5xl font-normal uppercase leading-[0.92] sm:text-7xl lg:text-[7rem]"
                    style={{ fontFamily: '"Anton", sans-serif' }}
                  >
                    GLENN
                    <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.96)]">
                      CHAMPIONSHIP
                    </span>
                    <span className="block">CUP S1.</span>
                  </h1>
                </div>

                <div className="border-l-0 border-black lg:border-l lg:pl-8">
                  <p className="text-base leading-8 text-black/72 sm:text-lg">
                    Build your 4-player Free Fire squad, add an optional substitute,
                    verify the official WhatsApp links, and lock your team into
                    Season 1.
                  </p>
                  <a
                    href={downloadHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-3 border border-black bg-black px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
                  >
                    Download Glenn
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-0 border border-black lg:grid-cols-3">
              {[
                { icon: Trophy, label: "Tournament", value: "Season 1 Cup" },
                { icon: Users, label: "Roster", value: "4 mandatory + 1 sub" },
                { icon: ShieldCheck, label: "Final check", value: "Group + channel" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`bg-white p-6 sm:p-8 ${index < 2 ? "border-b border-black lg:border-b-0 lg:border-r" : ""}`}
                >
                  <item.icon className="h-5 w-5" />
                  <p className="mt-6 text-xs uppercase tracking-[0.22em] text-black/48">
                    {item.label}
                  </p>
                  <p
                    className="mt-2 text-2xl font-normal uppercase"
                    style={{ fontFamily: '"Anton", sans-serif' }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 border border-black bg-black px-6 py-6 text-white sm:px-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                    Entry Flow
                  </p>
                  <p
                    className="mt-3 text-3xl font-normal uppercase sm:text-4xl"
                    style={{ fontFamily: '"Anton", sans-serif' }}
                  >
                    Read Rules. Enter Team. Verify Socials.
                  </p>
                </div>
                <div className="grid gap-2 text-sm text-white/78">
                  {[
                    "No auth required, only accurate squad details.",
                    "First four player rows must be complete.",
                    "Use correct UID and in-game names.",
                    "Your entry counts only after WhatsApp verification.",
                  ].map((rule) => (
                    <div key={rule} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 border border-black bg-[#f3f3ee] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.22em] text-black/52">
                Queue Status
              </p>
              <p className="mt-1 text-sm text-black/72">
                Registration pipeline is live for Glenn Championship Cup.
              </p>
            </div>
          </div>
        )}

        {step === "form" && (
          <form
            data-registration-form
            onSubmit={handleProceed}
            className="mx-auto max-w-6xl border border-black bg-white p-4 sm:p-6"
          >
            <StepHeader
              eyebrow="Step 01"
              title="Team Details"
              subtitle={`${completedPlayers}/5 player slots completed. First 4 are mandatory.`}
            />

            <label className="mt-5 block">
              <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-black/55">
                Team name
              </span>
              <input
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
                placeholder="Enter squad name"
                className="h-12 w-full border border-black bg-white px-4 text-sm text-black outline-none placeholder:text-black/28"
              />
            </label>

            {/* <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 border border-black bg-[#f3f3ee] px-3 py-3 text-center text-[10px] uppercase tracking-[0.16em] text-black/62">
              <span>Roster</span>
              <span className="h-px bg-black/20" />
              <span>UID Check</span>
              <span className="h-px bg-black/20" />
              <span>Social Verify</span>
            </div> */}

            <div className="mt-5 grid gap-3 sm:gap-4">
              {players.map((player, index) => (
                <section
                  key={index}
                  className="border border-black bg-[#f8f8f3] p-3 sm:p-4"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center border border-black bg-black text-sm text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p
                        className="text-2xl font-normal uppercase"
                        style={{ fontFamily: '"Anton", sans-serif' }}
                      >
                        Player {index + 1}
                      </p>
                      <p className="text-xs uppercase tracking-[0.18em] text-black/45">
                        {index < 4 ? "Mandatory" : "Optional substitute"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
                    {fieldLabels.map(([field, placeholder]) => (
                      <label key={field} className="block">
                        <span className="mb-1 block text-[10px] uppercase tracking-[0.16em] text-black/45">
                          {placeholder}
                        </span>
                        <input
                          value={player[field]}
                          onChange={(event) =>
                            updatePlayer(index, field, event.target.value)
                          }
                          placeholder={placeholder}
                          inputMode={inputModeFor(field)}
                          className="h-11 w-full min-w-0 border border-black bg-white px-3 text-sm text-black outline-none placeholder:text-black/28"
                        />
                      </label>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {message && <ErrorMessage message={message} />}

            <button type="submit" className="sr-only">
              Continue to social check
            </button>
          </form>
        )}

        {step === "whatsapp" && (
          <div className="mx-auto max-w-5xl border border-black bg-white p-4 sm:p-7">
            <StepHeader
              eyebrow="Step 02"
              title="Social Follow"
              subtitle="Open both WhatsApp links. Without this, your registration will not be counted."
            />

            <div className="mt-7 grid gap-4">
              {[
                {
                  href: groupHref,
                  active: joinedGroup,
                  onClick: () => setJoinedGroup(true),
                  title: "Join Group",
                  subtitle: "Glenn Championship Cup season 1",
                  logoSrc: whatsappLogoSrc,
                  logoAlt: "WhatsApp",
                },
                {
                  href: channelHref,
                  active: followedChannel,
                  onClick: () => setFollowedChannel(true),
                  title: "Follow Channel",
                  subtitle: "GLENN Esports official updates",
                  logoSrc: whatsappLogoSrc,
                  logoAlt: "WhatsApp",
                },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={item.onClick}
                  className="group flex min-h-16 w-full min-w-0 items-center justify-between gap-3 border border-black bg-[#f8f8f3] px-4 py-4 text-black transition hover:bg-[#ecece3] sm:px-5"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-black bg-white">
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt}
                        width={22}
                        height={22}
                        className="h-5 w-5 object-contain"
                      />
                    </span>
                    <span className="min-w-0">
                      <span
                        className="block text-lg font-normal uppercase leading-tight sm:text-2xl"
                        style={{ fontFamily: '"Anton", sans-serif' }}
                      >
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-black/62 sm:text-sm">
                        {item.subtitle}
                      </span>
                    </span>
                  </span>
                  {item.active ? (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-black bg-black text-white">
                      <Check className="h-5 w-5" />
                    </span>
                  ) : (
                    <ExternalLink className="h-5 w-5 shrink-0 text-black/58 transition group-hover:text-black" />
                  )}
                </a>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["Group", joinedGroup],
                ["Channel", followedChannel],
              ].map(([label, active]) => (
                <div
                  key={String(label)}
                  className={`border px-4 py-3 text-center text-xs uppercase tracking-[0.18em] ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black bg-white text-black/42"
                  }`}
                >
                  {active ? "Opened" : "Pending"} {label}
                </div>
              ))}
            </div>

            {message && <ErrorMessage message={message} />}
          </div>
        )}

        {step === "success" && (
          <SuccessScreen registrationId={registrationId} teamName={teamName} />
        )}
      </section>

      {(step === "intro" || step === "form" || step === "whatsapp") && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-6xl items-center gap-3">
            <div className="hidden min-w-0 sm:block">
              <p className="text-xs uppercase tracking-[0.22em] text-black/55">
                {step === "intro" && "Squad lobby ready"}
                {step === "form" && "Roster entry"}
                {step === "whatsapp" && "Final social check"}
              </p>
              <p className="truncate text-sm text-black/62">
                {step === "intro" &&
                  "Start registration for Glenn Championship Cup Season 1."}
                {step === "form" &&
                  "Save team details and continue to WhatsApp verification."}
                {step === "whatsapp" &&
                  "Verify after opening both official WhatsApp links."}
              </p>
            </div>
            {step === "intro" && (
              <div className="ml-auto flex w-full flex-col gap-3 sm:w-auto sm:min-w-[21rem] sm:flex-row">
                <button
                  type="button"
                  onClick={() => goToStep("form")}
                  className="inline-flex h-13 w-full items-center justify-center gap-2 border border-black bg-black px-6 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
                >
                  Register now
                  <ChevronRight className="h-4 w-4" />
                </button>
                <Link
                  href="/complaints"
                  className="inline-flex h-13 w-full items-center justify-center gap-2 border border-black bg-white px-6 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
                >
                  Raise Complaint
                </Link>
              </div>
            )}
            {step === "form" && (
              <div className="ml-auto flex w-full flex-col gap-3 sm:w-auto sm:min-w-[21rem] sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    const form = document.querySelector<HTMLFormElement>(
                      "[data-registration-form]",
                    );
                    form?.requestSubmit();
                  }}
                  className="inline-flex h-13 w-full items-center justify-center gap-2 border border-black bg-black px-6 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
                >
                  Continue to social check
                  <ChevronRight className="h-4 w-4" />
                </button>
                <Link
                  href="/complaints"
                  className="inline-flex h-13 w-full items-center justify-center gap-2 border border-black bg-white px-6 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
                >
                  Raise Complaint
                </Link>
              </div>
            )}
            {step === "whatsapp" && (
              <div className="ml-auto flex w-full flex-col gap-3 sm:w-auto sm:min-w-[21rem] sm:flex-row">
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={submitting}
                  className="inline-flex h-13 w-full items-center justify-center gap-2 border border-black bg-black px-6 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying
                    </>
                  ) : (
                    "Verify Registration"
                  )}
                </button>
                <Link
                  href="/complaints"
                  className="inline-flex h-13 w-full items-center justify-center gap-2 border border-black bg-white px-6 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
                >
                  Raise Complaint
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes glenn-confetti-drop {
          0% {
            transform: translate3d(0, -18vh, 0) rotate(0deg);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--drift), 104vh, 0) rotate(740deg);
            opacity: 0;
          }
        }

        @keyframes glenn-victory-pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(255, 255, 255, 0);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 54px rgba(255, 255, 255, 0.2);
          }
        }

        .glenn-confetti {
          animation: glenn-confetti-drop var(--speed) linear infinite;
          animation-delay: var(--delay);
        }

        .glenn-victory-badge {
          animation: glenn-victory-pulse 1.8s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

function StepHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-black pb-4">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center border border-black bg-black text-white">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-black/55">
            {eyebrow}
          </p>
          <h2
            className="mt-1 text-3xl font-normal uppercase sm:text-5xl"
            style={{ fontFamily: '"Anton", sans-serif' }}
          >
            {title}
          </h2>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-black/62">{subtitle}</p>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="mt-5 border border-black bg-[#f3f3ee] px-4 py-3 text-sm text-black">
      {message}
    </p>
  );
}

function SuccessScreen({
  registrationId,
  teamName,
}: {
  registrationId: string;
  teamName: string;
}) {
  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden border border-white bg-white p-5 text-center text-black sm:p-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 34 }).map((_, index) => (
          <span
            key={index}
            className="glenn-confetti absolute top-0 h-3 w-1.5"
            style={
              {
                left: `${(index * 29) % 100}%`,
                "--drift": `${index % 2 === 0 ? "" : "-"}${24 + (index % 7) * 12}px`,
                "--speed": `${2.8 + (index % 5) * 0.32}s`,
                "--delay": `${(index % 9) * -0.28}s`,
                background:
                  index % 3 === 0
                    ? "#ffffff"
                    : index % 3 === 1
                      ? "#00ff00"
                      : "#00ff00",
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="glenn-victory-badge relative mx-auto flex h-20 w-20 items-center justify-center border border-white bg-white text-black">
        <Medal className="h-11 w-11" />
      </div>
      <p className="relative mt-6 text-xs uppercase tracking-[0.3em] text-black/58">
        Squad Locked
      </p>
      <h2
        className="relative mt-3 text-4xl font-normal uppercase leading-none sm:text-6xl"
        style={{ fontFamily: '"Anton", sans-serif' }}
      >
        Successfully
        <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.95)]">
          Registered
        </span>
      </h2>
      <p className="relative mx-auto mt-5 max-w-xl text-sm leading-7 text-black/70">
        {teamName || "Your team"} is verified for Glenn Championship Cup Season
        1. Keep an eye on the WhatsApp group for match updates.
      </p>
      {registrationId && (
        <p className="relative mt-6 break-all border border-black/25 bg-black/8 px-4 py-3 text-xs uppercase text-black/72">
          ID: {registrationId}
        </p>
      )}
    </div>
  );
}
