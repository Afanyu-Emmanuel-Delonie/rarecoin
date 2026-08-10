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
      className="relative min-h-[600px] md:min-h-[780px] lg:h-screen xl:min-h-[800px] 2xl:min-h-[820px] overflow-hidden bg-[#F4F6FB] flex flex-col justify-center"
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
        data-parallax="0.12"
        className="pointer-events-none absolute right-0 top-0 h-105 w-105 translate-x-1/4 -translate-y-1/4 rounded-full sm:h-150 sm:w-150 xl:h-190 xl:w-190"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.10) 0%, transparent 68%)" }}
      />
      {/* Bottom fade into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #F4F6FB 100%)" }}
      />

      {/* Ambient spot — left-bottom */}
      <div
        data-parallax="0.08"
        className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 -translate-x-1/3 translate-y-1/3 rounded-full sm:h-110 sm:w-110 xl:h-140 xl:w-140"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.07) 0%, transparent 68%)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-5 py-16 text-center sm:gap-6 sm:px-6 sm:py-20 md:py-28 lg:max-w-5xl lg:gap-7 lg:px-10 lg:py-32 xl:max-w-6xl xl:px-16 xl:py-40">

        <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-[#0b0c12] sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl xl:text-8xl">
          <span className="hero-word block">Own the Rare.</span>
          <span className="hero-word block text-[#0f3f93]">
            Shape the Future.
          </span>
        </h1>

        <p className="hero-sub max-w-sm text-sm leading-relaxed text-[#0b0c12]/55 sm:max-w-xl sm:text-base md:text-lg lg:max-w-2xl">
          A fixed-supply, community-first token on Solana. No presale, no team
          allocation 100% public from the first trade.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/join"
            className="hero-cta group inline-flex items-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3"
          >
            Join RARE Early
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/docs"
            className="hero-cta inline-flex items-center gap-2 rounded-full border border-[#3355ff]/25 bg-[#3355ff]/6 px-6 py-3 text-sm font-semibold text-[#0f3f93] transition-all hover:border-[#3355ff]/50 hover:bg-[#3355ff]/12"
          >
            White Paper
          </Link>
        </div>
      </div>
    </section>
  );
}
