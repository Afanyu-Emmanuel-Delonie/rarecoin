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

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-0 divide-y divide-[#0b0c12]/8">
      {faqs.map(({ q, a }, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="group flex w-full items-center justify-between gap-6 py-6 text-left"
          >
            <span className="font-heading text-base font-semibold text-[#0b0c12] group-hover:text-[#3355ff] transition-colors">
              {q}
            </span>
            {open === i
              ? <Minus size={16} className="shrink-0 text-[#3355ff]" />
              : <Plus size={16} className="shrink-0 text-[#0b0c12]/30 group-hover:text-[#3355ff] transition-colors" />
            }
          </button>
          <div className={`overflow-hidden transition-all duration-400 ease-in-out ${open === i ? "max-h-48 pb-6" : "max-h-0"}`}>
            <p className="text-sm leading-relaxed text-[#0b0c12]/55">{a}</p>
          </div>
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
    <section ref={sectionRef} className="bg-[#F4F6FB] px-6 py-28 lg:px-16">
      <div className="mx-auto max-w-7xl flex flex-col gap-24">

        {/* FAQ + Contact grid */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">

          {/* FAQ */}
          <div className="ctas-item flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">FAQ</span>
              <h2 className="font-heading text-3xl font-bold text-[#0b0c12] md:text-4xl">
                Common questions,<br />straight answers.
              </h2>
            </div>
            <FAQ />
          </div>

          {/* Contact */}
          <div className="ctas-item flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">Contact</span>
              <h2 className="font-heading text-3xl font-bold text-[#0b0c12] md:text-4xl">
                Get in touch<br />with the team.
              </h2>
              <p className="text-sm leading-relaxed text-[#0b0c12]/50">
                For partnership enquiries, press, or general questions — reach us directly. Community support is best handled in our public channels.
              </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0b0c12]/50 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="rounded-xl border border-[#0b0c12]/12 bg-white px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/30 outline-none focus:border-[#3355ff]/50 focus:ring-2 focus:ring-[#3355ff]/10 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0b0c12]/50 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="rounded-xl border border-[#0b0c12]/12 bg-white px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/30 outline-none focus:border-[#3355ff]/50 focus:ring-2 focus:ring-[#3355ff]/10 transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0b0c12]/50 uppercase tracking-wider">Message</label>
                <textarea
                  rows={5}
                  placeholder="What's on your mind?"
                  className="rounded-xl border border-[#0b0c12]/12 bg-white px-4 py-3 text-sm text-[#0b0c12] placeholder:text-[#0b0c12]/30 outline-none focus:border-[#3355ff]/50 focus:ring-2 focus:ring-[#3355ff]/10 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3355ff] hover:gap-3"
              >
                Send Message
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>

        {/* CTA banner */}
        <div className="ctas-item relative overflow-hidden rounded-3xl bg-[#0b0c12] px-10 py-16 text-center md:px-20">
          {/* Subtle background spots */}
          <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(51,85,255,0.18) 0%, transparent 70%)" }} />
          <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(123,63,228,0.15) 0%, transparent 70%)" }} />

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
                href="/docs"
                className="group inline-flex items-center gap-2 rounded-full bg-[#3355ff] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#2244ee] hover:gap-3"
              >
                Read White Paper
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="https://x.com/TherealRarecoin"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/30 hover:bg-white/12"
              >
                Follow on X
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
