import type { Metadata } from "next";

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
    title: "Zero-tolerance standard",
    content: [
      "GLENN - The Esports App strictly prohibits child sexual abuse and exploitation (CSAE) and child sexual abuse material (CSAM). This prohibition applies to posts, stories, profiles, messages, links, images, videos, usernames, and every other form of content or conduct on GLENN.",
      "Prohibited conduct includes grooming, sextortion, sexualisation of minors, trafficking or solicitation involving minors, sharing or requesting CSAM, and any attempt to exploit, abuse, or endanger a child.",
    ],
  },
  {
    id: "reporting",
    title: "How to report a concern",
    content: [
      "Users can report safety concerns through Customer Support inside the GLENN app. Reports may also be sent to our designated child-safety contact at glennesports7@gmail.com. Include the relevant username, post or message details, and any other information that can help us locate the concern.",
      "Do not download, save, forward, or redistribute suspected CSAM when making a report. If a child is in immediate danger, contact local law enforcement or emergency services first.",
    ],
  },
  {
    id: "response",
    title: "Our response",
    content: [
      "GLENN reviews child-safety reports and takes appropriate action when it obtains actual knowledge of prohibited content or conduct. Actions may include restricting access, removing content, suspending or permanently banning accounts, preserving information where legally required, and preventing repeat abuse.",
      "Confirmed CSAM and credible child-exploitation concerns are handled in accordance with applicable child-safety laws. Where required, GLENN reports them to the National Center for Missing & Exploited Children or the appropriate regional or national authority and cooperates with lawful investigations.",
    ],
  },
  {
    id: "contact",
    title: "Child-safety point of contact",
    content: [
      "The designated GLENN child-safety point of contact can be reached at glennesports7@gmail.com. This contact is available to discuss GLENN's CSAM prevention, enforcement, reporting, and legal-compliance practices.",
    ],
  },
];

export default function ChildSafetyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <article>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/45">
            GLENN - The Esports App
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Child Safety Standards
          </h1>
          <p className="mt-4 text-sm leading-7 text-black/60 sm:text-[15px]">
            Effective August 6, 2026. These standards describe GLENN&apos;s
            prevention and response practices for child sexual abuse and
            exploitation.
          </p>

          <nav
            aria-label="Child safety standards sections"
            className="my-9 grid gap-2 border-y border-black/10 py-5 sm:grid-cols-2"
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-black/65 transition hover:bg-black/[0.04] hover:text-black"
              >
                {section.title}
              </a>
            ))}
          </nav>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-8">
                <h2 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.content.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-black/70 sm:text-[15px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <a
            href="mailto:glennesports7@gmail.com?subject=GLENN%20Child%20Safety%20Report"
            className="mt-10 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
          >
            Report a child-safety concern
          </a>
        </article>
      </div>
    </main>
  );
}
