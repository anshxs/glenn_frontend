"use client";

import { CreatorEmbed } from "@/components/home/creator-embed";

type Creator = {
  handle: string;
  href: string;
  blurb: string;
};

type CreatorsRailProps = {
  creators: Creator[];
};

export function CreatorsRail({ creators }: CreatorsRailProps) {
  if (creators.length <= 1) {
    return (
      <div className="mt-8 flex justify-start">
        {creators.map((creator) => (
          <div
            key={creator.handle}
            className="w-full max-w-[420px] min-w-0"
          >
            <CreatorEmbed
              handle={creator.handle}
              href={creator.href}
              blurb={creator.blurb}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 w-full overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex snap-x snap-mandatory gap-4 touch-pan-x">
        {creators.map((creator) => (
          <div
            key={creator.handle}
            className="w-[min(86vw,360px)] min-w-[min(86vw,360px)] snap-start sm:w-[28rem] sm:min-w-[28rem] lg:w-[30rem] lg:min-w-[30rem]"
          >
            <CreatorEmbed
              handle={creator.handle}
              href={creator.href}
              blurb={creator.blurb}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
