"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SplashScreen() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerStartedRef = useRef(false);
  const isInitialMount = useRef(true);

  // Trigger splash on initial mount and on every subsequent route/page change
  useEffect(() => {
    setVisible(true);
    setFadeOut(false);
    timerStartedRef.current = false;

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    const timer = setTimeout(() => {
      startDismiss();
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Lock body scroll while splash is active
    if (visible && !fadeOut) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible, fadeOut]);

  const startDismiss = () => {
    if (timerStartedRef.current) return;
    timerStartedRef.current = true;

    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
    }, 500); // 500ms smooth fade transition
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
        <video
          ref={videoRef}
          src="/splash.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
