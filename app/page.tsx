import Image from "next/image";

import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";
import { HeroCarousel } from "../components/home/hero-carousel";

const downloadHref =
  "https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn.apk";
const instagramHref = "https://www.instagram.com/glennesports7";
const whatsappHref = "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h";

const championTeams: any[] = [
  // {
  //   name: "Moba Legends: 5v5",
  //   image:
  //     "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  // },
  // {
  //   name: "Brawl Stars",
  //   image:
  //     "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
  // },
  // {
  //   name: "BGMI",
  //   image:
  //     "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80",
  // },
  // {
  //   name: "Valorant",
  //   image:
  //     "https://images.unsplash.com/photo-1548686304-89d188a80029?auto=format&fit=crop&w=1200&q=80",
  // },
];

const awardStats: any[] = [
  // {
  //   image:
  //     "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
  //   label: "Championship Runs",
  // },
  // {
  //   image:
  //     "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
  //   label: "Final Stage Finishes",
  // },
  // {
  //   image:
  //     "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80",
  //   label: "Community Moments",
  // },
];

export default function Home() {
  return (
    <main className="onboarding-page relative min-h-screen w-full overflow-hidden bg-white text-black">
      <LandingHeader activeHref="/" />

      <section className="relative mx-auto flex min-h-screen w-full flex-col px-6 pb-8 pt-20 sm:px-8 lg:px-12 lg:pt-20">
        <div className="mx-auto flex w-full flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-black/10 bg-black/4 px-4 py-2 text-xs uppercase tracking-[0.2em] text-black/65">
            India&apos;s FF Esports Community
          </div>

          <div className="mt-8 space-y-1 sm:space-y-2 flex flex-wrap justify-center" style={{ fontFamily: '"Anton", sans-serif' }}>
            <p className="text-5xl font-normal uppercase text-[#000000] sm:text-7xl lg:text-[6.5rem]">
              Play.
            </p>
            <p className="text-5xl font-normal uppercase text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.95)] sm:text-7xl lg:text-[6.5rem]">
              Connect.
            </p>
            <p className="text-5xl font-normal uppercase text-black sm:text-7xl lg:text-[6.5rem]">
              Compete.
            </p>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-7 text-black/65 sm:text-base" style={{ fontFamily: '"Anton", sans-serif' }}>
            Jump into tournaments, find your squad, build your profile, and
            turn everyday matches into something worth showing off.
          </p>

          <div className="mt-10 flex flex-col items-center">
            <Image
              src="/fin1.png"
              alt="Download highlight"
              width={1280}
              height={408}
              className="pointer-events-none relative z-0 -mb-4 w-55 sm:w-70"
              priority
            />

            <div className="mt-2 flex items-center justify-center gap-4 sm:gap-6">
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition sm:hover:scale-[1.05]"
              >
                <Image
                  src="/instalogo.webp"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </a>

              <a
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-3 rounded-full bg-[#000000] px-7 py-4 text-sm font-bold tracking-[0.18em] text-white shadow-[0_20px_50px_rgba(200,255,0,0.4)] transition sm:hover:scale-[1.03]"
              >
                <Image
                  src="/android.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="h-4.5 w-4.5 invert-100"
                />
                Download Glenn
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black transition sm:hover:scale-[1.05]"
              >
                <Image
                  src="/whatslogo.webp"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </a>

              
            </div>
          </div>
        </div>

        <div className="mt-12 w-full sm:mt-14">
          <HeroCarousel />
        </div>

        <div className="mt-12 w-full text-left sm:mt-10" style={{ fontFamily: '"Anton", sans-serif' }}>
          <p className="text-sm uppercase tracking-[0.2em] text-black/55 sm:text-base">
            GLENN ESPORTS TEAMS
          </p>
          <h2 className="mt-2 text-3xl font-normal uppercase tracking-[0.06em] sm:text-4xl lg:text-5xl">
            MEET OUR <span className="[-webkit-text-stroke:1.4px_rgba(0,0,0,0.95)] text-transparent ">CHAMPIONS</span>
          </h2>
        </div>

        <section className="mt-8 w-full" style={{ fontFamily: '"Anton", sans-serif' }}>
          <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {championTeams.map((team) => (
              <article
                key={team.name}
                className="min-w-[82vw] snap-start sm:min-w-[34rem] lg:min-w-[37rem]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                  <Image
                    src={team.image}
                    alt={team.name}
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 34rem, 37rem"
                    className="object-cover"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-normal sm:text-3xl">{team.name}</h3>
                  {/* <span className="text-4xl leading-none text-black/75">→</span> */}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 w-full" style={{ fontFamily: '"Anton", sans-serif' }}>
          <p className="text-sm uppercase tracking-[0.2em] text-black/55 sm:text-base">
            GLENN MILESTONES
          </p>
          <h2 className="mt-2 text-3xl font-normal uppercase tracking-[0.06em] sm:text-4xl lg:text-5xl">
            SO FAR WE{" "}
            <span className="text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.95)]">
              ACHIEVED
            </span>
          </h2>

          <div className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pr-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {awardStats.map((item) => (
              <article
                key={item.label}
                className="min-w-[82vw] snap-start sm:min-w-[34rem] lg:min-w-[37rem]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 34rem, 37rem"
                    className="object-cover"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-normal sm:text-3xl">{item.label}</h3>
                  {/* <span className="text-4xl leading-none text-black/75">→</span> */}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <LandingFooter />
    </main>
  );
}
