import Image from "next/image";

import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";
import { SocialsSection } from "@/components/home/socials-section";
import { StackedHeroShowcase } from "@/components/home/stacked-hero-showcase";
import { WhyGlennSection } from "@/components/home/why-glenn-section";

const downloadHref =
  "https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn-v1.0.0.apk";

export default function Home() {
  return (
    <main className="onboarding-page relative min-h-screen w-full overflow-hidden bg-[#040404] text-white">
      <LandingHeader activeHref="/" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-6 pb-8 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            India&apos;s FF Esports Community
          </div>

          <div className="mt-8 space-y-1 sm:space-y-2 flex flex-wrap justify-center">
            <p className="text-5xl font-black uppercase tracking-[-0.06em] text-[#aa3aff] sm:text-7xl lg:text-[6.5rem]">
              Play.
            </p>
            <p className="text-5xl font-black uppercase tracking-[-0.06em] text-transparent [text-shadow:0_0_0_rgba(255,255,255,0.95)] [-webkit-text-stroke:1.4px_rgba(255,255,255,0.95)] sm:text-7xl lg:text-[6.5rem]">
              Connect.
            </p>
            <p className="text-5xl font-black uppercase tracking-[-0.06em] text-white sm:text-7xl lg:text-[6.5rem]">
              Compete.
            </p>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/[0.68] sm:text-base">
            Jump into tournaments, find your squad, build your profile, and
            turn everyday matches into something worth showing off.
          </p>

          <div className="mt-10 flex flex-col items-center">
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
              className="relative z-10 inline-flex items-center gap-3 rounded-full bg-[#ffffff] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(200,255,0,0.22)]"
            >
              <Image
                src="/android.svg"
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px]"
              />
              Download Glenn
            </a>
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <StackedHeroShowcase />
        </div>
      </section>

      <WhyGlennSection />
      
      <LandingFooter />
    </main>
  );
}
