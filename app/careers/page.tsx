import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CareersPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative w-full pt-16 sm:pt-28 pb-20 sm:pb-32 px-6 sm:px-10 lg:px-16 xl:px-24 flex-1 flex flex-col justify-center">
        <div className="w-full max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/60 text-xs font-mono tracking-widest text-amber-400 mb-6 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Applications Closed
          </div>

          <h1
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.06] text-white"
          >
            NOT HIRING{" "}
            <span className="block text-neutral-500 font-light italic">
              CURRENTLY.
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed">
            Our core operations, scrims, and creative teams are currently at full
            capacity. Please check back later or follow our official social channels
            for future role openings.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <a
              href="mailto:hello@glennesports.app?subject=Careers%20Inquiry%20-%20Glenn"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#fff] transition-all cursor-pointer font-bold text-xs uppercase tracking-wider text-white gap-2"
            >
              <span>Contact Team</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <Link
              href="/"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#fff] transition-all cursor-pointer font-bold text-xs uppercase tracking-wider text-white gap-2"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
