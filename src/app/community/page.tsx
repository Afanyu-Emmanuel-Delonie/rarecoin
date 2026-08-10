import type { Metadata } from "next";
import Community from "@/components/community";
import PageHero from "@/components/page-hero";
import CtaSection from "@/components/cta-section";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Rarecoin is a community-owned token on Solana — membership tiers, ambassador rewards, and signal-based governance built around the people who show up.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  return (
    <div className="bg-[#0b0c12]">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Community", path: "/community" }]} />
      <PageHero
        eyebrow="Community"
        title="The community<br/>is the product."
        sub="No marketing budget carved out at launch. Growth comes from the people who show up — and they get rewarded for it."
      />
      <Community />
      <CtaSection />
    </div>
  );
}
