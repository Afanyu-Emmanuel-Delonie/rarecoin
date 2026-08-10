"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Zap, Shield, Users } from "lucide-react";
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
      className="relative min-h-screen overflow-hidden bg-[#F4F6FB] flex flex-col justify-center"
    >
      {/* Top-edge gradient band */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,63,147,0.08) 0%, rgba(15,63,147,0.03) 50%, transparent 100%)",
        }}
      />

      {/* Ambient spot — right */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/4 -translate-y-1/4 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.10) 0%, transparent 68%)" }}
      />
      {/* Bottom fade into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #F4F6FB 100%)" }}
      />

      {/* Ambient spot — left-bottom */}
      <div
        className="pointer-events-none absolute left-0 bottom-0 h-[440px] w-[440px] -translate-x-1/3 translate-y-1/3 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.07) 0%, transparent 68%)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-7 px-6 py-28 text-center md:py-36 lg:px-16">

        <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-[#0b0c12] md:text-6xl lg:text-7xl">
          <span className="hero-word block">Own the Rare.</span>
          <span className="hero-word block text-[#0f3f93]">
            Shape the Future.
          </span>
        </h1>

        <p className="hero-sub max-w-xl text-base leading-relaxed text-[#0b0c12]/55 md:text-lg">
          A fixed-supply, community-first token on Solana. No presale, no team
          allocation 100% public from the first trade.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/docs"
            className="hero-cta group inline-flex items-center gap-2 rounded-full  bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3"
          >
            Read White Paper
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/tokenomics"
            className="hero-cta inline-flex items-center gap-2 rounded-full border border-[#3355ff]/25 bg-[#3355ff]/6 px-6 py-3 text-sm font-semibold text-[#0f3f93] transition-all hover:border-[#3355ff]/50 hover:bg-[#3355ff]/12"
          >
            View Tokenomics
          </Link>
        </div>
      </div>
    </section>
  );
}
