'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import ReflectiveCard from './ReflectiveCard';

interface PlayerInfo {
  id: number;
  ign: string;
  role: string;
  image: string;
}

interface GameRosterData {
  id: string;
  name: string;
  logo: string;
  captain?: PlayerInfo | null;
  squad: PlayerInfo[];
}

const rosters: GameRosterData[] = [
  {
    id: 'bgmi',
    name: 'PUBG / BGMI',
    logo: '/champions/icon_pubg.png',
    captain: {
      id: 1,
      ign: 'UT.CURSEE',
      role: 'IGL / ASSAULTER',
      image: '/champions/player_cutout.png',
    },
    squad: [
      { id: 2, ign: 'UT.MAFIA', role: 'FRAGGER', image: '/champions/player_cutout.png' },
      { id: 3, ign: 'UT.VIPER', role: 'SNIPER', image: '/champions/player_cutout.png' },
      { id: 4, ign: 'UT.SHADOW', role: 'SUPPORT', image: '/champions/player_cutout.png' },
      { id: 5, ign: 'UT.FALCON', role: 'ENTRY', image: '/champions/player_cutout.png' },
    ],
  },
  {
    id: 'freefire',
    name: 'Free Fire MAX',
    logo: '/champions/icon_ff.png',
    captain: {
      id: 1,
      ign: 'GLENN_SHADOW',
      role: 'CAPTAIN / RUSHER',
      image: '/champions/player_cutout.png',
    },
    squad: [
      { id: 2, ign: 'GLENN_VIPER', role: 'SNIPER', image: '/champions/player_cutout.png' },
      { id: 3, ign: 'GLENN_BLAZE', role: 'RUSHER', image: '/champions/player_cutout.png' },
    ],
  },
  {
    id: 'valorant',
    name: 'Valorant',
    logo: '/champions/icon_val.png',
    captain: {
      id: 1,
      ign: 'GLENN_ACES',
      role: 'DUELIST / IGL',
      image: '/champions/player_cutout.png',
    },
    squad: [
      { id: 2, ign: 'GLENN_CYPHER', role: 'SENTINEL', image: '/champions/player_cutout.png' },
      { id: 3, ign: 'GLENN_JETT', role: 'INITIATOR', image: '/champions/player_cutout.png' },
    ],
  },
  {
    id: 'codm',
    name: 'Call of Duty Mobile',
    logo: '/champions/icon_codm.png',
    captain: {
      id: 1,
      ign: 'GLENN_GHOST',
      role: 'IGL / SNIPER',
      image: '/champions/player_cutout.png',
    },
    squad: [
      { id: 2, ign: 'GLENN_SOAP', role: 'SMG SLAYER', image: '/champions/player_cutout.png' },
    ],
  },
  {
    id: 'pokemon',
    name: 'Pokemon UNITE',
    logo: '/champions/icon_poke.png',
    captain: null,
    squad: [],
  },
];

