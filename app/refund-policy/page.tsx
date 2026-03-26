import { PolicyPageShell, type PolicySection } from "@/components/policies/policy-page-shell";

const sections: PolicySection[] = [
  {
    title: "General refund position",
    paragraphs: [
      "GLENN follows a fairly strict refund model to protect competitive fairness and payment integrity.",
      "Transactions are treated as final unless a refund scenario is specifically allowed by policy or required by law.",
    ],
    callout: {
      text: "Refund approval is exception-based, not the default outcome for completed payments or tournament entries.",
      tone: "violet",
    },
  },
  {
    title: "Tournament entry refunds",
    bullets: [
      "Entry fees are usually non-refundable once you register.",
      "Refunds may be approved if GLENN cancels the tournament before it starts.",
      "Refunds may be approved when a tournament fails because of GLENN-side technical problems.",
      "If GLENN removes you because of an internal error rather than a rules violation, a refund may be issued.",
      "In limited pre-start cases, a partial refund can apply before registration fully closes.",
    ],
  },
  {
    title: "When entry refunds are not available",
    bullets: [
      "Disqualification because of rule violations.",
      "Failure to show up or participate.",
      "Poor performance or losing in the event.",
      "Account suspension or ban.",
      "Change of mind after the tournament has effectively started.",
    ],
    callout: {
      text: "Breaking rules does not create a refund right.",
      tone: "lime",
    },
  },
  {
    title: "Wallet deposit refunds",
    paragraphs: [
      "Deposits credited successfully to your GLENN wallet are generally non-refundable.",
    ],
    bullets: [
      "Duplicate charges can be refunded after confirmation.",
      "If a payment was deducted but not credited because of a technical issue, the amount may be credited or refunded after review.",
      "Reported unauthorized deposits can be investigated and refunded where verified.",
    ],
  },
  {
    title: "Refund timing",
    stats: [
      { label: "Wallet refunds", value: "24 to 48 hours" },
      { label: "Original payment method", value: "7 to 10 business days" },
      { label: "UPI or cards", value: "5 to 7 business days" },
      { label: "Net banking", value: "7 to 10 business days" },
    ],
    callout: {
      text: "Banks and payment providers can slow down final settlement even after GLENN approves a refund.",
      tone: "neutral",
    },
  },
  {
    title: "How to request a refund",
    orderedBullets: [
      "Contact support through the app or at the support email.",
      "Share your transaction ID, account details, and the reason for the request.",
      "Attach screenshots or any supporting proof.",
      "Wait for the review decision and follow any verification steps requested by support.",
    ],
  },
  {
    title: "Chargebacks and abuse",
    bullets: [
      "Do not initiate a bank or card chargeback before contacting GLENN support.",
      "Unapproved chargebacks can trigger account suspension, prize forfeiture, or permanent restriction.",
      "Fraudulent refund requests can also lead to enforcement action on the account.",
    ],
  },
  {
    title: "Support and updates",
    paragraphs: [
      "For refund disputes, contact support and include as much transaction detail as possible.",
      "This policy can be updated over time, and continued platform use means you accept the current version.",
    ],
  },
];

export default function RefundPolicy() {
  return (
    <PolicyPageShell
      badge="Refund Policy"
      titleLines={["Review.", "Resolve.", "Refund."]}
      description="A clear breakdown of when GLENN refunds are possible, what is usually final, and how to request a review when something goes wrong."
      updatedAt="March 2, 2026"
      currentHref="/refund-policy"
      contactLabel="Refund support"
      contactHref="mailto:support@glenn.co"
      contactValue="support@glenn.co"
      highlights={[
        { label: "Default rule", value: "Transactions are final", tone: "violet" },
        { label: "Tournament cancellation", value: "Eligible for refund review", tone: "lime" },
        { label: "Wallet refunds", value: "24 to 48 hours", tone: "neutral" },
        { label: "Source refunds", value: "7 to 10 business days", tone: "neutral" },
      ]}
      sections={sections}
    />
  );
}
