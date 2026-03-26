import Image from "next/image";
import Link from "next/link";
import { Globe, Instagram, Mail, MessageCircle } from "lucide-react";

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
    href: "mailto:support@glenn.co",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://glennesports.app",
    label: "Website",
    icon: Globe,
  },
];

export function LandingFooter() {
  return (
    <footer className="bg-black px-6 pb-14 pt-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
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
                    <Icon className="h-6 w-6 stroke-[2.1]" />
                  </a>
                );
              })}
            </div>

            <p className="mt-6 text-md text-white/80">
              Made By:{" "}
              <span className="font-black uppercase tracking-[0.03em] text-white">
                FF Esports Community, For The Community
              </span>
            </p>
          </div>

          <div className="max-w-md text-left lg:text-right">
            <h3 className="text-2xl font-black tracking-[-0.04em] text-white">
              Reach Us
            </h3>
            <p className="mt-2 text-xl font-medium text-blue-500">
              glennesports7@gmail.com
            </p>
            <p className="mt-2 text-xl font-medium leading-10 text-white/90">
              Built for the Free Fire community across India
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

          <div className="flex flex-wrap items-center gap-4 text-md font-medium text-white/90 lg:justify-end">
            <Link href="/terms" className="transition hover:opacity-75">
              Terms and Conditions
            </Link>
            <span className="text-white/35">|</span>
            <Link href="/support" className="transition hover:opacity-75">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