export default function Champions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedGame, setSelectedGame] = useState<string>('bgmi');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'end end'],
  });

  // Header scroll entrance
  const headerOpacity = useTransform(scrollYProgress, [0, 0.10], [0, 1]);
  const headerScale = useTransform(scrollYProgress, [0, 0.12], [0.95, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.12], [25, 0]);

  // Content stage scroll entrance
  const contentOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.05, 0.24], [250, 0]);

  const activeRoster = rosters.find((r) => r.id === selectedGame) || rosters[0];
  const totalPlayerImages = (activeRoster.captain ? 1 : 0) + activeRoster.squad.length;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[250vh] sm:h-[280vh] bg-black text-white select-none"
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start px-4 sm:px-8 lg:px-14 pt-6 sm:pt-8 lg:pt-10 pb-4 select-none">

        {/* Top Header - Left Aligned: MEET OUR (White) + CHAMPIONS (Pink-to-Orange Calligraphy Gradient) */}
        <motion.div
          style={{
            opacity: headerOpacity,
            scale: headerScale,
            y: headerY,
          }}
          className="relative z-20 w-full flex items-start justify-start shrink-0 mb-3 sm:mb-5"
        >
          <h2 className="flex items-center gap-3 sm:gap-4 flex-wrap text-left">
            <span
              style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black tracking-tight text-white uppercase leading-none"
            >
              MEET OUR
            </span>
            <span
              style={{ fontFamily: 'var(--font-calligraphy), cursive' }}
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[4.8rem] font-bold italic uppercase tracking-wider bg-gradient-to-r from-[#FF007A] via-[#FF2E93] to-[#FF5E00] bg-clip-text text-transparent leading-none select-none pl-1"
            >
              CHAMPIONS
            </span>
          </h2>
        </motion.div>

        {/* Main Content Stage: Left Sidebar + Dynamic Bento Grid */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
          className="relative z-10 w-full flex-1 min-h-0 flex flex-col md:flex-row items-start gap-4 sm:gap-6 lg:gap-8"
        >
          {/* Left Vertical Game Tabs - Top Aligned Exactly with Bento Grid Top Edge */}
          <div className="hidden md:flex flex-col items-center justify-start gap-3 lg:gap-3.5 shrink-0 pt-0">
            {rosters.map((game) => {
              const isSelected = game.id === selectedGame;
              return (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  title={game.name}
                  className={`group relative rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center p-1 ${
                    isSelected
                      ? 'scale-105 opacity-100 ring-2 ring-white ring-offset-2 ring-offset-black'
                      : 'opacity-40 hover:opacity-90 hover:scale-105 ring-0'
                  }`}
                >
                  <div className="w-11 h-11 lg:w-13 lg:h-13 rounded-full overflow-hidden bg-black p-0.5 flex items-center justify-center shrink-0">
                    <img
                      src={game.logo}
                      alt={game.name}
                      className="w-full h-full object-cover rounded-full pointer-events-none"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Bento Stage */}
          <div className="flex-1 w-full h-full min-h-0 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoster.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full min-h-0 flex"
              >
                {/* CASE 1: ZERO IMAGES -> ONLY ONE BIGGEST CARD (STRICTLY LEFT-ALIGNED) */}
                {totalPlayerImages === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4.5 w-full h-full min-h-0">
                    <div className="md:col-span-5 lg:col-span-4 relative rounded-2xl md:rounded-[24px] overflow-hidden h-full min-h-0">
                      <ReflectiveCard
                        overlayColor="rgba(0, 0, 0, 0.2)"
                        blurStrength={0}
                        glassDistortion={0}
                        metalness={1}
                        roughness={0.75}
                        displacementStrength={0}
                        noiseScale={1}
                        specularConstant={5}
                        grayscale={0.15}
                        color="#ffffff"
                        title="IMAGINE YOU"
                        subtitle="ROSTER OPEN • TAP TO ACTIVATE CAMERA"
                      />
                    </div>
                  </div>
                )}

                {/* CASE 2: 5 IMAGES (1 BIG LEFT [col-4] + 4 IN 2x2 ASYMMETRICAL MIDDLE [col-5] + 1 BIG CAMERA RIGHT [col-3]) */}
                {totalPlayerImages === 5 && activeRoster.captain && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4.5 w-full h-full min-h-0">
                    {/* 1 Big Player Card (Left - Standard Col 4) */}
                    <div className="md:col-span-4 lg:col-span-4 relative rounded-2xl md:rounded-[24px] overflow-hidden bg-[#121214] border border-white/10 flex flex-col justify-between p-4 sm:p-5 lg:p-6 group h-full">
                      <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden min-h-0">
                        <img
                          src={activeRoster.captain.image}
                          alt={activeRoster.captain.ign}
                          className="h-full w-auto max-w-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="shrink-0 w-full text-center pt-3">
                        <h3
                          style={{ fontFamily: 'var(--font-unbounded), Georgia, serif' }}
                          className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-wider uppercase leading-none"
                        >
                          {activeRoster.captain.ign}
                        </h3>
                        <p className="text-[10px] font-mono text-white/50 tracking-wider uppercase mt-1">
                          {activeRoster.captain.role}
                        </p>
                      </div>
                    </div>

                    {/* 4 Cards in 2x2 (Asymmetrical Heights - Col 5) */}
                    <div className="md:col-span-5 lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4.5 h-full min-h-0">
                      {/* Column 1 (Top taller, Bottom shorter) */}
                      <div className="flex flex-col gap-3 sm:gap-4.5 h-full min-h-0">
                        {activeRoster.squad[0] && (
                          <div className="flex-[1.25] min-h-0 relative rounded-xl sm:rounded-[20px] overflow-hidden bg-[#121214] border border-white/10 flex flex-col justify-between p-3 sm:p-3.5 group">
                            <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden min-h-0">
                              <img
                                src={activeRoster.squad[0].image}
                                alt={activeRoster.squad[0].ign}
                                className="h-full w-auto max-w-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="shrink-0 w-full text-center pt-1.5">
                              <h4
                                style={{ fontFamily: 'var(--font-unbounded), Georgia, serif' }}
                                className="text-xs sm:text-sm lg:text-base font-black text-white tracking-wider uppercase leading-none"
                              >
                                {activeRoster.squad[0].ign}
                              </h4>
                            </div>
                          </div>
                        )}
                        {activeRoster.squad[1] && (
                          <div className="flex-[0.85] min-h-0 relative rounded-xl sm:rounded-[20px] overflow-hidden bg-[#121214] border border-white/10 flex flex-col justify-between p-2.5 sm:p-3 group">
                            <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden min-h-0">
                              <img
                                src={activeRoster.squad[1].image}
                                alt={activeRoster.squad[1].ign}
                                className="h-full w-auto max-w-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="shrink-0 w-full text-center pt-1">
                              <h4
                                style={{ fontFamily: 'var(--font-unbounded), Georgia, serif' }}
                                className="text-xs sm:text-sm font-black text-white tracking-wider uppercase leading-none"
                              >
                                {activeRoster.squad[1].ign}
                              </h4>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Column 2 (Top shorter, Bottom taller) */}
                      <div className="flex flex-col gap-3 sm:gap-4.5 h-full min-h-0">
                        {activeRoster.squad[2] && (
                          <div className="flex-[0.85] min-h-0 relative rounded-xl sm:rounded-[20px] overflow-hidden bg-[#121214] border border-white/10 flex flex-col justify-between p-2.5 sm:p-3 group">
                            <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden min-h-0">
                              <img
                                src={activeRoster.squad[2].image}
                                alt={activeRoster.squad[2].ign}
                                className="h-full w-auto max-w-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="shrink-0 w-full text-center pt-1">
                              <h4
                                style={{ fontFamily: 'var(--font-unbounded), Georgia, serif' }}
                                className="text-xs sm:text-sm font-black text-white tracking-wider uppercase leading-none"
                              >
                                {activeRoster.squad[2].ign}
                              </h4>
                            </div>
                          </div>
                        )}
                        {activeRoster.squad[3] && (
                          <div className="flex-[1.25] min-h-0 relative rounded-xl sm:rounded-[20px] overflow-hidden bg-[#121214] border border-white/10 flex flex-col justify-between p-3 sm:p-3.5 group">
                            <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden min-h-0">
                              <img
                                src={activeRoster.squad[3].image}
                                alt={activeRoster.squad[3].ign}
                                className="h-full w-auto max-w-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="shrink-0 w-full text-center pt-1.5">
                              <h4
                                style={{ fontFamily: 'var(--font-unbounded), Georgia, serif' }}
                                className="text-xs sm:text-sm lg:text-base font-black text-white tracking-wider uppercase leading-none"
                              >
                                {activeRoster.squad[3].ign}
                              </h4>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 1 Big Camera Card (Right - Col 3) */}
                    <div className="md:col-span-3 lg:col-span-3 relative rounded-2xl md:rounded-[24px] overflow-hidden h-full min-h-0">
                      <ReflectiveCard
                        overlayColor="rgba(0, 0, 0, 0.2)"
                        blurStrength={0}
                        glassDistortion={0}
                        metalness={1}
                        roughness={0.75}
                        displacementStrength={0}
                        noiseScale={1}
                        specularConstant={5}
                        grayscale={0.15}
                        color="#ffffff"
                        title="IMAGINE YOU"
                        subtitle="6TH MAN SPOT • TAP TO TURN ON"
                      />
                    </div>
                  </div>
                )}

                {/* CASE 3: FEWER THAN 5 IMAGES (1 BIG LEFT + SQUAD & SINGLE CAMERA CARD IN RIGHT GRID) */}
                {totalPlayerImages > 0 && totalPlayerImages < 5 && activeRoster.captain && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4.5 w-full h-full min-h-0">
                    {/* 1 Big Hero Player Card (Left) */}
                    <div className="md:col-span-4 lg:col-span-4 relative rounded-2xl md:rounded-[24px] overflow-hidden bg-[#121214] border border-white/10 flex flex-col justify-between p-4 sm:p-5 lg:p-6 group h-full">
                      <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden min-h-0">
                        <img
                          src={activeRoster.captain.image}
                          alt={activeRoster.captain.ign}
                          className="h-full w-auto max-w-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="shrink-0 w-full text-center pt-3">
                        <h3
                          style={{ fontFamily: 'var(--font-unbounded), Georgia, serif' }}
                          className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-wider uppercase leading-none"
                        >
                          {activeRoster.captain.ign}
                        </h3>
                        <p className="text-xs font-mono text-white/50 tracking-wider uppercase mt-1">
                          {activeRoster.captain.role}
                        </p>
                      </div>
                    </div>

                    {/* Right Grid (Squad Members + 1 Single Camera Card) */}
                    <div className="md:col-span-8 lg:col-span-8 grid grid-cols-2 gap-3 sm:gap-4.5 h-full min-h-0">
                      {activeRoster.squad.map((player) => (
                        <div
                          key={player.id}
                          className="relative rounded-xl sm:rounded-[20px] overflow-hidden bg-[#121214] border border-white/10 flex flex-col justify-between p-3 sm:p-4 group h-full min-h-0"
                        >
                          <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden min-h-0">
                            <img
                              src={player.image}
                              alt={player.ign}
                              className="h-full w-auto max-w-full object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="shrink-0 w-full text-center pt-2">
                            <h4
                              style={{ fontFamily: 'var(--font-unbounded), Georgia, serif' }}
                              className="text-sm sm:text-base lg:text-lg font-black text-white tracking-wider uppercase leading-none"
                            >
                              {player.ign}
                            </h4>
                          </div>
                        </div>
                      ))}

                      {/* Single Camera Card ("Imagine You") */}
                      <div className="relative rounded-xl sm:rounded-[20px] overflow-hidden h-full min-h-0">
                        <ReflectiveCard
                          overlayColor="rgba(0, 0, 0, 0.2)"
                          blurStrength={0}
                          glassDistortion={0}
                          metalness={1}
                          roughness={0.75}
                          displacementStrength={0}
                          noiseScale={1}
                          specularConstant={5}
                          grayscale={0.15}
                          color="#ffffff"
                          title="IMAGINE YOU"
                          subtitle="ROSTER SPOT • TAP TO TURN ON"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile Bottom Game Navbar */}
        <div className="md:hidden relative z-30 w-full flex items-center justify-center pt-2 pb-1 shrink-0">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-900/90 border border-white/20 backdrop-blur-xl">
            {rosters.map((game) => {
              const isSelected = game.id === selectedGame;
              return (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  className={`relative rounded-full transition-all duration-300 cursor-pointer ${isSelected ? 'scale-110 opacity-100 ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-40 hover:opacity-100'
                    }`}
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-black p-0.5 flex items-center justify-center">
                    <img
                      src={game.logo}
                      alt={game.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
