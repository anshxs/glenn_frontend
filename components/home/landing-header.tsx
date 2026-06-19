"use client";

import Image from "next/image";

import StaggeredMenu from "@/components/StaggeredMenu";
import { getBaseUrl, getSubdomainUrl } from "@/lib/subdomains";

const navLinks = [
  { href: getBaseUrl(), label: "Home", matchHref: "/" },
  { href: getSubdomainUrl("about"), label: "About", matchHref: "/about" },
  { href: getSubdomainUrl("careers"), label: "Careers", matchHref: "/careers" },
  { href: getSubdomainUrl("complaints"), label: "Complaints", matchHref: "/complaints" },
  { href: getSubdomainUrl("support"), label: "Support", matchHref: "/support" },
  { href: getSubdomainUrl("terms"), label: "Terms", matchHref: "/terms" },
];

const socialItems = [
  { label: "Instagram", link: "https://www.instagram.com/glennesports7" },
  { label: "WhatsApp", link: "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h" },
  { label: "Email", link: "mailto:glennesports7@gmail.com" },
];

type LandingHeaderProps = {
  activeHref?: string;
};

export function LandingHeader({ activeHref }: LandingHeaderProps) {
  const menuItems = navLinks.map((link) => ({
    label: link.label,
    ariaLabel:
      activeHref === link.matchHref ? `${link.label} page, current` : `Open ${link.label} page`,
    link: link.href,
  }));

  return (
    <header className="relative z-1000 bg-[rgba(255,255,255,0.38)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full items-center px-6 sm:px-8 lg:px-12">
        <a href={getBaseUrl()} className="flex items-center gap-3">
          <Image
            src="/logos.svg"
            alt="GLENN"
            width={44}
            height={44}
            className="h-auto w-40 -ml-4 object-cover"
            priority
          />
        </a>
      </div>

      <div>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering
          menuButtonColor="#111111"
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen
          colors={["#d7ff36", "#ffffff"]}
          accentColor="#d7ff36"
          logoUrl=""
          isFixed
        />
      </div>
    </header>
  );
}
