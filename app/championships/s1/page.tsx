"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Crosshair,
  ExternalLink,
  Gamepad2,
  Loader2,
  Medal,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

const downloadHref =
  "https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn.apk";
const groupHref =
  "https://chat.whatsapp.com/K7HvplKHEJZ8Xcwrk6MHtZ?mode=gi_t";
const channelHref = "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h";
const whatsappLogoHref =
  "https://static.vecteezy.com/system/resources/previews/016/716/480/non_2x/whatsapp-icon-free-png.png";

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
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050607] text-white">
      <AnimatedGridPattern
        width={42}
        height={42}
        numSquares={46}
        maxOpacity={0.24}
        duration={2.6}
        repeatDelay={0.7}
        className="fixed inset-0 text-[#c8ff00]/35 [mask-image:linear-gradient(to_bottom,white,transparent_78%)]"
      />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(200,255,0,0.16),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(218,143,255,0.16),transparent_30%),linear-gradient(120deg,rgba(255,61,113,0.08),transparent_42%)]" />
      <div className="fixed inset-0 opacity-[0.13] [background-image:repeating-linear-gradient(135deg,#ffffff_0_1px,transparent_1px_14px)]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050607]/0 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-8 lg:px-12">
          <Link href="/" className="flex min-w-0 items-center">
            <Image
              src="/logos.svg"
              alt="GLENN"
              width={168}
              height={48}
              className="-ml-3 h-auto w-28 invert sm:w-40"
              priority
            />
          </Link>

          <a
            href={downloadHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 shrink-0 items-center gap-2 bg-[#c8ff00] px-4 text-xs font-black uppercase text-black transition hover:-translate-y-0.5 hover:bg-white sm:h-12 sm:px-5 [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]"
          >
            <Image
              src="/android.svg"
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
            />
            Download
          </a>
        </div>
      </header>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-3 pb-32 pt-[4.7rem] sm:px-8 sm:pt-28 lg:px-12">
        {step === "intro" && (
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden border border-white/12 bg-black/48 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7 lg:p-9 [clip-path:polygon(16px_0,100%_0,100%_calc(100%-28px),calc(100%-28px)_100%,0_100%,0_16px)]">
              <div className="absolute right-3 top-3 hidden h-28 w-28 border border-[#c8ff00]/20 sm:block [clip-path:polygon(28px_0,100%_0,100%_100%,0_100%,0_28px)]" />
              <div className="absolute -right-16 bottom-0 h-48 w-48 bg-[#c8ff00]/10 blur-3xl" />

              <div className="inline-flex items-center gap-2 bg-white px-3 py-2 text-[10px] font-black uppercase text-black sm:text-xs [clip-path:polygon(8px_0,100%_0,100%_100%,0_100%,0_8px)]">
                <Gamepad2 className="h-4 w-4" />
                Registration Open
              </div>

              <h1 className="mt-5 max-w-4xl text-[2.65rem] font-black uppercase leading-[0.86] sm:text-7xl lg:text-8xl">
                Glenn
                <span className="block text-[#c8ff00]">Championship</span>
                <span className="block text-white">Cup S1</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                Build your 4-player Free Fire squad, add an optional substitute,
                join the official WhatsApp group, follow GLENN Esports, and
                lock your team into Season 1.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Trophy, label: "Tournament", value: "Season 1 Cup" },
                  { icon: Users, label: "Roster", value: "4 mandatory + 1 sub" },
                  { icon: ShieldCheck, label: "Final check", value: "Group + channel" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border border-white/10 bg-white/[0.055] p-4 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_12px)]"
                  >
                    <item.icon className="h-5 w-5 text-[#c8ff00]" />
                    <p className="mt-3 text-[10px] font-black uppercase text-white/40">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-black uppercase text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-y border-white/10 py-4">
                <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-[10px] font-black uppercase text-white/55 sm:text-xs">
                  <span className="text-[#c8ff00]">Read Rules</span>
                  <ChevronRight className="h-4 w-4 text-[#c8ff00]" />
                  <span>Enter Team</span>
                  <ChevronRight className="h-4 w-4 text-[#c8ff00]" />
                  <span>Verify Socials</span>
                </div>
              </div>

              <div className="mt-6 grid gap-2 text-sm font-bold text-white/72 sm:grid-cols-2">
                {[
                  "No auth required, only accurate squad details.",
                  "First four player rows must be complete.",
                  "Use correct UID and in-game names.",
                  "Your entry counts only after WhatsApp verification.",
                ].map((rule) => (
                  <div key={rule} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c8ff00]" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 hidden items-center justify-between border border-[#da8fff]/24 bg-[#da8fff]/8 px-5 py-4 sm:flex [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]">
              <div>
                <p className="text-xs font-black uppercase text-[#f0c8ff]">
                  Queue Status
                </p>
                <p className="mt-1 text-sm font-bold text-white/64">
                  Registration pipeline is live for Glenn Championship Cup.
                </p>
              </div>
              <Crosshair className="h-7 w-7 text-[#c8ff00]" />
            </div>
          </div>
        )}

        {step === "form" && (
          <form
            data-registration-form
            onSubmit={handleProceed}
            className="mx-auto max-w-5xl border border-white/12 bg-[#080a0c]/84 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-6 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-24px),calc(100%-24px)_100%,0_100%,0_14px)]"
          >
            <StepHeader
              eyebrow="Step 01"
              title="Team Details"
              subtitle={`${completedPlayers}/5 player slots completed. First 4 are mandatory.`}
            />

            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-black uppercase text-white/50">
                Team name
              </span>
              <input
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
                placeholder="Enter squad name"
                className="h-12 w-full border border-white/12 bg-black/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-white/28 focus:border-[#c8ff00]"
              />
            </label>

            <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 border border-white/10 bg-black/32 px-3 py-2 text-center text-[9px] font-black uppercase text-white/50 sm:text-[10px] [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">
              <span className="text-[#c8ff00]">Roster</span>
              <span className="h-px bg-white/20" />
              <span>UID Check</span>
              <span className="h-px bg-white/20" />
              <span>Social Verify</span>
            </div>

            <div className="mt-4 grid gap-2.5 sm:gap-4">
              {players.map((player, index) => (
                <section
                  key={index}
                  className="border border-white/10 bg-white/[0.045] p-2.5 sm:p-4 [clip-path:polygon(12px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_12px)]"
                >
                  <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
                    <span className="flex h-8 w-8 items-center justify-center bg-[#c8ff00] text-xs font-black text-black sm:h-9 sm:w-9 sm:text-sm [clip-path:polygon(9px_0,100%_0,100%_100%,0_100%,0_9px)]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-xs font-black uppercase sm:text-sm">
                        Player {index + 1}
                      </p>
                      <p className="text-[10px] font-bold uppercase text-white/42 sm:text-xs">
                        {index < 4 ? "Mandatory" : "Optional substitute"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
                    {fieldLabels.map(([field, placeholder]) => (
                      <label key={field} className="block">
                        <span className="mb-1 block text-[9px] font-bold uppercase text-white/42 sm:text-[11px]">
                          {placeholder}
                        </span>
                        <input
                          value={player[field]}
                          onChange={(event) =>
                            updatePlayer(index, field, event.target.value)
                          }
                          placeholder={placeholder}
                          inputMode={inputModeFor(field)}
                          className="h-10 w-full min-w-0 border border-white/10 bg-black/38 px-2 text-xs text-white outline-none transition placeholder:text-white/24 focus:border-[#da8fff] sm:h-11 sm:px-3 sm:text-sm"
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
          <div className="mx-auto max-w-4xl border border-white/12 bg-[#080a0c]/86 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7 [clip-path:polygon(18px_0,100%_0,100%_calc(100%-32px),calc(100%-32px)_100%,0_100%,0_18px)]">
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
                },
                {
                  href: channelHref,
                  active: followedChannel,
                  onClick: () => setFollowedChannel(true),
                  title: "Follow Channel",
                  subtitle: "GLENN Esports official updates",
                },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={item.onClick}
                  className="group flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-[#25d366]/25 bg-[#ffffff] px-4 py-3 text-black shadow-[0_18px_46px_rgba(37,211,102,0.16)] transition hover:-translate-y-0.5 hover:bg-[#36e176] sm:px-5"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="h-10 w-10 shrink-0 rounded-full bg-white bg-contain bg-center bg-no-repeat shadow-sm"
                      style={{ backgroundImage: `url(${whatsappLogoHref})` }}
                    />
                    <span className="min-w-0">
                      <span className="block text-base font-black sm:text-lg">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-semibold text-black/62">
                        {item.subtitle}
                      </span>
                    </span>
                  </span>
                  {item.active ? (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[#25d366]">
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
                  className={`border px-4 py-3 text-center text-xs font-black uppercase ${
                    active
                      ? "border-[#c8ff00]/40 bg-[#c8ff00]/12 text-[#c8ff00]"
                      : "border-white/10 bg-white/[0.04] text-white/42"
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
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050607]/88 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex max-w-5xl items-center gap-3">
            <div className="hidden min-w-0 sm:block">
              <p className="text-xs font-black uppercase text-[#c8ff00]">
                {step === "intro" && "Squad lobby ready"}
                {step === "form" && "Roster entry"}
                {step === "whatsapp" && "Final social check"}
              </p>
              <p className="truncate text-sm text-white/55">
                {step === "intro" &&
                  "Start registration for Glenn Championship Cup Season 1."}
                {step === "form" &&
                  "Save team details and continue to WhatsApp verification."}
                {step === "whatsapp" &&
                  "Verify after opening both official WhatsApp links."}
              </p>
            </div>
            {step === "intro" && (
              <button
                type="button"
                onClick={() => goToStep("form")}
                className="inline-flex h-13 w-full items-center justify-center gap-2 bg-[#c8ff00] px-6 text-sm font-black uppercase text-black transition active:scale-[0.99] sm:ml-auto sm:w-auto sm:min-w-72 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]"
              >
                Register now
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
            {step === "form" && (
              <button
                type="button"
                onClick={() => {
                  const form = document.querySelector<HTMLFormElement>(
                    "[data-registration-form]",
                  );
                  form?.requestSubmit();
                }}
                className="inline-flex h-13 w-full items-center justify-center gap-2 bg-[#c8ff00] px-6 text-sm font-black uppercase text-black transition active:scale-[0.99] sm:ml-auto sm:w-auto sm:min-w-72 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]"
              >
                Continue to social check
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
            {step === "whatsapp" && (
              <button
                type="button"
                onClick={handleVerify}
                disabled={submitting}
                className="inline-flex h-13 w-full items-center justify-center gap-2 bg-white px-6 text-sm font-black uppercase text-black transition active:scale-[0.99] hover:bg-[#c8ff00] disabled:cursor-not-allowed disabled:opacity-70 sm:ml-auto sm:w-auto sm:min-w-72 [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]"
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
            box-shadow: 0 0 0 rgba(200, 255, 0, 0);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 54px rgba(200, 255, 0, 0.35);
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
    <div className="border-b border-white/10 pb-4">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center bg-[#c8ff00] text-black [clip-path:polygon(12px_0,100%_0,100%_100%,0_100%,0_12px)]">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs font-black uppercase text-[#c8ff00]">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-black uppercase sm:text-4xl">
            {title}
          </h2>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-white/58">{subtitle}</p>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="mt-5 border border-[#ff3d71]/35 bg-[#ff3d71]/12 px-4 py-3 text-sm font-semibold text-red-100">
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
    <div className="relative mx-auto max-w-4xl overflow-hidden border border-[#c8ff00]/35 bg-[#101a08]/88 p-5 text-center shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-10 [clip-path:polygon(18px_0,100%_0,100%_calc(100%-32px),calc(100%-32px)_100%,0_100%,0_18px)]">
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
                    ? "#c8ff00"
                    : index % 3 === 1
                      ? "#da8fff"
                      : "#ff3d71",
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="glenn-victory-badge relative mx-auto flex h-20 w-20 items-center justify-center bg-[#c8ff00] text-black [clip-path:polygon(20px_0,100%_0,100%_100%,0_100%,0_20px)]">
        <Medal className="h-11 w-11" />
      </div>
      <p className="relative mt-6 text-xs font-black uppercase tracking-[0.3em] text-[#c8ff00]">
        Squad Locked
      </p>
      <h2 className="relative mt-3 text-4xl font-black uppercase leading-none sm:text-6xl">
        Successfully
        <span className="block text-[#c8ff00]">Registered</span>
      </h2>
      <p className="relative mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70">
        {teamName || "Your team"} is verified for Glenn Championship Cup Season
        1. Keep an eye on the WhatsApp group for match updates.
      </p>
      {registrationId && (
        <p className="relative mt-6 break-all border border-white/12 bg-black/38 px-4 py-3 text-xs font-bold uppercase text-white/62">
          ID: {registrationId}
        </p>
      )}
    </div>
  );
}
