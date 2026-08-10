import type { Metadata } from "next";
import Utility from "@/components/utility";
import PageHero from "@/components/page-hero";
import CtaSection from "@/components/cta-section";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Utility",
  description:
    "How RARE gets used, not just held: five utility cases on Proof and Solana — signaling, tipping, contributing, and earning rewards without a custom smart contract.",
  alternates: { canonical: "/utility" },
};

export default function UtilityPage() {
  return (
    <div className="bg-[#F4F6FB]">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Utility", path: "/utility" }]} />
      <PageHero
        eyebrow="Utility"
        title="Built to be used,<br/>not just held."
        sub="Five utility cases, all working without a custom smart contract — available from day one or shortly after launch."
        dark={false}
      />
      <Utility />
      <CtaSection />
    </div>
  );
}
