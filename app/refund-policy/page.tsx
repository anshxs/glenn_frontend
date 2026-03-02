'use client';

import Image from "next/image";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen mx-auto bg-black font-sans">
      <header className="max-w-md border-0 mt-4 bg-transparent backdrop-blur-3xl z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-2 py-4">
          <div className="flex items-center">
            <a href="/" aria-label="Home">
              <Image
                src="/logos.svg"
                alt="Logo"
                width={140}
                height={40}
                className="invert-100"
              />
            </a>
          </div>

          <div className="flex items-center mr-2">
            <a
              href="https://github.com/anshxs/glenn_frontend/releases/download/v1.0.0/app-release.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg bg-[#c8ff00] px-5 py-2 text-black font-sans transition-all duration-200 hover:scale-105 hover:shadow-lg animate-fadeIn"
            >
              <img
                src="/android.svg"
                alt="Google Play"
                className="h-6 w-5 invert-0"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] opacity-70">Download</span>
                <span className="text-[15px] font-semibold">Glenn Now</span>
              </div>
            </a>
          </div>
        </div>
      </header>

      <main className="flex flex-col max-w-md min-h-[calc(100vh-64px)] w-full px-6 py-12">
        {/* Hero Section */}
        <div className="mx-auto flex flex-col items-start gap-3 mb-8 text-start">
          <h1 className="text-[32px] font-extrabold leading-10 text-white sm:text-5xl md:text-3xl">
            Refund Policy
          </h1>
          <p className="max-w-2xl text-sm text-gray-400">
            Last Updated: March 2, 2026
          </p>
          <p className="max-w-2xl text-md text-gray-200">
            Our refund policy for tournament entries, wallet deposits, and other transactions.
          </p>
        </div>

        {/* Refund Policy Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">1. General Refund Policy</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                GLENN operates on a strict refund policy to maintain fairness and integrity in our esports tournaments and services. Please read this policy carefully before making any purchases or tournament entries.
              </p>
              <p className="text-white font-semibold">
                All transactions are final unless explicitly stated otherwise in this policy.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">2. Tournament Entry Refunds</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                Tournament entry fees are <strong className="text-white">generally non-refundable</strong> once you have registered for a tournament. However, refunds may be issued in the following exceptional cases:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Tournament Cancellation:</strong> If GLENN cancels a tournament before it starts, all entry fees will be automatically refunded to participants' wallets within 24-48 hours.</li>
                <li><strong className="text-white">Technical Issues:</strong> If a tournament cannot proceed due to technical issues on GLENN's end, participants may be eligible for a full refund or credit for future use.</li>
                <li><strong className="text-white">Player Removal:</strong> If you are removed from a tournament by GLENN due to our error (not rule violations), you will receive a refund.</li>
                <li><strong className="text-white">Before Tournament Start:</strong> If you request a refund before the tournament registration closes and no slots have been filled past the refund cutoff, you may receive a partial refund (90% of entry fee, 10% processing fee).</li>
              </ul>
              <p className="text-red-400 font-semibold mt-3">
                ⚠️ No refunds will be issued for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2 text-red-300">
                <li>Tournament disqualifications due to rule violations</li>
                <li>Your failure to attend or participate in the tournament</li>
                <li>Loss or poor performance in the tournament</li>
                <li>Account bans or suspensions</li>
                <li>Change of mind after tournament starts</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">3. Wallet Deposit Refunds</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                Money added to your GLENN wallet via Razorpay or other payment methods is <strong className="text-white">non-refundable</strong> once successfully credited to your account.
              </p>
              <p>
                <strong className="text-white">Exceptions:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Duplicate Charges:</strong> If you are accidentally charged multiple times for the same deposit, the duplicate amount will be refunded to your original payment method within 7-10 business days.</li>
                <li><strong className="text-white">Payment Gateway Errors:</strong> If your payment was deducted but not credited to your wallet due to a technical error, the amount will be credited within 48 hours or refunded to your source account within 7-10 business days.</li>
                <li><strong className="text-white">Unauthorized Transactions:</strong> If you report an unauthorized wallet deposit within 24 hours with valid proof, we will investigate and may issue a refund if verified.</li>
              </ul>
              <p className="text-yellow-400 font-semibold mt-3">
                💡 Important: Wallet balance can be used for tournament entries or withdrawn as per our withdrawal policy. We do not refund wallet deposits to the original payment method unless required by law or under exceptional circumstances.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">4. Refund Processing Time</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>When a refund is approved:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Wallet Refunds:</strong> Credited to your GLENN wallet within 24-48 hours</li>
                <li><strong className="text-white">Original Payment Method:</strong> 7-10 business days (depending on your bank/payment provider)</li>
                <li><strong className="text-white">UPI/Cards:</strong> 5-7 business days</li>
                <li><strong className="text-white">Net Banking:</strong> 7-10 business days</li>
              </ul>
              <p className="text-gray-400 mt-3">
                Please note that processing times may vary based on your bank or payment provider's policies. GLENN is not responsible for delays caused by third-party payment processors.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">5. How to Request a Refund</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>To request a refund, follow these steps:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Contact GLENN Support through the in-app support feature or email <a href="mailto:support@glenn.app" className="text-[#c8ff00] underline">support@glenn.app</a></li>
                <li>Provide your transaction ID, account details, and reason for refund request</li>
                <li>Attach any relevant screenshots or proof</li>
                <li>Our team will review your request within 2-3 business days</li>
                <li>You will be notified of the decision via email or in-app notification</li>
              </ol>
              <p className="text-white font-semibold mt-3">
                Important: Fraudulent refund requests may result in account suspension or permanent ban.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">6. Chargebacks</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                <strong className="text-red-400">⚠️ WARNING:</strong> Initiating a chargeback through your bank or payment provider without first contacting GLENN Support is strictly prohibited and will result in:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2 text-red-300">
                <li>Immediate account suspension</li>
                <li>Permanent ban from GLENN platform</li>
                <li>Legal action for fraud if applicable</li>
                <li>Forfeiture of all wallet balance and winnings</li>
              </ul>
              <p className="text-white mt-3">
                Always contact our support team first to resolve any payment disputes.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">7. Contact Support</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>For refund inquiries or disputes, contact us:</p>
              <ul className="list-none space-y-2 ml-2">
                <li>📧 Email: <a href="mailto:support@glenn.app" className="text-[#c8ff00] underline">support@glenn.app</a></li>
                <li>📱 In-App: Use the Support feature in the GLENN app</li>
                <li>⏰ Response Time: Within 24-48 hours</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">8. Policy Updates</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                GLENN reserves the right to update this Refund Policy at any time. Changes will be effective immediately upon posting. Continued use of the platform constitutes acceptance of the updated policy.
              </p>
              <p className="text-white">
                Last updated: March 2, 2026
              </p>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <a href="/terms" className="text-gray-400 hover:text-[#c8ff00] transition-colors">
              Terms of Service
            </a>
            <span className="text-gray-600">•</span>
            <a href="/withdrawal-policy" className="text-gray-400 hover:text-[#c8ff00] transition-colors">
              Withdrawal Policy
            </a>
            <span className="text-gray-600">•</span>
            <a href="/deposit-policy" className="text-gray-400 hover:text-[#c8ff00] transition-colors">
              Deposit Policy
            </a>
            <span className="text-gray-600">•</span>
            <a href="/support" className="text-gray-400 hover:text-[#c8ff00] transition-colors">
              Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
