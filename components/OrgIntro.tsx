'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Trophy, ArrowUpRight, Target, Zap } from 'lucide-react';

const pillars = [
  {
    icon: Trophy,
    title: 'Esports Org First',
    tag: 'FOUNDATION',
    desc: 'Glenn is an esports organization built to create championship lineups, structured rosters, and competitive excellence.',
  },
  {
    icon: Zap,
    title: 'Powered by the App',
    tag: 'ECOSYSTEM',
    desc: 'The Glenn App is directly backed by our organization to power verified stats, tournament rooms, and instant cash rewards.',
  },
  {
    icon: Target,
    title: 'Grassroots to Pro',
    tag: 'PATHWAYS',
    desc: 'We scout, nurture, and elevate promising squad talent from local community scrims straight onto official competitive stages.',
  },
];

const stats = [
  { value: '50K+', label: 'Active Squad Players', sub: 'Competing across tournaments' },
  { value: '500+', label: 'Daily Custom Scrims', sub: 'High-tier competitive rooms' },
  { value: '100%', label: 'Verified Winnings', sub: 'Instant transparent payouts' },
];

export default function OrgIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end end'],
  });

  // Header scroll entrance: reveals and sticks to top
  const headerOpacity = useTransform(scrollYProgress, [0, 0.10], [0, 1]);
  const headerScale = useTransform(scrollYProgress, [0, 0.12], [0.95, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.12], [25, 0]);

  // Content stage scroll entrance: comes up smoothly
  const contentOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.05, 0.24], [250, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[240vh] sm:h-[270vh] bg-black text-white select-none"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10 select-none">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[300px] bg-[#FF3823]/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-[#5227FF]/10 blur-[120px] pointer-events-none rounded-full" />

        {/* Top Header & Headline Container */}
        <motion.div
          style={{
            opacity: headerOpacity,
            scale: headerScale,
            y: headerY,
          }}
          className="relative z-20 w-full flex flex-col items-center text-center max-w-5xl mx-auto shrink-0 pt-2 sm:pt-4"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#FF3823] mb-3 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3823] animate-pulse" />
            <span>The Organization Behind The App</span>
          </div>

          {/* Headline */}
          <h2
            style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-black tracking-tight leading-[1.08] text-white"
          >
            more than an app.{' '}
            <span className="block mt-1 sm:mt-2">
              backed by{' '}
              <span className="inline-block -rotate-1 border-3 sm:border-4 border-black rounded-xl sm:rounded-2xl bg-[#FF3823] px-3 sm:px-5 py-0.5 shadow-[4px_4px_0px_#fff] sm:shadow-[6px_6px_0px_#fff] text-black">
                glenn esports.
              </span>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-400 font-medium max-w-2xl mx-auto leading-snug">
            The Glenn app is powered by an esports organization built to create real player pathways, daily scrims, professional lineups, and competitive culture.
          </p>
        </motion.div>

        {/* Middle 3 Value Cards + Bottom Stats Strip (Comes up slowly with scroll) */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
          className="relative z-10 w-full flex-1 flex flex-col justify-between my-auto py-2"
        >
          {/* 3 Value Cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 my-auto shrink py-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group relative rounded-2xl md:rounded-3xl p-4 sm:p-5 lg:p-6 bg-neutral-900/60 border border-white/10 hover:border-[#FF3823]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF3823] group-hover:bg-[#FF3823] group-hover:text-black transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3
                      style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
                      className="text-base sm:text-lg font-bold text-white mb-1.5"
                    >
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:text-[#FF3823] transition-colors">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Compact Stats Strip */}
          <div className="w-full rounded-2xl p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 border border-white/10 shrink-0 mb-1 sm:mb-2">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center divide-x divide-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="px-2">
                  <p
                    style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
                    className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight"
                  >
                    <span className="text-[#FF3823]">{stat.value}</span>
                  </p>
                  <p className="text-[11px] sm:text-xs font-bold text-white truncate mt-0.5">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-gray-400 hidden sm:block">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
