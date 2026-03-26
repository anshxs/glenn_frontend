import { PolicyPageShell, type PolicySection } from "@/components/policies/policy-page-shell";

const sections: PolicySection[] = [
  {
    title: "Acceptance and platform scope",
    paragraphs: [
      "By downloading, accessing, or using GLENN, you agree to be bound by these Terms of Service.",
      "GLENN provides esports tournaments, leaderboards, player profiles, social features, and rewards for Free Fire players in India.",
    ],
  },
  {
    title: "Eligibility and account rules",
    bullets: [
      "You must be at least 13 years old, or the legal minimum age in your jurisdiction.",
      "You must maintain a valid Free Fire account in good standing.",
      "Registration details must be accurate and kept up to date.",
      "Accounts previously banned for violations may not return without approval.",
    ],
    callout: {
      text: "Accounts created with false or misleading information can be suspended or permanently banned.",
      tone: "violet",
    },
  },
  {
    title: "Account responsibilities",
    bullets: [
      "Keep your login credentials secure at all times.",
      "You are responsible for activity that happens under your account.",
      "Make sure your Free Fire UID is correctly linked before competing.",
      "Tell us immediately if you believe your account has been compromised.",
    ],
  },
  {
    title: "Fair play and prohibited conduct",
    bullets: [
      "No hacks, mods, bots, automation, or third-party unfair advantage tools.",
      "No match-fixing, win-trading, collusion, reward abuse, or multi-account manipulation.",
      "No harassment, abuse, threats, impersonation, or toxic behavior toward other users.",
      "No selling, sharing, or transferring your GLENN account.",
      "No exploiting bugs, glitches, or loopholes for unfair benefit.",
    ],
    callout: {
      text: "Violations can lead to immediate suspension, reward forfeiture, and permanent bans.",
      tone: "lime",
    },
  },
  {
    title: "Tournaments, results, and rewards",
    bullets: [
      "Tournament-specific rules are shown before registration and remain final for that event.",
      "GLENN may cancel, reschedule, or modify tournaments if needed.",
      "Results can be verified using platform data, APIs, and manual review.",
      "Match disputes should be raised within 24 hours of the affected match.",
      "Rewards may be delayed, withheld, or reversed if fraud, cheating, or verification issues are found.",
    ],
  },
  {
    title: "Payments and withdrawals",
    paragraphs: [
      "Prize payouts, wallet balances, and withdrawals are subject to review, threshold requirements, and correct payment information.",
    ],
    bullets: [
      "First-time withdrawals can take longer because of additional checks.",
      "GLENN is not responsible for failed payouts caused by wrong bank or wallet details provided by the user.",
      "Separate deposit, refund, and withdrawal policies may add more specific payment terms.",
    ],
  },
  {
    title: "Intellectual property and user content",
    bullets: [
      "GLENN branding, design, code, and platform features remain the property of GLENN and its operators.",
      "You may not copy, distribute, modify, or reverse-engineer the app or its assets without written permission.",
      "Content you post may be displayed, distributed, moderated, and removed to operate and protect the platform.",
      "Illegal, abusive, hateful, infringing, fraudulent, or spam content is prohibited.",
    ],
  },
  {
    title: "Privacy, liability, and termination",
    paragraphs: [
      "By using GLENN, you consent to data processing needed for account management, tournament operations, analytics, and communication.",
      "GLENN is provided as is, without guarantees of uninterrupted or error-free service, and is not affiliated with Garena or Free Fire.",
    ],
    bullets: [
      "We do not sell your personal data to third parties.",
      "We can suspend or terminate accounts involved in fraud, abuse, cheating, or other serious violations.",
      "These Terms may be updated from time to time, and continued use after changes means you accept them.",
      "These Terms are governed by the laws of India.",
    ],
  },
];

export default function Terms() {
  return (
    <PolicyPageShell
      badge="Terms of Service"
      titleLines={["Rules.", "Fair.", "Clear."]}
      description="Everything that governs how GLENN works, what players can expect from the platform, and what we expect in return."
      updatedAt="February 20, 2026"
      currentHref="/terms"
      contactLabel="Questions about these terms"
      contactHref="mailto:support@glenn.co"
      contactValue="support@glenn.co"
      highlights={[
        { label: "Applies to", value: "All GLENN users", tone: "violet" },
        { label: "Minimum age", value: "13+", tone: "neutral" },
        { label: "Fair play", value: "Zero tolerance for cheating", tone: "lime" },
        { label: "Jurisdiction", value: "India", tone: "neutral" },
      ]}
      sections={sections}
    />
  );
}
