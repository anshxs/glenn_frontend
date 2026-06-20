import Image from "next/image";
import Link from "next/link";
import { Globe, Instagram, Mail, MessageCircle } from "lucide-react";
import { getBaseUrl, getSubdomainUrl } from "@/lib/subdomains";

const socialLinks = [
  {
    href: "https://www.instagram.com/glennesports7",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h",
    label: "WhatsApp",
    icon: MessageCircle,
  },
  {
    href: "mailto:glennesports7@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: getBaseUrl(),
    label: "Website",
    icon: Globe,
  },
];

export function LandingFooter() {
  return (
    <footer
      data-surface-tone="dark"
      className="bg-black px-6 pb-14 pt-10 text-white sm:px-8 lg:px-12"
    >
      <div className="mx-auto">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-6 sm:gap-9">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={item.label}
                    className="text-white transition hover:opacity-75"
                  >
                    <Icon className="h-5 w-5 stroke-[2.1]" />
                  </a>
                );
              })}
            </div>

            <p className="mt-6 text-md text-white/80">
              
              <span
                className="uppercase tracking-[0.12em] text-white"
                style={{ fontFamily: '"Anton", sans-serif' }}
              >
                Made By:{" "}FF Esports Community, For The Community
              </span>
            </p>
          </div>

          <div className="max-w-md text-left lg:text-right">
            <h3
              className="text-2xl font-normal uppercase tracking-[0.08em] text-white"
              style={{ fontFamily: '"Anton", sans-serif' }}
            >
              Reach Us
            </h3>
            <a
              href="mailto:glennesports7@gmail.com"
              className="mt-2 block text-xl text-white transition hover:text-white/75"
            >
              glennesports7@gmail.com
            </a>
            <p className="mt-2 text-lg leading-9 text-white/78">
              Built for the Indian esports community.
            </p>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-white/12" />

        <div className="mt-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/logos.svg"
              alt="GLENN"
              width={220}
              height={72}
              className="h-auto w-44 -ml-4 invert-100 sm:w-52"
            />
          </Link>

          <div
            className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.12em] text-white/90 lg:justify-end"
            style={{ fontFamily: '"Anton", sans-serif' }}
          >
            <Link href={getSubdomainUrl("terms")} className="transition hover:opacity-75">
              Terms and Conditions
            </Link>
            <span className="text-white/35">|</span>
            <Link href={getSubdomainUrl("support")} className="transition hover:opacity-75">
              Support
            </Link>
            <span className="text-white/35">|</span>
            <Link href="/socials" className="transition hover:opacity-75">
              Socials
            </Link>
            <span className="text-white/35">|</span>
            <Link href={getSubdomainUrl("complaints")} className="transition hover:opacity-75">
              Raise a Complaint
            </Link>
            <span className="text-white/35">|</span>
            <Link href={getSubdomainUrl("careers")} className="transition hover:opacity-75">
              Careers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
