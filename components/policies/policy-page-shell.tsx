import Link from "next/link";
import { ArrowRight, LifeBuoy, Mail } from "lucide-react";

import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";

const policyLinks = [
  { href: "/terms", label: "Terms" },
  { href: "/deposit-policy", label: "Deposit Policy" },
  { href: "/withdrawal-policy", label: "Withdrawal Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
];

type Tone = "lime" | "violet" | "neutral";

type PolicyHighlight = {
  label: string;
  value: string;
  tone?: Tone;
};

type PolicyStat = {
  label: string;
  value: string;
};

export type PolicySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  orderedBullets?: string[];
  stats?: PolicyStat[];
  callout?: {
    text: string;
    tone?: Tone;
  };
};

type PolicyPageShellProps = {
  badge: string;
  titleLines: [string, string, string];
  description: string;
  updatedAt: string;
  currentHref: string;
  highlights: PolicyHighlight[];
  sections: PolicySection[];
  contactLabel: string;
  contactHref: string;
  contactValue: string;
};

const toneClasses: Record<Tone, string> = {
  lime: "border-black bg-[#f3f3ee] text-black",
  violet: "border-black bg-[#ece7ff] text-black",
  neutral: "border-black bg-white text-black",
};

export function PolicyPageShell({
  badge,
  titleLines,
  description,
  updatedAt,
  currentHref,
  highlights,
  sections,
  contactHref,
  contactValue,
}: PolicyPageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-black">
      <LandingHeader activeHref={currentHref} />

      <section className="mx-auto w-full px-6 pb-12 pt-22 sm:px-8 lg:px-12 lg:pt-24">
        <div className="border-t border-black pt-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-black/55">
                {badge}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-black/45">
                Updated {updatedAt}
              </p>
              <h1
                className="mt-4 text-5xl font-normal uppercase leading-[0.92] sm:text-7xl lg:text-[7rem]"
                style={{ fontFamily: '"Anton", sans-serif' }}
              >
                {titleLines[0]}
                <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.96)]">
                  {titleLines[1]}
                </span>
                <span className="block">{titleLines[2]}</span>
              </h1>
            </div>

            <div className="border-l-0 border-black lg:border-l lg:pl-8">
              <p className="text-base leading-8 text-black/72 sm:text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-0 border border-black lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="border-b border-black bg-black p-6 text-white sm:p-8 lg:border-b-0 lg:border-r">
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                Policy Links
              </p>
              <div className="mt-6 flex flex-col border border-white/20">
                {policyLinks.map((link) => {
                  const isActive = link.href === currentHref;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`border-b border-white/20 px-4 py-4 text-sm uppercase tracking-[0.16em] last:border-b-0 ${
                        isActive ? "bg-white text-black" : "text-white/72 hover:bg-white/8"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 border border-white/20 p-5">
                <div className="flex items-center gap-3">
                  <LifeBuoy className="h-4 w-4 text-white" />
                  <p className="text-sm uppercase tracking-[0.16em] text-white/58">
                    Policy support
                  </p>
                </div>
                <a
                  href={contactHref}
                  className="mt-4 inline-flex items-center gap-2 text-lg text-white transition hover:text-white/70"
                >
                  <Mail className="h-4 w-4" />
                  {contactValue}
                </a>
                <Link
                  href="/support"
                  className="mt-6 inline-flex items-center gap-2 border border-white bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
                >
                  Visit Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-black/55">
              Key Highlights
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <article
                    key={item.label}
                    className={`border px-5 py-5 ${
                      toneClasses[item.tone ?? "neutral"]
                    }`}
                  >
                    <p className="text-sm uppercase tracking-[0.16em] text-black/55">
                      {item.label}
                    </p>
                    <p className="mt-3 text-2xl uppercase text-black">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>
          </div>
        </div>

        <section className="mt-14">
          <div className="border-t border-black pt-6">
            <p className="text-xs uppercase tracking-[0.28em] text-black/55">
              Policy Breakdown
            </p>
            <h2
              className="mt-4 text-4xl font-normal uppercase leading-none sm:text-6xl"
              style={{ fontFamily: '"Anton", sans-serif' }}
            >
              THE
              <span className="block text-transparent [-webkit-text-stroke:1.4px_rgba(0,0,0,0.96)]">
                DETAILS.
              </span>
            </h2>
          </div>

          <div className="mt-8 grid gap-0 border border-black xl:grid-cols-2">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className={`bg-white px-6 py-6 sm:px-7 sm:py-7 ${index < sections.length - 1 ? "border-b border-black xl:border-b-0" : ""} ${index % 2 === 0 ? "xl:border-r xl:border-black" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-black bg-black text-sm text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3
                    className="text-2xl font-normal uppercase"
                    style={{ fontFamily: '"Anton", sans-serif' }}
                  >
                    {section.title}
                  </h3>
                </div>
              </div>

              {section.paragraphs && (
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-black/74"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.stats && (
                <div className="mt-5 border border-black p-5">
                  <div className="space-y-3">
                    {section.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center justify-between gap-4 border-b border-black/10 pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="text-sm uppercase tracking-[0.12em] text-black/55">
                          {stat.label}
                        </span>
                        <span className="text-base uppercase text-black">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.bullets && (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-base leading-7 text-black/74"
                    >
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 bg-black" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.orderedBullets && (
                <ol className="mt-5 space-y-3">
                  {section.orderedBullets.map((bullet, bulletIndex) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-base leading-7 text-black/74"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-black bg-black text-xs text-white">
                        {bulletIndex + 1}
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ol>
              )}

              {section.callout && (
                <div
                  className={`mt-5 border px-4 py-4 text-sm leading-7 ${
                    toneClasses[section.callout.tone ?? "neutral"]
                  }`}
                >
                  {section.callout.text}
                </div>
              )}
            </article>
          ))}
          </div>
        </section>

        <section className="mt-14 border border-black bg-black px-6 py-8 text-white sm:px-8 sm:py-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/[0.45]">
                Need More Clarity?
              </p>
              <h3
                className="mt-3 text-3xl font-normal uppercase sm:text-4xl"
                style={{ fontFamily: '"Anton", sans-serif' }}
              >
                Reach out before you submit, withdraw, or dispute anything.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/[0.64]">
                If a rule or policy point feels unclear, we would rather help you
                understand it upfront than clean up a problem later.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 border border-white bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
              >
                Open Support
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={contactHref}
                className="inline-flex items-center justify-center border border-white px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
              >
                {contactValue}
              </a>
            </div>
          </div>
        </section>
      </section>

      <LandingFooter />
    </main>
  );
}
