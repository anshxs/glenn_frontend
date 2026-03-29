import Image from "next/image";
import { ArrowUpRight, Instagram, MessageCircle, Youtube } from "lucide-react";
import type { ComponentType } from "react";

type SocialItem = {
  name: string;
  href: string;
  displayHref: string;
  qrSrc: string;
  qrAlt: string;
  blurb: string;
  icon: ComponentType<{ className?: string }>;
  accentClassName: string;
};

const socialItems: SocialItem[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/glennesports7",
    displayHref: "@glennesports7",
    qrSrc: "/instagram.jpeg",
    qrAlt: "Instagram QR code for GLENN Esports",
    blurb: "Follow drops, clips, stories, and fresh community moments.",
    icon: Instagram,
    accentClassName: "bg-[#ff5fa2]",
  },
  {
    name: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h",
    displayHref: "GLENN channel",
    qrSrc: "/whatsapp.png",
    qrAlt: "WhatsApp QR code for GLENN Esports",
    blurb: "Join the channel for tournament alerts and instant updates.",
    icon: MessageCircle,
    accentClassName: "bg-[#65f38e]",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@glennesports",
    displayHref: "@glennesports",
    qrSrc: "/youtube.jpeg",
    qrAlt: "YouTube QR code for GLENN Esports",
    blurb: "Catch highlights, uploads, and the next wave of GLENN content.",
    icon: Youtube,
    accentClassName: "bg-[#ff4747]",
  },
];

export function SocialsSection() {
  return (
    <section className="relative bg-[#020202] px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Socials
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">
            Scan In. Tap Through. Stay Locked With GLENN.
          </h2>
          <p className="mt-5 text-base leading-8 text-white/[0.64] sm:text-lg">
            Pick your platform, scan the QR, or open the direct link and stay
            close to the GLENN Esports community.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {socialItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.name}
                className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.26)] transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <div
                  className={`absolute right-5 top-5 h-24 w-24 rounded-full blur-3xl opacity-60 ${item.accentClassName}`}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-black/60">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-black tracking-[-0.04em] text-white">
                        {item.name}
                      </p>
                      <p className="text-sm text-white/55">{item.displayHref}</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-5 overflow-hidden rounded-[1.7rem] border border-white/[0.08] bg-[#1d1d1d2b] p-3">
                  <div className="relative aspect-square overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={item.qrSrc}
                      alt={item.qrAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <p className="relative z-10 mt-5 text-sm leading-7 text-white/[0.66]">
                  {item.blurb}
                </p>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-black/55 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-white/20 hover:bg-black/75"
                >
                  Open Link
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
