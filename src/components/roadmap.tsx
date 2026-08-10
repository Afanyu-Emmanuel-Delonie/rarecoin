"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    number: "01",
    label: "Foundation",
    status: "done",
    items: [
      "Project conception & brand identity",
      "White paper publication",
      "Community launch across social channels",
      "Website & documentation",
      "Backer wallet disclosure prepared",
    ],
  },
  {
    number: "02",
    label: "Launch",
    status: "active",
    items: [
      "Token launch on Proof bonding curve",
      "Peer-to-peer tipping live",
      "Community signaling channel opened",
      "Founding ambassador recruitment",
      "Creator fee share terms published",
    ],
  },
  {
    number: "03",
    label: "Growth",
    status: "upcoming",
    items: [
      "Graduation to decentralized exchange",
      "Membership tier verification bot live",
      "First buyback-and-burn event",
      "Ambassador Program formalized",
      "Content & Culture Hub launch",
    ],
  },
  {
    number: "04",
    label: "Expansion",
    status: "upcoming",
    items: [
      "Holder recognition / OG badge system",
      "Expanded community signaling topics",
      "First major community event",
      "Additional exchange visibility",
      "Contributor rewards expansion",
    ],
  },
  {
    number: "05",
    label: "Long-Term",
    status: "upcoming",
    items: [
      "Strategic community partnerships",
      "International community events",
      "Charitable initiative partnerships",
      "Evaluation of custom infrastructure",
      "Continued transparency reporting",
    ],
  },
];

const statusStyles: Record<string, { dot: string; label: string; text: string }> = {
  done:     { dot: "bg-[#3355ff]",    label: "Completed", text: "text-[#3355ff]" },
  active:   { dot: "bg-[#7b3fe4] animate-pulse", label: "In Progress", text: "text-[#7b3fe4]" },
  upcoming: { dot: "bg-[#0b0c12]/20", label: "Upcoming",  text: "text-[#0b0c12]/35" },
};

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(1); // default open: Launch

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".road-heading",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(".road-phase",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".road-phase", start: "top 85%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F6FB] px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl flex flex-col gap-16">

        {/* Heading */}
        <div className="road-heading flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">
              Roadmap
            </span>
            <h2 className="font-heading text-4xl font-bold leading-tight text-[#0b0c12] md:text-5xl">
              Five phases.<br />One direction.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#0b0c12]/50 md:text-right">
            Actual timing depends on community activity and market conditions. No phase is a guarantee — each is a stated intention.
          </p>
        </div>

        {/* Timeline connector + phases */}
        <div className="flex flex-col gap-0 divide-y divide-[#0b0c12]/8">
          {phases.map(({ number, label, status, items }, i) => {
            const isOpen = active === i;
            const s = statusStyles[status];

            return (
              <div key={number} className="road-phase">
                {/* Phase header — clickable */}
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className="group flex w-full items-center gap-6 py-7 text-left transition-colors hover:bg-[#0b0c12]/2 px-2 rounded-xl"
                >
                  {/* Number */}
                  <span className="font-heading text-sm font-bold text-[#0b0c12]/20 w-8 shrink-0">
                    {number}
                  </span>

                  {/* Status dot */}
                  <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${s.dot}`} />

                  {/* Label */}
                  <span className="font-heading text-xl font-bold text-[#0b0c12] flex-1">
                    {label}
                  </span>

                  {/* Status badge */}
                  <span className={`hidden text-xs font-semibold uppercase tracking-widest md:block ${s.text}`}>
                    {s.label}
                  </span>

                  {/* Chevron */}
                  <svg
                    width="18" height="18" viewBox="0 0 18 18" fill="none"
                    className={`shrink-0 text-[#0b0c12]/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M4 6.5L9 11.5L14 6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Expandable items */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-96 pb-8" : "max-h-0"}`}
                >
                  <ul className="ml-14 flex flex-col gap-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#0b0c12]/60">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3355ff]/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
