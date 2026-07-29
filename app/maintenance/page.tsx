import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Temporarily Unavailable",
  description: "GLENN website is temporarily unavailable while we make updates.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  const instagramHref = "https://www.instagram.com/glennesports7";
  const whatsappHref = "https://wa.me/918492892871?text=Hello%20GLENN%20team";

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-black sm:px-6">
      <section className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-7">
        <div className="flex flex-col items-center gap-5 text-center">
          <Image
            src="/logos.svg"
            alt="GLENN"
            width={120}
            height={120}
            className="h-16 w-auto rounded-2xl object-cover"
            priority
          />

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.28em] text-black/45">
              Temporary Pause
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              We&apos;ll be back soon.
            </h1>
            <p className="mx-auto max-w-lg text-sm leading-6 text-black/60">
              The GLENN website is temporarily unavailable while we make updates.
              Please check back in a little while.
            </p>
          </div>

          <div className="grid w-full gap-3 pt-2 sm:grid-cols-2">
            <Link
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-left transition hover:border-black/20 hover:bg-black/[0.02]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-black text-white">
                  <Image
                    src="/instalogo.webp"
                    alt="Instagram"
                    width={20}
                    height={20}
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold">Instagram</span>
                  <span className="block text-xs text-black/50">@glennesports7</span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-black/35 transition group-hover:text-black" />
            </Link>

            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-left transition hover:border-black/20 hover:bg-black/[0.02]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-black text-white">
                  <Image
                    src="/whatslogo.webp"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-black">WhatsApp</span>
                  <span className="block text-xs text-black/50">Chat with the GLENN team</span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-black/35 transition group-hover:text-black" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
