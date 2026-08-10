import Hero from "@/components/hero";
import Stats from "@/components/stats";
import Features from "@/components/features";
import Utility from "@/components/utility";
import Tokenomics from "@/components/tokenomics";
import Roadmap from "@/components/roadmap";
import Community from "@/components/community";
import CtaSection from "@/components/cta-section";
import EarlySignup from "@/components/early-signup";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Utility />
      <Tokenomics />
      <Roadmap />
      <Community />
      <EarlySignup />
      <CtaSection />
    </>
  );
}
