"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, MessageCircle, Mail, Megaphone, Pen, Languages, CalendarDays, ArrowRight, CheckCircle2, Users, Zap, Shield } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ── Ghost decorations ──────────────────────────────────────────────────────────
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
  { icon: Megaphone,    label: "Moderators" },
  { icon: Pen,          label: "Creators" },
  { icon: Languages,    label: "Translators" },
  { icon: CalendarDays, label: "Organizers" },
];

const socials = [
  { icon: X,             label: "X / Twitter", handle: "@TherealRarecoin",  href: "https://x.com/TherealRarecoin" },
  { icon: MessageCircle, label: "Telegram",     handle: "Join the chat",     href: "#" },
  { icon: Mail,          label: "Email",        handle: "hello@rarecoin.io", href: "mailto:hello@rarecoin.io" },
];

const principles = [
  { icon: Users,  title: "People first",       desc: "Every design decision starts with what's best for the people who hold and use RARE not the team." },
  { icon: Zap,    title: "Action over noise",  desc: "Participation is rewarded. Showing up, contributing, and building matters more than just holding." },
  { icon: Shield, title: "Radical transparency", desc: "Backer wallets are public. Fee usage is disclosed. Nothing is hidden in the tokenomics." },
  { icon: CheckCircle2, title: "No empty promises", desc: "We are honest about what Rarecoin does and does not control. Hype without substance is not our culture." },
];

const steps = [
  { num: "01", title: "Acquire RARE",         desc: "Buy RARE on the public bonding curve on Proof no presale, no whitelist, same price for everyone." },
  { num: "02", title: "Join the community",   desc: "Connect your wallet to verify your tier and unlock the channels and perks that match your holding." },
  { num: "03", title: "Participate & signal", desc: "Vote in community polls, tip other members, and contribute content or translations to earn recognition." },
  { num: "04", title: "Earn rewards",         desc: "Active contributors are formally recognized and compensated in RARE from real trading fees not a pre-minted pool." },
];

