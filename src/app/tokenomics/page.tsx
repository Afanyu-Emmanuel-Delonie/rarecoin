import type { Metadata } from "next";
import Tokenomics from "@/components/tokenomics";
import PageHero from "@/components/page-hero";
import CtaSection from "@/components/cta-section";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Tokenomics",
  description:
    "Rarecoin (RARE) tokenomics: a hard-capped 1,000,000,000 RARE supply, no allocation pools, no vesting cliffs, no team tranche — every token enters circulation through Proof's public bonding curve.",
  alternates: { canonical: "/tokenomics" },
};

export default function TokenomicsPage() {
  return (
    <div className="bg-[#0b0c12]">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Tokenomics", path: "/tokenomics" }]} />
      <PageHero
        eyebrow="Tokenomics"
        title="Nothing hidden<br/>in the numbers."
        sub="No allocation pools, no vesting cliffs, no team tranche. Every RARE token enters circulation through the public bonding curve."
      />
      <Tokenomics />
      <CtaSection />
    </div>
  );
}
