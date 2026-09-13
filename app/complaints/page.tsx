import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getHomeUrl } from "@/lib/subdomains";

export default function ComplaintsPage() {
  return (
    <main className="relative w-full bg-black text-white flex flex-col selection:bg-white selection:text-black">
      {/* Whole Screen Content Wrapper (at least 100vh) */}
      <div className="min-h-screen w-full flex flex-col justify-between">
        <Navbar />

        {/* Hero Header */}
        <section className="relative w-full py-16 sm:py-24 px-6 sm:px-10 lg:px-16 xl:px-24 flex-1 flex flex-col justify-center">
          <div className="w-full max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/60 text-xs font-mono tracking-widest text-rose-400 mb-6 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              System Under Maintenance
            </div>

            <h1
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.06] text-white"
            >
              PORTAL UNDER{" "}
              <span className="block text-neutral-500 font-light italic">
                MAINTENANCE.
              </span>
            </h1>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed">
              Our dispute and complaint resolution portal is currently undergoing
              scheduled infrastructure upgrades. For any immediate grievances or
              disputes, please contact us directly via email.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <a
                href="mailto:hello@glennesports.app?subject=Urgent%20Complaint%20/%20Grievance%20-%20Glenn"
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#fff] transition-all cursor-pointer font-bold text-xs uppercase tracking-wider text-white gap-2"
              >
                <span>Email Support</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <Link
                href={getHomeUrl()}
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#fff] transition-all cursor-pointer font-bold text-xs uppercase tracking-wider text-white gap-2"
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer comes below the screen */}
      <Footer />
    </main>
  );
}
