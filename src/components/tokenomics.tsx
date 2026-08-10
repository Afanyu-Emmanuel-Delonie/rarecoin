"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "1B", label: "Max Supply", sub: "Fixed forever" },
  { value: "0%", label: "Team Allocation", sub: "No insider cut" },
  { value: "0%", label: "Presale", sub: "No private round" },
  { value: "100%", label: "Public Curve", sub: "Every token" },
];

const comparison = [
  { feature: "Team allocation",     rarecoin: false, typical: true  },
  { feature: "Presale / private round", rarecoin: false, typical: true  },
  { feature: "Vesting schedule",    rarecoin: false, typical: true  },
  { feature: "Hidden insider wallets", rarecoin: false, typical: true },
  { feature: "Fair bonding curve",  rarecoin: true,  typical: false },
  { feature: "Disclosed backer wallets", rarecoin: true, typical: false },
  { feature: "100% public from day one", rarecoin: true, typical: false },
];

// ── Distribution graphic ───────────────────────────────────────────────────────
function DistributionGraphic() {
  return (
    <svg viewBox="0 0 320 320" fill="none" className="w-full max-w-xs mx-auto" aria-hidden="true">
      {/* Outer ring — full circle = 100% public */}
      <circle cx="160" cy="160" r="130" stroke="#3355ff" strokeWidth="28" opacity="0.15" />
      <circle
        cx="160" cy="160" r="130"
        stroke="#3355ff" strokeWidth="28"
        strokeDasharray="817 0"
        strokeLinecap="round"
        transform="rotate(-90 160 160)"
        opacity="0.9"
      />

      {/* Inner ring accent */}
      <circle cx="160" cy="160" r="95" stroke="#7b3fe4" strokeWidth="1" strokeDasharray="4 5" opacity="0.25" />

      {/* Center text */}
      <text x="160" y="148" textAnchor="middle" fontSize="42" fontWeight="700" fill="white" fontFamily="Space Grotesk, sans-serif">100%</text>
      <text x="160" y="172" textAnchor="middle" fontSize="11" fill="white" opacity="0.4" fontFamily="Space Grotesk, sans-serif" letterSpacing="2">PUBLIC</text>

      {/* Single label */}
      <rect x="88" y="198" width="144" height="30" rx="15" fill="#3355ff" opacity="0.18" />
      <text x="160" y="218" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3355ff" fontFamily="Space Grotesk, sans-serif">Bonding Curve Only</text>

      {/* Tick marks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
        return (
          <line key={i}
            x1={160 + 148 * Math.cos(a)} y1={160 + 148 * Math.sin(a)}
            x2={160 + 156 * Math.cos(a)} y2={160 + 156 * Math.sin(a)}
            stroke="white" strokeWidth="1.5" opacity="0.15"
          />
        );
      })}
    </svg>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function Tokenomics() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 75%" };

      gsap.fromTo(".tok-heading",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: trigger }
      );
      gsap.fromTo(".tok-stat",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: trigger }
      );
      gsap.fromTo(".tok-graphic",
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", scrollTrigger: trigger }
      );
      gsap.fromTo(".tok-row",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: ".tok-row", start: "top 85%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tokenomics" className="bg-[#0b0c12] px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl flex flex-col gap-20">

        {/* Heading */}
        <div className="tok-heading flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">
              Tokenomics
            </span>
            <h2 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
              Nothing hidden<br />in the numbers.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/40 md:text-right">
            No allocation pools, no vesting cliffs, no team tranche. Every RARE token enters circulation the same way — through the public bonding curve.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden md:grid-cols-4">
          {stats.map(({ value, label, sub }) => (
            <div key={label} className="tok-stat flex flex-col gap-1.5 bg-[#0b0c12] px-8 py-10">
              <span className="font-heading text-5xl font-bold text-white">{value}</span>
              <span className="text-sm font-semibold text-white/70">{label}</span>
              <span className="text-xs text-white/30">{sub}</span>
            </div>
          ))}
        </div>

        {/* Graphic + comparison */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">

          {/* Distribution donut */}
          <div className="tok-graphic">
            <DistributionGraphic />
          </div>

          {/* Comparison table */}
          <div className="flex flex-col gap-2">
            <div className="mb-4 grid grid-cols-3 text-xs font-semibold uppercase tracking-widest text-white/30">
              <span className="col-span-1">Feature</span>
              <span className="text-center text-[#3355ff]">Rarecoin</span>
              <span className="text-center">Typical Token</span>
            </div>

            {comparison.map(({ feature, rarecoin, typical }) => (
              <div
                key={feature}
                className="tok-row grid grid-cols-3 items-center rounded-xl px-4 py-3.5 text-sm transition-colors hover:bg-white/4"
              >
                <span className="text-white/60">{feature}</span>
                <span className="flex justify-center">
                  {rarecoin
                    ? <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3355ff]/15"><Check size={13} className="text-[#3355ff]" strokeWidth={2.5} /></span>
                    : <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/6"><X size={13} className="text-white/25" strokeWidth={2.5} /></span>
                  }
                </span>
                <span className="flex justify-center">
                  {typical
                    ? <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/6"><Check size={13} className="text-white/25" strokeWidth={2.5} /></span>
                    : <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/6"><X size={13} className="text-white/25" strokeWidth={2.5} /></span>
                  }
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
