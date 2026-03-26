import Image from "next/image";

const cards = [
  {
    src: "/5.png",
    alt: "GLENN player profile preview",
    className:
      "left-0 top-16 z-10 rotate-[-10deg] sm:left-8 sm:top-10 lg:left-12",
  },
  {
    src: "/home.png",
    alt: "GLENN home feed preview",
    className: "left-1/2 top-0 z-30 -translate-x-1/2",
  },
  {
    src: "/6.png",
    alt: "GLENN social feed preview",
    className:
      "right-0 top-16 z-20 rotate-[10deg] sm:right-8 sm:top-10 lg:right-12",
  },
];

export function StackedHeroShowcase() {
  return (
    <div className="relative mx-auto h-[27rem] w-full max-w-4xl sm:h-[30rem] lg:h-[39rem]">
      <div className="absolute inset-x-10 bottom-2 h-28 rounded-full bg-[#c8ff00]/[0.18] blur-3xl sm:h-32" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#ffffff00] to-transparent" />

      <div className="glass-panel absolute left-1/2 top-4 h-[90%] w-[92%] max-w-5xl -translate-x-1/2 rounded-[2.5rem] bg-white/[0.03]" />

      {cards.map((card) => (
        <div
          key={card.src}
          className={`glass-panel absolute h-[21rem] w-[10rem] overflow-hidden rounded-[1.8rem] bg-[#0c0c0c] sm:h-[24rem] sm:w-[12rem] lg:h-[32rem] lg:w-[16rem] ${card.className}`}
        >
          <Image
            src={card.src}
            alt={card.alt}
            fill
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 256px"
            className="object-cover object-top"
            priority
          />
        </div>
      ))}

      {/* <div className="glass-panel absolute left-[6%] top-10 hidden rounded-full bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:block">
        Squad Ready
      </div>
      <div className="glass-panel absolute bottom-12 right-[8%] hidden rounded-full bg-[#c8ff00]/[0.16] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e7ff9f] sm:block">
        Real Rewards
      </div> */}
    </div>
  );
}
