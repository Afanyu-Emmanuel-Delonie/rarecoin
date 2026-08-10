import Community from "@/components/community";
import PageHero from "@/components/page-hero";
import CtaSection from "@/components/cta-section";

export default function CommunityPage() {
  return (
    <div className="bg-[#0b0c12]">
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
