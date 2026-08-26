"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-word", { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.12 });
      tl.fromTo(".hero-sub",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      tl.fromTo(".hero-cta",  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-140 md:min-h-160 overflow-hidden bg-[#08090D] flex flex-col justify-center"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.05) 0%, transparent 100%)" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-5 px-5 py-20 text-center sm:gap-6 sm:px-6 sm:py-24 md:py-28 lg:gap-7 lg:px-10">

        <h1 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-6xl">
          <span className="hero-word block">Own the Rare.</span>
          <span className="hero-word block text-[#D4AF37]">Shape the Future.</span>
        </h1>

        <p className="hero-sub max-w-sm text-sm leading-relaxed text-white/45 sm:max-w-xl sm:text-base md:text-lg lg:max-w-2xl">
          A fixed-supply, community-first token on Solana. No presale, no team allocation 100% public from the first trade.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
              href="/get-rare"
              className="hero-cta group inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#08090D] transition-all hover:bg-[#F0D77A] hover:gap-3"
          >
            Get RARE
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
              href="#find-us"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/30 hover:bg-white/10"
          >
            Join the Community
          </Link>
        </div>
      </div>
    </section>
  );
}
