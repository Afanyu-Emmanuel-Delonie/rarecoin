"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Card 1 graphic: Fair Launch — bonding curve + floating pill labels ─────────
function FairLaunchGraphic() {
  return (
    <svg viewBox="0 0 340 260" fill="none" className="w-full" aria-hidden="true">
      {/* Background circle blobs */}
      <circle cx="260" cy="180" r="70" fill="#3355ff" opacity="0.12" />
      <circle cx="80" cy="200" r="45" fill="#7b3fe4" opacity="0.1" />

      {/* Bonding curve */}
      <path
        d="M30 220 C60 218 90 210 120 190 C150 170 170 140 200 110 C225 85 255 55 310 30"
        stroke="#3355ff"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Area under curve */}
      <path
        d="M30 220 C60 218 90 210 120 190 C150 170 170 140 200 110 C225 85 255 55 310 30 L310 230 L30 230 Z"
        fill="#3355ff"
        opacity="0.06"
      />

      {/* Axis */}
      <line x1="28" y1="222" x2="315" y2="222" stroke="#3355ff" strokeWidth="1" opacity="0.2" />
      <line x1="28" y1="20" x2="28" y2="222" stroke="#3355ff" strokeWidth="1" opacity="0.2" />

      {/* Dot on curve */}
      <circle cx="200" cy="110" r="6" fill="#3355ff" />
      <circle cx="200" cy="110" r="12" fill="#3355ff" opacity="0.2" />

      {/* Pill: "Public" */}
      <rect x="195" y="68" width="88" height="30" rx="15" fill="white" />
      <text x="239" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0b0c12" fontFamily="Space Grotesk, sans-serif">Public</text>

      {/* Pill: "No Presale" */}
      <rect x="30" y="130" width="108" height="30" rx="15" fill="#0b0c12" />
      <text x="84" y="150" textAnchor="middle" fontSize="12" fontWeight="600" fill="white" fontFamily="Space Grotesk, sans-serif">No Presale</text>

      {/* Pill: "0% Team" */}
      <rect x="210" y="170" width="90" height="30" rx="15" fill="#3355ff" />
      <text x="255" y="190" textAnchor="middle" fontSize="12" fontWeight="600" fill="white" fontFamily="Space Grotesk, sans-serif">0% Team</text>

      {/* Small decorative shapes */}
      <rect x="55" y="55" width="14" height="14" rx="2" fill="#7b3fe4" opacity="0.5" transform="rotate(20 62 62)" />
      <circle cx="295" cy="170" r="7" fill="#3355ff" opacity="0.3" />
      <circle cx="140" cy="80" r="5" fill="#7b3fe4" opacity="0.4" />
      <rect x="290" y="100" width="10" height="10" rx="2" fill="#3355ff" opacity="0.25" transform="rotate(35 295 105)" />
    </svg>
  );
}

// ── Card 2 graphic: Fixed Supply — big number + ring + shapes ─────────────────
function SupplyGraphic() {
  return (
    <svg viewBox="0 0 340 260" fill="none" className="w-full" aria-hidden="true">
      {/* Outer dashed ring */}
      <circle cx="170" cy="130" r="105" stroke="white" strokeWidth="1" strokeDasharray="5 6" opacity="0.15" />
      {/* Mid ring */}
      <circle cx="170" cy="130" r="78" stroke="white" strokeWidth="1" opacity="0.1" />
      {/* Inner filled ring */}
      <circle cx="170" cy="130" r="52" fill="white" opacity="0.06" />

      {/* Tick marks */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
        return (
          <line key={i}
            x1={170 + 105 * Math.cos(a)} y1={130 + 105 * Math.sin(a)}
            x2={170 + 113 * Math.cos(a)} y2={130 + 113 * Math.sin(a)}
            stroke="white" strokeWidth="1.5" opacity="0.2"
          />
        );
      })}

      {/* Big number */}
      <text x="170" y="118" textAnchor="middle" fontSize="54" fontWeight="700" fill="white" fontFamily="Space Grotesk, sans-serif">1B</text>
      <text x="170" y="142" textAnchor="middle" fontSize="11" fill="white" opacity="0.45" fontFamily="Space Grotesk, sans-serif" letterSpacing="3">RARE TOKENS</text>

      {/* Pill: "Hard Cap" */}
      <rect x="96" y="188" width="148" height="32" rx="16" fill="white" opacity="0.12" />
      <text x="170" y="209" textAnchor="middle" fontSize="12" fontWeight="600" fill="white" fontFamily="Space Grotesk, sans-serif">Hard Cap · No Minting</text>

      {/* Decorative shapes */}
      <rect x="42" y="60" width="18" height="18" rx="3" fill="white" opacity="0.15" transform="rotate(15 51 69)" />
      <circle cx="298" cy="80" r="10" fill="white" opacity="0.1" />
      <circle cx="52" cy="190" r="7" fill="white" opacity="0.12" />
      <rect x="285" y="175" width="14" height="14" rx="3" fill="white" opacity="0.12" transform="rotate(-20 292 182)" />

      {/* Arc progress — full circle highlight */}
      <path
        d="M170 25 A105 105 0 1 1 169.9 25"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.25"
        fill="none"
      />
    </svg>
  );
}

