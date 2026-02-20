'use client';

import { DottedMap } from "@/components/ui/dotted-map";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen mx-auto bg-black font-sans">
      <header className="max-w-md border-0 mt-4 bg-transparent backdrop-blur-3xl z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-2 py-4">
          {/* Left: Logo */}
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

          {/* Center: Navbar */}

          {/* Right: Play Store button */}
          <div className="flex items-center mr-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.CliqueTechnology.Onmi"
              target="_blank"
              rel="noopener noreferrer"
              className="
        inline-flex items-center gap-3
        rounded-lg bg-[#c8ff00] px-5 py-2
        text-black font-sans
        transition-all duration-200
        hover:scale-105 hover:shadow-lg
        animate-fadeIn
      "
            >
              {/* Icon */}
              <img
                src="/android.svg"
                alt="Google Play"
                className="h-6 w-5 invert-0"
              />

              {/* Text */}
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] opacity-70">Download</span>
                <span className="text-[15px] font-semibold">Glenn Now</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      <main className="flex flex-col max-w-md min-h-[calc(100vh-64px)] w-full px-6 py-16">
        <div className="mx-auto flex flex-col items-center gap-2 mb-8 text-start">
          <h1 className="text-[32px] font-extrabold leading-10 text-white sm:text-5xl md:text-3xl">
            India’s Ultimate Free Fire Esports & Community Platform
          </h1>
          <p className="max-w-2xl text-md text-gray-200">
            Join tournaments, climb leaderboards, chat with players, share
            moments, and turn your skills into rewards — all inside GLENN.
          </p>
        </div>
        <div>
          <Image
            src="/home.png"
            alt="Hero Image"
            width={800}
            height={400}
            className="mx-auto mt-8 rounded-[38px] border-zinc-700 border-4 object-cover"
          />
        </div>

        {/* Features Section */}
        <section className="mt-30 w-full">
          <div className="mx-auto max-w-2xl text-start mb-6">
            <h2 className="text-3xl font-extrabold text-white">Features Section</h2>
            <p className="mt-2 text-md text-gray-300">Everything You Need to Dominate</p>
          </div>

          <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4">
            <article className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-start text-left">
              <h3 className="font-semibold text-white">Tournaments</h3>
              <p className="text-sm text-gray-300 mt-1">Daily &amp; weekly matches. Real competition. Real rewards.</p>
              <img
                src="/1.png"
                alt="Tournaments"
                className="mx-auto mt-4 h-auto w-full rounded-lg object-contain"
              />
            </article>

            <article className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-start text-left">
              <h3 className="font-semibold text-white">Leaderboards</h3>
              <p className="text-sm text-gray-300 mt-1">Track rankings, stats, and performance in real time.</p>
              <img
                src="/2.jpeg"
                alt="Leaderboards"
                className="mx-auto mt-4 h-auto w-full rounded-lg object-contain"
              />
            </article>

            <article className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-start text-left">
              <h3 className="font-semibold text-white">Explore</h3>
              <p className="text-sm text-gray-300 mt-1">Discover trending tournaments, players, and posts.</p>
              <img
                src="/3.png"
                alt="Explore"
                className="mx-auto mt-4 h-auto w-full rounded-lg object-contain"
              />
            </article>

            <article className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-start text-left">
              <h3 className="font-semibold text-white">Community &amp; Messages</h3>
              <p className="text-sm text-gray-300 mt-1">Chat with friends, form squads, and grow your network.</p>
              <img
                src="/4.png"
                alt="Community & Messages"
                className="mx-auto mt-4 h-auto w-full rounded-lg object-contain"
              />
            </article>

            <article className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-start text-left">
              <h3 className="font-semibold text-white">Player Profiles</h3>
              <p className="text-sm text-gray-300 mt-1">Show your wins, badges, KD, and achievements.</p>
              <img
                src="/5.png"
                alt="Player Profiles"
                className="mx-auto mt-4 h-auto w-full rounded-lg object-contain"
              />
            </article>

            <article className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-start text-left">
              <h3 className="font-semibold text-white">Posts &amp; Feed</h3>
              <p className="text-sm text-gray-300 mt-1">Share gameplay highlights and esports moments.</p>
              <img
                src="/6.png"
                alt="Posts & Feed"
                className="mx-auto mt-4 h-auto w-full rounded-lg object-contain"
              />
            </article>

            <article className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-start text-left">
              <h3 className="font-semibold text-white">Earn</h3>
              <p className="text-sm text-gray-300 mt-1">Play tournaments, complete challenges, earn coins &amp; prizes.</p>
              <img
                src="/7.png"
                alt="Earn"
                className="mx-auto mt-4 h-auto w-full rounded-lg object-contain"
              />
            </article>
          </div>
        </section>

        {/* Community Section */}
        <section className="mt-30 w-full">
          <div className="mx-auto max-w-2xl text-start mb-6">
            <h2 className="text-3xl font-extrabold text-white">Community</h2>
            <p className="mt-2 text-md text-gray-300">Join our channels & stay connected</p>
          </div>

          <div className="mx-auto max-w-2xl space-y-4">
            <article className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-start text-left">
              <h3 className="font-semibold text-white">WhatsApp Channel</h3>
              <p className="text-sm text-gray-300 mt-1">Join our WhatsApp channel for updates and events.</p>
              <img
                src="/whatsapp.png"
                alt="WhatsApp Channel"
                className="mx-auto mt-4 h-auto w-full rounded-lg object-contain"
              />
              <a
                href="https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-green-400 text-black px-4 py-2 rounded-lg w-full text-center font-semibold"
              >
                Open WhatsApp
              </a>
            </article>

            <article className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-start text-left">
              <h3 className="font-semibold text-white">Instagram</h3>
              <p className="text-sm text-gray-300 mt-1">Follow us on Instagram for highlights and reels.</p>
              <img
                src="/instagram.jpeg"
                alt="Instagram"
                className="mx-auto mt-4 h-auto w-full rounded-lg object-contain"
              />
              <a
                href="https://www.instagram.com/glennesports7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded-lg w-full text-center font-semibold"
              >
                Open Instagram
              </a>
            </article>

            <div className="grid grid-cols-2 gap-4">
              <article className="rounded-lg bg-[#0f0f0f] p-3 flex flex-col items-center text-center">
                <h4 className="font-semibold text-white">Telegram</h4>
                <img
                  src="/telegram.jpeg"
                  alt="Telegram"
                  className="mx-auto mt-3 h-auto w-full rounded-md object-contain"
                />
                <a href="#" className="mt-3 inline-block bg-blue-600 text-white w-full px-3 py-1 rounded-md text-sm">Open Telegram</a>
              </article>

              <article className="rounded-lg bg-[#0f0f0f] p-3 flex flex-col items-center text-center">
                <h4 className="font-semibold text-white">YouTube</h4>
                <img
                  src="/youtube.jpeg"
                  alt="YouTube"
                  className="mx-auto mt-3 h-auto w-full rounded-md object-contain"
                />
                <a href="#" className="mt-3 inline-block bg-red-600 text-white w-full px-3 py-1 rounded-md text-sm">Open YouTube</a>
              </article>
            </div>
          </div>
        </section>

        {/* Why GLENN Section - added below Community */}
        <section className="mt-32 mx-2 w-full">
          <div className="mx-auto max-w-2xl text-start mb-4">
            <h2 className="text-3xl font-extrabold text-white">Why GLENN?</h2>
            <p className="mt-1 text-md text-gray-300">Built for Serious Players</p>
          </div>

          <div className="mx-auto max-w-2xl space-y-3">
            <ul className="list-none space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00]">✔</span>
                <span>Made only for Free Fire esports</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00]">✔</span>
                <span>Skill-based matchmaking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00]">✔</span>
                <span>Fair competitive system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00]">✔</span>
                <span>Real rewards</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00]">✔</span>
                <span>Active gaming community</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00]">✔</span>
                <span>Smooth &amp; fast experience</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Motivation Section */}
        <section className="mt-12 mx-2 w-full">
          <div className="mx-auto max-w-2xl text-start mb-3">
            <h2 className="text-3xl font-extrabold text-white">From Casual Player to Esports Warrior</h2>
            <p className="mt-1 text-md text-gray-300 font-semibold">GLENN is your stage.</p>
          </div>

          <div className="mx-auto max-w-2xl space-y-3 text-gray-300">
            <ul className="list-none space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00]">•</span>
                <span>Compete with real players.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00]">•</span>
                <span>Climb global leaderboards.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00]">•</span>
                <span>Build your squad.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c8ff00]">•</span>
                <span>Turn skill into rewards.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Final Call To Action */}
        <section className="mt-16 w-full">
          <div className="mx-auto max-w-2xl text-center mb-4">
            <h2 className="text-3xl font-extrabold text-white">Ready to Level Up?</h2>
            <p className="mt-1 text-md text-gray-300">Your esports journey begins now.</p>
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.CliqueTechnology.Onmi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mx-auto rounded-lg bg-[#c8ff00] px-6 py-3 text-black font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
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

        <div className="mx-auto mt-12 w-full max-w-2xl">
          <img
            src="https://cdn.prod.website-files.com/64c73d04a946980a4476537e/64d454cc6c35e014ada96b51_Fling.svg"
            alt="Pondering"
            className="mx-auto h-100 invert-10"
          />
          <p className="mt-3 text-center text-sm italic text-gray-300">All good things must come to an end.</p>
        </div>

        {/* Footer */}
        <footer className="mt-12 w-full border-t border-zinc-800 pt-8 pb-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <a href="/" aria-label="Home" className="-ml-3 inline-block">
                  <img src="/logos.svg" alt="GLENN" className="h-10 invert-100" />
                </a>
                <p className="text-sm text-gray-300 max-w-xs">GLENN is India’s home for Free Fire esports — tournaments, leaderboards, and real rewards for serious players.</p>
                <div className="flex items-center gap-3">
                  <a href="#" aria-label="Instagram" className="text-[#ff00c3] hover:text-white">Instagram</a>
                  <a href="#" aria-label="Telegram" className="text-[#00fbff] hover:text-white">Telegram</a>
                  <a href="#" aria-label="Youtube" className="text-[#ff1a1a] hover:text-white">YouTube</a>
                  
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-4 md:col-span-1">
                <div>
                  <h4 className="text-white font-semibold mb-2">Product</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li><a href="#" className="hover:text-white">Tournaments</a></li>
                    <li><a href="#" className="hover:text-white">Leaderboards</a></li>
                    <li><a href="#" className="hover:text-white">Player Profiles</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Company</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li><a href="#" className="hover:text-white">About</a></li>
                    <li><a href="#" className="hover:text-white">Careers</a></li>
                    <li><a href="#" className="hover:text-white">Contact</a></li>
                  </ul>
                </div>
              </div> */}

              <div className="md:col-span-1">
                <h4 className="text-white font-semibold mb-2">Got any feedback for us ?</h4>
                <p className="text-sm text-gray-300 mb-3">Let's discuss a gossip in private chat 😉</p>
                <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input aria-label="Email" type="email" placeholder="Write a message here" className="flex-1 rounded-md bg-[#0b0b0b] border border-zinc-800 px-3 py-2 text-sm text-gray-200" />
                  <button className="rounded-md bg-[#c8ff00] px-4 py-2 text-black font-semibold text-sm">Message</button>
                </form>
              </div>
            </div>

            <div className="mt-8 border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">© {new Date().getFullYear()} GLENN — All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-sm text-gray-300 hover:text-white">Terms</a>
                <a href="#" className="text-sm text-gray-300 hover:text-white">Privacy</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
