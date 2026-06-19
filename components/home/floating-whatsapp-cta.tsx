"use client";

import Image from "next/image";

import { SpinningText } from "@/components/ui/spinning-text";

type FloatingWhatsappCtaProps = {
  href: string;
};

export function FloatingWhatsappCta({ href }: FloatingWhatsappCtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join Glenn on WhatsApp"
      className="fixed bottom-6 right-4 z-100 flex h-24 w-24 items-center justify-center rounded-full text-white mix-blend-difference sm:bottom-8 sm:right-6 sm:h-28 sm:w-28"
    >
      <SpinningText
        duration={12}
        radius={5.7}
        className="text-[10px] font-semibold uppercase tracking-[0.22em] text-current sm:text-[11px]"
      >
        CONTACT • GLENN • ESPORTS •
      </SpinningText>
      <span className="absolute isolate flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_16px_36px_rgba(37,211,102,0.32)] mix-blend-normal sm:h-14 sm:w-14">
        <Image
          src="/whatslogo.webp"
          alt="WhatsApp"
          width={28}
          height={28}
          className="h-7 w-7 object-contain"
        />
      </span>
    </a>
  );
}
