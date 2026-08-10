"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Radio, Send, Layers, Gift, Star, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const utilities = [
  {
    number: "01",
    icon: Radio,
    title: "Community Signaling",
    description:
      "Hold RARE to participate in non-binding polls — contributor nominations, event priorities, how trading fees get used.",
  },
  {
    number: "02",
    icon: Send,
    title: "Peer-to-Peer Tipping",
    description:
      "Send RARE directly to reward a great answer, a useful contribution, or a piece of content you value. No contract needed.",
  },
  {
    number: "03",
    icon: Layers,
    title: "Membership Tiers",
    description:
      "Holding defined amounts of RARE unlocks tiered access — private channels, early announcements, members-only events.",
  },
  {
    number: "04",
    icon: Gift,
    title: "Contributor Rewards",
    description:
      "Creators, moderators, translators, and organizers earn RARE funded by a disclosed share of real trading fees.",
  },
  {
    number: "05",
    icon: Star,
    title: "Holder Recognition",
    description:
      "Long-term holders earn verifiable OG status based on public wallet history — no staking contract required.",
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
    <section ref={sectionRef} id="utility" className="bg-[#F4F6FB] px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Heading row */}
        <div className="utility-heading mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">
              Five Ways to Use RARE
            </span>
            <h2 className="font-heading text-4xl font-bold leading-tight text-[#0b0c12] md:text-5xl">
              Built to be used,<br />not just held.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#0b0c12]/50 md:text-right">
            Every utility case works without a custom smart contract — available from day one or shortly after launch.
          </p>
        </div>

        {/* Desktop — scroll-driven accordion */}
        <div ref={pinRef} className="hidden md:flex md:h-[480px] md:gap-3">
          {utilities.map(({ number, icon: Icon, title, description }, i) => {
            const isActive = i === active;
            return (
              <div
                key={number}
                className={`relative flex h-full flex-col overflow-hidden rounded-3xl transition-[flex-grow,background-color] duration-500 ease-out ${
                  isActive
                    ? "flex-[3] bg-[#0b0c12]"
                    : "flex-1 bg-white border border-[#0b0c12]/8"
                }`}
              >
                {/* Collapsed content */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-between p-6 transition-opacity duration-300 ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="font-heading text-xs font-bold text-[#0b0c12]/30">
                    {number}
                  </span>
                  <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap font-heading text-sm font-semibold text-[#0b0c12]/60">
                    {title}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3355ff]/8 text-[#3355ff]">
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
                    <span className="font-heading text-xs font-bold text-white/40">
                      {number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#7ea1ff]">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-2xl font-bold leading-snug text-white lg:text-3xl">
                      {title}
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-white/50">
                      {description}
                    </p>
                    <a
                      href="/community"
                      className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#3355ff] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3355ff]/85"
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
        <div className="flex flex-col divide-y divide-[#0b0c12]/8 md:hidden">
          {utilities.map(({ number, icon: Icon, title, description }) => (
            <div key={number} className="flex flex-col gap-4 py-8">
              <div className="flex items-center gap-4">
                <span className="font-heading text-sm font-bold text-[#0b0c12]/20">
                  {number}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3355ff]/8 text-[#3355ff]">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0b0c12]">
                  {title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-[#0b0c12]/55">
                {description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
