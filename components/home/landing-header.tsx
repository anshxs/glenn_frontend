"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { getBaseUrl, getSubdomainUrl } from "@/lib/subdomains";

const navLinks = [
  { href: getBaseUrl(), label: "Home", matchHref: "/" },
  { href: getSubdomainUrl("about"), label: "About", matchHref: "/about" },
  { href: getSubdomainUrl("careers"), label: "Careers", matchHref: "/careers" },
  { href: getSubdomainUrl("complaints"), label: "Complaints", matchHref: "/complaints" },
  { href: getSubdomainUrl("support"), label: "Support", matchHref: "/support" },
  { href: getSubdomainUrl("terms"), label: "Terms", matchHref: "/terms" },
];

type LandingHeaderProps = {
  activeHref?: string;
};

export function LandingHeader({ activeHref }: LandingHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuMounted, setIsMobileMenuMounted] = useState(false);
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsMobileMenuMounted(false);
    }, 1400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuExpanded(false);
    setIsMobileMenuOpen(false);
  };

  const mobileMenu = isMobileMenuMounted
    ? createPortal(
        <div
          id="mobile-navigation"
          className={`fixed inset-0 z-9999 flex flex-col bg-[#c8ff00] px-6 py-6 text-black md:hidden transition-[clip-path,opacity] duration-1400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[clip-path,opacity] ${
            isMobileMenuMounted ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{
            clipPath: isMobileMenuExpanded
              ? "circle(160% at calc(100% - 2.875rem) 2.875rem)"
              : "circle(0% at calc(100% - 2.875rem) 2.875rem)",
            WebkitClipPath: isMobileMenuExpanded
              ? "circle(160% at calc(100% - 2.875rem) 2.875rem)"
              : "circle(0% at calc(100% - 2.875rem) 2.875rem)",
          }}
        >
          <div className="flex items-center justify-between">
            <Link href={getBaseUrl()} aria-label="GLENN home" className="flex items-center">
              <Image
                src="/logos.svg"
                alt="GLENN"
                width={44}
                height={44}
                className="h-auto w-40 -ml-4 -mt-1.5 object-contain"
                priority
              />
            </Link>
          </div>

          <nav
            className="mt-16 flex flex-1 flex-col justify-center gap-8"
            style={{ fontFamily: '"Anton", sans-serif' }}
          >
            {navLinks.map((link) => {
              const isActive = activeHref === link.matchHref;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block w-full text-left text-4xl font-black uppercase transition duration-200 ${
                    isActive ? "text-black" : "text-black/35"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>,
        document.body
      )
    : null;

  const mobileMenuToggle = isMobileMenuOpen
    ? createPortal(
        <button
          type="button"
          className="fixed right-5 top-5 z-10001 flex h-12 w-12 items-center justify-center text-black transition hover:text-black md:hidden"
          style={{ color: "#000000" }}
          aria-label="Close navigation"
          aria-expanded="true"
          aria-controls="mobile-navigation"
          onClick={closeMobileMenu}
        >
          <span className="sr-only">Close navigation</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
          </svg>
        </button>,
        document.body
      )
    : null;

  return (
    <header className="relative z-1000 bg-[rgba(255,255,255,0.38)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href={getBaseUrl()} className="flex items-center gap-3">
          <Image
            src="/logos.svg"
            alt="GLENN"
            width={44}
            height={44}
            className="h-auto w-40 -ml-4 rounded-xl object-cover"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          style={{ fontFamily: '"Anton", sans-serif' }}
        >
          {navLinks.map((link) => {
              const isActive = activeHref === link.matchHref;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition ${
                  isActive ? "text-black" : "text-black/72 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={`fixed right-5 top-5 z-10000 flex h-12 w-12 items-center justify-center text-black transition hover:text-black md:hidden ${
            isMobileMenuOpen ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{ color: "#000000" }}
          aria-label="Open navigation"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setIsMobileMenuMounted(true);
            setIsMobileMenuOpen(true);
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                setIsMobileMenuExpanded(true);
              });
            });
          }}
        >
          <span className="sr-only">Open navigation</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </button>
      </div>

      {mobileMenuToggle}
      {mobileMenu}
    </header>
  );
}
