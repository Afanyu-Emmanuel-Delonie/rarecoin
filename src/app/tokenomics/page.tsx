import Tokenomics from "@/components/tokenomics";
import PageHero from "@/components/page-hero";
import CtaSection from "@/components/cta-section";

export default function TokenomicsPage() {
  return (
    <div className="bg-[#0b0c12]">
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
