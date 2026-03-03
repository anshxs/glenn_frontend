'use client';

import Image from "next/image";

export default function WithdrawalPolicy() {
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
            Withdrawal Policy
          </h1>
          <p className="max-w-2xl text-sm text-gray-400">
            Last Updated: March 2, 2026
          </p>
          <p className="max-w-2xl text-md text-gray-200">
            Guidelines for withdrawing funds from your GLENN wallet to your bank account.
          </p>
        </div>

        {/* Withdrawal Policy Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">1. Withdrawal Eligibility</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                To withdraw funds from your GLENN wallet, you must meet the following requirements:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Account Verification:</strong> Your account must be fully verified with valid phone number and documents.</li>
                <li><strong className="text-white">Minimum Balance:</strong> Your wallet must have at least 100 available for withdrawal.</li>
                <li><strong className="text-white">No Pending Issues:</strong> Your account must not have any fraud flags, pending disputes, or violations.</li>
                <li><strong className="text-white">KYC Completion:</strong> Valid government-issued ID and bank account details must be on file.</li>
                <li><strong className="text-white">Good Standing:</strong> Your account must not be under investigation or suspension.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">2. Withdrawal Limits</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>The following limits apply to all withdrawals:</p>
              <div className="bg-[#1a1a1a] p-4 rounded-lg space-y-2 mt-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Minimum Withdrawal:</span>
                  <span className="text-white font-semibold">100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Maximum Per Transaction:</span>
                  <span className="text-white font-semibold">50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily Limit:</span>
                  <span className="text-white font-semibold">1,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Limit:</span>
                  <span className="text-white font-semibold">5,00,000</span>
                </div>
              </div>
              <p className="text-yellow-400 text-xs mt-3">
                💡 Note: Limits may be adjusted based on account history and verification level. Higher limits available for verified professional players.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">3. Withdrawal Processing Time</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>Withdrawal requests are processed as follows:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Request Review:</strong> 1-2 business days for verification and approval</li>
                <li><strong className="text-white">Bank Transfer:</strong> 3-5 business days after approval</li>
                <li><strong className="text-white">UPI Transfer:</strong> 1-3 business days after approval (faster option)</li>
                <li><strong className="text-white">Total Time:</strong> 4-7 business days from request to bank credit</li>
              </ul>
              <p className="text-gray-400 mt-3">
                Withdrawal times may be longer during weekends, public holidays, or due to banking system maintenance.
              </p>
              <p className="text-red-400 font-semibold mt-3">
                ⚠️ First-time withdrawals may take up to 7-10 business days due to additional verification checks.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">4. Withdrawal Fees</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>GLENN charges the following fees for withdrawals:</p>
              <div className="bg-[#1a1a1a] p-4 rounded-lg space-y-2 mt-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">100 - 999:</span>
                  <span className="text-white font-semibold">10 + GST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">1,000 - 9,999:</span>
                  <span className="text-white font-semibold">15 + GST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">10,000 - 49,999:</span>
                  <span className="text-white font-semibold">25 + GST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">50,000+:</span>
                  <span className="text-white font-semibold">50 + GST</span>
                </div>
              </div>
              <p className="text-green-400 text-sm mt-3">
                ✨ VIP members enjoy reduced withdrawal fees. Check the VIP benefits section in the app for details.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">5. Withdrawal Sources</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                Your wallet balance consists of different sources. Withdrawal eligibility varies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-green-400">Tournament Winnings:</strong> ✅ Withdrawable after 24-hour cooling period</li>
                <li><strong className="text-green-400">Deposited Funds:</strong> ✅ Withdrawable immediately</li>
                <li><strong className="text-yellow-400">Bonus Amount:</strong> ⚠️ Must be used for tournament entries (non-withdrawable)</li>
                <li><strong className="text-yellow-400">Referral Bonus:</strong> ⚠️ Withdrawable after 7 days and 500 minimum earnings</li>
                <li><strong className="text-red-400">Promotional Credits:</strong> ❌ Non-withdrawable (tournament use only)</li>
              </ul>
              <p className="text-white font-semibold mt-3">
                The app will show your "Withdrawable Balance" which excludes non-withdrawable amounts.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">6. How to Withdraw</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>Follow these steps to withdraw funds:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Open the GLENN app and go to your Wallet</li>
                <li>Tap on "Withdraw" button</li>
                <li>Enter the amount you wish to withdraw (minimum 100)</li>
                <li>Select your verified bank account or add a new one</li>
                <li>Review the withdrawal details and fees</li>
                <li>Confirm the withdrawal request</li>
                <li>You will receive a confirmation notification</li>
                <li>Track the status in the "Transaction History" section</li>
              </ol>
              <p className="text-yellow-400 text-sm mt-3">
                💡 Tip: Ensure your bank account details are correct to avoid delays or rejections.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">7. Withdrawal Restrictions</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                GLENN reserves the right to restrict or suspend withdrawals in the following cases:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Fraud Detection:</strong> If suspicious activity is detected on your account</li>
                <li><strong className="text-white">Verification Pending:</strong> If your KYC documents are incomplete or under review</li>
                <li><strong className="text-white">Tournament Investigation:</strong> If you're involved in an ongoing cheating or dispute investigation</li>
                <li><strong className="text-white">Legal Requirements:</strong> If required by law enforcement or regulatory authorities</li>
                <li><strong className="text-white">TDS Deduction:</strong> Tax deduction at source may apply as per Indian Income Tax laws (for winnings above 10,000)</li>
                <li><strong className="text-white">Account Suspension:</strong> If your account is banned or temporarily suspended</li>
              </ul>
              <p className="text-red-400 font-semibold mt-3">
                You will be notified via email/in-app if your withdrawal is restricted, with the reason and steps to resolve.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">8. Tax Compliance (TDS)</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                As per Indian Income Tax regulations, GLENN is required to deduct Tax Deducted at Source (TDS) on net winnings:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">TDS Rate:</strong> 30% on net winnings exceeding 10,000 in a financial year</li>
                <li><strong className="text-white">TDS Certificate:</strong> Form 16A/26AS will be provided for tax filing purposes</li>
                <li><strong className="text-white">PAN Requirement:</strong> Valid PAN card must be linked; otherwise, higher TDS may apply</li>
              </ul>
              <p className="text-yellow-400 text-sm mt-3">
                💡 Consult a tax advisor for specific guidance on your tax obligations related to gaming winnings.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">9. Withdrawal Cancellation</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                You can cancel a withdrawal request only if it hasn't been processed yet (status: "Pending Review").
              </p>
              <p>
                Once a withdrawal moves to "Processing" or "Completed" status, it cannot be cancelled. The funds will be returned to your wallet only if the bank transfer fails.
              </p>
              <p className="text-white font-semibold">
                To cancel a pending withdrawal, go to Transaction History → Select the transaction → Tap "Cancel Withdrawal"
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">10. Failed Withdrawals</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>Withdrawals may fail due to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Incorrect bank account details</li>
                <li>Bank account closed or frozen</li>
                <li>IFSC code mismatch</li>
                <li>Beneficiary name mismatch with account holder</li>
                <li>Bank server downtime</li>
              </ul>
              <p className="text-white mt-3">
                If a withdrawal fails, the amount will be automatically credited back to your GLENN wallet within 24-48 hours. You can then retry with corrected details.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">11. Support & Disputes</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>For withdrawal-related issues, contact us:</p>
              <ul className="list-none space-y-2 ml-2">
                <li>📧 Email: <a href="mailto:withdrawals@glenn.app" className="text-[#c8ff00] underline">withdrawals@glenn.app</a></li>
                <li>📱 In-App: Use the Support feature in GLENN app</li>
                <li>⏰ Response Time: Within 24-48 hours</li>
              </ul>
              <p className="text-white font-semibold mt-3">
                Always provide your transaction ID and registered mobile number when contacting support.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">12. Policy Updates</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                GLENN reserves the right to update this Withdrawal Policy at any time. Users will be notified of significant changes via email or in-app notifications.
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
            <a href="/refund-policy" className="text-gray-400 hover:text-[#c8ff00] transition-colors">
              Refund Policy
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
