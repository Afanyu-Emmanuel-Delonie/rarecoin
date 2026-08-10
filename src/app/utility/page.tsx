import Utility from "@/components/utility";
import PageHero from "@/components/page-hero";
import CtaSection from "@/components/cta-section";

export default function UtilityPage() {
  return (
    <div className="bg-[#F4F6FB]">
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
