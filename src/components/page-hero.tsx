"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { ReactNode } from "react";

export default function PageHero({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".page-hero-word", { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.12 });
      tl.fromTo(".page-hero-sub",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      tl.fromTo(".page-hero-cta",  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-[#08090D] flex flex-col justify-center ${compact ? "" : "sm:min-h-140 md:min-h-160"}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.05) 0%, transparent 100%)" }}
      />
      <div
        className={`relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-5 px-5 text-center sm:gap-6 sm:px-6 lg:gap-7 lg:px-10 ${
          compact ? "pt-28 pb-10 sm:pt-32 sm:pb-12" : "pt-28 pb-8 sm:py-24 md:py-28"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
