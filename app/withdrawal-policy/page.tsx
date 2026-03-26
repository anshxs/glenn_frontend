import { PolicyPageShell, type PolicySection } from "@/components/policies/policy-page-shell";

const sections: PolicySection[] = [
  {
    title: "Who can withdraw",
    bullets: [
      "Your account must be fully verified and in good standing.",
      "Required identity, KYC, and payout details must be complete and valid.",
      "Your account cannot have unresolved fraud flags, active disputes, or suspension-level issues.",
      "Only balances marked as withdrawable are eligible to leave the wallet.",
    ],
  },
  {
    title: "Withdrawal limits",
    stats: [
      { label: "Minimum withdrawal", value: "Rs 100" },
      { label: "Per transaction", value: "Up to Rs 50,000" },
      { label: "Daily limit", value: "Up to Rs 1,00,000" },
      { label: "Monthly limit", value: "Up to Rs 5,00,000" },
    ],
    callout: {
      text: "Limits can change based on verification level, history, risk review, and account status.",
      tone: "neutral",
    },
  },
  {
    title: "Processing times",
    bullets: [
      "Review and approval can take 1 to 2 business days.",
      "Bank transfers may take 3 to 5 business days after approval.",
      "UPI payouts can be faster when available.",
      "First-time withdrawals may require additional verification and take longer.",
      "Weekends, public holidays, and banking downtime can extend timelines.",
    ],
  },
  {
    title: "Fees and charges",
    paragraphs: [
      "Withdrawal fees can vary by amount and are shown at the time of request.",
    ],
    stats: [
      { label: "Rs 100 to Rs 999", value: "Rs 10 + GST" },
      { label: "Rs 1,000 to Rs 9,999", value: "Rs 15 + GST" },
      { label: "Rs 10,000 to Rs 49,999", value: "Rs 25 + GST" },
      { label: "Rs 50,000 and above", value: "Rs 50 + GST" },
    ],
  },
  {
    title: "Withdrawable balance and money sources",
    bullets: [
      "Tournament winnings can become withdrawable after the required cooling or review period.",
      "Directly deposited funds may be withdrawable immediately, depending on policy and checks.",
      "Bonus balances and promo credits are often non-withdrawable and may be tournament-use only.",
      "Referral rewards may require waiting periods or earning thresholds before becoming withdrawable.",
    ],
    callout: {
      text: "Always rely on the app's withdrawable balance figure instead of total wallet balance.",
      tone: "lime",
    },
  },
  {
    title: "How to withdraw",
    orderedBullets: [
      "Open Wallet inside the GLENN app.",
      "Choose Withdraw and enter an amount that meets the minimum threshold.",
      "Select or add a verified payout account.",
      "Review fees, amount, and destination carefully.",
      "Submit the request and monitor status in transaction history.",
    ],
  },
  {
    title: "Restrictions, taxes, and investigations",
    bullets: [
      "Withdrawals can be paused during fraud checks, cheating investigations, KYC review, or legal requests.",
      "Tax deduction at source can apply to eligible winnings under Indian law.",
      "A valid PAN may be required to avoid higher deduction outcomes.",
      "Accounts under suspension may lose access to withdrawals until issues are resolved.",
    ],
  },
  {
    title: "Cancellation, failures, and support",
    bullets: [
      "A withdrawal can only be cancelled while it is still pending review.",
      "Once processing has started, cancellation is generally no longer possible.",
      "Failed withdrawals caused by wrong beneficiary details, frozen accounts, or banking errors are usually returned to the wallet after review.",
      "Always contact support with the transaction ID and registered details for faster help.",
    ],
    callout: {
      text: "If a withdrawal fails, the amount is typically credited back to the GLENN wallet after the failure is confirmed.",
      tone: "violet",
    },
  },
];

export default function WithdrawalPolicy() {
  return (
    <PolicyPageShell
      badge="Withdrawal Policy"
      titleLines={["Earn.", "Verify.", "Withdraw."]}
      description="The rules around taking money out of your GLENN wallet, including eligibility, review, timelines, fees, and payout checks."
      updatedAt="March 2, 2026"
      currentHref="/withdrawal-policy"
      contactLabel="Withdrawal support"
      contactHref="mailto:support@glenn.co"
      contactValue="support@glenn.co"
      highlights={[
        { label: "Minimum", value: "Rs 100", tone: "lime" },
        { label: "Typical review", value: "1 to 2 business days", tone: "neutral" },
        { label: "Bank transfer", value: "3 to 5 business days", tone: "violet" },
        { label: "Taxes", value: "TDS may apply", tone: "neutral" },
      ]}
      sections={sections}
    />
  );
}
