'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Iphone } from './ui/iphone';

interface MockupData {
  id: number;
  label: string;
  sub: string;
  image: string;
}

const mockups: MockupData[] = [
  { id: 1, label: 'Squad Tournaments', sub: 'Daily competitive custom matches & scrims', image: '/app/home.png' },
  { id: 2, label: 'Live Leaderboards', sub: 'Real-time KD ratio and rankings', image: '/app/home.png' },
  { id: 3, label: 'Instant Squad Feed', sub: 'Connect, chat, and share clutch moments', image: '/app/home.png' },
  { id: 4, label: 'Cash Rewards', sub: 'Withdraw instant tournament winnings', image: '/app/home.png' },
  { id: 5, label: 'Pro Player Profile', sub: 'Showcase your achievements & badges', image: '/app/home.png' },
  { id: 6, label: 'Custom Match Rooms', sub: 'Host scrims with custom rules & maps', image: '/app/home.png' },
  { id: 7, label: 'Team Voice & Comms', sub: 'Crystal-clear squad comms in-app', image: '/app/home.png' },
  { id: 8, label: 'Hall of Champions', sub: 'Top tier MVP trophies and rewards', image: '/app/home.png' },
];

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Direct scroll tracking across extended section height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end end'],
  });

  // Header animation: reveals smoothly at start of section
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const headerScale = useTransform(scrollYProgress, [0, 0.10], [0.94, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.10], [25, 0]);

  // Mockups opacity: smooth solid entrance
  const mockupsOpacity = useTransform(scrollYProgress, [0.01, 0.08], [0, 1]);

  // 1. Slow, gradual mockup rise into 1-2-3-2-1 arch (0.02 -> 0.32)
  // 2. Alignment to baseline (0.32 -> 0.44)
  const phoneCenterY = useTransform(scrollYProgress, [0.02, 0.28, 0.44], [820, 0, 0]);
  const phoneMidY = useTransform(scrollYProgress, [0.03, 0.30, 0.44], [890, 60, 0]);
  const phoneOuterY = useTransform(scrollYProgress, [0.04, 0.32, 0.44], [960, 120, 0]);

  // Mobile vertical rise transform
  const mobilePhoneY = useTransform(scrollYProgress, [0.02, 0.32], [780, 0]);

  const desktopYTransforms = [
    phoneOuterY,  // 1
    phoneMidY,    // 2
    phoneCenterY, // 3 (Center)
    phoneMidY,    // 4
    phoneOuterY,  // 5
    phoneOuterY,  // 6
    phoneOuterY,  // 7
    phoneOuterY,  // 8
  ];

  // 3. Horizontal translation (0.44 -> 0.78 on desktop, 0.32 -> 0.78 on mobile)
  // 4. Extended waiting / holding buffer (0.78 -> 1.0): holds steady on the rightmost cards
  const desktopTranslateX = useTransform(scrollYProgress, [0.44, 0.80, 1.0], ['0%', '-37.5%', '-37.5%']);
  const mobileTranslateX = useTransform(scrollYProgress, [0.32, 0.80, 1.0], ['0%', '-87.5%', '-87.5%']);

  const activeTranslateX = isMobile ? mobileTranslateX : desktopTranslateX;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[450vh] sm:h-[500vh] bg-black text-white mt-24 sm:mt-36 lg:mt-48"
    >
      {/* Clean Sticky Fullscreen Stage (standard clean exit matching Hero) */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden px-2 sm:px-4 pt-10 sm:pt-14 md:pt-16 pb-0 select-none">
        {/* Top Header / Showcase Text */}
        <motion.div
          style={{
            opacity: headerOpacity,
            scale: headerScale,
            y: headerY,
          }}
          className="relative z-20 shrink-0 flex flex-col items-center text-center max-w-4xl mx-auto px-4 mb-12 mt-4"
        >
          {/* Main Heading with Hero-styled squad badge */}
          <h2
            style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-black tracking-tight leading-[1.1] text-white flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
          >
            <span>built for the</span>
            <span className="inline-block -rotate-2 border-3 sm:border-4 border-black rounded-xl sm:rounded-2xl md:rounded-[1.2rem] bg-[#b6ff23] px-3.5 sm:px-5 py-0.5 sm:py-1 shadow-[5px_5px_0px_#fff] sm:shadow-[6px_6px_0px_#fff] text-black">
              squad
            </span>
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm md:text-base text-gray-400 font-medium max-w-md">
            Experience next-level tournaments, instant stats, squad chat, and real rewards.
          </p>
        </motion.div>

        {/* 
          Mockups Row:
          - Sits right below header text with clean margin
          - Large, prominent sizes on desktop (sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[390px])
          - Large focused size on mobile (w-[310px] xs:w-[350px])
        */}
        <div className="relative z-10 flex-1 w-full flex items-start justify-center overflow-visible pb-0 mt-2 sm:mt-3 md:mt-4">
          <div className="flex items-start justify-center w-full">
            <motion.div
              style={{
                x: activeTranslateX,
              }}
              className={`flex items-start justify-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 transform-gpu ${isMobile ? 'translate-x-[43.75%]' : 'translate-x-[18.75%]'
                }`}
            >
              {mockups.map((item, idx) => {
                const y = isMobile
                  ? mobilePhoneY
                  : (desktopYTransforms[idx] || phoneOuterY);

                return (
                  <motion.div
                    key={item.id}
                    data-mockup-card
                    style={{
                      y,
                      opacity: mockupsOpacity,
                    }}
                    className="shrink-0 flex flex-col items-center justify-start relative w-[310px] xs:w-[350px] sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[390px] transform-gpu"
                  >
                    {/* iPhone Mockup */}
                    <div className="w-full relative shadow-[0_-15px_35px_rgba(0,0,0,0.85)] rounded-[55px]">
                      <Iphone
                        className="w-full h-auto"
                        src={item.image}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom clean gradient grounding fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-30 pointer-events-none" />
      </div>
    </section>
  );
}
