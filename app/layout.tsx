import type { Metadata, Viewport } from "next";
import { Caveat, Geist_Mono, Outfit, Unbounded } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["900"],
});

const caveat = Caveat({
  variable: "--font-calligraphy",
  subsets: ["latin"],
  weight: ["700"],
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.glennesports.app"),
  title: {
    default: "GLENN | Free Fire Esports Platform India",
    template: "%s | GLENN Esports",
  },
  description:
    "Join India's premier Free Fire esports platform. Compete in daily custom tournaments, climb live leaderboards, find pro squads, and win verified cash rewards.",
  keywords: [
    "GLENN",
    "GLENN esports",
    "GLENN app",
    "Free Fire esports",
    "Free Fire tournaments India",
    "Free Fire custom rooms",
    "Free Fire scrims India",
    "esports leaderboard India",
    "Free Fire squad finder",
    "gaming rewards app India",
    "competitive mobile gaming",
  ],
  authors: [{ name: "GLENN Esports", url: "https://www.glennesports.app" }],
  creator: "GLENN Esports",
  publisher: "GLENN Esports",
  applicationName: "GLENN",
  category: "Gaming",
  classification: "Esports Gaming Platform",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.glennesports.app",
    siteName: "GLENN Esports",
    title: "GLENN | Free Fire Esports Platform India",
    description:
      "Join India's premier Free Fire esports platform. Compete in daily custom tournaments, climb live leaderboards, find pro squads, and win real rewards.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "GLENN Esports Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "GLENN | Free Fire Esports Platform India",
    description:
      "Join daily custom tournaments, climb live leaderboards, and win real rewards on GLENN.",
    images: ["/logo.png"],
    creator: "@glennesports7",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.glennesports.app",
    languages: {
      "en-IN": "https://www.glennesports.app",
      "en": "https://www.glennesports.app",
      "hi-IN": "https://www.glennesports.app",
      "x-default": "https://www.glennesports.app",
    },
  },

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "GLENN Esports",
    "application-name": "GLENN Esports",
    "msapplication-TileColor": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GLENN",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
    },
    "description":
      "India's premier Free Fire esports platform offering daily custom tournaments, live leaderboards, player profiles, squad chat, and verified rewards.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "15000",
    },
    "author": {
      "@type": "Organization",
      "name": "GLENN Esports",
      "url": "https://www.glennesports.app",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GLENN Esports",
    "alternateName": "GLENN",
    "url": "https://www.glennesports.app",
    "logo": "https://www.glennesports.app/logo.png",
    "sameAs": [
      "https://www.instagram.com/glennesports7",
      "https://youtube.com/@glennesports7",
      "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h",
      "https://play.google.com/store/apps/details?id=com.absolute.glenn",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "hello@glennesports.app",
      "availableLanguage": ["English", "Hindi"],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is GLENN and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GLENN is India's dedicated Free Fire esports platform and gaming ecosystem. It allows players to discover competitive scrims, join daily tournaments, form pro squad lineups, and win verified rewards.",
        },
      },
      {
        "@type": "Question",
        "name": "How do I participate in daily Free Fire tournaments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Download the GLENN app from Google Play, create your profile, link your Free Fire UID, browse available daily tournament slots, and register with your squad.",
        },
      },
      {
        "@type": "Question",
        "name": "Are tournament prize rewards genuine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All GLENN tournaments feature verified prize distribution calculated automatically by official room referees and distributed directly to winning players.",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          defer
          data-tracker="db35212a-244c-4c3a-a04f-03d525b61d39"
          data-hosts="glennesports.app,www.glennesports.app"
          src="https://www.webtracky.com/analytics.js"
        />
      </head>
      <body
        className={`${geistMono.variable} ${outfit.variable} ${unbounded.variable} ${caveat.variable} min-h-screen w-full bg-[#000] text-white antialiased`}
        style={{ fontFamily: "var(--font-outfit), sans-serif" }}
      >
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
