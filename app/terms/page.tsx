'use client';

import Image from "next/image";

export default function Terms() {
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
            Terms of Service
          </h1>
          <p className="max-w-2xl text-sm text-gray-400">
            Last Updated: February 20, 2026
          </p>
          <p className="max-w-2xl text-md text-gray-200">
            By using GLENN, you agree to these terms. Please read them carefully.
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                By downloading, accessing, or using the GLENN mobile application ("App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the App.
              </p>
              <p>
                GLENN is operated by Clique Technology and provides esports tournament services, leaderboards, profiles, social features, and rewards for Free Fire players in India.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">2. Eligibility</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>To use GLENN, you must:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Be at least 13 years old (or the legal age in your jurisdiction).</li>
                <li>Have a valid Free Fire account in good standing.</li>
                <li>Provide accurate information during registration.</li>
                <li>Not have been previously banned from GLENN for violations.</li>
              </ul>
              <p className="text-white font-semibold">
                Accounts created with false information may be suspended or permanently banned.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">3. Account Responsibilities</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>You are responsible for:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Keeping your login credentials secure.</li>
                <li>All activity that occurs under your account.</li>
                <li>Ensuring your Free Fire UID is correctly linked.</li>
                <li>Notifying us immediately if your account is compromised.</li>
              </ul>
              <p>
                GLENN is not liable for losses due to unauthorized account access caused by your negligence.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">4. Fair Play & Prohibited Conduct</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p className="text-white font-semibold">We have zero tolerance for cheating.</p>
              <p>You may NOT:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Use hacks, mods, bots, or third-party tools.</li>
                <li>Engage in match-fixing, win-trading, or collusion.</li>
                <li>Create multiple accounts to abuse tournaments or rewards.</li>
                <li>Harass, abuse, or threaten other users.</li>
                <li>Share or sell your GLENN account.</li>
                <li>Exploit bugs or glitches for unfair advantage.</li>
              </ul>
              <p className="text-[#c8ff00] font-semibold">
                Violations will result in immediate suspension, reward forfeiture, and possible permanent ban.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">5. Tournaments & Competitions</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Tournament rules are final and displayed before registration.</li>
                <li>GLENN reserves the right to cancel, modify, or reschedule tournaments.</li>
                <li>Match results are verified using Free Fire APIs and manual review.</li>
                <li>Disputes must be reported within 24 hours of the match.</li>
                <li>Prize distribution timelines are specified per tournament.</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">6. Rewards & Payments</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                Rewards (coins, prizes, in-game items) are subject to verification and anti-fraud checks.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Rewards may be withheld or revoked if fraud or cheating is detected.</li>
                <li>Processing time for withdrawals: 24-48 hours (up to 7 days for first-time users).</li>
                <li>Minimum withdrawal thresholds apply.</li>
                <li>GLENN is not responsible for incorrect payment details provided by users.</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">7. Intellectual Property</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                All content, logos, designs, code, and features of GLENN are owned by Clique Technology and protected by copyright and trademark laws.
              </p>
              <p>
                You may not copy, modify, distribute, or reverse-engineer any part of the App without written permission.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">8. User-Generated Content</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                By posting content (messages, profile info, posts, images), you grant GLENN a non-exclusive license to display, distribute, and moderate your content.
              </p>
              <p>You may NOT post content that is:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Offensive, abusive, or hateful.</li>
                <li>Spam, phishing, or fraudulent.</li>
                <li>Infringing on others' intellectual property.</li>
                <li>Illegal or promoting illegal activity.</li>
              </ul>
              <p>GLENN reserves the right to remove content and suspend users who violate these rules.</p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">9. Privacy & Data</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                We collect and process your data as described in our Privacy Policy. By using GLENN, you consent to data collection for account management, tournament operations, analytics, and communication.
              </p>
              <p>We do NOT sell your personal data to third parties.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">10. Disclaimers & Limitations</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p className="text-white font-semibold">GLENN is provided "as is" without warranties of any kind.</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>We do not guarantee uninterrupted, error-free service.</li>
                <li>We are not responsible for game server issues, Free Fire bans, or third-party problems.</li>
                <li>GLENN is not affiliated with Garena or Free Fire.</li>
              </ul>
              <p className="text-[#c8ff00]">
                To the fullest extent permitted by law, GLENN and Clique Technology are not liable for indirect, incidental, or consequential damages.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">11. Termination</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                We reserve the right to suspend or terminate your account at any time for violations of these Terms, fraudulent activity, or other reasons at our discretion.
              </p>
              <p>You may delete your account at any time via the app settings.</p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">12. Changes to Terms</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                We may update these Terms at any time. Material changes will be communicated via in-app notification or email. Continued use of GLENN after changes constitutes acceptance.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">13. Governing Law</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>
                These Terms are governed by the laws of India. Any disputes will be resolved in courts located in [Your City/State].
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section className="rounded-lg bg-[#0f0f0f] p-6">
            <h2 className="text-xl font-bold text-white mb-3">14. Contact Us</h2>
            <div className="text-gray-300 text-sm space-y-3">
              <p>For questions about these Terms, contact us at:</p>
              <p className="text-[#c8ff00] font-semibold">support@glenn.co</p>
              <p>or visit <a href="/support" className="text-white underline">our Support page</a>.</p>
            </div>
          </section>
        </div>

        {/* Closing Statement */}
        <section className="mt-10 rounded-lg bg-[#0f0f0f] border border-[#c8ff00] p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Thank You for Playing Fair</h3>
          <p className="text-gray-300 text-sm">
            GLENN exists because of players like you. Let's keep the community strong, competitive, and respectful.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-16 w-full border-t border-zinc-800 pt-8 pb-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <a href="/" aria-label="Home" className="-ml-3 inline-block">
                  <img src="/logos.svg" alt="GLENN" className="h-10 invert-100" />
                </a>
                <p className="text-sm text-gray-300 max-w-xs">GLENN is India's home for Free Fire esports — tournaments, leaderboards, and real rewards for serious players.</p>
              </div>
            </div>

            <div className="mt-8 border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">© {new Date().getFullYear()} GLENN — All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="/about" className="text-sm text-gray-300 hover:text-white">About</a>
                <a href="/support" className="text-sm text-gray-300 hover:text-white">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
