"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, MessageCircle, Globe, Megaphone, Pen, Languages, CalendarDays } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
      <div className="mx-auto max-w-7xl flex flex-col gap-24">

        {/* Heading */}
        <div className="comm-heading flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">
              Community
            </span>
            <h2 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
              The community<br />is the product.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/40 md:text-right">
            Rarecoin has no marketing budget carved out at launch. Growth comes from the people who show up — and they get rewarded for it.
          </p>
        </div>

        {/* Membership tiers */}
        <div className="flex flex-col gap-6">
          <h3 className="font-heading text-lg font-bold text-white/50 uppercase tracking-widest text-sm">
            Membership Tiers
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {tiers.map(({ name, amount, perks, highlight }) => (
              <div
                key={name}
                className={`comm-tier flex flex-col gap-6 rounded-3xl p-8 ${
                  highlight
                    ? "bg-[#3355ff] text-white"
                    : "bg-white/5 text-white"
                }`}
              >
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
            ))}
          </div>
        </div>

        {/* Ambassador program */}
        <div className="flex flex-col gap-8 rounded-3xl bg-white/4 p-8 md:flex-row md:items-center md:gap-16">
          <div className="flex flex-col gap-4 md:flex-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7b3fe4]">
              Ambassador Program
            </span>
            <h3 className="font-heading text-2xl font-bold text-white leading-snug">
              Contribute. Get recognized. Earn RARE.
            </h3>
            <p className="text-sm leading-relaxed text-white/45">
              The most active and constructive community members are formally recognized and compensated in RARE — funded by a disclosed share of real trading fees, not a pre-minted pool.
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

        {/* Socials */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
            Find us on
          </h3>
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            {socials.map(({ icon: Icon, label, handle, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="comm-social group flex flex-1 items-center gap-4 rounded-2xl border border-white/8 bg-white/4 px-6 py-5 transition-all hover:border-[#3355ff]/40 hover:bg-[#3355ff]/8"
              >
                <Icon size={20} className="text-white/40 transition-colors group-hover:text-[#3355ff]" strokeWidth={1.75} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-white/30 uppercase tracking-wider">{label}</span>
                  <span className="text-sm font-semibold text-white/70">{handle}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
