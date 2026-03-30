import Image from "next/image";
import { Mic, Sparkles, Trophy, User, Users, Wallet } from "lucide-react";
import type { ComponentType } from "react";
import { SocialsSection } from "./socials-section";

const downloadHref =
  "https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn.apk";

type WhyNote = {
  body: string;
  className: string;
};

type WhyItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: ComponentType<{ className?: string }>;
  accent: "green" | "purple";
  reverse?: boolean;
  notes: WhyNote[];
};

const whyItems: WhyItem[] = [
  {
    title: "Elite Tournaments, Big Recognition",
    description:
      "Showcase your skills, compete daily, climb the leaderboards, and unlock prizes with real visibility.",
    image: "/home.png",
    imageAlt: "GLENN chat preview",
    icon: Mic,
    accent: "green",
    notes: [
      {
        body: "Free Fire Community is now live and buzzing.",
        className: "-left-2 top-20 -rotate-[7deg] sm:left-2 lg:-left-8",
      },
      {
        body: "Squadups community approved. Join the room now.",
        className: "right-0 top-44 rotate-[3deg] sm:-right-4 lg:-right-10",
      },
    ],
  },
  {
    title: "A Powerhouse Community",
    description:
      "Be part of a fast-growing player base, creator circles, and squads shaping Free Fire culture together.",
    image: "/community.png",
    imageAlt: "GLENN community preview",
    icon: Users,
    accent: "purple",
    reverse: true,
    notes: [
      {
        body: "Player hub trending with new squads every day.",
        className: "left-0 top-16 rotate-[6deg] sm:-left-3 lg:-left-8",
      },
      {
        body: "Community feed is pushing highlights across the app.",
        className: "right-2 top-52 -rotate-[5deg] sm:-right-4 lg:-right-8",
      },
    ],
  },
  {
    title: "Squad Chats, Real Vibes",
    description:
      "Jump into live chats with your squad, plan strategies, share clips, and vibe together like real teammates — not just players.",
    image: "/message.png",
    imageAlt: "GLENN tournaments preview",
    icon: Trophy,
    accent: "green",
    notes: [
      {
        body: "Solo qualifier opens tonight. 500+ slots filled already.",
        className: "left-1 top-[4.5rem] -rotate-[8deg] sm:left-2 lg:-left-6",
      },
      {
        body: "Top fraggers are getting featured on the leaderboard.",
        className: "right-0 top-48 rotate-[4deg] sm:-right-3 lg:-right-8",
      },
    ],
  },
  {
    title: "Discover What Matters",
    description:
      "Explore new squads, rising players, and opportunities that match your grind and push you forward.",
    image: "/explore.png",
    imageAlt: "GLENN rewards preview",
    icon: Wallet,
    accent: "purple",
    reverse: true,
    notes: [
      {
        body: "Wallet rewards unlocked after your next verified win.",
        className: "left-0 top-14 rotate-[4deg] sm:-left-2 lg:-left-8",
      },
      {
        body: "New reward drops and missions just landed.",
        className: "right-1 top-[12.5rem] -rotate-[6deg] sm:-right-4 lg:-right-9",
      },
    ],
  },
  {
    title: "Your Identity, Your Legacy",
    description:
      "Showcase your stats, achievements, and journey — everything that defines you as a player.",
    image: "/profile.png",
    imageAlt: "GLENN rewards preview",
    icon: User,
    accent: "green",
    reverse: false,
    notes: [
      {
        body: "Wallet rewards unlocked after your next verified win.",
        className: "left-0 top-14 rotate-[4deg] sm:-left-2 lg:-left-8",
      },
      {
        body: "New reward drops and missions just landed.",
        className: "right-1 top-[12.5rem] -rotate-[6deg] sm:-right-4 lg:-right-9",
      },
    ],
  },
];

