"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const downloadHref =
  "https://github.com/anshsxa/glenn/releases/download/v1.0.0/Glenn.apk";

type CarouselSlide = {
  src: string;
  alt: string;
  href: string;
};

const slides: CarouselSlide[] = [
  {
    src: "https://revenantesports.com/api/assets/uploads/banners/1718524598CSRosterWebBanner.mov",
    alt: "Gaming setup with keyboard and neon lighting",
    href: "https://glennesports.app",
  },
  {
    src: "https://images.unsplash.com/photo-1525104698733-6a4d2a5f4f6a?auto=format&fit=crop&w=1600&q=80",
    alt: "Two people gaming together on a couch",
    href: "https://www.instagram.com/glennesports7",
  },
  {
    src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    alt: "Focused gamer wearing headphones at a desk",
    href: "https://glennesports.app",
  },
  {
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
    alt: "Gaming desk with a monitor and RGB lighting",
    href: "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h",
  },
  {
    src: "https://images.unsplash.com/photo-1538481199705-c7bddd2c2c6f?auto=format&fit=crop&w=1600&q=80",
    alt: "Colorful gaming room with neon lighting",
    href: downloadHref,
  },
  {
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
    alt: "Esports player concentrating during a match",
    href: "https://glennesports.app",
  },
  {
    src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
    alt: "Bright gaming room with monitors and RGB lights",
    href: "https://www.instagram.com/glennesports7",
  },
  {
    src: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1600&q=80",
    alt: "Laptop with a game on screen in a dark room",
    href: "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h",
  },
];

const loopSlides = [...slides, ...slides, ...slides];
const MIDDLE_OFFSET = slides.length;

function isVideoSource(src: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
}

export function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rawIndexRef = useRef(MIDDLE_OFFSET);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1);
  const [isReady, setIsReady] = useState(false);

  const scrollToRawIndex = useCallback(
    (rawIndex: number, behavior: ScrollBehavior = "smooth") => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      rawIndexRef.current = rawIndex;
      container.scrollTo({
        left: rawIndex * viewportWidth,
        behavior,
      });
    },
    [viewportWidth],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const width = container.clientWidth || 1;
      setViewportWidth(width);
      rawIndexRef.current = MIDDLE_OFFSET;
      setActiveIndex(0);
      container.scrollTo({ left: width * MIDDLE_OFFSET, behavior: "auto" });
      setIsReady(true);
    });

    const handleResize = () => {
      const width = container.clientWidth || 1;
      setViewportWidth(width);
      container.scrollTo({
        left: rawIndexRef.current * width,
        behavior: "auto",
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const timer = window.setInterval(() => {
      scrollToRawIndex(rawIndexRef.current + 1);
    }, 4200);

    return () => {
      window.clearInterval(timer);
    };
  }, [isReady, scrollToRawIndex, viewportWidth]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || !viewportWidth || !isReady) {
      return;
    }

    const rawIndex = Math.round(container.scrollLeft / viewportWidth);

    if (rawIndex < MIDDLE_OFFSET) {
      const adjustedIndex = rawIndex + MIDDLE_OFFSET;
      rawIndexRef.current = adjustedIndex;
      setActiveIndex(rawIndex);
      container.scrollTo({ left: adjustedIndex * viewportWidth, behavior: "auto" });
      return;
    }

    if (rawIndex >= MIDDLE_OFFSET * 2) {
      const adjustedIndex = rawIndex - MIDDLE_OFFSET;
      rawIndexRef.current = adjustedIndex;
      setActiveIndex(adjustedIndex - MIDDLE_OFFSET);
      container.scrollTo({ left: adjustedIndex * viewportWidth, behavior: "auto" });
      return;
    }

    rawIndexRef.current = rawIndex;
    setActiveIndex(rawIndex - MIDDLE_OFFSET);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    scrollToRawIndex(MIDDLE_OFFSET + index);
  };

  return (
    <section className="w-full py-6">
      <div className="relative w-full">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopSlides.map((slide, index) => (
            <a
              key={`${slide.src}-${index}`}
              href={slide.href}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              className="relative block min-w-full snap-center overflow-hidden aspect-video bg-black/5"
              aria-label={slide.alt}
            >
              {isVideoSource(slide.src) ? (
                <video
                  className="h-full w-full object-cover"
                  src={slide.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index < slides.length}
                />
              )}
            </a>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-7 bg-black" : "w-2.5 bg-black/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
