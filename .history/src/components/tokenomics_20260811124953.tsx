"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Wallet, Flame, ArrowRight, Lock, Zap, ShieldCheck, BarChart3 } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const facts = [
  { label: "Ticker",      value: "RARE" },
  { label: "Blockchain",  value: "Solana" },
  { label: "Standard",    value: "SPL Token" },
  { label: "Launch",      value: "Proof · Bonding Curve" },
  { label: "Max Supply",  value: "1,000,000,000" },
  { label: "Presale",     value: "None" },
];

const stats = [
  { value: "1B",    label: "Max Supply",       sub: "Hard cap forever" },
  { value: "0%",    label: "Team Allocation",  sub: "No insider cut" },
  { value: "0%",    label: "Presale",          sub: "No private round" },
  { value: "100%",  label: "Public Curve",     sub: "Every single token" },
];

const comparison = [
  { field: "Team allocation",       typical: "5–15% set aside pre-launch",    rarecoin: "None — zero" },
  { field: "Vesting schedule",      typical: "Cliff + 1–4yr linear unlock",   rarecoin: "Not applicable" },
  { field: "Presale / private round", typical: "Common, often discounted",    rarecoin: "None" },
  { field: "Initial liquidity",     typical: "Team- or investor-funded",      rarecoin: "Formed by bonding curve" },
  { field: "Supply at launch",      typical: "Partial rest locked/vesting", rarecoin: "100% tradable from trade one" },
  { field: "Minting after launch",  typical: "Sometimes possible via governance", rarecoin: "Impossible — no mint function" },
];

const feeFlow = [
  { icon: TrendingUp, label: "Trading Fees",      description: "Every trade on Proof's bonding curve generates a fee. This is the engine that funds everything downstream." },
  { icon: Wallet,     label: "Creator Fee Share", description: "A disclosed percentage of those fees flows to the creator wallet. The exact share is published and verifiable on-chain." },
  { icon: Flame,      label: "Rewards & Burn",    description: "That share is split between contributor rewards (paid in RARE) and buyback-and-burn events that permanently reduce supply." },
];

const explainers = [
  {
    icon: Lock,
    title: "Why a hard cap matters",
    body: "Most tokens reserve the right to mint more. RARE has no mint function — the 1,000,000,000 cap is enforced at the protocol level, not by a promise. No governance vote, no team decision can change it.",
  },
  {
    icon: Zap,
    title: "What the bonding curve does",
    body: "Proof's bonding curve sets the price algorithmically based on supply and demand. Early buyers pay less; later buyers pay more. There is no fixed ICO price and no team deciding who gets in first.",
  },
  {
    icon: ShieldCheck,
    title: "How backer wallets work",
    body: "Any project contributor who holds RARE discloses their wallet address publicly. The community can monitor those wallets on-chain at any time. This is a transparency commitment, not a lockup.",
  },
  {
    icon: BarChart3,
    title: "What graduation means",
    body: "When the bonding curve reaches its target, RARE graduates to a decentralised exchange. Liquidity is locked automatically by Proof's infrastructure — no manual step, no team control over the pool.",
  },
];

function DistributionGraphic() {
  return (
    <svg viewBox="0 0 320 320" fill="none" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <circle cx="160" cy="160" r="130" stroke="#3355ff" strokeWidth="28" opacity="0.08" />
      <circle cx="160" cy="160" r="130" stroke="#3355ff" strokeWidth="28"
        strokeDasharray="817 0" strokeLinecap="round" transform="rotate(-90 160 160)" opacity="0.85" />
      <circle cx="160" cy="160" r="95" stroke="#0f3f93" strokeWidth="1" strokeDasharray="4 5" opacity="0.2" />
      <text x="160" y="148" textAnchor="middle" fontSize="42" fontWeight="700" fill="#0b0c12" fontFamily="Space Grotesk, sans-serif">100%</text>
      <text x="160" y="172" textAnchor="middle" fontSize="11" fill="#0b0c12" opacity="0.35" fontFamily="Space Grotesk, sans-serif" letterSpacing="2">PUBLIC</text>
      <rect x="88" y="198" width="144" height="30" rx="15" fill="#3355ff" opacity="0.1" />
      <text x="160" y="218" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3355ff" fontFamily="Space Grotesk, sans-serif">Bonding Curve Only</text>
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
        return (
          <line key={i}
            x1={160 + 148 * Math.cos(a)} y1={160 + 148 * Math.sin(a)}
            x2={160 + 156 * Math.cos(a)} y2={160 + 156 * Math.sin(a)}
            stroke="#0b0c12" strokeWidth="1.5" opacity="0.08"
          />
        );
      })}
    </svg>
  );
}

