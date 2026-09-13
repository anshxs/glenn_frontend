'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Camera, Sparkles, X } from 'lucide-react';

interface ReflectiveCardProps {
  blurStrength?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  overlayColor?: string;
  displacementStrength?: number;
  noiseScale?: number;
  specularConstant?: number;
  grayscale?: number;
  glassDistortion?: number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  subtitle?: string;
}

const ReflectiveCard: React.FC<ReflectiveCardProps> = ({
  blurStrength = 0,
  color = '#ffffff',
  metalness = 1,
  roughness = 0.75,
  overlayColor = 'rgba(0, 0, 0, 0.2)',
  displacementStrength = 0,
  noiseScale = 1,
  specularConstant = 5,
  grayscale = 0.15,
  glassDistortion = 0,
  className = '',
  style = {},
  title = 'IMAGINE YOU',
  subtitle = 'TAP TO ACTIVATE CAMERA',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };

  const startStream = async () => {
    try {
      if (!navigator?.mediaDevices?.getUserMedia) return;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreamActive(true);
      }
    } catch (err) {
      console.warn('Webcam access error:', err);
      setCameraActive(false);
    }
  };

  useEffect(() => {
    if (cameraActive) {
      startStream();
    } else {
      stopStream();
    }

    return () => {
      stopStream();
    };
  }, [cameraActive]);

  // Turn off camera if scrolled out of view
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting && cameraActive) {
          setCameraActive(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [cameraActive]);

  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  const cssVariables = {
    '--blur-strength': `${blurStrength}px`,
    '--metalness': metalness,
    '--roughness': roughness,
    '--overlay-color': overlayColor,
    '--text-color': color,
    '--saturation': saturation,
  } as React.CSSProperties;

  const hasDisplacement = displacementStrength > 0 || glassDistortion > 0;

  return (
    <div
      ref={cardRef}
      className={`relative w-full h-full min-h-[160px] rounded-xl sm:rounded-[20px] overflow-hidden bg-[#121214] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] isolate font-sans select-none flex flex-col justify-between ${className}`}
      style={{ ...style, ...cssVariables }}
    >
      {hasDisplacement && (
        <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
          <defs>
            <filter id="metallic-displacement" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="turbulence" baseFrequency={baseFrequency} numOctaves="2" result="noise" />
              <feColorMatrix in="noise" type="luminanceToAlpha" result="noiseAlpha" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={displacementStrength}
                xChannelSelector="R"
                yChannelSelector="G"
                result="rippled"
              />
              <feSpecularLighting
                in="noiseAlpha"
                surfaceScale={displacementStrength}
                specularConstant={specularConstant}
                specularExponent="20"
                lightingColor="#ffffff"
                result="light"
              >
                <fePointLight x="0" y="0" z="300" />
              </feSpecularLighting>
              <feComposite in="light" in2="rippled" operator="in" result="light-effect" />
              <feBlend in="light-effect" in2="rippled" mode="screen" result="metallic-result" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="solidAlpha"
              />
              <feMorphology in="solidAlpha" operator="erode" radius="45" result="erodedAlpha" />
              <feGaussianBlur in="erodedAlpha" stdDeviation="10" result="blurredMap" />
              <feComponentTransfer in="blurredMap" result="glassMap">
                <feFuncA type="linear" slope="0.5" intercept="0" />
              </feComponentTransfer>
              <feDisplacementMap
                in="metallic-result"
                in2="glassMap"
                scale={glassDistortion}
                xChannelSelector="A"
                yChannelSelector="A"
                result="final"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* Live Video Camera Stream - Flipped (Selfie Mirror) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute top-0 left-0 w-full h-full object-cover scale-[1.15] -scale-x-100 z-0 transition-opacity duration-500 pointer-events-none ${
          streamActive ? 'opacity-95' : 'opacity-0'
        }`}
        style={{
          filter: `saturate(var(--saturation, 0.85)) contrast(115%) brightness(105%) blur(var(--blur-strength, 0px)) ${
            hasDisplacement ? 'url(#metallic-displacement)' : ''
          }`,
        }}
      />

      {/* Interactive Trigger When Camera is OFF */}
      {!cameraActive && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center cursor-pointer group bg-gradient-to-br from-[#161619] via-[#0f0f12] to-[#09090b] hover:from-[#1c1c22] transition-colors"
             onClick={() => setCameraActive(true)}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
            <Camera className="w-6 h-6 text-white group-hover:text-amber-400 transition-colors" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span
              style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
              className="text-xs sm:text-sm font-black text-white uppercase tracking-wider"
            >
              {title}
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-white/50 tracking-wider uppercase group-hover:text-white/80 transition-colors">
            {subtitle}
          </span>
        </div>
      )}

      {/* Close Camera Button When ON */}
      {cameraActive && (
        <div className="relative z-30 w-full flex justify-end p-2.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCameraActive(false);
            }}
            className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 transition-colors cursor-pointer"
            title="Turn Off Camera"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-10 opacity-[var(--roughness,0.75)] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%20200%20200%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cfilter%20id%3D%27noiseFilter%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.8%27%20numOctaves%3D%273%27%20stitchTiles%3D%27stitch%27%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20filter%3D%27url(%23noiseFilter)%27%2F%3E%3C%2Fsvg%3E')] mix-blend-overlay" />

      {/* Metallic Gradient Highlight */}
      <div className="absolute inset-0 z-20 bg-[linear-gradient(135deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.06)_40%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.06)_60%,rgba(255,255,255,0.2)_100%)] pointer-events-none mix-blend-overlay opacity-[var(--metalness,1)]" />

      {/* Card Darkening Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[var(--overlay-color,rgba(0,0,0,0.2))]" />
    </div>
  );
};

export default ReflectiveCard;
