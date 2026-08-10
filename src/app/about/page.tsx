"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Target, Zap, Shield, Users, TrendingDown, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

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

const values = [
  { icon: Lock,        title: "Scarcity",              desc: "A permanently fixed maximum supply of 1,000,000,000 RARE with no mechanism for additional minting." },
  { icon: Zap,         title: "Fair Launch",            desc: "No presale, no team allocation. Every participant acquires RARE the same way — through the public bonding curve." },
  { icon: Eye,         title: "Transparency",           desc: "Public disclosure of backer wallets and regular reporting on creator fee usage and community activity." },
  { icon: Users,       title: "Participation",          desc: "Utility is built around doing things — signaling, tipping, contributing — not just holding and waiting." },
  { icon: Shield,      title: "Security",               desc: "Reliance on Proof's existing, audited launch infrastructure rather than bespoke smart contracts." },
  { icon: TrendingDown,title: "Sustainability",         desc: "A disclosed share of trading fees funds contributor rewards and buyback-and-burn activity." },
];

const AVATAR_GRADIENTS = [
  "linear-gradient(160deg, #0f3f93 0%, #0b0c12 100%)",
  "linear-gradient(160deg, #3355ff 0%, #0b0c12 100%)",
  "linear-gradient(160deg, #7b3fe4 0%, #0b0c12 100%)",
];

const team = [
  { name: "Abdulla Usman",  role: "Founder / CEO",             bio: "Crypto trading expert" },
  { name: "Zeb Tufoin",     role: "Chief Technology Officer",  bio: "IT expert" },
  { name: "Ngeh Divine",    role: "Head of Product",           bio: "Product & ecosystem experience" },
  { name: "Elvis Mimba",    role: "Community Lead",            bio: "Managed Tatcoin and Betchip" },
  { name: "Julius N",       role: "Legal Advisor",             bio: "Blockchain advisor" },
  { name: "Tantoh Terence", role: "Technical Advisor",         bio: "Seasoned trader" },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".about-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 });
      tl.fromTo(".about-word", { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.12 }, "-=0.2");
      tl.fromTo(".about-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      tl.fromTo(".about-cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");

      gsap.fromTo(".about-block",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-block", start: "top 85%" } }
      );
      gsap.fromTo(".about-value",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".about-value", start: "top 85%" } }
      );
      gsap.fromTo(".about-member",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".about-member", start: "top 85%" } }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-20 bg-[#F4F6FB]">

      {/* Hero — same structure & bg as the home hero */}
      <section className="relative min-h-screen overflow-hidden bg-[#F4F6FB] flex flex-col justify-center">
        {/* Top-edge gradient band */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,63,147,0.08) 0%, rgba(15,63,147,0.03) 50%, transparent 100%)",
          }}
        />
        {/* Ambient spot — right */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/4 -translate-y-1/4 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(15,63,147,0.10) 0%, transparent 68%)" }}
        />
        {/* Bottom fade into next section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
          style={{ background: "linear-gradient(to bottom, transparent 0%, #F4F6FB 100%)" }}
        />
        {/* Ambient spot — left-bottom */}
        <div
          className="pointer-events-none absolute left-0 bottom-0 h-[440px] w-[440px] -translate-x-1/3 translate-y-1/3 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(15,63,147,0.07) 0%, transparent 68%)" }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-7 px-6 py-28 text-center md:py-36 lg:px-16">
          <span className="about-eyebrow text-xs font-semibold uppercase tracking-widest text-[#3355ff]">
            About Rarecoin
          </span>

          <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-[#0b0c12] md:text-6xl lg:text-7xl">
            <span className="about-word block">Built on one principle.</span>
            <span className="about-word block text-[#0f3f93]">Scarcity creates value.</span>
          </h1>

          <p className="about-sub max-w-xl text-sm leading-relaxed text-[#0b0c12]/55">
            An honest attempt at what a fair-launch community token can actually deliver — and transparent about what it cannot.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/docs"
              className="about-cta group inline-flex items-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3"
            >
              Read White Paper
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#team"
              className="about-cta inline-flex items-center gap-2 rounded-full border border-[#3355ff]/25 bg-[#3355ff]/6 px-6 py-3 text-sm font-semibold text-[#0f3f93] transition-all hover:border-[#3355ff]/50 hover:bg-[#3355ff]/12"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="about-block relative flex flex-col gap-5 overflow-hidden rounded-3xl bg-white p-10" data-scale>
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 text-[#3355ff] opacity-[0.06]">
              <GhostCircles className="h-full w-full" />
            </div>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3355ff]/10">
              <Eye size={20} className="text-[#3355ff]" strokeWidth={1.75} />
            </div>
            <div className="relative flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Vision</span>
              <h2 className="font-heading text-2xl font-bold text-[#0b0c12]">The most genuinely community-owned digital asset in its category.</h2>
            </div>
            <p className="relative text-sm leading-relaxed text-[#0b0c12]/55">
              A token whose culture, activity, and rewards are shaped by the people who hold it — launched with nothing hidden in the tokenomics.
            </p>
          </div>
          <div className="about-block relative flex flex-col gap-5 overflow-hidden rounded-3xl bg-[#0b0c12] p-10" data-scale>
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 text-white opacity-[0.05]">
              <GhostFlower className="h-full w-full" />
            </div>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3355ff]/20">
              <Target size={20} className="text-[#3355ff]" strokeWidth={1.75} />
            </div>
            <div className="relative flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Mission</span>
              <h2 className="font-heading text-2xl font-bold text-white">Prove that a fair-launch token can deliver real, disclosed utility.</h2>
            </div>
            <p className="relative text-sm leading-relaxed text-white/45">
              Rewarding participation, contribution, and long-term holding through mechanisms that require no custom infrastructure — and being transparent, at every step, about what Rarecoin does and does not control.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="relative overflow-hidden bg-[#0b0c12] px-6 py-28 lg:px-16">
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 text-[#3355ff] opacity-[0.05]">
          <GhostRings className="h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-7xl flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Core Values</span>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">What we stand for.</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="about-value flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/4 p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3355ff]/15">
                  <Icon size={18} className="text-[#3355ff]" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-heading text-base font-bold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-white/45">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div id="team" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-16">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Team</span>
            <h2 className="font-heading text-4xl font-bold text-[#0b0c12] md:text-5xl">The people behind RARE.</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {team.map(({ name, role, bio }, i) => (
              <div key={name} className="about-member group relative overflow-hidden rounded-3xl bg-[#0b0c12]" style={{ aspectRatio: "3/4" }}>
                {/* Avatar placeholder — no photo asset yet */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                >
                  <span className="font-heading text-7xl font-bold text-white/15">
                    {name.charAt(0)}
                  </span>
                </div>

                {/* Cinematic gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(11,12,18,0.55) 60%, rgba(11,12,18,0.95) 100%)" }}
                />

                {/* Top-left role badge */}
                <span className="absolute top-5 left-5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                  {role}
                </span>

                {/* Bottom text */}
                <div className="absolute bottom-0 inset-x-0 flex flex-col gap-1 p-6">
                  <h3 className="font-heading text-xl font-bold text-white">{name}</h3>
                  <p className="text-sm text-white/50">{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
