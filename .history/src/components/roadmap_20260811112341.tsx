"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, MapPin, ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    number: "01",
    label: "Foundation",
    status: "done",
    period: "Pre-launch",
    summary: "Everything needed to launch with credibility — brand, documentation, community presence, and full transparency on how the project is structured.",
    items: [
      "Project conception & brand identity",
      "White paper publication",
      "Community launch across social channels",
      "Website & documentation live",
      "Backer wallet disclosure prepared",
    ],
    context: "This phase is complete. The white paper, website, and social channels are all live. Backer wallets are disclosed and verifiable on-chain.",
  },
  {
    number: "02",
    label: "Launch",
    status: "active",
    period: "Now",
    summary: "The token goes live on Proof's bonding curve. The first real community interactions begin — tipping, signaling, and the founding ambassador cohort.",
    items: [
      "Token launch on Proof bonding curve",
      "Peer-to-peer tipping live",
      "Community signaling channel opened",
      "Founding ambassador recruitment",
      "Creator fee share terms published",
    ],
    context: "This is the current phase. RARE is live on the bonding curve. Early holders are the founding community — the people who shape what comes next.",
  },
  {
    number: "03",
    label: "Growth",
    status: "upcoming",
    period: "Post-graduation",
    summary: "After the bonding curve graduates, RARE moves to a DEX. Membership tiers go live, the first burn event happens, and the ambassador program formalises.",
    items: [
      "Graduation to decentralised exchange",
      "Membership tier verification bot live",
      "First buyback-and-burn event",
      "Ambassador Program formalised",
      "Content & Culture Hub launch",
    ],
    context: "Graduation happens automatically when the bonding curve hits its target. Timing depends on trading volume — not a team decision.",
  },
  {
    number: "04",
    label: "Expansion",
    status: "upcoming",
    period: "6–12 months post-launch",
    summary: "The community grows beyond its founding cohort. OG recognition, expanded governance signals, and the first major community event.",
    items: [
      "Holder recognition / OG badge system",
      "Expanded community signaling topics",
      "First major community event",
      "Additional exchange visibility",
      "Contributor rewards expansion",
    ],
    context: "Timing here is intentionally flexible. The community's activity level determines how fast this phase arrives — not a fixed calendar date.",
  },
  {
    number: "05",
    label: "Long-Term",
    status: "upcoming",
    period: "12+ months",
    summary: "Strategic partnerships, international reach, charitable initiatives, and an honest evaluation of whether custom infrastructure makes sense.",
    items: [
      "Strategic community partnerships",
      "International community events",
      "Charitable initiative partnerships",
      "Evaluation of custom infrastructure",
      "Continued transparency reporting",
    ],
    context: "This phase is deliberately open-ended. Long-term direction is shaped by the community, not pre-decided by the team.",
  },
];

const statusConfig: Record<string, { label: string; pill: string; pillDark: string; dot: string; accent: string }> = {
  done:     { label: "Completed",   pill: "bg-[#3355ff]/10 text-[#3355ff]",   pillDark: "bg-[#3355ff]/20 text-[#7ea1ff]",  dot: "bg-[#3355ff]",      accent: "#3355ff" },
  active:   { label: "In Progress", pill: "bg-[#7b3fe4]/10 text-[#7b3fe4]",   pillDark: "bg-[#7b3fe4]/20 text-[#b98af5]",  dot: "bg-[#7b3fe4]",      accent: "#7b3fe4" },
  upcoming: { label: "Upcoming",    pill: "bg-[#0b0c12]/6 text-[#0b0c12]/40", pillDark: "bg-white/8 text-white/35",         dot: "bg-[#0b0c12]/20",   accent: "#0b0c12" },
};

function PhaseNode({ status }: { status: string }) {
  if (status === "done") return (
    <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3355ff]">
      <Check size={14} className="text-white" strokeWidth={3} />
    </span>
  );
  if (status === "active") return (
    <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7b3fe4]">
      <span className="absolute inset-0 rounded-full bg-[#7b3fe4] opacity-40 animate-ping" />
      <MapPin size={14} className="relative text-white" strokeWidth={2.5} />
    </span>
  );
  return (
    <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#0b0c12]/12 bg-[#F4F6FB]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0b0c12]/20" />
    </span>
  );
}

