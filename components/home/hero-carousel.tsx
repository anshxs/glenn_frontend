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
    src: "/1bn.png",
    alt: "Glenn Championship Cup Season 1",
    href: "https://glennesports.app/championships/s1",
  },
  {
    src: "/2bn.png",
    alt: "Glenn App Install",
    href: downloadHref,
  }
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
