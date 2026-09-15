import React from "react";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Footer from "@/components/Footer";
import { getSubdomainUrl } from "@/lib/subdomains";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black text-white relative">
      <Hero />
      <Showcase />

      {/* Semantic Crawlable SEO Content for Search Engines without altering visual design */}
      <section className="sr-only" aria-label="About GLENN Free Fire Esports Platform">
        <h2>India&apos;s Ultimate Free Fire Esports Platform</h2>
        <p>
          GLENN is an esports organization and competitive gaming platform in India.
          We provide daily Free Fire custom room scrims, automated tournament fixtures,
          live KD leaderboards, player profiles, squad voice matchmaking, and verified
          cash rewards for champions.
        </p>

        <h3>Daily Custom Tournaments &amp; Pro Scrims</h3>
        <p>
          Participate in daily Battle Royale and Clash Squad custom matches with automated
          room ID delivery, point tables, and strict referee anti-cheat enforcement.
        </p>

        <h3>Live Leaderboards &amp; KD Tracking</h3>
        <p>
          Link your Free Fire UID to track your kill-death ratio, tournament badges,
          and national player rankings in real-time.
        </p>

        <h3>Find Your Squad &amp; Nearby Gamers</h3>
        <p>
          Discover competitive teammates by role including In-Game Leader (IGL),
          Entry Rusher, Sniper, and Support. Connect via squad voice comms and world chat.
        </p>

        <h3>Frequently Asked Questions</h3>
        <ul>
          <li>
            <strong>What is GLENN?</strong> GLENN is India&apos;s premier Free Fire
            esports platform and social gaming community.
          </li>
          <li>
            <strong>How do I join scrims?</strong> Download the GLENN app from Google
            Play, register your squad, and get instant custom room credentials.
          </li>
          <li>
            <strong>Are rewards verified?</strong> Yes, winning players receive
            instant verified payouts calculated from official room point tables.
          </li>
        </ul>

        <div>
          <a href={getSubdomainUrl("about")}>About GLENN Esports</a>
          <a href={getSubdomainUrl("careers")}>Careers at GLENN</a>
          <a href={getSubdomainUrl("complaints")}>Complaints &amp; Support</a>
          <a href={getSubdomainUrl("policy")}>Privacy Policy</a>
          <a href="/child-safety">Child Safety Standards</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}