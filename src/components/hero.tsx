import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/page-hero";

export default function Hero() {
  return (
    <PageHero>
      <h1 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-6xl">
        <span className="page-hero-word block">Own the Rare.</span>
        <span className="page-hero-word block text-[#D4AF37]">Shape the Future.</span>
      </h1>

      <p className="page-hero-sub max-w-sm text-sm leading-relaxed text-white/45 sm:max-w-xl sm:text-base md:text-lg lg:max-w-2xl">
        A fixed-supply, community-first token on Solana. No presale, no team allocation, 100% public from the first trade.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/get-rare"
          className="page-hero-cta group inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#08090D] transition-all hover:bg-[#F0D77A] hover:gap-3"
        >
          Get RARE
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="#find-us"
          className="page-hero-cta inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/30 hover:bg-white/10"
        >
          Join the Community
        </Link>
      </div>
    </PageHero>
  );
}
