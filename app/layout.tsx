import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://glennesports.app'),
  title: {
    default: "GLENN - India's Ultimate Free Fire Esports Platform | Tournaments, Leaderboards & Community",
    template: "%s | GLENN Esports"
  },
  description: "GLENN is India's premier Free Fire esports platform offering daily tournaments, global leaderboards, player profiles, squad chat, gameplay highlights, and real rewards. Join thousands of competitive gamers, climb rankings, earn prizes, and dominate the battlefield.",
  keywords: [
    // Core Brand Terms
    "GLENN", "GLENN esports", "GLENN app", "GLENN gaming", "GLENN India",
    
    // Free Fire Esports
    "Free Fire esports", "Free Fire tournaments", "Free Fire India", "FF esports", "Free Fire competitive",
    "Free Fire championship", "Free Fire battle royale", "Free Fire MAX esports", "Free Fire MAX tournaments",
    "Garena Free Fire", "Free Fire mobile esports", "Free Fire India league", "Free Fire pro league",
    
    // Tournament Related
    "esports tournaments India", "mobile gaming tournaments", "online gaming tournaments", "daily tournaments",
    "Free Fire tournament app", "tournament platform India", "esports competition", "gaming competition India",
    "Free Fire scrims", "custom rooms Free Fire", "Free Fire ranked matches", "competitive matches",
    "Free Fire squad tournaments", "solo tournaments", "duo tournaments", "weekly tournaments",
    
    // Gaming Platform
    "esports platform India", "gaming platform", "mobile esports platform", "competitive gaming platform",
    "Indian esports app", "gaming app India", "esports community app", "tournament organizer app",
    
    // Leaderboards & Rankings
    "Free Fire leaderboard", "esports leaderboard", "gaming rankings", "player rankings India",
    "Free Fire stats", "competitive rankings", "global leaderboard", "India gaming leaderboard",
    "KD ratio tracker", "performance stats", "player statistics", "match history",
    
    // Community Features
    "gaming community India", "Free Fire community", "esports community", "gamer social network",
    "gaming chat app", "squad finder", "team finder Free Fire", "clan recruitment",
    "gaming friends", "player networking", "Free Fire squad", "gaming squad",
    
    // Rewards & Earnings
    "earn from gaming", "esports rewards", "gaming prizes India", "tournament prizes",
    "Free Fire rewards", "gaming coins", "esports earnings", "win prizes gaming",
    "cash tournaments", "gaming rewards app", "earn money gaming",
    
    // Player Features
    "player profile", "gaming profile", "esports profile", "Free Fire ID",
    "player stats", "achievement badges", "gaming achievements", "skill showcase",
    
    // Indian Gaming
    "Indian esports", "India gaming", "Indian gamers", "Bharat esports",
    "mobile gaming India", "competitive gaming India", "Indian gaming community",
    
    // Mobile Gaming
    "mobile esports", "mobile gaming", "Android gaming", "mobile battle royale",
    "smartphone gaming", "mobile multiplayer", "competitive mobile gaming",
    
    // Skill & Competition
    "skill-based matchmaking", "competitive matchmaking", "ranked gaming", "pro gaming",
    "esports skills", "gaming skills", "competitive player", "pro player India",
    
    // Social & Content
    "gaming highlights", "gameplay clips", "esports content", "gaming feed",
    "share gameplay", "gaming posts", "esports moments", "clutch moments",
    
    // Download & Access
    "download GLENN", "GLENN APK", "gaming app download", "esports app download",
    "Free Fire app", "tournament app download",
    
    // General Gaming Terms
    "battle royale", "multiplayer gaming", "online gaming India", "mobile games",
    "competitive shooter", "tactical shooter", "team gaming", "squad play"
  ],
  authors: [{ name: "GLENN Esports" }],
  creator: "GLENN Esports",
  publisher: "GLENN Esports",
  applicationName: "GLENN",
  category: "Gaming",
  classification: "Esports Gaming Platform",
  
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://glennesports.app",
    siteName: "GLENN Esports",
    title: "GLENN - India's Ultimate Free Fire Esports Platform",
    description: "Join India's premier Free Fire esports community. Compete in daily tournaments, climb leaderboards, connect with players, and earn real rewards.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "GLENN - Free Fire Esports Platform"
      }
    ]
  },
  
  twitter: {
    card: "summary_large_image",
    title: "GLENN - India's Ultimate Free Fire Esports Platform",
    description: "Join daily tournaments, climb leaderboards, and earn rewards on India's premier Free Fire esports platform.",
    images: ["/logo.png"],
    creator: "@glennesports7"
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: "https://glennesports.app",
    languages: {
      'en-IN': 'https://glennesports.app',
      'hi-IN': 'https://glennesports.app/hi',
    },
  },
  
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'application-name': 'GLENN Esports',
    'msapplication-TileColor': '#c8ff00',
    'theme-color': '#000000',
  }
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
      "priceCurrency": "INR"
    },
    "description": "India's premier Free Fire esports platform offering daily tournaments, global leaderboards, player profiles, squad chat, gameplay highlights, and real rewards.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "15000"
    },
    "author": {
      "@type": "Organization",
      "name": "GLENN Esports",
      "url": "https://glennesports.app"
    }
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GLENN Esports",
    "alternateName": "GLENN",
    "url": "https://glennesports.app",
    "logo": "https://glennesports.app/logos.svg",
    "sameAs": [
      "https://www.instagram.com/glennesports7",
      "https://whatsapp.com/channel/0029VbCEtxY3mFY4yhChto3h"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script defer data-tracker="db35212a-244c-4c3a-a04f-03d525b61d39" data-hosts="glennesports.app" src="https://www.webtracky.com/analytics.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased min-h-screen flex items-center justify-center`}
      >
        {children}
      </body>
    </html>
  );
}
