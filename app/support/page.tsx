'use client';

import Image from "next/image";
import {
  Clock3,
  Instagram,
  LifeBuoy,
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
    href: "mailto:support@glenn.co",
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
    <main className="relative min-h-screen overflow-hidden bg-[#040404] text-white">
      <LandingHeader activeHref="/support" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[0.98fr_1.02fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              GLENN Support
            </div>

            <div className="mt-8 space-y-1 flex flex-wrap justify-start">
              <p className="text-5xl font-black uppercase tracking-[-0.06em] text-[#aa3aff] sm:text-7xl lg:text-[6.2rem]">
                Need.
              </p>
              <p className="text-5xl font-black uppercase tracking-[-0.06em] text-transparent [text-shadow:0_0_0_rgba(255,255,255,0.95)] [-webkit-text-stroke:1.4px_rgba(255,255,255,0.95)] sm:text-7xl lg:text-[6.2rem]">
                Help.
              </p>
              <p className="text-5xl font-black uppercase tracking-[-0.06em] text-white sm:text-7xl lg:text-[6.2rem]">
                Fast.
              </p>
            </div>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              Whether you are stuck on rewards, reporting an issue, or trying
              to sort tournament details, this is the fastest way to get back
              into the action.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {quickChannels.map((channel) => {
                const Icon = channel.icon;

                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="rounded-[1.7rem] border border-white/[0.08] bg-white/[0.04] px-5 py-5 transition hover:bg-white/[0.07]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-lg font-black tracking-[-0.04em] text-white">
                      {channel.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/[0.58]">
                      {channel.subtext}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto h-[34rem] w-full max-w-[30rem]">
            <div className="absolute left-1/2 top-1/2 h-[17rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8ff00]/[0.18] blur-[70px]" />

            <div className="absolute left-0 top-10 z-10 rounded-[1.6rem] border border-white/[0.08] bg-white/[0.06] px-4 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
              <p className="text-sm font-black tracking-[-0.03em] text-white">
                24-48h response
              </p>
              <p className="mt-1 text-xs text-white/[0.58]">
                Typical support turnaround
              </p>
            </div>

            <div className="absolute right-0 top-24 z-10 rounded-[1.6rem] border border-white/[0.08] bg-white/[0.06] px-4 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
              <p className="text-sm font-black tracking-[-0.03em] text-white">
                Urgent issues
              </p>
              <p className="mt-1 text-xs text-white/[0.58]">
                Email support@glenn.co
              </p>
            </div>

            <div className="absolute left-1/2 top-8 z-30 h-[24rem] w-[13rem] -translate-x-1/2 overflow-hidden rounded-[2.2rem] border border-white/[0.14] bg-[#09090b] shadow-[0_30px_90px_rgba(0,0,0,0.52)] sm:h-[28rem] sm:w-[15rem]">
              <Image
                src="/4.png"
                alt="GLENN support and community preview"
                fill
                sizes="240px"
                className="object-cover object-top"
                priority
              />
            </div>

            <div className="absolute bottom-10 left-0 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/[0.75]">
              Help center
            </div>

            <div className="absolute bottom-0 right-0 rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/[0.75]">
              Real support
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center gap-3 text-center">
          <span className="h-3 w-3 rounded-full bg-[#aa3aff]" />
          <h2 className="text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <span className="h-3 w-3 rounded-full bg-[#c8ff00]" />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = openFAQ === index;

            return (
              <div
                key={faq.question}
                className="rounded-[1.8rem] border border-white/[0.08] bg-white/[0.04] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-black tracking-[-0.03em] text-white">
                    {faq.question}
                  </span>
                  <span className="text-2xl font-light text-[#c8ff00]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-base leading-8 text-white/[0.64]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-14 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] px-7 py-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
              <LifeBuoy className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-white">
              Still Need Help?
            </h2>
            <p className="mt-4 text-base leading-8 text-white/[0.64]">
              Drop the details below and we will get back to you as quickly as
              possible. For critical problems like hacked accounts or payment
              disputes, email us directly.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-[1.4rem] border border-white/[0.08] bg-black px-5 py-4">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-[#c8ff00]" />
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/[0.52]">
                    Usual response window
                  </p>
                </div>
                <p className="mt-3 text-xl font-black tracking-[-0.03em] text-white">
                  24 to 48 hours
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-white/[0.08] bg-black px-5 py-4">
                <div className="flex items-center gap-3">
                  <TriangleAlert className="h-5 w-5 text-[#aa3aff]" />
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/[0.52]">
                    Urgent issues
                  </p>
                </div>
                <a
                  href="mailto:support@glenn.co"
                  className="mt-3 inline-block text-xl font-black tracking-[-0.03em] text-white transition hover:text-[#c8ff00]"
                >
                  support@glenn.co
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] px-7 py-7">
            <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-white/[0.55]">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-[1rem] border border-white/[0.08] bg-black px-4 py-3 text-white placeholder:text-white/[0.34] focus:border-[#c8ff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-white/[0.55]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full rounded-[1rem] border border-white/[0.08] bg-black px-4 py-3 text-white placeholder:text-white/[0.34] focus:border-[#c8ff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-white/[0.55]">
                  GLENN Username
                </label>
                <input
                  type="text"
                  placeholder="Your in-app username"
                  className="w-full rounded-[1rem] border border-white/[0.08] bg-black px-4 py-3 text-white placeholder:text-white/[0.34] focus:border-[#c8ff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-white/[0.55]">
                  Issue Type
                </label>
                <select className="w-full rounded-[1rem] border border-white/[0.08] bg-black px-4 py-3 text-white focus:border-[#c8ff00] focus:outline-none">
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

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-white/[0.55]">
                  Describe Your Issue
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us what happened in detail..."
                  className="w-full resize-none rounded-[1rem] border border-white/[0.08] bg-black px-4 py-3 text-white placeholder:text-white/[0.34] focus:border-[#c8ff00] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:scale-[1.03]"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
