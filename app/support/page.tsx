'use client';

import Image from "next/image";
import { useState } from "react";

export default function Support() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I participate in tournaments?",
      answer: "Open the GLENN app, go to the Tournaments tab, select a tournament that's open for registration, and click 'Participate'. Make sure you have your Free Fire UID linked to your profile."
    },
    {
      question: "How do I link my Free Fire account?",
      answer: "Go to Profile → Settings → Link Free Fire UID. Enter your in-game UID and verify. This helps us track your stats and match performance accurately."
    },
    {
      question: "When do I receive my rewards?",
      answer: "Rewards are credited within 24-48 hours after the tournament ends. You can check your earnings in the 'Wallet' section of your profile."
    },
    {
      question: "How does the leaderboard work?",
      answer: "Leaderboards are based on your performance in tournaments — kills, placement, wins, and consistency. Rankings update in real-time after each match."
    },
    {
      question: "Can I play with my squad?",
      answer: "Yes! You can create or join squads in the Community section. Many tournaments support squad entries. Check tournament details before registering."
    },
    {
      question: "What do I do if I face a cheater?",
      answer: "Report the player immediately from their profile or match results page. Our moderation team investigates all reports within 24 hours."
    },
    {
      question: "Is GLENN free to use?",
      answer: "Yes, GLENN is completely free to download and use. Some premium tournaments may have entry fees, but we also host daily free tournaments."
    },
    {
      question: "I didn't receive my prize. What should I do?",
      answer: "Check your Wallet section first. If the reward is still pending after 48 hours, contact us via the support form below with your tournament ID and username."
    }
  ];

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
              href="https://github.com/anshxs/glenn_frontend/releases/download/v1.0.0/Glenn.apk"
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
            Support Center
          </h1>
          <p className="max-w-2xl text-md text-gray-200">
            We're here to help. Find answers, report issues, or reach out directly.
          </p>
        </div>

        {/* Quick Help Cards */}
        <section className="mt-6 w-full">
          <h2 className="text-xl font-bold text-white mb-4">Quick Help</h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors"
            >
              <span className="text-3xl mb-2">💬</span>
              <h3 className="font-semibold text-white text-sm">WhatsApp</h3>
              <p className="text-xs text-gray-400 mt-1">Get instant updates</p>
            </a>

            <a
              href="https://www.instagram.com/glennesports7"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#0f0f0f] p-4 flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors"
            >
              <span className="text-3xl mb-2">📸</span>
              <h3 className="font-semibold text-white text-sm">Instagram</h3>
              <p className="text-xs text-gray-400 mt-1">DM us anytime</p>
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-10 w-full">
          <h2 className="text-2xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg bg-[#0f0f0f] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#1a1a1a] transition-colors"
                >
                  <span className="font-semibold text-white pr-4">{faq.question}</span>
                  <span className="text-[#c8ff00] text-xl flex-shrink-0">
                    {openFAQ === index ? '−' : '+'}
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-5 pb-4 text-gray-300 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mt-10 w-full">
          <div className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-2xl font-extrabold text-white mb-3">Still Need Help?</h2>
            <p className="text-gray-300 text-sm mb-5">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-md bg-[#0b0b0b] border border-zinc-800 px-4 py-2 text-gray-200 focus:border-[#c8ff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full rounded-md bg-[#0b0b0b] border border-zinc-800 px-4 py-2 text-gray-200 focus:border-[#c8ff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  GLENN Username (optional)
                </label>
                <input
                  type="text"
                  placeholder="Your in-app username"
                  className="w-full rounded-md bg-[#0b0b0b] border border-zinc-800 px-4 py-2 text-gray-200 focus:border-[#c8ff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Issue Type
                </label>
                <select className="w-full rounded-md bg-[#0b0b0b] border border-zinc-800 px-4 py-2 text-gray-200 focus:border-[#c8ff00] focus:outline-none">
                  <option>Select an issue type</option>
                  <option>Account & Login</option>
                  <option>Tournament Issues</option>
                  <option>Payment & Rewards</option>
                  <option>Technical Bug</option>
                  <option>Report Cheater</option>
                  <option>Feature Request</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Describe Your Issue
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us what happened in detail..."
                  className="w-full rounded-md bg-[#0b0b0b] border border-zinc-800 px-4 py-2 text-gray-200 focus:border-[#c8ff00] focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#c8ff00] px-6 py-3 text-black font-semibold hover:scale-[1.02] transition-transform"
              >
                Submit Request
              </button>
            </form>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="mt-8 w-full">
          <div className="rounded-lg bg-[#0f0f0f] border border-zinc-800 p-5 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Urgent Issue?</h3>
            <p className="text-sm text-gray-300 mb-4">
              For critical problems (account hacks, payment disputes), reach us directly:
            </p>
            <a
              href="mailto:support@glenn.co"
              className="inline-block text-[#c8ff00] font-semibold hover:underline"
            >
              support@glenn.co
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
                <a href="/about" className="text-sm text-gray-300 hover:text-white">About</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