export default function Tokenomics() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".tok-word", { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.12 });
      tl.fromTo(".tok-sub",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      tl.fromTo(".tok-fact", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, "-=0.3");

      gsap.fromTo(".tok-stat",    { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".tok-stat",    start: "top 85%" } });
      gsap.fromTo(".tok-graphic", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".tok-graphic", start: "top 85%" } });
      gsap.fromTo(".tok-row",     { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: ".tok-row",     start: "top 85%" } });
      gsap.fromTo(".tok-flow",    { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".tok-flow",    start: "top 88%" } });
      gsap.fromTo(".tok-explain", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1,  ease: "power3.out", scrollTrigger: { trigger: ".tok-explain", start: "top 85%" } });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-20 bg-[#F4F6FB]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen overflow-hidden bg-[#F4F6FB] flex flex-col justify-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-72"
            style={{ background: "linear-gradient(to bottom, rgba(15,63,147,0.08) 0%, rgba(15,63,147,0.03) 50%, transparent 100%)" }} />
          <div className="absolute right-0 top-0 h-[420px] w-[420px] translate-x-1/4 -translate-y-1/4 rounded-full sm:h-[600px] sm:w-[600px] xl:h-[760px] xl:w-[760px]"
            style={{ background: "radial-gradient(circle, rgba(15,63,147,0.10) 0%, transparent 68%)" }} />
          <div className="absolute left-0 bottom-0 h-[320px] w-[320px] -translate-x-1/3 translate-y-1/3 rounded-full sm:h-[440px] sm:w-[440px] xl:h-[560px] xl:w-[560px]"
            style={{ background: "radial-gradient(circle, rgba(15,63,147,0.07) 0%, transparent 68%)" }} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
          style={{ background: "linear-gradient(to bottom, transparent 0%, #F4F6FB 100%)" }} />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-6 py-16 text-center sm:gap-6 sm:py-20 md:py-28 lg:gap-7 lg:px-10 lg:py-32 xl:px-16 xl:py-40">
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-[#0b0c12] sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
            <span className="tok-word block">Nothing hidden</span>
            <span className="tok-word block text-[#0f3f93]">in the numbers.</span>
          </h1>
          <p className="tok-sub max-w-sm text-sm leading-relaxed text-[#0b0c12]/55 sm:max-w-xl lg:max-w-2xl">
            No allocation pools, no vesting cliffs, no team tranche. Every RARE token enters circulation the same way through the public bonding curve on Proof.
          </p>
          {/* Token facts strip */}
          <div className="flex flex-wrap justify-center gap-2">
            {facts.map(({ label, value }) => (
              <div key={label} className="tok-fact flex items-center gap-2 rounded-full border border-[#0b0c12]/10 bg-white px-4 py-2 text-xs">
                <span className="text-[#0b0c12]/35">{label}</span>
                <span className="font-semibold text-[#0b0c12]/80">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/docs"
              className="tok-fact group inline-flex items-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3">
              Read White Paper <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/roadmap"
              className="tok-fact inline-flex items-center gap-2 rounded-full border border-[#3355ff]/25 bg-[#3355ff]/6 px-6 py-3 text-sm font-semibold text-[#0f3f93] transition-all hover:border-[#3355ff]/50 hover:bg-[#3355ff]/12">
              View Roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* ── Key stats ── */}
      <div className="bg-[#0b0c12] px-6 py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-px bg-white/8 rounded-2xl overflow-hidden md:grid-cols-4">
            {stats.map(({ value, label, sub }) => (
              <div key={label} className="tok-stat flex flex-col gap-1.5 bg-[#0b0c12] px-8 py-10">
                <span className="font-heading text-5xl font-bold text-white">{value}</span>
                <span className="text-sm font-semibold text-white/70">{label}</span>
                <span className="text-xs text-white/30">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Distribution + comparison ── */}
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Supply Distribution</span>
            <h2 className="font-heading text-4xl font-bold text-[#0b0c12] md:text-5xl">The full circle is yours.</h2>
            <p className="max-w-xl text-sm leading-relaxed text-[#0b0c12]/50">
              There is no pie chart with a team slice, an investor slice, or a treasury slice. The entire supply enters through one channel — the public bonding curve.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
            <div className="tok-graphic">
              <DistributionGraphic />
              <p className="mt-4 max-w-[220px] mx-auto text-center text-xs leading-relaxed text-[#0b0c12]/35">
                No team, presale, or treasury slice — the full circle is the public curve.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="mb-4 grid grid-cols-[1.2fr_1fr_1fr] gap-3 text-xs font-semibold uppercase tracking-widest text-[#0b0c12]/30">
                <span>Field</span>
                <span>Typical Token</span>
                <span className="text-[#3355ff]">Rarecoin</span>
              </div>
              {comparison.map(({ field, typical, rarecoin }) => (
                <div key={field} className="tok-row grid grid-cols-[1.2fr_1fr_1fr] gap-3 rounded-xl border border-transparent px-4 py-3.5 text-sm transition-colors hover:border-[#0b0c12]/6 hover:bg-white">
                  <span className="font-medium text-[#0b0c12]/70">{field}</span>
                  <span className="text-[#0b0c12]/35">{typical}</span>
                  <span className="font-semibold text-[#0b0c12]">{rarecoin}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── How fees work ── */}
      <div className="bg-[#0b0c12] px-6 py-28 lg:px-16">
        <div className="mx-auto max-w-7xl flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Sustainability</span>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Where the fees go.</h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/40">
              Rarecoin doesn't rely on a pre-minted treasury. Rewards and burns are funded by real trading activity — disclosed, verifiable, and proportional to actual usage.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
            {feeFlow.map(({ icon: Icon, label, description }, i) => (
              <div key={label} className="flex flex-1 items-center gap-3">
                <div className="tok-flow flex flex-1 flex-col gap-4 rounded-2xl border border-white/8 bg-white/4 p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3355ff]/15">
                    <Icon size={20} className="text-[#3355ff]" strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-heading text-base font-bold text-white">{label}</span>
                    <span className="text-sm leading-relaxed text-white/45">{description}</span>
                  </div>
                  <div className="mt-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-xs font-bold text-white/30">
                    {i + 1}
                  </div>
                </div>
                {i < feeFlow.length - 1 && (
                  <ArrowRight size={18} className="hidden shrink-0 text-white/15 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Explainers ── */}
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-16">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">How It Works</span>
            <h2 className="font-heading text-4xl font-bold text-[#0b0c12] md:text-5xl">The mechanics, explained.</h2>
            <p className="max-w-xl text-sm leading-relaxed text-[#0b0c12]/50">
              No jargon. Just clear answers to the questions every new holder should ask before buying.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {explainers.map(({ icon: Icon, title, body }) => (
              <div key={title} className="tok-explain flex flex-col gap-4 rounded-3xl bg-white p-8 border border-[#0b0c12]/6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3355ff]/10">
                  <Icon size={20} className="text-[#3355ff]" strokeWidth={1.75} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-lg font-bold text-[#0b0c12]">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#0b0c12]/55">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="mx-auto max-w-7xl px-6 pb-28 lg:px-16">
        <div className="flex flex-col gap-4 rounded-3xl bg-[#0b0c12] p-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-xl font-bold text-white">Want the full picture?</h3>
            <p className="text-sm text-white/40">The white paper covers every number in detail.</p>
          </div>
          <Link href="/docs"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#0f3f93] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#0b0c12] hover:gap-3">
            Read White Paper
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