export default function Community() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".comm-word",   { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.12 });
      tl.fromTo(".comm-sub",    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      tl.fromTo(".comm-cta",    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");

      // Scroll sections
      gsap.fromTo(".comm-heading",  { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".comm-heading",  start: "top 82%" } });
      gsap.fromTo(".comm-tier",     { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".comm-tier",     start: "top 85%" } });
      gsap.fromTo(".comm-role",     { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".comm-role",     start: "top 88%" } });
      gsap.fromTo(".comm-step",     { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".comm-step",     start: "top 85%" } });
      gsap.fromTo(".comm-principle",{ opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".comm-principle", start: "top 85%" } });
      gsap.fromTo(".comm-social",   { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".comm-social",   start: "top 88%" } });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-20 bg-[#F4F6FB]">

      {/* ── Hero — matches about page structure ── */}
      <section className="relative min-h-screen overflow-hidden bg-[#F4F6FB] flex flex-col justify-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-72"
            style={{ background: "linear-gradient(to bottom, rgba(15,63,147,0.08) 0%, rgba(15,63,147,0.03) 50%, transparent 100%)" }}
          />
          <div
            className="absolute right-0 top-0 h-[420px] w-[420px] translate-x-1/4 -translate-y-1/4 rounded-full sm:h-[600px] sm:w-[600px] xl:h-[760px] xl:w-[760px]"
            style={{ background: "radial-gradient(circle, rgba(15,63,147,0.10) 0%, transparent 68%)" }}
          />
          <div
            className="absolute left-0 bottom-0 h-[320px] w-[320px] -translate-x-1/3 translate-y-1/3 rounded-full sm:h-[440px] sm:w-[440px] xl:h-[560px] xl:w-[560px]"
            style={{ background: "radial-gradient(circle, rgba(15,63,147,0.07) 0%, transparent 68%)" }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
          style={{ background: "linear-gradient(to bottom, transparent 0%, #F4F6FB 100%)" }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-5 py-16 text-center sm:gap-6 sm:px-6 sm:py-20 md:py-28 lg:gap-7 lg:px-10 lg:py-32 xl:px-16 xl:py-40">
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-[#0b0c12] sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
            <span className="comm-word block">The community</span>
            <span className="comm-word block text-[#0f3f93]">is the product.</span>
          </h1>

          <p className="comm-sub max-w-sm text-sm leading-relaxed text-[#0b0c12]/55 sm:max-w-xl lg:max-w-2xl">
            No marketing budget carved out at launch. Growth comes from the people who show up and they get rewarded for it.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/join"
              className="comm-cta group inline-flex items-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3"
            >
              Join the Community
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/docs"
              className="comm-cta inline-flex items-center gap-2 rounded-full border border-[#3355ff]/25 bg-[#3355ff]/6 px-6 py-3 text-sm font-semibold text-[#0f3f93] transition-all hover:border-[#3355ff]/50 hover:bg-[#3355ff]/12"
            >
              White Paper
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
        <div className="flex flex-col gap-16">
          <div className="comm-heading flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">How It Works</span>
            <h2 className="font-heading text-4xl font-bold text-[#0b0c12] md:text-5xl">Four steps to being part of it.</h2>
          </div>

          <div className="flex flex-col divide-y divide-[#0b0c12]/8">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="comm-step grid grid-cols-[auto_1fr] gap-8 py-12 md:grid-cols-[80px_1fr_1.2fr] md:gap-16 md:items-center">
                <span className="font-heading text-sm font-bold text-[#0b0c12]/20">{num}</span>
                <h3 className="font-heading text-2xl font-bold text-[#0b0c12] md:text-3xl">{title}</h3>
                <p className="col-span-2 text-sm leading-relaxed text-[#0b0c12]/50 md:col-span-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Membership tiers ── */}
      <div className="relative overflow-hidden bg-[#0b0c12] px-6 py-28 lg:px-16">
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 text-[#3355ff] opacity-[0.05]">
          <GhostRings className="h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-7xl flex flex-col gap-16">
          <div className="comm-heading flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Membership</span>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Your tier, your perks.</h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/40">
              Tiers are determined by your on-chain RARE balance — no sign-up, no application. Hold more, unlock more.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {tiers.map(({ name, amount, perks, highlight }, i) => {
              const Ghost = GHOSTS[i % GHOSTS.length];
              return (
                <div
                  key={name}
                  className={`comm-tier relative flex flex-col gap-6 overflow-hidden rounded-3xl p-8 ${
                    highlight ? "bg-[#3355ff] text-white" : "bg-white/5 text-white"
                  }`}
                >
                  <div className={`pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 ${highlight ? "text-white opacity-[0.1]" : "text-[#3355ff] opacity-[0.08]"}`}>
                    <Ghost className="h-full w-full" />
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <span className={`text-xs font-semibold uppercase tracking-widest ${highlight ? "text-white/60" : "text-white/30"}`}>Tier</span>
                      <span className="font-heading text-2xl font-bold">{name}</span>
                    </div>
                    <div className={`rounded-2xl px-3 py-1.5 text-xs font-bold ${highlight ? "bg-white/20" : "bg-white/8"}`}>
                      {amount} RARE
                    </div>
                  </div>
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
      </div>

      {/* ── Community principles ── */}
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
        <div className="flex flex-col gap-16">
          <div className="comm-heading flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Our Principles</span>
            <h2 className="font-heading text-4xl font-bold text-[#0b0c12] md:text-5xl">What this community stands for.</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="comm-principle relative flex flex-col gap-4 overflow-hidden rounded-3xl bg-white p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3355ff]/10">
                  <Icon size={20} className="text-[#3355ff]" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-lg font-bold text-[#0b0c12]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#0b0c12]/55">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ambassador program ── */}
      <div className="relative overflow-hidden bg-[#0b0c12] px-6 py-28 lg:px-16">
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 text-[#7b3fe4] opacity-[0.05]">
          <GhostFlower className="h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-7xl flex flex-col gap-12">
          <div className="comm-heading flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7b3fe4]">Ambassador Program</span>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Contribute. Get recognized. Earn RARE.</h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/40">
              The most active and constructive community members are formally recognized and compensated in RARE — funded by a disclosed share of real trading fees, not a pre-minted pool.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {roles.map(({ icon: Icon, label }) => (
              <div key={label} className="comm-role flex flex-col items-center gap-3 rounded-2xl bg-white/5 py-8 px-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7b3fe4]/15">
                  <Icon size={22} className="text-[#7b3fe4]" strokeWidth={1.75} />
                </div>
                <span className="text-sm font-semibold text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Find us ── */}
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
        <div className="flex flex-col gap-12">
          <div className="comm-heading flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Find Us</span>
            <h2 className="font-heading text-4xl font-bold text-[#0b0c12] md:text-5xl">Join the conversation.</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {socials.map(({ icon: Icon, label, handle, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="comm-social group flex flex-col gap-5 rounded-3xl bg-white p-8 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b0c12]/6 transition-colors group-hover:bg-[#3355ff]/10">
                  <Icon size={20} className="text-[#0b0c12]/60 transition-colors group-hover:text-[#3355ff]" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-heading text-base font-bold text-[#0b0c12]">{label}</span>
                  <span className="text-sm text-[#0b0c12]/40">{handle}</span>
                </div>
                <ArrowRight size={15} className="text-[#0b0c12]/20 transition-all group-hover:text-[#3355ff] group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
