"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, MessageCircle, Globe, Megaphone, Pen, Languages, CalendarDays } from "lucide-react";

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

const GHOSTS = [GhostCircles, GhostRings, GhostFlower];

const tiers = [
  {
    name: "Holder",
    amount: "1+",
    perks: ["Community access", "Signaling polls", "P2P tipping"],
    highlight: false,
  },
  {
    name: "Member",
    amount: "10,000+",
    perks: ["Private channels", "Early announcements", "Members-only events"],
    highlight: false,
  },
  {
    name: "OG",
    amount: "100,000+",
    perks: ["OG badge & recognition", "Priority contributor status", "All Member perks"],
    highlight: true,
  },
];

const roles = [
  { icon: Megaphone, label: "Moderators" },
  { icon: Pen,       label: "Creators" },
  { icon: Languages, label: "Translators" },
  { icon: CalendarDays, label: "Organizers" },
];

const socials = [
  { icon: X,             label: "X / Twitter", handle: "@TherealRarecoin", href: "https://x.com/TherealRarecoin" },
  { icon: MessageCircle, label: "Telegram",     handle: "Join the chat",    href: "#" },
  { icon: Globe,         label: "Website",      handle: "rarecoin.io",      href: "#" },
];

export default function Community() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 78%" };

      gsap.fromTo(".comm-heading",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: trigger }
      );
      gsap.fromTo(".comm-tier",
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".comm-tier", start: "top 85%" } }
      );
      gsap.fromTo(".comm-role",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".comm-role", start: "top 88%" } }
      );
      gsap.fromTo(".comm-social",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".comm-social", start: "top 88%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0b0c12] px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl flex flex-col gap-16">

        {/* Heading */}
        <div className="comm-heading flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
              The community<br />is the product.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/40 md:text-right">
            Rarecoin has no marketing budget carved out at launch. Growth comes from the people who show up and they get rewarded for it.
          </p>
        </div>

        {/* Membership tiers */}
        <div className="flex flex-col gap-6">
          <h3 className="font-heading text-sm font-bold text-white/50 uppercase tracking-widest">
            Membership Tiers
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {tiers.map(({ name, amount, perks, highlight }, i) => {
              const Ghost = GHOSTS[i % GHOSTS.length];
              return (
              <div
                key={name}
                className={`comm-tier relative flex flex-col gap-6 overflow-hidden rounded-3xl p-8 ${
                  highlight
                    ? "bg-[#3355ff] text-white"
                    : "bg-white/5 text-white"
                }`}
              >
                {/* Ghost pattern */}
                <div
                  className={`pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 ${
                    highlight ? "text-white opacity-[0.1]" : "text-[#3355ff] opacity-[0.08]"
                  }`}
                >
                  <Ghost className="h-full w-full" />
                </div>

                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-semibold uppercase tracking-widest ${highlight ? "text-white/60" : "text-white/30"}`}>
                      Tier
                    </span>
                    <span className="font-heading text-2xl font-bold">{name}</span>
                  </div>
                  <div className={`rounded-2xl px-3 py-1.5 text-xs font-bold ${highlight ? "bg-white/20" : "bg-white/8"}`}>
                    {amount} RARE
                  </div>
                </div>

                {/* Perks */}
                <ul className="flex flex-col gap-2.5">
                  {perks.map((perk) => (
                    <li key={perk} className={`flex items-center gap-2.5 text-sm ${highlight ? "text-white/80" : "text-white/50"}`}>
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${highlight ? "bg-white" : "bg-[#3355ff]/60"}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
              );
            })}
          </div>
        </div>

        {/* Ambassador program */}
        <div className="relative flex flex-col gap-8 overflow-hidden rounded-3xl bg-white/4 p-8 md:flex-row md:items-center md:gap-16">
          <div className="pointer-events-none absolute -bottom-14 -left-14 h-56 w-56 text-[#7b3fe4] opacity-[0.07]">
            <GhostFlower className="h-full w-full" />
          </div>
          <div className="relative flex flex-col gap-4 md:flex-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7b3fe4]">
              Ambassador Program
            </span>
            <h3 className="font-heading text-2xl font-bold text-white leading-snug">
              Contribute. Get recognized. Earn RARE.
            </h3>
            <p className="text-sm leading-relaxed text-white/45">
              The most active and constructive community members are formally recognized and compensated in RARE funded by a disclosed share of real trading fees, not a pre-minted pool.
            </p>
          </div>

          {/* Roles */}
          <div className="grid grid-cols-2 gap-3 md:w-64 shrink-0">
            {roles.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="comm-role flex flex-col items-center gap-2 rounded-2xl bg-white/6 py-5 px-3 text-center"
              >
                <Icon size={20} className="text-[#7b3fe4]" strokeWidth={1.75} />
                <span className="text-xs font-semibold text-white/60">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
