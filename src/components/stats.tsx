"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">

        <h2 className="stat-badge font-heading text-3xl font-bold leading-tight text-white text-center md:text-5xl">
          Nothing hidden<br className="sm:hidden" /> in the numbers.
        </h2>

        <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
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
    </section>
  );
}
