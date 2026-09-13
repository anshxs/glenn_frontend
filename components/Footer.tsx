'use client';

import React from 'react';
import TextLoop from './TextLoop';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white select-none overflow-hidden flex flex-col">
      {/* 1. TextLoop Banner Section */}
      <div className="w-full pt-2 sm:pt-4 pb-4 sm:pb-6 flex flex-col items-center justify-center overflow-hidden">
        <TextLoop
          text="GLENN"
          shape="infinity"
          speed={125}
          direction="forward"
          separator="♥️"
          curviness={18}
          fontSize={74}
          fontWeight={800}
          letterSpacing={10}
          uppercase
          color="#000"
          ribbon
          ribbonColor="#fff"
          ribbonWidth={86}
          pauseOnHover={false}
        />
      </div>

      {/* 2. Simple Minimalist Footer Section */}
      <div className="w-full mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-12 flex flex-col">
        {/* Upper Row: Socials & Powered By (Left) | Reach Us (Right) */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-start justify-between gap-8 sm:gap-6">
          {/* Left Column */}
          <div className="flex flex-col items-start gap-4">
            {/* Social Media Icons */}
            <div className="flex items-center gap-5 sm:gap-6">
              {/* YouTube */}
              <a
                href="https://youtube.com/@glennesports7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/glennesports7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 fill-none stroke-current stroke-[2.2]"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            {/* Powered By Note */}
            <p style={{ fontFamily: 'var(--font-unbounded), sans-serif' }} className="text-[11px] sm:text-xs text-white/50 tracking-tight font-sans">
              Powered By:{' '}
              <span className="text-white/90 font-medium tracking-normal">
                GLENN ESPORTS
              </span>
            </p>
          </div>

          {/* Right Column: Reach Us */}
          <div className="flex flex-col items-start sm:items-end gap-1.5 font-sans">
            <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Reach Us
            </h4>
            <a
              href="mailto:hello@glennesports.app"
              className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
            >
              hello@glennesports.app
            </a>
            <p className="text-xs sm:text-sm text-white/40">
              India
            </p>
          </div>
        </div>

        {/* Subtle Divider Line */}
        <div className="w-full h-px bg-white/10 my-8" />

        {/* Lower Row: Logo (Left) | Legal Links (Right) */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/logos.svg" alt="Glenn Logo" className="h-6 sm:h-7 w-auto invert" />
          </div>

          {/* Terms & Privacy */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-white font-sans font-bold">
            <Link
              href="/policy.md"
              className="hover:text-white transition-colors"
            >
              Terms and Conditions
            </Link>
            <span className="text-white select-none">|</span>
            <Link
              href="/policy.md"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
