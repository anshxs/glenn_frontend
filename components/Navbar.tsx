'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { getSubdomainUrl, getHomeUrl } from '@/lib/subdomains';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = '' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Determine navigation items based on current page
  const getNavLinks = () => {
    const isHome = pathname === '/' || !pathname;
    const allLinks = [
      { name: 'home', href: getHomeUrl() },
      { name: 'about', href: getSubdomainUrl('about') },
      { name: 'careers', href: getSubdomainUrl('careers') },
      { name: 'complaints', href: getSubdomainUrl('complaints') },
      { name: 'terms', href: getSubdomainUrl('policy') }
    ];

    if (isHome) {
      return allLinks.filter(l => l.name !== 'home');
    }

    return allLinks.filter(l => {
      if (pathname === '/about' && l.name === 'about') return false;
      if (pathname.startsWith('/careers') && l.name === 'careers') return false;
      if (pathname === '/complaints' && l.name === 'complaints') return false;
      if (pathname === '/policy' && l.name === 'terms') return false;
      return true;
    });
  };

  const navLinks = getNavLinks();

  return (
    <>
      <header
        className={`shrink-0 relative z-30 flex items-center justify-between px-6 pt-6 pb-4 sm:pt-8 lg:px-12 lg:py-6 w-full select-none ${className}`}
      >
        {/* Brand Logo */}
        <div className="flex items-center cursor-pointer group">
          <Link href={getHomeUrl()} className="inline-flex items-center">
            <img src="/logos.svg" className="w-16 sm:w-18 invert" alt="Glenn Logo" />
          </Link>
        </div>

        {/* Desktop Navigation Links (Unbounded Font) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
              className="text-xs sm:text-sm font-bold text-white/70 hover:text-white transition-colors capitalize tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-2xl text-white animate-in fade-in duration-200">
          {/* Top Bar inside modal */}
          <div className="flex items-center justify-between px-6 py-6">
            <Link
              href={getHomeUrl()}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center"
            >
              <img src="/logos.svg" className="w-16 invert" alt="Glenn Logo" />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links List */}
          <div className="flex-1 flex flex-col justify-center px-8 py-10 gap-6">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
                  className="text-3xl sm:text-4xl font-black uppercase text-white/80 hover:text-white hover:translate-x-2 transition-all flex items-center justify-between border-b border-white/5 pb-4"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-6 h-6 text-white/40" />
                </Link>
              ))}
            </div>

            {/* Google Play store button inside mobile menu */}
            <div className="pt-6">
              <a
                href="https://play.google.com/store/apps/details?id=com.absolute.glenn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold text-sm py-3.5 px-6 rounded-2xl hover:bg-white/90 transition-all shadow-lg active:scale-98"
              >
                <img src={'/play.png'} width={20} height={20} alt="Play store" />
                <span>Download on Google Play</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bottom metadata */}
          <div className="px-8 py-6 flex items-center justify-between text-xs text-white/50 font-sans">
            <span style={{ fontFamily: 'var(--font-unbounded), sans-serif' }} className="font-semibold text-white/70">
              GLENN ESPORTS
            </span>
            <a href="mailto:hello@glennesports.app" className="text-white/60 hover:text-white">
              hello@glennesports.app
            </a>
          </div>
        </div>
      )}
    </>
  );
}
