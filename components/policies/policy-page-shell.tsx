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
  lime: "border-[#c8ff00]/30 bg-[#c8ff00]/10 text-[#edfdb6]",
  violet: "border-[#aa3aff]/30 bg-[#aa3aff]/10 text-[#eed8ff]",
  neutral: "border-white/[0.1] bg-white/[0.06] text-white/85",
};

export function PolicyPageShell({
  badge,
  titleLines,
  description,
  updatedAt,
  currentHref,
  highlights,
  sections,
  contactLabel,
  contactHref,
  contactValue,
}: PolicyPageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040404] text-white">
      <LandingHeader activeHref="/terms" />

      <section className="relative mx-auto flex w-full max-w-7xl items-center px-6 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pt-36">
        <div className="grid w-full items-start gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <div className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {badge}
            </div>

            <div className="mt-4 inline-flex items-center rounded-full border border-white/[0.08] bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.5]">
              Updated {updatedAt}
            </div>

            <div className="mt-8 space-y-1 flex flex-wrap justify-start">
              <p className="text-5xl font-black uppercase tracking-[-0.06em] text-[#aa3aff] sm:text-7xl lg:text-[6.2rem]">
                {titleLines[0]}
              </p>
              <p className="text-5xl font-black uppercase tracking-[-0.06em] text-transparent [text-shadow:0_0_0_rgba(255,255,255,0.95)] [-webkit-text-stroke:1.4px_rgba(255,255,255,0.95)] sm:text-7xl lg:text-[6.2rem]">
                {titleLines[1]}
              </p>
              <p className="text-5xl font-black uppercase tracking-[-0.06em] text-white sm:text-7xl lg:text-[6.2rem]">
                {titleLines[2]}
              </p>
            </div>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/[0.68] sm:text-lg">
              {description}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-8 h-32 w-32 rounded-full bg-[#aa3aff]/[0.14] blur-[70px]" />
            <div className="absolute bottom-8 right-8 h-40 w-40 rounded-full bg-[#c8ff00]/[0.14] blur-[80px]" />

            <div className="relative rounded-[2.2rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.32)] sm:p-8">
              <div className="flex flex-wrap gap-3">
                {policyLinks.map((link) => {
                  const isActive = link.href === currentHref;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "border-white bg-white text-black"
                          : "border-white/[0.1] bg-black/60 text-white/70 hover:border-white/[0.18] hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <article
                    key={item.label}
                    className={`rounded-[1.6rem] border px-5 py-5 ${
                      toneClasses[item.tone ?? "neutral"]
                    }`}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/55">
                      {item.label}
                    </p>
                    <p className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-8 rounded-[1.8rem] border border-white/[0.08] bg-black/70 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                    <LifeBuoy className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-black tracking-[-0.04em] text-white">
                      Policy support
                    </p>
                    <p className="text-sm text-white/[0.56]">
                      Need clarification before you act?
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/[0.45]">
                      {contactLabel}
                    </p>
                    <a
                      href={contactHref}
                      className="mt-2 inline-flex items-center gap-2 text-lg font-black tracking-[-0.03em] text-white transition hover:text-[#c8ff00]"
                    >
                      <Mail className="h-4 w-4" />
                      {contactValue}
                    </a>
                  </div>

                  <Link
                    href="/support"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02]"
                  >
                    Visit Support
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center gap-3 text-center">
          <span className="h-3 w-3 rounded-full bg-[#aa3aff]" />
          <h2 className="text-3xl font-black tracking-[-0.05em] text-white sm:text-5xl">
            Policy Breakdown
          </h2>
          <span className="h-3 w-3 rounded-full bg-[#c8ff00]" />
        </div>

        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-[2rem] border border-white/[0.08] bg-white/[0.04] px-6 py-6 sm:px-7 sm:py-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.1] bg-black text-sm font-black text-white/80">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-white">
                    {section.title}
                  </h3>
                </div>
              </div>

              {section.paragraphs && (
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-white/[0.64]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.stats && (
                <div className="mt-5 rounded-[1.5rem] border border-white/[0.08] bg-black/60 p-5">
                  <div className="space-y-3">
                    {section.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="text-sm font-semibold uppercase tracking-[0.12em] text-white/[0.45]">
                          {stat.label}
                        </span>
                        <span className="text-base font-black tracking-[-0.03em] text-white">
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
                      className="flex items-start gap-3 text-base leading-7 text-white/[0.66]"
                    >
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#c8ff00]" />
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
                      className="flex items-start gap-3 text-base leading-7 text-white/[0.66]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-black text-xs font-black text-white/80">
                        {bulletIndex + 1}
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ol>
              )}

              {section.callout && (
                <div
                  className={`mt-5 rounded-[1.4rem] border px-4 py-4 text-sm font-semibold leading-7 ${
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

      <section className="relative mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-12">
        <div className="rounded-[2.2rem] border border-white/[0.08] bg-white/[0.04] px-7 py-8 sm:px-8 sm:py-9">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/[0.45]">
                Need More Clarity?
              </p>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:scale-[1.02]"
              >
                Open Support
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={contactHref}
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-black px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-white/[0.2]"
              >
                {contactValue}
              </a>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
