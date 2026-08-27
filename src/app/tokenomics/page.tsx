import Tokenomics from "@/components/tokenomics";
import PageHero from "@/components/page-hero";

export default function TokenomicsPage() {
  return (
    <div className="bg-[#08090D]">
      <PageHero>
        <h1 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-6xl">
          <span className="page-hero-word block">Nothing hidden</span>
          <span className="page-hero-word block text-[#D4AF37]">in the numbers.</span>
        </h1>
        <p className="page-hero-sub max-w-sm text-sm leading-relaxed text-white/45 sm:max-w-xl sm:text-base md:text-lg lg:max-w-2xl">
          No allocation pools, no vesting cliffs, no team tranche. Every RARE token enters circulation the same way, through the public bonding curve on Proof.
        </p>
      </PageHero>
      <Tokenomics />
    </div>
  );
}
