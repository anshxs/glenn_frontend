import { PolicyPageShell, type PolicySection } from "@/components/policies/policy-page-shell";

const sections: PolicySection[] = [
  {
    title: "Supported deposit methods",
    bullets: [
      "UPI apps such as Google Pay, PhonePe, Paytm, and BHIM UPI.",
      "Debit cards from major networks including Visa, Mastercard, and RuPay.",
      "Credit cards where supported by your issuer and payment provider.",
      "Net banking from major Indian banks.",
      "Wallets supported through the payment gateway flow.",
    ],
    callout: {
      text: "Deposits are processed through secure third-party infrastructure such as Razorpay.",
      tone: "lime",
    },
  },
  {
    title: "Deposit limits",
    paragraphs: [
      "Wallet top-ups are subject to minimums, maximums, and account-level checks.",
    ],
    stats: [
      { label: "Minimum deposit", value: "Rs 10" },
      { label: "Per transaction", value: "Up to Rs 50,000" },
      { label: "Daily limit", value: "Up to Rs 2,00,000" },
      { label: "Monthly limit", value: "Up to Rs 10,00,000" },
    ],
    callout: {
      text: "Banks, cards, and payment providers can still apply their own transaction limits.",
      tone: "neutral",
    },
  },
  {
    title: "Processing and credit timelines",
    bullets: [
      "Most successful deposits are credited within seconds.",
      "UPI payments usually complete instantly and can take up to 5 minutes.",
      "Cards are usually instant to a couple of minutes.",
      "Net banking can take slightly longer depending on bank processing.",
      "If a payment succeeds but your wallet is not credited within 30 minutes, contact support with the transaction ID.",
    ],
  },
  {
    title: "Fees and value credited",
    paragraphs: [
      "GLENN does not normally charge a platform fee for deposits, so the wallet value shown is intended to match the amount added.",
    ],
    bullets: [
      "Your bank or payment provider can still apply their own fees.",
      "International cards may incur conversion costs.",
      "Tax or gateway-side charges can apply outside GLENN's control.",
    ],
  },
  {
    title: "How to add money",
    orderedBullets: [
      "Open the GLENN app and go to the wallet area.",
      "Tap Add Money and enter an amount.",
      "Choose a supported payment method.",
      "Complete the secure checkout flow.",
      "Wait for the success confirmation and wallet update.",
      "Check transaction history if you need a record of the payment.",
    ],
  },
  {
    title: "Security, failed payments, and duplicate charges",
    bullets: [
      "Payment information is encrypted and handled by the payment provider, not stored as raw card data by GLENN.",
      "Failed payments can happen because of insufficient balance, OTP mismatch, bank downtime, or gateway timeouts.",
      "If money was deducted for a failed payment, the amount is usually auto-refunded to the source account within 5 to 7 business days.",
      "Duplicate charges are reviewed and refunded after verification when confirmed.",
    ],
  },
  {
    title: "Restrictions, promotions, and responsible play",
    bullets: [
      "Deposits can be limited or blocked on accounts under investigation, suspension, KYC review, or fraud review.",
      "Promotional credits and cashback offers can come with usage restrictions, such as tournament-only use or non-withdrawable status.",
      "Players are encouraged to deposit responsibly and only what they can afford.",
      "Support can help with self-exclusion or limit-related requests where applicable.",
    ],
  },
  {
    title: "Refunds and support",
    paragraphs: [
      "Deposits credited successfully are generally non-refundable, except in cases such as duplicate charges, technical errors, or verified unauthorized transactions.",
      "For deeper refund terms, review the dedicated Refund Policy page.",
    ],
    callout: {
      text: "Always include your transaction ID and registered account details when you contact support about a deposit.",
      tone: "violet",
    },
  },
];

export default function DepositPolicy() {
  return (
    <PolicyPageShell
      badge="Deposit Policy"
      titleLines={["Add.", "Fund.", "Play."]}
      description="How wallet deposits work on GLENN, including payment methods, limits, timing, safety, and when to contact support."
      updatedAt="March 2, 2026"
      currentHref="/deposit-policy"
      contactLabel="Deposit support"
      contactHref="mailto:support@glenn.co"
      contactValue="support@glenn.co"
      highlights={[
        { label: "Minimum", value: "Rs 10", tone: "lime" },
        { label: "Typical credit", value: "Usually instant", tone: "neutral" },
        { label: "Failed payment refund", value: "5 to 7 business days", tone: "violet" },
        { label: "Provider", value: "Secure payment gateway", tone: "neutral" },
      ]}
      sections={sections}
    />
  );
}
