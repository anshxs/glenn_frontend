"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShineBorder } from "@/components/ui/shine-border";

type InvestmentSummary = {
  totalInvested: number;
  teamExpenses: number;
  otherExpenses: number;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function useCountUp(target: number, startAnimation: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startAnimation) {
      setValue(0);
      return;
    }

    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [target, startAnimation, duration]);

  return value;
}

function StatCard({
  label,
  value,
  startAnimation,
  highlighted = false,
}: {
  label: string;
  value: number;
  startAnimation: boolean;
  highlighted?: boolean;
}) {
  const animatedValue = useCountUp(value, startAnimation);

  return (
    <div className="relative overflow-hidden border border-black/10 bg-[#191919] px-4 py-5 text-white">
      {highlighted ? (
        <ShineBorder
          borderWidth={1.5}
          duration={12}
          shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        />
      ) : null}
      <p className="text-xs uppercase tracking-[0.18em] text-white/55">{label}</p>
      <p className="mt-3 text-2xl font-normal uppercase sm:text-4xl">
        {formatCurrency(animatedValue)}
      </p>
    </div>
  );
}

export function InvestmentSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [summary, setSummary] = useState<InvestmentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    async function loadSummary() {
      try {
        const response = await fetch("/api/investment-summary", { cache: "no-store" });
        const data = (await response.json()) as Partial<InvestmentSummary> & { error?: string };

        if (!response.ok) {
          throw new Error(data.error || "Unable to load investment summary.");
        }

        setSummary({
          totalInvested: Number(data.totalInvested ?? 0),
          teamExpenses: Number(data.teamExpenses ?? 0),
          otherExpenses: Number(data.otherExpenses ?? 0),
        });
      } catch (loadError) {
        setError(
          loadError instanceof Error ? loadError.message : "Unable to load investment summary.",
        );
      } finally {
        setLoading(false);
      }
    }

    void loadSummary();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasEnteredView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  const cards = useMemo(
    () =>
      summary
        ? [
            { label: "Total Invested", value: summary.totalInvested },
            { label: "Spent On Teams", value: summary.teamExpenses },
            { label: "Other Expenses", value: summary.otherExpenses },
          ]
        : [],
    [summary],
  );

  return (
    <section
      ref={sectionRef}
      data-surface-tone="dark"
      className="-mx-6 mt-16 w-auto bg-black px-6 py-10 text-white sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
      style={{ fontFamily: '"Anton", sans-serif' }}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-white/55 sm:text-base">
        OUR INVESTMENT
      </p>
      <h2 className="mt-2 text-3xl font-normal uppercase tracking-[0.06em] sm:text-4xl lg:text-5xl">
        HOW WE{" "}
        <span className="text-transparent [-webkit-text-stroke:1.4px_rgba(255,255,255,0.95)]">
          BACK THE GRIND
        </span>
      </h2>

      {loading ? (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse border border-black/10 bg-black px-4 py-5">
              <div className="h-3 w-28 bg-white/15" />
              <div className="mt-4 h-8 w-40 bg-white/10" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mt-8 border border-white/12 px-4 py-5 text-sm text-white/60">
          {error}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              startAnimation={hasEnteredView}
              highlighted={card.label === "Total Invested"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
