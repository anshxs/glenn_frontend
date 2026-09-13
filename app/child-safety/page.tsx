import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Child Safety Standards | GLENN",
  description:
    "GLENN standards against child sexual abuse and exploitation (CSAE).",
  alternates: {
    canonical: "https://glennesports.app/child-safety",
  },
};

const sections = [
  {
    id: "zero-tolerance",
    title: "Zero-Tolerance Standard",
    content: [
      "GLENN - The Esports App strictly prohibits child sexual abuse and exploitation (CSAE) and child sexual abuse material (CSAM). This prohibition applies to posts, stories, profiles, messages, links, images, videos, usernames, and every other form of content or conduct on GLENN.",
      "Prohibited conduct includes grooming, sextortion, sexualisation of minors, trafficking or solicitation involving minors, sharing or requesting CSAM, and any attempt to exploit, abuse, or endanger a child.",
    ],
  },
  {
    id: "reporting",
    title: "How to Report a Concern",
    content: [
      "Users can report safety concerns through Customer Support inside the GLENN app. Reports may also be sent to our designated child-safety contact at hello@glennesports.app. Include the relevant username, post or message details, and any other information that can help us locate the concern.",
      "Do not download, save, forward, or redistribute suspected CSAM when making a report. If a child is in immediate danger, contact local law enforcement or emergency services first.",
    ],
  },
  {
    id: "response",
    title: "Our Response & Enforcement",
    content: [
      "GLENN reviews child-safety reports and takes immediate action when it obtains actual knowledge of prohibited content or conduct. Actions may include restricting access, removing content, suspending or permanently banning accounts, preserving information where legally required, and preventing repeat abuse.",
      "Confirmed CSAM and credible child-exploitation concerns are handled in accordance with applicable child-safety laws. Where required, GLENN reports them to the National Center for Missing & Exploited Children or the appropriate regional or national authority and cooperates with lawful investigations.",
    ],
  },
  {
    id: "contact",
    title: "Child-Safety Point of Contact",
    content: [
      "The designated GLENN child-safety point of contact can be reached at hello@glennesports.app. This contact is available to discuss GLENN's CSAM prevention, enforcement, reporting, and legal-compliance practices.",
    ],
  },
];

export default function ChildSafetyPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white flex flex-col selection:bg-white selection:text-black">
      <Navbar />

      <section className="relative w-full pt-12 sm:pt-20 pb-12 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="w-full max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/60 text-xs font-mono tracking-widest text-neutral-400 mb-6 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Safety &amp; Compliance
          </div>

          <h1
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.06] text-white"
          >
            CHILD SAFETY STANDARDS
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed">
            Effective August 6, 2026. These standards describe GLENN&apos;s
            prevention and response practices for child sexual abuse and exploitation.
          </p>
        </div>
      </section>

      <section className="relative w-full pb-20 sm:pb-28 px-6 sm:px-10 lg:px-16 xl:px-24 flex-1">
        <div className="w-full max-w-4xl space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="rounded-2xl bg-neutral-950 p-6 sm:p-8 scroll-mt-8"
            >
              <h2
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
                className="text-lg sm:text-xl font-bold text-white tracking-tight"
              >
                {section.title}
              </h2>
              <div className="mt-3 space-y-3">
                {section.content.map((p, idx) => (
                  <p key={idx} className="text-sm text-neutral-400 leading-relaxed font-normal">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4">
            <a
              href="mailto:hello@glennesports.app?subject=GLENN%20Child%20Safety%20Report"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#fff] transition-all cursor-pointer font-bold text-xs uppercase tracking-wider text-white gap-2"
            >
              <span>Report a Child Safety Concern</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
