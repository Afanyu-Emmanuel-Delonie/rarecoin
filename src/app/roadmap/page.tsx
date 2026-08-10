import type { Metadata } from "next";
import Roadmap from "@/components/roadmap";
import PageHero from "@/components/page-hero";
import CtaSection from "@/components/cta-section";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Rarecoin's five-phase roadmap from fair launch on Proof through Solana DEX graduation, utility rollout, and long-term community growth.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  return (
    <div className="bg-[#F4F6FB]">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Roadmap", path: "/roadmap" }]} />
      <PageHero
        eyebrow="Roadmap"
        title="Five phases.<br/>One direction."
        sub="Actual timing depends on community activity and market conditions. Each phase is a stated intention, not a guarantee."
        dark={false}
      />
      <Roadmap />
      <CtaSection />
    </div>
  );
}
