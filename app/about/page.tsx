'use client';

import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen mx-auto bg-black font-sans">
      <header className="max-w-md border-0 mt-4 bg-transparent backdrop-blur-3xl z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-2 py-4">
          <div className="flex items-center">
            <a href="/" aria-label="Home">
              <Image
                src="/logos.svg"
                alt="Logo"
                width={140}
                height={40}
                className="invert-100"
              />
            </a>
          </div>

          <div className="flex items-center mr-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.CliqueTechnology.Onmi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg bg-[#c8ff00] px-5 py-2 text-black font-sans transition-all duration-200 hover:scale-105 hover:shadow-lg animate-fadeIn"
            >
              <img
                src="/android.svg"
                alt="Google Play"
                className="h-6 w-5 invert-0"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] opacity-70">Download</span>
                <span className="text-[15px] font-semibold">Glenn Now</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      <main className="flex flex-col max-w-md min-h-[calc(100vh-64px)] w-full px-6 py-12">
        {/* Hero Section */}
        <div className="mx-auto flex flex-col items-center gap-3 mb-10 text-start">
          <h1 className="text-[32px] font-extrabold leading-10 text-white sm:text-5xl md:text-3xl">
            About GLENN
          </h1>
          <p className="max-w-2xl text-md text-gray-200">
            Building India's ultimate Free Fire esports ecosystem — one match at a time.
          </p>
        </div>

        {/* Our Story Section */}
        <section className="mt-8 w-full">
          <div className="rounded-lg bg-[#0f0f0f] p-6 flex flex-col items-start text-left">
            <h2 className="text-2xl font-extrabold text-white mb-4">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                GLENN was born from a simple observation: India has millions of talented Free Fire players, but nowhere to compete fairly, grow consistently, and earn real rewards.
              </p>
              <p>
                We're not just another tournament app. We're a competitive platform built by gamers, for gamers — with leaderboards, stats, profiles, community features, and a fair reward system that values skill over luck.
              </p>
              <p className="text-white font-semibold">
                GLENN is where casual players become champions.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mt-6 w-full space-y-4">
          <article className="rounded-lg bg-[#0f0f0f] p-6 flex flex-col items-start text-left">
            <h3 className="text-xl font-bold text-white mb-3">🎯 Mission</h3>
            <p className="text-gray-300">
              To create a competitive, transparent, and rewarding esports platform that empowers every Free Fire player in India to showcase their skills, build their reputation, and earn what they deserve.
            </p>
          </article>

          <article className="rounded-lg bg-[#0f0f0f] p-6 flex flex-col items-start text-left">
            <h3 className="text-xl font-bold text-white mb-3">🚀 Vision</h3>
            <p className="text-gray-300">
              To become India's #1 Free Fire esports community — where every player, clan, and tournament organizer thrives together in a fair, fun, and future-focused ecosystem.
            </p>
          </article>
        </section>

        {/* What Makes Us Different */}
        <section className="mt-8 w-full">
          <div className="rounded-lg bg-[#0f0f0f] p-6 flex flex-col items-start text-left">
            <h2 className="text-2xl font-extrabold text-white mb-4">What Makes Us Different</h2>
            <ul className="list-none space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00] font-bold">✔</span>
                <div>
                  <strong className="text-white">Built exclusively for Free Fire</strong> — not a generic esports app.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00] font-bold">✔</span>
                <div>
                  <strong className="text-white">Real competitive integrity</strong> — skill-based matchmaking, verified stats.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00] font-bold">✔</span>
                <div>
                  <strong className="text-white">Community-first</strong> — chat, squads, posts, and networking features.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00] font-bold">✔</span>
                <div>
                  <strong className="text-white">Transparent rewards</strong> — earn coins, badges, and prizes you can trust.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00] font-bold">✔</span>
                <div>
                  <strong className="text-white">Daily tournaments</strong> — never wait, always play.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* The Team */}
        <section className="mt-8 w-full">
          <div className="rounded-lg bg-[#0f0f0f] p-6 flex flex-col items-start text-left">
            <h2 className="text-2xl font-extrabold text-white mb-4">The Team Behind GLENN</h2>
            <p className="text-gray-300 mb-4">
              We're a passionate team of gamers, developers, designers, and esports enthusiasts who believe in one thing: <strong className="text-white">skill deserves recognition</strong>.
            </p>
            <p className="text-gray-300">
              From matchmaking algorithms to UI/UX design — every feature is crafted to give players the experience they deserve. GLENN is more than an app. It's a movement.
            </p>
          </div>
        </section>

        {/* Join the Journey */}
        <section className="mt-10 w-full">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-white mb-3">Join the Journey</h2>
            <p className="text-md text-gray-300 mb-6">
              Whether you're a casual player or a competitive grinder, GLENN is your platform.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.CliqueTechnology.Onmi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg bg-[#c8ff00] px-6 py-3 text-black font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <img
                src="/android.svg"
                alt="Google Play"
                className="h-6 w-5 invert-0"
              />
              <span className="text-lg">Download GLENN</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 w-full border-t border-zinc-800 pt-8 pb-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <a href="/" aria-label="Home" className="-ml-3 inline-block">
                  <img src="/logos.svg" alt="GLENN" className="h-10 invert-100" />
                </a>
                <p className="text-sm text-gray-300 max-w-xs">GLENN is India's home for Free Fire esports — tournaments, leaderboards, and real rewards for serious players.</p>
              </div>
            </div>

            <div className="mt-8 border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">© {new Date().getFullYear()} GLENN — All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="/terms" className="text-sm text-gray-300 hover:text-white">Terms</a>
                <a href="/support" className="text-sm text-gray-300 hover:text-white">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
