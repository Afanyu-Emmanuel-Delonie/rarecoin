"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "1B",  counter: null, from: null, suffix: "",  label: "Fixed Supply",      highlight: false },
  { value: "0",   counter: 0,    from: 20,   suffix: "%", label: "Team Allocation",   highlight: false },
  { value: "0",   counter: 0,    from: 10,   suffix: "",  label: "Presale Rounds",    highlight: false },
  { value: "100", counter: 100,  from: 0,    suffix: "%", label: "Public from Day 1", highlight: true  },
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
    <section ref={ref} className="bg-[#08090D] px-6 pb-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16">

          {/* Left — text */}
          <div className="flex flex-col gap-6" data-slide-left>
            <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
              Built for transparency.
            </h2>

            <div className="flex flex-col gap-3">
              <p className="text-base leading-relaxed text-white/45">
                Rarecoin puts every allocation, every wallet, and every trade on-chain verifiable by anyone, hidden from no one.
              </p>
              <p className="text-base leading-relaxed text-white/45">
                No presale, no team cut, no vesting cliffs. Just a public bonding curve, open from the first block.
              </p>
            </div>

            <a
              href="/#tokenomics"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#08090D] transition-colors hover:bg-[#F0D77A]"
            >
              View full tokenomics
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Right — status badge + 2x2 stat grid */}
          <div className="flex flex-col gap-3" data-slide-right>
            <div className="stat-badge flex items-center gap-2 rounded-2xl border border-white/8 bg-white/4 px-5 py-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-sm font-medium text-white/50">Rarecoin protocol stats</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ value, counter, from, suffix, label, highlight }) => (
                <div
                  key={label}
                  className={`stat-item flex flex-col gap-2 rounded-2xl border px-6 py-6 ${
                    highlight
                      ? "border-[#D4AF37]/20 bg-[#D4AF37]/8"
                      : "border-white/8 bg-white/4"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      highlight ? "text-[#D4AF37]" : "text-white/40"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`font-heading text-4xl font-bold ${
                      highlight ? "text-[#D4AF37]" : "text-white"
                    }`}
                    {...(counter !== null
                      ? {
                          "data-counter": String(counter),
                          "data-counter-from": String(from),
                          "data-counter-suffix": suffix,
                        }
                      : {})}
                  >
                    {counter !== null ? `${from}${suffix}` : `${value}${suffix}`}
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
