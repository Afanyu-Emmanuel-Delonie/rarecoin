import Roadmap from "@/components/roadmap";
import PageHero from "@/components/page-hero";
import CtaSection from "@/components/cta-section";

export default function RoadmapPage() {
  return (
    <div className="bg-[#F4F6FB]">
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
