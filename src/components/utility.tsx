"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Radio, Send, Layers, Gift, Star, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function GhostCircles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="none" className={className}>
      <path d="M 64 128 C 99.346 128 128 156.654 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 Z M 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 156.654 156.654 128 192 128 Z M 64 0 C 99.346 0 128 28.654 128 64 C 128 99.346 99.346 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 Z M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 C 128 28.654 156.654 0 192 0 Z" fill="currentColor" />
    </svg>
  );
}

function GhostRings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="none" className={className}>
      <path d="M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 C 99.346 0 128 28.654 128 64 C 128 28.654 156.654 0 192 0 Z M 64 160 C 46.327 160 32 174.327 32 192 C 32 209.673 46.327 224 64 224 C 81.673 224 96 209.673 96 192 C 96 174.327 81.673 160 64 160 Z M 192 160 C 174.327 160 160 174.327 160 192 C 160 209.673 174.327 224 192 224 C 209.673 224 224 209.673 224 192 C 224 174.327 209.673 160 192 160 Z M 64 32 C 46.327 32 32 46.327 32 64 C 32 81.673 46.327 96 64 96 C 81.673 96 96 81.673 96 64 C 96 46.327 81.673 32 64 32 Z M 192 32 C 174.327 32 160 46.327 160 64 C 160 81.673 174.327 96 192 96 C 209.673 96 224 81.673 224 64 C 224 46.327 209.673 32 192 32 Z" fill="currentColor" />
    </svg>
  );
}

function GhostFlower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="none" className={className}>
      <path d="M 160 0 C 177.397 0 191.551 13.883 191.989 31.174 L 192.011 32.826 C 192.442 49.843 206.157 63.558 223.174 63.989 L 224.826 64.011 C 242.117 64.449 256 78.603 256 96 C 256 113.673 241.673 128 224 128 C 241.673 128 256 142.327 256 160 C 256 177.397 242.117 191.551 224.826 191.989 L 223.174 192.011 C 206.157 192.442 192.442 206.157 192.011 223.174 L 191.989 224.826 C 191.551 242.117 177.397 256 160 256 C 142.327 256 128 241.673 128 224 C 128 241.673 113.673 256 96 256 C 78.603 256 64.449 242.117 64.01 224.826 L 63.99 223.174 C 63.558 206.157 49.843 192.442 32.826 192.011 L 31.174 191.989 C 13.883 191.551 0 177.397 0 160 C 0 142.327 14.327 128 32 128 C 14.327 128 0 113.673 0 96 C 0 78.603 13.883 64.449 31.174 64.01 L 32.826 63.99 C 49.843 63.558 63.558 49.843 63.989 32.826 L 64.011 31.174 C 64.449 13.883 78.603 0 96 0 C 113.673 0 128 14.327 128 32 C 128 14.327 142.327 0 160 0 Z M 128 64 C 128 99.346 99.346 128 64 128 C 99.346 128 128 156.654 128 192 C 128 156.654 156.654 128 192 128 C 156.654 128 128 99.346 128 64 Z" fill="currentColor" />
    </svg>
  );
}

const GHOSTS = [GhostCircles, GhostRings, GhostFlower];

const utilities = [
  {
    number: "01",
    icon: Radio,
    title: "Community Signaling",
    description: "Hold RARE to participate in non-binding polls contributor nominations, event priorities, how trading fees get used.",
  },
  {
    number: "02",
    icon: Send,
    title: "Peer-to-Peer Tipping",
    description: "Send RARE directly to reward a great answer, a useful contribution, or a piece of content you value. No contract needed.",
  },
  {
    number: "03",
    icon: Layers,
    title: "Membership Tiers",
    description: "Holding defined amounts of RARE unlocks tiered access private channels, early announcements, members-only events.",
  },
  {
    number: "04",
    icon: Gift,
    title: "Contributor Rewards",
    description: "Creators, moderators, translators, and organizers earn RARE funded by a disclosed share of real trading fees.",
  },
  {
    number: "05",
    icon: Star,
    title: "Holder Recognition",
    description: "Long-term holders earn verifiable OG status based on public wallet history no staking contract required.",
  },
];

export default function Utility() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".utility-heading",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const st = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top+=80",
          end: `+=${utilities.length * 420}`,
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(
              utilities.length - 1,
              Math.floor(self.progress * utilities.length)
            );
            if (activeRef.current !== idx) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        });
        return () => st.kill();
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="utility" className="scroll-mt-20 bg-[#08090D] px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Heading row */}
        <div className="utility-heading mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              Five Ways to Use RARE
            </span>
            <h2 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
              Built to be used,<br />not just held.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/40 md:text-right">
            Every utility case works without a custom smart contract available from day one or shortly after launch.
          </p>
        </div>

        {/* Desktop — scroll-driven accordion */}
        <div ref={pinRef} className="hidden md:flex md:h-[480px] md:gap-3">
          {utilities.map(({ number, icon: Icon, title, description }, i) => {
            const isActive = i === active;
            const Ghost = GHOSTS[i % GHOSTS.length];
            return (
              <div
                key={number}
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl transition-[flex-grow,background-color] duration-500 ease-out ${
                  isActive
                    ? "flex-[3] bg-[#111318]"
                    : "flex-1 bg-[#111318]/60 border border-white/6"
                }`}
              >
                {/* Ghost pattern */}
                <div
                  className={`pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 transition-opacity duration-500 ${
                    isActive ? "text-[#D4AF37] opacity-[0.06]" : "text-white opacity-[0.03]"
                  }`}
                >
                  <Ghost className="h-full w-full" />
                </div>

                {/* Collapsed content */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-between p-6 transition-opacity duration-300 ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="font-heading text-2xl font-bold text-white/20">
                    {number}
                  </span>
                  <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap font-heading text-sm font-semibold text-white/40">
                    {title}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                </div>

                {/* Expanded content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-between p-8 transition-opacity duration-300 ${
                    isActive ? "opacity-100 delay-150" : "pointer-events-none opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-bold text-white/60">
                      {number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-2xl font-bold leading-snug text-white lg:text-3xl">
                      {title}
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-white/45">
                      {description}
                    </p>
                    <a
                      href="/#community"
                      className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#08090D] transition-colors hover:bg-[#F0D77A]"
                    >
                      Discover Now
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile — plain stacked list */}
        <div className="flex flex-col divide-y divide-white/8 md:hidden">
          {utilities.map(({ number, icon: Icon, title, description }) => (
            <div key={number} className="flex flex-col gap-4 py-8">
              <div className="flex items-center gap-4">
                <span className="font-heading text-sm font-bold text-white/20">
                  {number}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">
                  {title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-white/45">
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
