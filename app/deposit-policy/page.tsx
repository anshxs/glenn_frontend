'use client';

import Image from "next/image";

export default function DepositPolicy() {
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
            Deposit Policy
          </h1>
          <p className="max-w-2xl text-sm text-gray-400">
            Last Updated: March 2, 2026
          </p>
          <p className="max-w-2xl text-md text-gray-200">
            Guidelines for adding money to your GLENN wallet safely and securely.
          </p>
        </div>

        {/* Deposit Policy Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">1. Deposit Methods</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                GLENN supports the following secure payment methods for adding money to your wallet:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">UPI:</strong> Google Pay, PhonePe, Paytm, BHIM UPI, and other UPI apps</li>
                <li><strong className="text-white">Debit Cards:</strong> Visa, Mastercard, RuPay</li>
                <li><strong className="text-white">Credit Cards:</strong> Visa, Mastercard, American Express</li>
                <li><strong className="text-white">Net Banking:</strong> All major Indian banks</li>
                <li><strong className="text-white">Wallets:</strong> Paytm, PhonePe, Amazon Pay (via Razorpay gateway)</li>
              </ul>
              <p className="text-green-400 font-semibold mt-3">
                ✅ All transactions are processed through Razorpay, a PCI-DSS compliant payment gateway trusted by millions.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">2. Deposit Limits</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>The following limits apply to wallet deposits:</p>
              <div className="bg-[#1a1a1a] p-4 rounded-lg space-y-2 mt-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Minimum Deposit:</span>
                  <span className="text-white font-semibold">₹10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Maximum Per Transaction:</span>
                  <span className="text-white font-semibold">₹50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily Limit:</span>
                  <span className="text-white font-semibold">₹2,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Limit:</span>
                  <span className="text-white font-semibold">₹10,00,000</span>
                </div>
              </div>
              <p className="text-yellow-400 text-xs mt-3">
                💡 Note: Higher limits available for verified accounts. Some payment methods may have their own limits imposed by banks.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">3. Payment Processing</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                When you add money to your GLENN wallet:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Instant Credit:</strong> Most deposits are credited to your wallet within seconds</li>
                <li><strong className="text-white">UPI Payments:</strong> Usually instant, max 5 minutes</li>
                <li><strong className="text-white">Card Payments:</strong> Instant to 2 minutes</li>
                <li><strong className="text-white">Net Banking:</strong> 2-10 minutes depending on bank processing</li>
                <li><strong className="text-white">Failed Payments:</strong> Automatically refunded to source within 5-7 business days</li>
              </ul>
              <p className="text-gray-400 mt-3">
                If your payment is successful but not credited within 30 minutes, contact support immediately with your transaction ID.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">4. Payment Fees</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p className="text-green-400 font-semibold">
                ✨ GLENN does not charge any fees for deposits! You pay exactly what you add to your wallet.
              </p>
              <p className="text-gray-400 mt-2">
                However, please note:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Your bank or payment provider may charge their own fees (e.g., credit card charges)</li>
                <li>Currency conversion fees may apply for international cards</li>
                <li>GST is applicable on payment gateway charges as per Indian tax laws</li>
              </ul>
              <p className="text-white font-semibold mt-3">
                What you see is what you get - ₹100 added = ₹100 credited to your wallet!
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">5. How to Add Money</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>Follow these simple steps to add money to your wallet:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Open the GLENN app and go to your Wallet</li>
                <li>Tap on "Add Money" button</li>
                <li>Enter the amount (minimum ₹10)</li>
                <li>Choose from quick amounts or enter custom amount</li>
                <li>Tap "Enter" to proceed to payment gateway</li>
                <li>Select your preferred payment method (UPI, Card, Net Banking)</li>
                <li>Complete the payment on Razorpay's secure checkout</li>
                <li>Your wallet will be credited instantly upon successful payment</li>
                <li>You'll receive a confirmation notification</li>
              </ol>
              <p className="text-green-400 text-sm mt-3">
                ✅ All your payment details are encrypted and securely processed by Razorpay. GLENN never stores your card or banking information.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">6. Payment Security</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>Your payment security is our top priority:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">256-bit SSL Encryption:</strong> All transactions are encrypted</li>
                <li><strong className="text-white">PCI-DSS Compliant:</strong> Razorpay meets international security standards</li>
                <li><strong className="text-white">2-Factor Authentication:</strong> Additional OTP verification for secure payments</li>
                <li><strong className="text-white">Fraud Detection:</strong> Advanced AI-powered fraud monitoring</li>
                <li><strong className="text-white">No Data Storage:</strong> GLENN doesn't store sensitive payment information</li>
              </ul>
              <p className="text-yellow-400 text-sm mt-3">
                🔒 Your payment information is handled directly by Razorpay and never passes through GLENN servers.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">7. Failed Transactions</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>If your deposit fails, it could be due to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Insufficient balance in your bank account</li>
                <li>Daily/monthly limit exceeded on your card</li>
                <li>Incorrect OTP or payment authentication</li>
                <li>Payment gateway timeout</li>
                <li>Bank server downtime</li>
                <li>3D Secure authentication failure</li>
              </ul>
              <p className="text-white font-semibold mt-3">
                What happens to failed payments?
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>If amount was deducted: Auto-refund within 5-7 business days</li>
                <li>If amount not deducted: Try again with another payment method</li>
                <li>Transaction status can be checked in "Transaction History"</li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">8. Duplicate Charges</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                In rare cases, you may be charged multiple times for the same transaction due to technical issues:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Detection:</strong> Our system automatically detects duplicate charges</li>
                <li><strong className="text-white">Refund:</strong> Duplicate amounts are refunded within 24-48 hours</li>
                <li><strong className="text-white">Notification:</strong> You'll be notified about the duplicate charge and refund</li>
              </ul>
              <p className="text-white font-semibold mt-3">
                If you notice a duplicate charge, contact support immediately with your transaction IDs.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">9. Deposit Restrictions</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                GLENN may restrict or disable deposits in the following cases:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">Account Suspension:</strong> If your account is banned or under investigation</li>
                <li><strong className="text-white">KYC Pending:</strong> If account verification is incomplete</li>
                <li><strong className="text-white">Fraud Alert:</strong> If suspicious activity is detected</li>
                <li><strong className="text-white">Limit Reached:</strong> If you've hit daily/monthly deposit limits</li>
                <li><strong className="text-white">Payment Gateway Issues:</strong> During maintenance or technical problems</li>
              </ul>
              <p className="text-red-400 font-semibold mt-3">
                ⚠️ You will be notified if deposits are restricted on your account.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">10. Promotional Offers</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                GLENN occasionally runs deposit bonus promotions:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong className="text-white">First Deposit Bonus:</strong> Special bonus for new users</li>
                <li><strong className="text-white">Cashback Offers:</strong> Get extra credits on deposits</li>
                <li><strong className="text-white">Seasonal Promotions:</strong> Special offers during festivals and events</li>
              </ul>
              <p className="text-yellow-400 text-sm mt-3">
                💡 Promotional credits may have usage restrictions (e.g., tournament entry only, non-withdrawable). Check individual offer terms.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">11. Responsible Gaming</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p className="text-white font-semibold">
                GLENN promotes responsible gaming. Please deposit only what you can afford.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Set deposit limits in your account settings</li>
                <li>Take breaks if you feel compelled to deposit excessively</li>
                <li>Contact support for self-exclusion options if needed</li>
                <li>Seek help if gaming becomes problematic</li>
              </ul>
              <p className="text-yellow-400 text-sm mt-3">
                🎮 Gaming should be fun, not financially stressful. Play responsibly!
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">12. Refund Policy</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                <strong className="text-white">Deposits are generally non-refundable</strong> once successfully credited to your wallet.
              </p>
              <p>
                However, refunds may be issued for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Duplicate charges</li>
                <li>Technical errors resulting in incorrect credit</li>
                <li>Unauthorized transactions (with valid proof)</li>
              </ul>
              <p className="text-white font-semibold mt-3">
                For detailed refund terms, please read our <a href="/refund-policy" className="text-[#c8ff00] underline">Refund Policy</a>.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">13. Support & Help</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>For deposit-related issues, contact us:</p>
              <ul className="list-none space-y-2 ml-2">
                <li>📧 Email: <a href="mailto:payments@glenn.app" className="text-[#c8ff00] underline">payments@glenn.app</a></li>
                <li>📱 In-App: Use the Support feature in GLENN app</li>
                <li>💬 Live Chat: Available 10 AM - 8 PM IST</li>
                <li>⏰ Email Response: Within 24-48 hours</li>
              </ul>
              <p className="text-white font-semibold mt-3">
                Always provide your transaction ID and registered details when contacting support.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">14. Policy Updates</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                GLENN reserves the right to update this Deposit Policy at any time. Users will be notified of significant changes via email or in-app notifications.
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
            <a href="/withdrawal-policy" className="text-gray-400 hover:text-[#c8ff00] transition-colors">
              Withdrawal Policy
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
