import React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GraphicDesignerEditorCareerPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <section className="relative w-full pt-16 sm:pt-28 pb-20 sm:pb-32 px-6 sm:px-10 lg:px-16 xl:px-24 flex-1 flex flex-col justify-center">
        <div className="w-full max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/60 text-xs font-mono tracking-widest text-amber-400 mb-6 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Position Closed
          </div>

          <h1
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.06] text-white"
          >
            GRAPHIC DESIGNER + EDITOR
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed">
            Applications for Graphic Designer + Editor are currently closed as our
            creative roster is full. Stay tuned on our socials for future openings.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/careers"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#fff] transition-all cursor-pointer font-bold text-xs uppercase tracking-wider text-white gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Careers</span>
            </Link>

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
