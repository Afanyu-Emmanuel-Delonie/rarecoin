"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
}

export default function PageHero({ eyebrow, title, sub, dark = true }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".ph-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 });
      tl.fromTo(".ph-title",   { opacity: 0, y: 36, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7 }, "-=0.2");
      if (sub) tl.fromTo(".ph-sub", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, ref);
    return () => ctx.revert();
  }, [sub]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden px-6 pt-36 pb-20 lg:px-16 ${dark ? "bg-[#0b0c12]" : "bg-[#F4F6FB]"}`}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.12) 0%, transparent 68%)" }}
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: `linear-gradient(to bottom, transparent, ${dark ? "#0b0c12" : "#F4F6FB"})` }}
      />

      <div className="relative mx-auto max-w-7xl flex flex-col gap-4">
        <span className="ph-eyebrow text-xs font-semibold uppercase tracking-widest text-[#3355ff]">
          {eyebrow}
        </span>
        <h1
          className={`ph-title font-heading text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl ${dark ? "text-white" : "text-[#0b0c12]"}`}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {sub && (
          <p className={`ph-sub max-w-xl text-sm leading-relaxed ${dark ? "text-white/45" : "text-[#0b0c12]/50"}`}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