function OrbitDecoration({ reverse = false }: { reverse?: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute top-1/2 hidden h-48 w-48 -translate-y-1/2 lg:block ${
        reverse ? "right-[-3.5rem]" : "left-[-3.5rem]"
      }`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="absolute rounded-full border border-white/[0.16]"
          style={{
            height: "11rem",
            width: "5.5rem",
            transform: `translateX(${index * 1.65}rem) rotate(${reverse ? "-" : ""}18deg)`,
          }}
        />
      ))}
    </div>
  );
}

function BlobBackdrop({ accent }: { accent: "green" | "purple" }) {
  const blobColor =
    accent === "green" ? "bg-[#c7f36b]" : "bg-[#b596ff]";

  return (
    <div className="absolute inset-0">
      <span className={`absolute left-8 top-12 h-28 w-28 rounded-full ${blobColor}`} />
      <span className={`absolute right-8 top-8 h-24 w-24 rounded-full ${blobColor}`} />
      <span className={`absolute left-2 top-[7.5rem] h-32 w-32 rounded-full ${blobColor}`} />
      <span className={`absolute right-2 top-32 h-32 w-32 rounded-full ${blobColor}`} />
      <span className={`absolute left-10 bottom-10 h-28 w-28 rounded-full ${blobColor}`} />
      <span className={`absolute right-10 bottom-14 h-24 w-24 rounded-full ${blobColor}`} />
      <span className={`absolute left-1/2 top-1/2 h-40 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full ${blobColor}`} />
    </div>
  );
}

function PhoneFrame({
  image,
  imageAlt,
}: {
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="absolute left-1/2 top-1/2 h-[34rem] w-[15.5rem] -translate-x-1/2 -translate-y-1/2 rounded-[2.4rem] border border-white/[0.16] bg-[#09090b] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      <div className="absolute left-1/2 top-3 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#050505]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 248px, 248px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function WhyRow({ item }: { item: WhyItem }) {
  const Icon = item.icon;

  return (
    <article className="relative py-14 sm:py-20">
      <OrbitDecoration reverse={item.reverse} />

      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div
          className={`why-copy mx-auto flex w-full max-w-sm flex-col ${
            item.reverse ? "items-start lg:order-2 lg:items-end" : "items-start"
          }`}
        >
          <div
            className={`mb-6 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#d8f7a0] ${
              item.accent === "green" ? "bg-[#b9ef65]" : "bg-[#bb9cff]"
            }`}
          >
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-white">
              <Icon className="h-3 w-3" />
            </div>
          </div>

          <h3 className="max-w-sm text-3xl font-black tracking-[-0.05em] text-white sm:text-[2.4rem]">
            {item.title}
          </h3>

          <p className="mt-3 max-w-sm text-lg leading-9 text-white/[0.62]">
            {item.description}
          </p>
        </div>

        <div
          className={`why-visual relative mx-auto h-[34rem] w-full max-w-[32rem] ${
            item.reverse ? "lg:order-1" : ""
          }`}
        >
          <BlobBackdrop accent={item.accent} />
          <PhoneFrame image={item.image} imageAlt={item.imageAlt} />

          {item.notes.map((note) => (
            <div
              key={note.body}
              className={`absolute w-[11rem] rounded-lg border border-black/10 bg-white px-3 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.25)] sm:w-[12.5rem] ${note.className}`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-black/65">
                Community Note
              </p>
              <p className="mt-1 text-[11px] leading-4 text-black/85">
                {note.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function ScallopEdge({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-10 flex justify-center overflow-hidden ${
        position === "top" ? "-top-7 sm:-top-9" : "-bottom-7 sm:-bottom-9"
      }`}
    >
      {Array.from({ length: 42 }).map((_, index) => (
        <span
          key={index}
          className="-mx-[2px] h-14 w-14 shrink-0 rounded-full bg-black sm:h-[4.5rem] sm:w-[4.5rem]"
        />
      ))}
    </div>
  );
}

export function WhyGlennSection() {
  return (
    <section className="relative mt-24 bg-[#020202] px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center gap-3 text-center">
          <Sparkles className="h-8 w-8 text-[#d060ff]" />
          <h2 className="text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">
            Why GLENN Stands Out?
          </h2>
          <Sparkles className="h-8 w-8 text-[#d060ff]" />
        </div>

        <div className="mt-10">
          {whyItems.map((item) => (
            <WhyRow key={item.title} item={item} />
          ))}
        </div>
        

        <div className="mt-14 text-center">
          <div className="relative left-1/2 w-[calc(100vw+5rem)] -translate-x-1/2 sm:w-[calc(100vw+7rem)] lg:w-[calc(100vw+9rem)]">
            <div className="-rotate-[4deg]">
              <div className="relative overflow-visible bg-[#c6ee72] px-6 py-20 sm:px-12 sm:py-24">
                <ScallopEdge position="top" />
                <ScallopEdge position="bottom" />

                <p className="relative z-20 mx-auto max-w-5xl text-center text-2xl font-black leading-tight tracking-[-0.05em] text-black sm:text-4xl sm:leading-[1.25]">
                  Ready to explore the next era of tournaments, communities,
                  and opportunities? Click below!
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16">
          <SocialsSection />
          </div>

          <div className="mt-20 flex justify-center">
            <div className="relative inline-flex items-center">
              <a
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-black/20 bg-white px-8 py-4 text-lg font-black tracking-[-0.03em] text-black shadow-[0_12px_30px_rgba(255,255,255,0.08)] transition hover:scale-[1.03] sm:px-10 sm:text-[2rem]"
              >
                Get Started with GLENN
              </a>

              <Sparkles className="absolute -right-6 -top-5 h-8 w-8 text-pink-500 sm:-right-8 sm:-top-6 sm:h-10 sm:w-10" />
            </div>
          </div>

          <div className="relative left-1/2 mt-20 flex w-[calc(100vw+5rem)] -translate-x-1/2 justify-center overflow-hidden sm:w-[calc(100vw+7rem)] lg:w-[calc(100vw+9rem)]">
            <div className="flex gap-2">
              {Array.from({ length: 42 }).map((_, index) => (
                <span
                  key={index}
                  className="h-6 w-6 shrink-0 rotate-45 bg-[#9185d7]"
                />
              ))}
            </div>
          </div>

          <div className=" mt-36 flex justify-center">
            <Image
              src="/aalu.png"
              alt="GLENN footer artwork"
              width={3106}
              height={1133}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
