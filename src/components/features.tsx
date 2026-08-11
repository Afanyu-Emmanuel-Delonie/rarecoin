"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Lock, Flame } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Ghost decorations — oversized, low-opacity background marks ────────────────
function GhostCircles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="none" className={className}>
      <path
        d="M 64 128 C 99.346 128 128 156.654 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 Z M 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 156.654 156.654 128 192 128 Z M 64 0 C 99.346 0 128 28.654 128 64 C 128 99.346 99.346 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 Z M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 C 128 28.654 156.654 0 192 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GhostRings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="none" className={className}>
      <path
        d="M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 C 99.346 0 128 28.654 128 64 C 128 28.654 156.654 0 192 0 Z M 64 160 C 46.327 160 32 174.327 32 192 C 32 209.673 46.327 224 64 224 C 81.673 224 96 209.673 96 192 C 96 174.327 81.673 160 64 160 Z M 192 160 C 174.327 160 160 174.327 160 192 C 160 209.673 174.327 224 192 224 C 209.673 224 224 209.673 224 192 C 224 174.327 209.673 160 192 160 Z M 64 32 C 46.327 32 32 46.327 32 64 C 32 81.673 46.327 96 64 96 C 81.673 96 96 81.673 96 64 C 96 46.327 81.673 32 64 32 Z M 192 32 C 174.327 32 160 46.327 160 64 C 160 81.673 174.327 96 192 96 C 209.673 96 224 81.673 224 64 C 224 46.327 209.673 32 192 32 Z"
        fill="currentColor"
      />
    </svg>
  );
}

function GhostFlower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="none" className={className}>
      <path
        d="M 160 0 C 177.397 0 191.551 13.883 191.989 31.174 L 192.011 32.826 C 192.442 49.843 206.157 63.558 223.174 63.989 L 224.826 64.011 C 242.117 64.449 256 78.603 256 96 C 256 113.673 241.673 128 224 128 C 241.673 128 256 142.327 256 160 C 256 177.397 242.117 191.551 224.826 191.989 L 223.174 192.011 C 206.157 192.442 192.442 206.157 192.011 223.174 L 191.989 224.826 C 191.551 242.117 177.397 256 160 256 C 142.327 256 128 241.673 128 224 C 128 241.673 113.673 256 96 256 C 78.603 256 64.449 242.117 64.01 224.826 L 63.99 223.174 C 63.558 206.157 49.843 192.442 32.826 192.011 L 31.174 191.989 C 13.883 191.551 0 177.397 0 160 C 0 142.327 14.327 128 32 128 C 14.327 128 0 113.673 0 96 C 0 78.603 13.883 64.449 31.174 64.01 L 32.826 63.99 C 49.843 63.558 63.558 49.843 63.989 32.826 L 64.011 31.174 C 64.449 13.883 78.603 0 96 0 C 113.673 0 128 14.327 128 32 C 128 14.327 142.327 0 160 0 Z M 128 64 C 128 99.346 99.346 128 64 128 C 99.346 128 128 156.654 128 192 C 128 156.654 156.654 128 192 128 C 156.654 128 128 99.346 128 64 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── Cards config — label, headline, icon, ghost mark, soft tint ────────────────
const cards = [
  {
    label: "Fair Launch",
    headline: "No presale. No team cut. 100% public from trade one.",
    icon: ShieldCheck,
    ghost: GhostCircles,
    bg: "#E3EAFA",
    accent: "#0f3f93",
    ghostParallax: "0.18",
  },
  {
    label: "Fixed Supply",
    headline: "One billion RARE. Hard cap. No new tokens. Ever.",
    icon: Lock,
    ghost: GhostRings,
    bg: "#E6E4FC",
    accent: "#3355ff",
    ghostParallax: "0.28",
  },
  {
    label: "Deflationary",
    headline: "Real trading fees fund buyback and burn events.",
    icon: Flame,
    ghost: GhostFlower,
    bg: "#F2E8FB",
    accent: "#7b3fe4",
    ghostParallax: "0.22",
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" data-stagger>
          {cards.map(({ label, headline, icon: Icon, ghost: Ghost, bg, accent, ghostParallax }) => (
            <div
              key={label}
              className="feature-card group relative flex flex-col justify-between overflow-hidden rounded-3xl p-9"
              style={{ backgroundColor: bg, minHeight: "560px" }}
            >
              {/* Ghost decoration */}
              <div
                data-parallax={ghostParallax}
                className="pointer-events-none absolute -bottom-16 -right-16 h-96 w-96 opacity-[0.1] transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ color: accent }}
              >
                <Ghost className="h-full w-full" />
              </div>

              {/* Top text */}
              <div className="relative z-10 flex flex-col gap-5">
                <span
                  className="w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                  style={{ backgroundColor: `${accent}1a`, color: accent }}
                >
                  {label}
                </span>
                <h3 className="font-heading text-3xl font-bold leading-snug text-[#0b0c12]">
                  {headline}
                </h3>
              </div>

              {/* Icon badge */}
              <div
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm shadow-black/[0.04]"
                style={{ color: accent }}
              >
                <Icon size={28} strokeWidth={1.75} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
