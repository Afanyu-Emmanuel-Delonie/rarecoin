"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Plus, Minus } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Is there a presale or team allocation?",
    a: "No. Every RARE token enters circulation through the public bonding curve on Proof. There is no presale, no private round, and no team tranche set aside before launch.",
  },
  {
    q: "What blockchain is Rarecoin on?",
    a: "Rarecoin launches on Solana as a standard SPL token, using Proof's bonding-curve fair-launch infrastructure.",
  },
  {
    q: "How does the burn mechanism work?",
    a: "A disclosed share of the trading fees earned by the creator wallet on Proof is used to buy back RARE on the open market and send it to a verifiable burn address. Burn events are announced in advance.",
  },
  {
    q: "What are backer wallets?",
    a: "If any project contributors hold RARE, those wallets are publicly disclosed so the community can monitor their activity on-chain. This is a transparency commitment, not a lockup.",
  },
  {
    q: "Is Rarecoin a DAO?",
    a: "No. Rarecoin uses community signaling — non-binding polls weighted by wallet balance — rather than a binding on-chain governance contract. Section 12 of the white paper explains this distinction in full.",
  },
  {
    q: "Where can I buy RARE?",
    a: "RARE launches on Proof's bonding curve. After graduation it will be available on a decentralized exchange. Always verify the official contract address through an authoritative Rarecoin channel before transacting.",
  },
];

// ── Ghost decoration — oversized, low-opacity background mark ──────────────────
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

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#0b0c12]/8">
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-heading text-base font-semibold text-[#0b0c12] group-hover:text-[#3355ff] transition-colors">
          {q}
        </span>
        {isOpen
          ? <Minus size={16} className="shrink-0 text-[#3355ff]" />
          : <Plus size={16} className="shrink-0 text-[#0b0c12]/30 group-hover:text-[#3355ff] transition-colors" />
        }
      </button>
      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? "max-h-64 pb-6" : "max-h-0"}`}>
        <p className="text-sm leading-relaxed text-[#0b0c12]/55">{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const mid = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, mid), faqs.slice(mid)];

  return (
    <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col">
          {col.map(({ q, a }, i) => {
            const index = colIdx * mid + i;
            return (
              <FAQItem
                key={q}
                q={q}
                a={a}
                isOpen={open === index}
                onToggle={() => setOpen(open === index ? null : index)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ctas-item",
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F6FB] px-6 py-16 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl flex flex-col gap-16 md:gap-24">

        {/* FAQ */}
        <div className="ctas-item flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-3xl font-bold text-[#0b0c12] md:text-4xl">
              Common questions,<br />straight answers.
            </h2>
          </div>
          <FAQ />
        </div>

        {/* CTA banner */}
        <div className="ctas-item relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#0b0c12] px-6 py-12 text-center md:px-16 md:py-16">
          {/* Subtle background spots */}
          <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(51,85,255,0.18) 0%, transparent 70%)" }} />
          <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(123,63,228,0.15) 0%, transparent 70%)" }} />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 text-white opacity-[0.04]">
            <GhostRings className="h-full w-full" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-7">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">
              Own the Rare
            </span>
            <h2 className="font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
              Shape the Future.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/45">
              No presale. No team allocation. 100% public from the first trade. The community is the product — come build it.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/join"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0b0c12] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3"
              >
                Join RARE Early
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/30 hover:bg-white/12"
              >
                White Paper
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
