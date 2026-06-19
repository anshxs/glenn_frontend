"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

type CreatorEmbedProps = {
  href: string;
  handle: string;
  blurb: string;
};

export function CreatorEmbed({ href }: CreatorEmbedProps) {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]',
    ) as HTMLScriptElement | null;

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        window.instgrm?.Embeds?.process();
      };
      document.body.appendChild(script);
      return;
    }

    if (window.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <article className="overflow-hidden">
      <div className="overflow-hidden">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={href}
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: 0,
            borderRadius: "0px",
            boxShadow: "none",
            margin: 0,
            maxWidth: "100%",
            minWidth: "100%",
            padding: 0,
            width: "100%",
          }}
        >
          <div style={{ padding: 16 }}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#FFFFFF",
                color: "#3897f0",
                lineHeight: 0,
                padding: 0,
                textAlign: "center",
                textDecoration: "none",
                width: "100%",
                display: "block",
              }}
            >
              View this profile on Instagram
            </a>
          </div>
        </blockquote>
      </div>
    </article>
  );
}
