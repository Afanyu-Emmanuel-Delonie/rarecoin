"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Radio, Send, Layers, Gift, Star } from "lucide-react";

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
      gsap.fromTo(
        ".utility-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".utility-item", start: "top 85%" },
        }
      );
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

        {/* Utility list */}
        <div className="flex flex-col divide-y divide-[#0b0c12]/8">
          {utilities.map(({ number, icon: Icon, title, description }) => (
            <div
              key={number}
              className="utility-item group flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-12"
            >
              {/* Number */}
              <span className="font-heading text-sm font-bold text-[#0b0c12]/20 md:w-10 shrink-0">
                {number}
              </span>

              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#3355ff]/8 text-[#3355ff] transition-colors group-hover:bg-[#3355ff] group-hover:text-white">
                <Icon size={18} strokeWidth={1.75} />
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg font-bold text-[#0b0c12] md:w-56 shrink-0">
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#0b0c12]/55 md:max-w-xl">
                {description}
              </p>

              {/* Hover line accent */}
              <div className="ml-auto hidden h-px w-12 bg-[#3355ff] opacity-0 transition-opacity group-hover:opacity-100 md:block" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
