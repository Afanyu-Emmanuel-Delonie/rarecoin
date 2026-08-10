import type { Metadata } from "next";
import React from "react";
import { Syne, Inter } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import ScrollAnimations from "@/components/scroll-animations";
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
  title: "Rarecoin — Own the Rare. Shape the Future.",
  description:
    "Rarecoin is a fixed-supply, fair-launch token on Solana — no presale, no team allocation, 100% public from the first trade.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F6FB]" suppressHydrationWarning>
        <Nav />
        <ScrollAnimations />
        {children}
        <Footer />
      </body>
    </html>
  );
}
