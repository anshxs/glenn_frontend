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
    <section className="relative px-6 py-18 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="border-t border-black pt-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-black/55">
                Socials
              </p>
              <h1
                className="mt-4 text-5xl font-normal uppercase leading-[0.92] sm:text-7xl lg:text-[7rem]"
                style={{ fontFamily: '"Anton", sans-serif' }}
              >
                STAY CLOSE.
                <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.96)]">
                  STAY LOCKED.
                </span>
              </h1>
            </div>

            <div className="border-l-0 border-black lg:border-l lg:pl-8">
              <p className="text-base leading-8 text-black/72 sm:text-lg">
                Follow Glenn across the platforms where updates, clips,
                announcements, and community movement happen fastest. Scan the QR
                or open the direct link.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-0 border border-black lg:grid-cols-3">
          {socialItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.name}
                className="group bg-white p-6 transition hover:bg-[#f3f3ee] sm:p-8 lg:border-r lg:border-black last:lg:border-r-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center border border-black bg-black text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p
                        className="text-2xl font-normal uppercase"
                        style={{ fontFamily: '"Anton", sans-serif' }}
                      >
                        {item.name}
                      </p>
                      <p className="text-sm text-black/55">{item.displayHref}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border border-black bg-white p-3">
                  <div className="relative aspect-square overflow-hidden border border-black">
                    <Image
                      src={item.qrSrc}
                      alt={item.qrAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-black/72">
                  {item.blurb}
                </p>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border border-black bg-black px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
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