function ProgressStrip() {
  const done   = phases.filter((p) => p.status === "done").length;
  const active = phases.filter((p) => p.status === "active").length;
  const pct    = Math.round(((done + active * 0.5) / phases.length) * 100);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-[#0b0c12]/40 uppercase tracking-widest">Overall Progress</span>
        <span className="font-bold text-[#0b0c12]">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[#0b0c12]/8 overflow-hidden">
        <div className="h-full rounded-full bg-[#3355ff] transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex gap-4 flex-wrap">
        {[
          { label: "Completed", count: done,                          color: "bg-[#3355ff]" },
          { label: "Active",    count: active,                        color: "bg-[#7b3fe4]" },
          { label: "Upcoming",  count: phases.length - done - active, color: "bg-[#0b0c12]/15" },
        ].map(({ label, count, color }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-[#0b0c12]/40">
            <span className={`h-2 w-2 rounded-full ${color}`} />
            {count} {label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mobile card carousel ────────────────────────────────────────────────────────
function MobilePhaseCards() {
  const [current, setCurrent] = useState(1); // start on active phase
  const trackRef = useRef<HTMLDivElement>(null);
  const startX   = useRef(0);
  const isDrag   = useRef(false);

  const goTo = (idx: number) => setCurrent(Math.max(0, Math.min(phases.length - 1, idx)));

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) goTo(current + (dx > 0 ? 1 : -1));
  };

  // Mouse drag
  const onMouseDown  = (e: React.MouseEvent) => { startX.current = e.clientX; isDrag.current = true; };
  const onMouseUp    = (e: React.MouseEvent) => {
    if (!isDrag.current) return;
    isDrag.current = false;
    const dx = startX.current - e.clientX;
    if (Math.abs(dx) > 40) goTo(current + (dx > 0 ? 1 : -1));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Card viewport */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <div
          ref={trackRef}
          className="flex transition-transform duration-400 ease-out"
          style={{ transform: `translateX(calc(-${current * 100}%))` }}
        >
          {phases.map(({ number, label, status, period, summary, items, context }) => {
            const s = statusConfig[status];
            const isDone   = status === "done";
            const isActive = status === "active";
            const isDark   = isDone || isActive;

            return (
              <div
                key={number}
                className="w-full shrink-0 px-1"
              >
                <div
                  className={`relative flex flex-col gap-6 overflow-hidden rounded-3xl p-7 ${
                    isDark ? "bg-[#0b0c12] text-white" : "bg-white border border-[#0b0c12]/8 text-[#0b0c12]"
                  }`}
                >
                  {/* Ambient glow for active */}
                  {isActive && (
                    <div
                      className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(123,63,228,0.25) 0%, transparent 70%)" }}
                    />
                  )}
                  {isDone && (
                    <div
                      className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(51,85,255,0.18) 0%, transparent 70%)" }}
                    />
                  )}

                  {/* Header row */}
                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className={`text-xs font-bold tracking-widest uppercase ${isDark ? "text-white/30" : "text-[#0b0c12]/25"}`}>
                        Phase {number}
                      </span>
                      <h3 className={`font-heading text-2xl font-bold ${isDark ? "text-white" : "text-[#0b0c12]"}`}>
                        {label}
                      </h3>
                    </div>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${isDark ? s.pillDark : s.pill}`}>
                      {s.label}
                    </span>
                  </div>

                  {/* Period */}
                  <div className={`flex items-center gap-1.5 text-xs ${isDark ? "text-white/35" : "text-[#0b0c12]/35"}`}>
                    <Clock size={11} />
                    {period}
                  </div>

                  {/* Summary */}
                  <p className={`text-sm leading-relaxed ${isDark ? "text-white/55" : "text-[#0b0c12]/55"}`}>
                    {summary}
                  </p>

                  {/* Milestones */}
                  <ul className="flex flex-col gap-2.5">
                    {items.map((item) => (
                      <li key={item} className={`flex items-start gap-3 text-sm ${isDark ? "text-white/60" : "text-[#0b0c12]/60"}`}>
                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Context note */}
                  <div className={`rounded-2xl px-4 py-3.5 ${isDark ? "bg-white/6 border border-white/8" : "bg-[#F4F6FB] border border-[#0b0c12]/6"}`}>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-white/40" : "text-[#0b0c12]/45"}`}>
                      {context}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nav row — prev/next + dot indicators */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0b0c12]/10 text-[#0b0c12]/40 transition-all disabled:opacity-20 active:scale-95"
          aria-label="Previous phase"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {phases.map((p, i) => {
            const s = statusConfig[p.status];
            return (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to phase ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2"
                    : "w-2 h-2 opacity-30"
                }`}
                style={{ backgroundColor: i === current ? s.accent : "#0b0c12" }}
              />
            );
          })}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === phases.length - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0b0c12]/10 text-[#0b0c12]/40 transition-all disabled:opacity-20 active:scale-95"
          aria-label="Next phase"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Phase label below dots */}
      <p className="text-center text-xs text-[#0b0c12]/35">
        {current + 1} of {phases.length} — {phases[current].label}
      </p>
    </div>
  );
}

export default function Roadmap() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".road-word", { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.7, stagger: 0.12 });
      tl.fromTo(".road-sub",  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      tl.fromTo(".road-cta",  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.3");

      gsap.fromTo(".road-progress", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".road-progress", start: "top 85%" } });
      gsap.fromTo(".road-phase",    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".road-phase", start: "top 85%" } });
      gsap.fromTo(".road-mobile-cards", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".road-mobile-cards", start: "top 85%" } });
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
            <span className="road-word block">Five phases.</span>
            <span className="road-word block text-[#0f3f93]">One direction.</span>
          </h1>
          <p className="road-sub max-w-sm text-sm leading-relaxed text-[#0b0c12]/55 sm:max-w-xl lg:max-w-2xl">
            Actual timing depends on community activity and market conditions. Each phase is a stated intention, not a guarantee — and every milestone is disclosed publicly.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/community"
              className="road-cta group inline-flex items-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3">
              Join the Community <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/tokenomics"
              className="road-cta inline-flex items-center gap-2 rounded-full border border-[#3355ff]/25 bg-[#3355ff]/6 px-6 py-3 text-sm font-semibold text-[#0f3f93] transition-all hover:border-[#3355ff]/50 hover:bg-[#3355ff]/12">
              View Tokenomics
            </Link>
          </div>
        </div>
      </section>

      {/* ── Progress + phases ── */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-28 lg:px-16">
        <div className="flex flex-col gap-10 md:gap-16">

          {/* Progress strip */}
          <div className="road-progress rounded-3xl bg-white border border-[#0b0c12]/6 p-6 md:p-8">
            <ProgressStrip />
          </div>

          {/* Mobile card carousel */}
          <div className="road-mobile-cards md:hidden">
            <MobilePhaseCards />
          </div>

          {/* Desktop timeline accordion */}
          <div className="hidden md:flex flex-col">
            {phases.map(({ number, label, status, period, summary, items, context }, i) => {
              const isOpen   = active === i;
              const s        = statusConfig[status];
              const prevDone = i > 0 && phases[i - 1].status === "done";
              const thisDone = status === "done";

              return (
                <div key={number} className="road-phase flex gap-8">
                  {/* Track */}
                  <div className="flex w-7 shrink-0 flex-col items-center">
                    {i > 0 && (
                      <div className={`h-7 border-l-2 ${prevDone ? "border-solid border-[#3355ff]" : "border-dashed border-[#0b0c12]/12"}`} />
                    )}
                    <PhaseNode status={status} />
                    {i < phases.length - 1 && (
                      <div className={`flex-1 border-l-2 ${thisDone ? "border-solid border-[#3355ff]" : "border-dashed border-[#0b0c12]/12"}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <button
                      onClick={() => setActive(isOpen ? -1 : i)}
                      className="group flex w-full items-start gap-4 rounded-2xl px-4 py-5 text-left transition-colors hover:bg-white"
                    >
                      <span className="font-heading text-xs font-bold text-[#0b0c12]/20 mt-1">{number}</span>
                      <div className="flex flex-1 flex-col gap-1">
                        <span className="font-heading text-xl font-bold text-[#0b0c12]">{label}</span>
                        <span className="text-sm text-[#0b0c12]/45">{summary}</span>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${s.pill}`}>{s.label}</span>
                        <div className="flex items-center gap-1 text-xs text-[#0b0c12]/30">
                          <Clock size={11} />
                          {period}
                        </div>
                      </div>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                        className={`mt-1 shrink-0 text-[#0b0c12]/25 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                        <path d="M4 6.5L9 11.5L14 6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] pb-8" : "max-h-0"}`}>
                      <div className="ml-4 flex flex-col gap-6 px-4">
                        <ul className="flex flex-col gap-3">
                          {items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-[#0b0c12]/60">
                              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="rounded-2xl border border-[#0b0c12]/6 bg-white px-5 py-4">
                          <p className="text-xs leading-relaxed text-[#0b0c12]/45">{context}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="rounded-3xl border border-[#0b0c12]/6 bg-white p-6 md:p-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0b0c12]/30">Disclaimer</span>
              <p className="text-sm leading-relaxed text-[#0b0c12]/50">
                This roadmap represents the current intentions of the Rarecoin project. No phase constitutes a binding commitment or guarantee of delivery. Timing is indicative only and subject to change based on community activity, market conditions, and technical factors outside the team's control. Nothing here constitutes financial or investment advice.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
