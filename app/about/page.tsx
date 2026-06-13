import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";

const downloadHref =
  "https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn.apk";

const focusAreas = [
  {
    title: "The Organization",
    body: "Glenn is an esports organization first, built to create strong teams, better player pathways, community structure, and long-term competitive presence.",
  },
  {
    title: "The Ecosystem",
    body: "Alongside the organization, Glenn is building a wider ecosystem through the app, tournaments, scrims, community events, and player exposure.",
  },
  {
    title: "The Mission",
    body: "We want deserving Indian players to get visibility, the right teammates, stronger lineups, and a real chance to grow from community level to competitive level.",
  },
];

const appFeatures = [
  "Gaming profiles",
  "Team discovery",
  "Nearby players",
  "World chat",
  "Groups and messages",
  "Talent discovery",
];

const storyBlocks = [
  {
    heading: "What Glenn Is Building",
    body: "Glenn is building more than a brand. It is creating a complete esports ecosystem for the next generation of Indian gamers. The goal is to connect serious players with better teams, stronger competition, and more professional opportunities.",
  },
  {
    heading: "Why The App Matters",
    body: "The Glenn app gives players a place to create their gaming identity, connect with other players, explore teams, find nearby talent, join groups, use world chat, send personal messages, and become part of an active esports network.",
  },
  {
    heading: "Why Scrims Matter",
    body: "Our scrims channel is not built only for earning or business. It is mainly there so Glenn can organize quality scrims and use that support to provide free scrims for Glenn teams and members whenever possible.",
  },
  {
    heading: "What We Want To Change",
    body: "Glenn wants to challenge the idea that gaming is only a waste of time. With the right platform, guidance, discipline, and opportunities, esports can become a real career path for talented Indian players.",
  },
];

export default function About() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <LandingHeader activeHref="/about" />

      <section className="mx-auto w-full px-6 pb-12 pt-22 sm:px-8 lg:px-12 lg:pt-24">
        <div className="border-t border-black pt-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-black/55">
                About Glenn
              </p>
              <h1
                className="mt-4 max-w-5xl text-5xl font-normal uppercase leading-[0.92] sm:text-7xl lg:text-[7rem]"
                style={{ fontFamily: '"Anton", sans-serif' }}
              >
                AN ESPORTS
                <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.96)]">
                  ORGANIZATION
                </span>
                <span className="block">BUILDING</span>
                <span className="block">AN ECOSYSTEM.</span>
              </h1>
            </div>

            <div className="border-l-0 border-black lg:border-l lg:pl-8">
              <p className="text-base leading-8 text-black/72 sm:text-lg">
                Glenn is not only an app and not only a community page. It is an
                esports organization building teams, structure, player exposure,
                scrims, tournaments, and digital tools so Indian gamers can move
                with more purpose and professionalism.
              </p>

              <a
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 border border-black bg-black px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
              >
                Download Glenn
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-0 border border-black lg:grid-cols-3">
          {focusAreas.map((item, index) => (
            <article
              key={item.title}
              className={`bg-white p-6 sm:p-8 ${index < focusAreas.length - 1 ? "border-b border-black lg:border-b-0 lg:border-r" : ""}`}
            >
              <p
                className="text-2xl font-normal uppercase"
                style={{ fontFamily: '"Anton", sans-serif' }}
              >
                {item.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-black/72 sm:text-base">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-14 grid gap-0 border border-black lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-black bg-black p-6 text-white sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs uppercase tracking-[0.28em] text-white/55">
              Glenn App
            </p>
            <h2
              className="mt-4 text-4xl font-normal uppercase leading-none sm:text-5xl"
              style={{ fontFamily: '"Anton", sans-serif' }}
            >
              THE APP
              <span className="block text-transparent [-webkit-text-stroke:1.3px_rgba(255,255,255,0.95)]">
                SUPPORTS
              </span>
              <span className="block">THE ORG.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/72">
              The app is one important part of Glenn. It helps players create
              their identity, connect with others, discover lineups, and stay
              active inside a real esports community around the organization.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {appFeatures.map((item) => (
                <div
                  key={item}
                  className="border border-white/20 px-4 py-3 text-sm uppercase tracking-[0.16em] text-white/82"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[24rem] bg-[#0d0d0d]">
            <Image
              src="/4.png"
              alt="GLENN app preview"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top opacity-88"
            />
          </div>
        </section>

        <section className="mt-14">
          <div className="border-t border-black pt-6">
            <p className="text-xs uppercase tracking-[0.28em] text-black/55">
              The Glenn Story
            </p>
            <h2
              className="mt-4 text-4xl font-normal uppercase leading-none sm:text-6xl"
              style={{ fontFamily: '"Anton", sans-serif' }}
            >
              WHY WE ARE
              <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.96)]">
                DOING THIS.
              </span>
            </h2>
          </div>

          <div className="mt-8 grid gap-0 border border-black md:grid-cols-2">
            {storyBlocks.map((item, index) => (
              <article
                key={item.heading}
                className={`p-6 sm:p-8 ${index % 2 === 0 ? "bg-[#f3f3ee]" : "bg-white"} ${index < storyBlocks.length - 2 ? "border-b border-black md:border-b" : ""} ${index % 2 === 0 ? "md:border-r md:border-black" : ""}`}
              >
                <p
                  className="text-2xl font-normal uppercase"
                  style={{ fontFamily: '"Anton", sans-serif' }}
                >
                  {item.heading}
                </p>
                <p className="mt-4 text-sm leading-8 text-black/74 sm:text-base">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 border border-black bg-black px-6 py-8 text-white sm:px-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                Long-Term Vision
              </p>
              <h2
                className="mt-4 text-4xl font-normal uppercase leading-none sm:text-6xl"
                style={{ fontFamily: '"Anton", sans-serif' }}
              >
                BUILD A STRONGER
                <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(255,255,255,0.95)]">
                  ESPORTS CULTURE
                </span>
                <span className="block">IN INDIA.</span>
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-white/72">
              Glenn wants to support Indian players with visibility, better
              teammates, stronger lineups, a more professional environment, and
              real chances to grow from community level into serious competition.
            </p>
          </div>
        </section>
      </section>

      <LandingFooter />
    </main>
  );
}
