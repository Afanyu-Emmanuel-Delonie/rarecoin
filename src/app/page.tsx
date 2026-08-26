import Hero from "@/components/hero";
import Stats from "@/components/stats";
import Features from "@/components/features";
import Utility from "@/components/utility";
import CtaBand from "@/components/cta-band";
import Community from "@/components/community";
import CtaSection from "@/components/cta-section";
import ScrollAnimations from "@/components/scroll-animations";

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Hero />
      <Stats />
      <Features />
      <Utility />
      <CtaBand />
      <Community />
      <CtaSection />
    </>
  );
}
