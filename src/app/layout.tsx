import type { Metadata } from "next";
import React from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F6FB]">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
