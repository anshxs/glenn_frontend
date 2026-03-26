import Image from "next/image";
import {
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  Target,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";

const downloadHref =
  "https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn-v1.0.0.apk";

const stats = [
  { value: "Daily", label: "tournament energy" },
  { value: "Skill-first", label: "competitive design" },
  { value: "Community", label: "built into the core" },
];

const pillars = [
  {
    title: "Why We Exist",
    body: "India has millions of serious Free Fire players, but not enough spaces that reward consistency, talent, and community at the same time.",
  },
  {
    title: "Our Mission",
    body: "Make competitive play feel accessible, trustworthy, and exciting for every player who wants more from the grind.",
  },
  {
    title: "Our Vision",
    body: "Become the home base for India’s Free Fire esports culture, where players compete, connect, and get recognized.",
  },
];

const values = [
  {
    icon: Trophy,
    title: "Competition With Meaning",
    body: "We build around matches that matter, leaderboards that feel alive, and recognition players actually care about.",
  },
  {
    icon: ShieldCheck,
    title: "Fairness First",
    body: "Verified stats, anti-abuse thinking, and transparent reward systems sit at the center of how GLENN is designed.",
  },
  {
    icon: Users,
    title: "Community Is The Product",
    body: "Squads, rooms, chat, and player identity are not extras here. They are part of the whole experience.",
  },
  {
    icon: Wallet,
    title: "Progress That Pays",
    body: "We want players to feel that the hours they put in can translate into rewards, reputation, and opportunity.",
  },
];

const journey = [
  {
    icon: Target,
    title: "For the grinders",
    body: "GLENN is made for players who queue up with intent, track performance, and want every match to push them forward.",
  },
  {
    icon: MessageCircle,
    title: "For the squads",
    body: "From finding your people to staying locked in before a match, we’re building the social side of esports with equal care.",
  },
  {
    icon: ArrowUpRight,
    title: "For what comes next",
    body: "We’re not building a one-feature app. We’re building an ecosystem that can keep expanding with the community.",
  },
];

export default function About() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040404] text-white">
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[7.5rem] h-[24rem] w-[24rem] rounded-full bg-[#aa3aff]/[0.14] blur-[120px]" />
        <div className="absolute right-[-10rem] top-[4.5rem] h-[28rem] w-[28rem] rounded-full bg-[#c8ff00]/[0.12] blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-[24rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[140px]" />
      </div> */}

      <LandingHeader activeHref="/about" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              About GLENN
            </div>

            <div className="mt-8 space-y-1 flex flex-wrap justify-start">
              <p className="text-5xl font-black uppercase tracking-[-0.06em] text-[#aa3aff] sm:text-7xl lg:text-[6.4rem]">
                Built.
              </p>
              <p className="text-5xl font-black uppercase tracking-[-0.06em] text-transparent [text-shadow:0_0_0_rgba(255,255,255,0.95)] [-webkit-text-stroke:1.4px_rgba(255,255,255,0.95)] sm:text-7xl lg:text-[6.4rem]">
                For.
              </p>
              <p className="text-5xl font-black uppercase tracking-[-0.06em] text-white sm:text-7xl lg:text-[6.4rem]">
                Players.
              </p>
            </div>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              GLENN exists because competitive Free Fire players deserve more
              than scattered tournaments and throwaway communities. We are
              building one place where competition, connection, progression,
              and recognition live together.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.6rem] border border-white/[0.08] bg-white/[0.04] px-5 py-5"
                >
                  <p className="text-xl font-black tracking-[-0.04em] text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/[0.58]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-start">
              <Image
                src="/fin1.png"
                alt="Download highlight"
                width={1280}
                height={408}
                className="pointer-events-none relative z-0 -mb-4 w-[220px] sm:w-[280px]"
                priority
              />

              <a
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03]"
              >
                Download Glenn
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[35rem] w-full max-w-[31rem]">
            <div className="absolute left-1/2 top-1/2 h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8ff00]/[0.18] blur-[70px]" />

            <div className="absolute left-0 top-[4.5rem] z-10 h-[20rem] w-[11rem] rotate-[-10deg] overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#0b0b0d] shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:left-4 sm:w-[12rem]">
              <Image
                src="/5.png"
                alt="GLENN profile preview"
                fill
                sizes="192px"
                className="object-cover object-top"
              />
            </div>

            <div className="absolute left-1/2 top-6 z-30 h-[24rem] w-[13rem] -translate-x-1/2 overflow-hidden rounded-[2.2rem] border border-white/[0.14] bg-[#09090b] shadow-[0_30px_90px_rgba(0,0,0,0.52)] sm:h-[28rem] sm:w-[15rem]">
              <Image
                src="/home.png"
                alt="GLENN home preview"
                fill
                sizes="240px"
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="absolute bottom-8 right-0 z-20 h-[18rem] w-[11rem] rotate-[10deg] overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#0b0b0d] shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:right-4 sm:h-[22rem] sm:w-[12rem]">
              <Image
                src="/6.png"
                alt="GLENN community preview"
                fill
                sizes="192px"
                className="object-cover object-top"
              />
            </div>

            <div className="absolute right-0 top-16 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/[0.75]">
              Skill-first
            </div>

            <div className="absolute bottom-0 left-0 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/[0.75]">
              Built in India
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/[0.5]">
              The Story
            </p>
            <h2 className="mt-4 max-w-lg text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
              We are building the platform we wish players already had.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/[0.66] sm:text-lg">
              The idea behind GLENN is simple: if players are serious enough to
              grind, improve, and show up every day, the platform around them
              should feel just as serious. That means better identity, better
              competition, and a stronger sense of belonging.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[1.9rem] border border-white/[0.08] bg-white/[0.04] px-6 py-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/[0.48]">
                  {pillar.title}
                </p>
                <p className="mt-4 text-lg font-bold leading-8 text-white/[0.9]">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center gap-3 text-center">
          <span className="h-3 w-3 rounded-full bg-[#aa3aff]" />
          <h2 className="text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">
            What Drives GLENN
          </h2>
          <span className="h-3 w-3 rounded-full bg-[#c8ff00]" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {values.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] px-7 py-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-black tracking-[-0.04em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-white/[0.64]">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-white/[0.08] bg-white/[0.04] px-8 py-9">
            <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-[#aa3aff]/[0.18] blur-[70px]" />
            <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[#c8ff00]/[0.15] blur-[70px]" />

            <div className="relative space-y-6">
              {journey.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-[-0.04em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-base leading-8 text-white/[0.64]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto h-[28rem] w-full max-w-[22rem] overflow-hidden rounded-[2.5rem] border border-white/[0.1] bg-[#080808] shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:h-[34rem] sm:max-w-[24rem]">
            <Image
              src="/4.png"
              alt="GLENN community and rooms preview"
              fill
              sizes="(max-width: 640px) 352px, 384px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
