"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Target, Zap, Shield, Users, TrendingDown, Lock, BarChart2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Lock,        title: "Scarcity",              desc: "A permanently fixed maximum supply of 1,000,000,000 RARE with no mechanism for additional minting." },
  { icon: Zap,         title: "Fair Launch",            desc: "No presale, no team allocation. Every participant acquires RARE the same way — through the public bonding curve." },
  { icon: Eye,         title: "Transparency",           desc: "Public disclosure of backer wallets and regular reporting on creator fee usage and community activity." },
  { icon: Users,       title: "Participation",          desc: "Utility is built around doing things — signaling, tipping, contributing — not just holding and waiting." },
  { icon: Shield,      title: "Security",               desc: "Reliance on Proof's existing, audited launch infrastructure rather than bespoke smart contracts." },
  { icon: TrendingDown,title: "Sustainability",         desc: "A disclosed share of trading fees funds contributor rewards and buyback-and-burn activity." },
];

const team = [
  { name: "Abdulla Usman", role: "Founder / CEO",      bio: "Crypto trading expert" },
  { name: "Zeb Tufoin",    role: "Chief Technology Officer", bio: "IT expert" },
  { name: "Ngeh Divine",   role: "Head of Product",    bio: "Product & ecosystem experience" },
  { name: "Elvis Mimba",   role: "Community Lead",     bio: "Managed Tatcoin and Betchip" },
  { name: "Julius N",      role: "Legal Advisor",      bio: "Blockchain advisor" },
  { name: "Tantoh Terence",role: "Technical Advisor",  bio: "Seasoned trader" },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-hero",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
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
    <div ref={pageRef} className="bg-[#F4F6FB]">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#0b0c12] px-6 pt-40 pb-28 lg:px-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72"
          style={{ background: "linear-gradient(to bottom, rgba(51,85,255,0.1) 0%, transparent 100%)" }} />
        <div className="about-hero mx-auto max-w-4xl flex flex-col gap-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">About Rarecoin</span>
          <h1 className="font-heading text-5xl font-bold leading-tight text-white md:text-6xl">
            Built on one principle.<br />Scarcity creates value.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/45">
            But only a community can make that value mean something. Rarecoin is an attempt to answer honestly what a fair-launch community token can actually deliver — and to be transparent about what it cannot.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="about-block flex flex-col gap-5 rounded-3xl bg-white p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3355ff]/10">
              <Eye size={20} className="text-[#3355ff]" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Vision</span>
              <h2 className="font-heading text-2xl font-bold text-[#0b0c12]">The most genuinely community-owned digital asset in its category.</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#0b0c12]/55">
              A token whose culture, activity, and rewards are shaped by the people who hold it — launched with nothing hidden in the tokenomics.
            </p>
          </div>
          <div className="about-block flex flex-col gap-5 rounded-3xl bg-[#0b0c12] p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3355ff]/20">
              <Target size={20} className="text-[#3355ff]" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Mission</span>
              <h2 className="font-heading text-2xl font-bold text-white">Prove that a fair-launch token can deliver real, disclosed utility.</h2>
            </div>
            <p className="text-sm leading-relaxed text-white/45">
              Rewarding participation, contribution, and long-term holding through mechanisms that require no custom infrastructure — and being transparent, at every step, about what Rarecoin does and does not control.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-[#0b0c12] px-6 py-28 lg:px-16">
        <div className="mx-auto max-w-7xl flex flex-col gap-16">
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
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Team</span>
            <h2 className="font-heading text-4xl font-bold text-[#0b0c12] md:text-5xl">The people behind RARE.</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(({ name, role, bio }) => (
              <div key={name} className="about-member flex flex-col gap-4 rounded-2xl border border-[#0b0c12]/8 bg-white p-7">
                {/* Avatar placeholder */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3355ff]/10">
                  <span className="font-heading text-lg font-bold text-[#3355ff]">
                    {name.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-heading text-base font-bold text-[#0b0c12]">{name}</h3>
                  <span className="text-xs font-semibold text-[#3355ff]">{role}</span>
                </div>
                <p className="text-sm text-[#0b0c12]/50">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
