"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Is there a presale or team allocation?", a: "No. Every RARE token enters circulation through the public bonding curve on Proof. There is no presale, no private round, and no team tranche set aside before launch." },
  { q: "What blockchain is Rarecoin on?", a: "Rarecoin launches on Solana as a standard SPL token, using Proof's bonding-curve fair-launch infrastructure." },
  { q: "How does the burn mechanism work?", a: "A disclosed share of the trading fees earned by the creator wallet on Proof is used to buy back RARE on the open market and send it to a verifiable burn address. Burn events are announced in advance." },
  { q: "What are backer wallets?", a: "If any project contributors hold RARE, those wallets are publicly disclosed so the community can monitor their activity on-chain. This is a transparency commitment, not a lockup." },
  { q: "Is Rarecoin a DAO?", a: "No. Rarecoin uses community signaling — non-binding polls weighted by wallet balance — rather than a binding on-chain governance contract. Section 12 of the white paper explains this distinction in full." },
  { q: "Where can I buy RARE?", a: "RARE launches on Proof's bonding curve. After graduation it will be available on a decentralized exchange. Always verify the official contract address through an authoritative Rarecoin channel before transacting." },
  { q: "What is the maximum supply?", a: "1,000,000,000 RARE. This is a hard cap — there is no minting function and no mechanism to increase supply after launch." },
  { q: "How are contributor rewards funded?", a: "Through a disclosed share of the trading fees the creator wallet earns on Proof. The exact split is published before launch and updated publicly if it changes." },
  { q: "What happens after graduation?", a: "When RARE reaches Proof's graduation threshold, accumulated liquidity migrates to a decentralized exchange. The specific mechanics are determined by Proof and will be disclosed to the community at launch." },
  { q: "How do I verify the official contract address?", a: "Always check an authoritative Rarecoin channel — our official X account (@TherealRarecoin) or website — before every transaction. Never trust contract addresses shared in DMs or unofficial groups." },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-[#F4F6FB] pt-20">
      <div className="bg-[#0b0c12] px-6 pt-28 pb-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">FAQ</span>
          <h1 className="mt-3 font-heading text-5xl font-bold text-white md:text-6xl">Common questions,<br />straight answers.</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-16">
        <div className="flex flex-col divide-y divide-[#0b0c12]/8">
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
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? "max-h-48 pb-6" : "max-h-0"}`}>
                <p className="text-sm leading-relaxed text-[#0b0c12]/55">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
