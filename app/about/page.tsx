import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const coreVision = [
  {
    num: "01",
    tag: "THE MISSION",
    tagColor: "text-rose-400 bg-rose-500/10",
    title: "Legitimizing Esports in India",
    desc: "Gaming is still misunderstood as just a distraction. Glenn exists to prove that competitive esports is a legitimate path toward discipline, careers, communities, and real opportunities.",
  },
  {
    num: "02",
    tag: "THE ECOSYSTEM",
    tagColor: "text-sky-400 bg-sky-500/10",
    title: "A Permanent Home For Gamers",
    desc: "Tournaments are just one part. Glenn is a complete home where players connect, find dedicated squadmates, practice in structured daily scrims, and build their gamer identity.",
  },
  {
    num: "03",
    tag: "THE PATHWAY",
    tagColor: "text-amber-400 bg-amber-500/10",
    title: "Grassroots to Pro Tier",
    desc: "Unlocking raw talent from every corner of India through academy pipelines, fairplay tournaments, and competitive rosters ready for national championship stages.",
  },
];

const pillars = [
  {
    tag: "COMMUNITY",
    title: "Find Your People",
    desc: "Discover nearby players, form dedicated lineups, and coordinate strategies in squad voice and world chat.",
  },
  {
    tag: "SCRIMS",
    title: "Tier-Grade Practice",
    desc: "Structured daily custom rooms with automated slot distribution and strict anti-cheat oversight.",
  },
  {
    tag: "IDENTITY",
    title: "Gamer Profiles & Stats",
    desc: "Showcase your Free Fire UID, role tags (IGL, Rusher, Sniper), and real-time tournament achievements.",
  },
  {
    tag: "CAREERS",
    title: "Real Recognition",
    desc: "Direct scouting for official Glenn rosters, cash reward payouts, and caster/creator opportunities.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white flex flex-col selection:bg-white selection:text-black">
      {/* Dynamic Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-12 sm:pt-20 md:pt-28 pb-16 sm:pb-24 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/60 text-xs font-mono tracking-widest text-neutral-400 mb-6 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            The Vision
          </div>

          <h1
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem] font-black uppercase tracking-tight leading-[1.04] text-white max-w-6xl"
          >
            NOT JUST A GAME.{" "}
            <span className="block text-neutral-500 font-light italic">
              A NATIONAL MOVEMENT.
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl font-normal leading-relaxed">
            Glenn is the place where Indian gamers don&apos;t just play games—they find
            their people, represent their identity, hone their craft, and build an
            actual future in esports.
          </p>

          {/* Action Button */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/careers"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#fff] transition-all cursor-pointer font-bold text-xs uppercase tracking-wider text-white gap-2"
            >
              <span>Join Our Team</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Borderless Cards */}
      <section className="relative w-full py-12 sm:py-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mb-10 sm:mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
            PURPOSE &amp; PHILOSOPHY
          </span>
          <h2
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            className="mt-1 text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight"
          >
            WHAT GLENN IS BUILDING
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {coreVision.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-neutral-950 p-6 sm:p-8 transition-all hover:bg-neutral-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                  <span className="font-mono text-xs text-neutral-600">
                    {item.num}
                  </span>
                </div>

                <h3
                  style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                  className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                >
                  {item.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Pillars - Borderless Cards */}
      <section className="relative w-full py-12 sm:py-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mb-10 sm:mb-14">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
            THE PLATFORM
          </span>
          <h2
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            className="mt-1 text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight"
          >
            WHAT GLENN PROVIDES
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-neutral-950 p-6 sm:p-7 hover:bg-neutral-900/60 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-400">
                  {item.tag}
                </span>
                <h3
                  style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                  className="mt-3 text-base sm:text-lg font-bold text-white tracking-tight"
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Attitude / Guiding Spirit - Borderless Box */}
      <section className="relative w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-16 xl:px-24 bg-neutral-950/40">
        <div className="w-full max-w-4xl">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-2 block">
            OUR GUIDING ATTITUDE
          </span>
          <h2
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight"
          >
            सर्वश्रेष्ठम् सर्वदा
          </h2>
          <p className="mt-2 text-sm sm:text-base font-mono text-neutral-400 uppercase tracking-wider">
            [ Sarvashrestham Sarvada — Striving To Be The Best, Always ]
          </p>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
            Glenn is built to be premium, serious, and professional. We never settle
            for short-term hype—we are building the lasting home for competitive
            gaming in India.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative w-full py-16 sm:py-28 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 mb-3 block">
              BECOME PART OF THE MOVEMENT
            </span>
            <h2
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.08]"
            >
              READY TO FIND YOUR SQUAD?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
              Join thousands of Indian gamers connecting, practicing in daily scrims,
              and building their competitive identity on Glenn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#fff] transition-all cursor-pointer font-bold text-xs uppercase tracking-wider text-white gap-2"
            >
              <span>Back to Home</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Unified Footer */}
      <Footer />
    </main>
  );
}
