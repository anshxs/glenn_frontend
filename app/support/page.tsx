'use client';

import {
  Clock3,
  Instagram,
  Mail,
  MessageCircle,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";

import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";

const quickChannels = [
  {
    href: "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h",
    label: "WhatsApp",
    subtext: "Get instant updates",
    icon: MessageCircle,
  },
  {
    href: "https://www.instagram.com/glennesports7",
    label: "Instagram",
    subtext: "DM us anytime",
    icon: Instagram,
  },
  {
    href: "mailto:glennesports7@gmail.com",
    label: "Email",
    subtext: "For direct support",
    icon: Mail,
  },
];

const faqs = [
  {
    question: "How do I participate in tournaments?",
    answer:
      "Open the GLENN app, go to the Tournaments tab, select a tournament that is open for registration, and tap Participate. Make sure your Free Fire UID is linked to your profile first.",
  },
  {
    question: "How do I link my Free Fire account?",
    answer:
      "Go to Profile, then Settings, then Link Free Fire UID. Enter your in-game UID and verify it so we can track stats and match performance correctly.",
  },
  {
    question: "When do I receive my rewards?",
    answer:
      "Rewards are usually credited within 24 to 48 hours after the tournament ends. You can follow the status from the Wallet section inside GLENN.",
  },
  {
    question: "How does the leaderboard work?",
    answer:
      "Leaderboards reflect your tournament performance, including kills, placement, wins, and consistency. Rankings update as match results are verified.",
  },
  {
    question: "Can I play with my squad?",
    answer:
      "Yes. You can create or join squads from the community side of GLENN, and many tournaments support squad entries directly.",
  },
  {
    question: "What do I do if I face a cheater?",
    answer:
      "Report the player from their profile or from match results as quickly as possible. Our moderation team reviews those reports within 24 hours.",
  },
  {
    question: "Is GLENN free to use?",
    answer:
      "Yes. GLENN is free to download and use. Some special tournaments can have entry fees, but free tournaments are also hosted regularly.",
  },
  {
    question: "I did not receive my prize. What should I do?",
    answer:
      "Check Wallet first. If the reward is still pending after 48 hours, contact support with your tournament ID, username, and any related screenshots.",
  },
];

export default function Support() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <LandingHeader activeHref="/support" />

      <section className="mx-auto w-full px-6 pb-12 pt-22 sm:px-8 lg:px-12 lg:pt-24">
        <div className="border-t border-black pt-8">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-black/55">
                Glenn Support
              </p>
              <h1
                className="mt-4 text-5xl font-normal uppercase leading-[0.92] sm:text-7xl lg:text-[7rem]"
                style={{ fontFamily: '"Anton", sans-serif' }}
              >
                NEED HELP.
                <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.96)]">
                  GET IT FAST.
                </span>
              </h1>
            </div>

            <div className="border-l-0 border-black lg:border-l lg:pl-8">
              <p className="text-base leading-8 text-black/72 sm:text-lg">
                Whether you are stuck on rewards, account issues, tournament
                details, or reporting a problem, this is where we point you to
                the fastest route back into the action.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-0 border border-black md:grid-cols-3">
          {quickChannels.map((channel, index) => {
            const Icon = channel.icon;

            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className={`bg-white p-6 transition hover:bg-[#f3f3ee] sm:p-8 ${index < quickChannels.length - 1 ? "border-b border-black md:border-b-0 md:border-r" : ""}`}
              >
                <Icon className="h-5 w-5" />
                <p
                  className="mt-6 text-2xl font-normal uppercase"
                  style={{ fontFamily: '"Anton", sans-serif' }}
                >
                  {channel.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-black/72 sm:text-base">
                  {channel.subtext}
                </p>
              </a>
            );
          })}
        </div>

        <section className="mt-14 grid gap-0 border border-black lg:grid-cols-[0.82fr_1.18fr]">
          <div className="border-b border-black bg-black p-6 text-white sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs uppercase tracking-[0.28em] text-white/55">
              Response Flow
            </p>
            <h2
              className="mt-4 text-4xl font-normal uppercase leading-none sm:text-5xl"
              style={{ fontFamily: '"Anton", sans-serif' }}
            >
              REAL
              <span className="block text-transparent [-webkit-text-stroke:1.3px_rgba(255,255,255,0.95)]">
                SUPPORT.
              </span>
            </h2>

            <div className="mt-8 space-y-4">
              <div className="border border-white/20 px-5 py-4">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 text-white" />
                  <p className="text-sm uppercase tracking-[0.16em] text-white/58">
                    Usual response
                  </p>
                </div>
                <p className="mt-3 text-xl uppercase text-white">24 to 48 hours</p>
              </div>

              <div className="border border-white/20 px-5 py-4">
                <div className="flex items-center gap-3">
                  <TriangleAlert className="h-4 w-4 text-white" />
                  <p className="text-sm uppercase tracking-[0.16em] text-white/58">
                    Urgent issues
                  </p>
                </div>
                <a
                  href="mailto:glennesports7@gmail.com"
                  className="mt-3 inline-block text-xl text-white transition hover:text-white/70"
                >
                  glennesports7@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-black/55">
              Contact Form
            </p>
            <form className="mt-6 space-y-4" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-black/55">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-black bg-white px-4 py-3 text-black placeholder:text-black/35 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-black/55">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full border border-black bg-white px-4 py-3 text-black placeholder:text-black/35 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-black/55">
                    Glenn Username
                  </label>
                  <input
                    type="text"
                    placeholder="Your in-app username"
                    className="w-full border border-black bg-white px-4 py-3 text-black placeholder:text-black/35 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-black/55">
                    Issue Type
                  </label>
                  <select className="w-full border border-black bg-white px-4 py-3 text-black focus:outline-none">
                    <option>Select an issue type</option>
                    <option>Account and Login</option>
                    <option>Tournament Issues</option>
                    <option>Payment and Rewards</option>
                    <option>Technical Bug</option>
                    <option>Report Cheater</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-black/55">
                  Describe Your Issue
                </label>
                <textarea
                  rows={6}
                  placeholder="Tell us what happened in detail..."
                  className="w-full resize-none border border-black bg-white px-4 py-3 text-black placeholder:text-black/35 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center border border-black bg-black px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
              >
                Submit Request
              </button>
            </form>
          </div>
        </section>

        <section className="mt-14">
          <div className="border-t border-black pt-6">
            <p className="text-xs uppercase tracking-[0.28em] text-black/55">
              Frequently Asked Questions
            </p>
            <h2
              className="mt-4 text-4xl font-normal uppercase leading-none sm:text-6xl"
              style={{ fontFamily: '"Anton", sans-serif' }}
            >
              COMMON
              <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.96)]">
                QUESTIONS.
              </span>
            </h2>
          </div>

          <div className="mt-8 border border-black">
            {faqs.map((faq, index) => {
              const isOpen = openFAQ === index;

              return (
                <div key={faq.question} className={index < faqs.length - 1 ? "border-b border-black" : ""}>
                  <button
                    onClick={() => setOpenFAQ(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 bg-white px-6 py-5 text-left hover:bg-[#f3f3ee]"
                  >
                    <span
                      className="text-2xl font-normal uppercase"
                      style={{ fontFamily: '"Anton", sans-serif' }}
                    >
                      {faq.question}
                    </span>
                    <span className="text-3xl leading-none">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="bg-[#f3f3ee] px-6 pb-6 text-sm leading-8 text-black/74 sm:text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </section>

      <LandingFooter />
    </main>
  );
}
