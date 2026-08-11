import type { Metadata } from "next";
import React from "react";
import { Syne, Inter } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rarecoin.io"),
  title: {
    default: "Rarecoin (RARE) — Fair-Launch Token on Proof, Solana",
    template: "%s | Rarecoin (RARE) on Proof",
  },
  description:
    "Rarecoin (RARE) is a fixed-supply, fair-launch SPL token on Solana, launched through Proof's bonding curve  no presale, no team allocation, 100% public from the first trade.",
  keywords: ["Rarecoin", "RARE token", "Rarecoin Proof", "Rarecoin fair launch", "RARE Solana", "Proof bonding curve", "fair launch token", "community token", "SPL token"],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Rarecoin" }],
  creator: "Rarecoin",
  icons: {
    icon: "/rarecoin.svg",
    shortcut: "/rarecoin.svg",
    apple: "/rarecoin.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rarecoin.io",
    siteName: "Rarecoin",
    title: "Rarecoin (RARE) — Own the Rare. Shape the Future.",
    description:
      "A fixed-supply, community-first token on Solana, launched fairly through Proof. No presale, no team allocation — 100% public from the first trade.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rarecoin (RARE) — Own the Rare. Shape the Future.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rarecoin (RARE) — Own the Rare. Shape the Future.",
    description:
      "A fixed-supply, community-first token on Solana, launched fairly through Proof. No presale, no team allocation — 100% public from the first trade.",
    images: ["/og-image.png"],
    creator: "@TherealRarecoin",
    site: "@TherealRarecoin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rarecoin",
  alternateName: "RARE",
  url: "https://rarecoin.io",
  logo: "https://rarecoin.io/rarecoin.svg",
  description:
    "Rarecoin (RARE) is a fixed-supply, fair-launch SPL token on Solana, launched through Proof's bonding curve.",
  sameAs: ["https://x.com/TherealRarecoin"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F6FB] overflow-x-hidden" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Nav />
        <BackToTop />
        {children}
        <Footer />
      </body>
    </html>
  );
}
