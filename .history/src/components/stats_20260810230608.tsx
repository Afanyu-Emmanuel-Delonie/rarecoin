"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "1B",  suffix: "",  label: "Fixed Supply",      highlight: false },
  { value: "0",   suffix: "%", label: "Team Allocation",   highlight: false },
  { value: "0",   suffix: "",  label: "Presale Rounds",    highlight: false },
  { value: "100", suffix: "%", label: "Public from Day 1", highlight: true  },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: ref.current, start: "top 85%" };

      gsap.fromTo(
        ".stat-badge",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", scrollTrigger: trigger }
      );
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: trigger }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-[#F4F6FB] px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center md:gap-16">

          {/* Left — text */}
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-3xl font-bold leading-tight text-[#0b0c12] md:text-5xl">
              Built for transparency.
            </h2>

            <div className="flex flex-col gap-3">
              <p className="text-base leading-relaxed text-[#0b0c12]/55">
                Rarecoin puts every allocation, every wallet, and every trade on-chain verifiable by anyone, hidden from no one.
              </p>
              <p className="text-base leading-relaxed text-[#0b0c12]/55">
                No presale, no team cut, no vesting cliffs. Just a public bonding curve, open from the first block.
              </p>
            </div>

            <a
              href="/tokenomics"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0b0c12] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0f3f93]"
            >
              View full tokenomics
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right — status badge + 2x2 stat grid */}
          <div className="flex flex-col gap-3">
            <div className="stat-badge flex items-center gap-2 rounded-2xl border border-[#0b0c12]/8 bg-white px-5 py-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0f3f93]" />
              <span className="text-sm font-medium text-[#0b0c12]/60">Rarecoin protocol stats</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ value, suffix, label, highlight }) => (
                <div
                  key={label}
                  className={`stat-item flex flex-col gap-2 shadow-em rounded-2xl border px-6 py-6 ${
                    highlight
                      ? "border-[#0f3f93]/15 bg-[#0f3f93]/5"
                      : "border-[#0b0c12]/8 bg-white"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      highlight ? "text-[#0f3f93]" : "text-[#0b0c12]/50"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`font-heading text-4xl font-bold ${
                      highlight ? "text-[#0f3f93]" : "text-[#0b0c12]"
                    }`}
                  >
                    {value}{suffix}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