// ── Card 3 graphic: Deflationary — shrinking bars + floating shapes ────────────
function BurnGraphic() {
  const bars = [
    { x: 28,  h: 140, fill: "#0b0c12", opacity: 1 },
    { x: 88,  h: 108, fill: "#0b0c12", opacity: 0.75 },
    { x: 148, h: 78,  fill: "#0b0c12", opacity: 0.55 },
    { x: 208, h: 50,  fill: "#0b0c12", opacity: 0.38 },
    { x: 268, h: 26,  fill: "#0b0c12", opacity: 0.22 },
  ];

  return (
    <svg viewBox="0 0 340 260" fill="none" className="w-full" aria-hidden="true">
      {/* Background blobs */}
      <circle cx="290" cy="80" r="55" fill="#7b3fe4" opacity="0.08" />
      <circle cx="60" cy="200" r="40" fill="#3355ff" opacity="0.07" />

      {/* Bars */}
      {bars.map(({ x, h, fill, opacity }, i) => (
        <rect key={i} x={x} y={210 - h} width="46" height={h} rx="8" fill={fill} opacity={opacity} />
      ))}

      {/* Baseline */}
      <line x1="20" y1="212" x2="320" y2="212" stroke="#0b0c12" strokeWidth="1" opacity="0.15" />

      {/* Downward arrow trend */}
      <path d="M51 60 L271 185" stroke="#0b0c12" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.2" strokeLinecap="round" />
      <polygon points="271,185 260,175 278,172" fill="#0b0c12" opacity="0.2" />

      {/* Pill: "Buyback & Burn" */}
      <rect x="80" y="22" width="178" height="32" rx="16" fill="#0b0c12" />
      <text x="169" y="43" textAnchor="middle" fontSize="12" fontWeight="600" fill="white" fontFamily="Space Grotesk, sans-serif">Buyback &amp; Burn</text>

      {/* Decorative shapes */}
      <rect x="290" y="155" width="16" height="16" rx="3" fill="#7b3fe4" opacity="0.3" transform="rotate(25 298 163)" />
      <circle cx="22" cy="80" r="8" fill="#3355ff" opacity="0.2" />
      <rect x="295" y="30" width="12" height="12" rx="2" fill="#0b0c12" opacity="0.15" transform="rotate(10 301 36)" />
    </svg>
  );
}

// ── Cards config ───────────────────────────────────────────────────────────────
const cards = [
  {
    bg: "#eeedf8",
    textColor: "#0b0c12",
    label: "Fair Launch",
    headline: "No presale. No team cut. 100% public from trade one.",
    graphic: <FairLaunchGraphic />,
  },
  {
    bg: "#0b0c12",
    textColor: "#ffffff",
    label: "Fixed Supply",
    headline: "One billion RARE. Hard cap. No new tokens. Ever.",
    graphic: <SupplyGraphic />,
  },
  {
    bg: "#F4F6FB",
    textColor: "#0b0c12",
    label: "Deflationary",
    headline: "Real trading fees fund buyback and burn events.",
    graphic: <BurnGraphic />,
  },
];

// ── Section ────────────────────────────────────────────────────────────────────
export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 52 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="bg-[#F4F6FB] px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map(({ bg, textColor, label, headline, graphic }) => (
            <div
              key={label}
              className="feature-card flex flex-col justify-between rounded-3xl overflow-hidden"
              style={{ backgroundColor: bg, minHeight: "480px" }}
            >
              {/* Text top */}
              <div className="flex flex-col gap-4 p-8">
                <span
                  className="w-fit rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
                  style={{ background: `${textColor}18`, color: textColor }}
                >
                  {label}
                </span>
                <h3
                  className="font-heading text-2xl font-bold leading-snug"
                  style={{ color: textColor }}
                >
                  {headline}
                </h3>
              </div>

              {/* Graphic bottom — flush to edges */}
              <div className="px-4 pb-6">
                {graphic}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
