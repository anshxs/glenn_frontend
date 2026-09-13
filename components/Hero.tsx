'use client';

import React from 'react';
import Grainient from './Grainient';
import { Android } from './ui/android';
import { Iphone } from './ui/iphone';

const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden font-sans flex flex-col">
      <header className="shrink-0 relative z-10 flex items-center justify-between px-6 pt-8 pb-4 lg:px-8 lg:py-6 mx-auto w-full">
        <div className="flex items-center cursor-pointer group">
          <img src="/logos.svg" className='w-18 invert' alt="Logo" />
        </div>

        <div className="w-24 flex items-center justify-center">
          <img
            src="https://thesvg.org/icons/google-play/wordmark.svg"
            alt="Google Play"
          />
        </div>
      </header>

      {/* Curved rectangle hero container with side + bottom margins taking remaining screen height */}
      <div className="relative mx-4 lg:mx-8 mb-6 lg:mb-8 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 flex-1 flex flex-col justify-between shadow-2xl">
        {/* Grainient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Grainient
            color1="#FF9FFC"
            color2="#5227FF"
            color3="#B497CF"
            timeSpeed={3}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>

        {/* Foreground Content */}
        <main className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-start lg:justify-between gap-4 lg:gap-8 px-6 pt-10 sm:pt-8 lg:px-16 lg:pt-12 w-full h-full flex-1">
          <div className="flex-none lg:flex-1 w-full flex flex-col items-start text-left gap-3 sm:gap-5 lg:pr-8 self-start lg:self-center z-20">
            {/* Tagline above headline */}
            <div className="flex items-center gap-2 text-black/90 font-bold text-xs sm:text-sm tracking-wide uppercase select-none">
              <span className="w-4 sm:w-5 h-[2.5px] bg-black inline-block rounded-full" />
              <span>Reimagining the World of Gaming</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
              className="text-[2.2rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] xl:text-[5.6rem] font-black text-black tracking-[-0.04em] leading-[0.92] select-none flex flex-col items-start text-left"
            >
              <span>where the</span>
              <span className="inline-block sm:my-2 sm:-rotate-2 sm:border-4 sm:border-black sm:rounded-2xl md:rounded-[1.3rem] sm:bg-[#FF3823] sm:px-5 sm:py-1 sm:shadow-[7px_7px_0px_#000] text-black">
                squad
              </span>
              <span>lives</span>
            </h1>

            {/* Google Play Download Button */}
            <div className="mt-1 sm:mt-2">
              <button className="flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000] transition-all cursor-pointer">
                <img
                  src="https://thesvg.org/icons/google-play/wordmark.svg"
                  alt="Google Play"
                  className="h-5 sm:h-7 w-auto"
                />
              </button>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="flex-1 flex justify-center lg:justify-end items-start lg:items-end w-full relative self-center lg:self-end mt-1 sm:mt-2 lg:mt-0">
            <div className="translate-y-[2%] sm:translate-y-[25%] lg:translate-y-[44%] flex justify-center items-end w-full">
              <Iphone
                className="w-[320px] xs:w-[350px] sm:w-95 md:w-110 lg:w-115 xl:w-125 h-auto max-w-full"
                src="/app/home.png"
              />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Hero;
