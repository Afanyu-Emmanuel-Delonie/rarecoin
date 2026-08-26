"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, AlertTriangle, Wallet, CircleDollarSign, ArrowLeftRight, ShieldCheck } from "lucide-react";
import { RARE_CONFIG } from "@/lib/token-config";
import PageHero from "@/components/page-hero";

const wallets = [
  { name: "Phantom", href: "https://phantom.app" },
  { name: "Backpack", href: "https://backpack.app" },
  { name: "Solflare", href: "https://solflare.com" },
];

function ContractAddress() {
  const [copied, setCopied] = useState(false);
  const { contractAddress } = RARE_CONFIG;

  if (!contractAddress) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-5 py-4">
        <AlertTriangle size={16} className="shrink-0 text-white/30" />
        <p className="text-sm text-white/40">Contract address not yet published here — check @TherealRarecoin before you transact.</p>
      </div>
    );
  }

  const copy = async () => {
    await navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/6 px-5 py-4 text-left transition-colors hover:border-[#D4AF37]/40"
    >
      <span className="truncate font-mono text-sm text-white/80">{contractAddress}</span>
      {copied
        ? <Check size={16} className="shrink-0 text-[#D4AF37]" />
        : <Copy size={16} className="shrink-0 text-white/30 transition-colors group-hover:text-[#D4AF37]" />
      }
    </button>
  );
}

function SwapStep() {
  const { contractAddress, graduated, proofUrl, jupiterUrl } = RARE_CONFIG;
  const href = graduated ? jupiterUrl : proofUrl;
  const venue = graduated ? "Jupiter" : "Proof";

  if (!contractAddress || !href) {
    return (
      <span className="mt-1 block text-sm font-semibold text-white/25">Swap link goes live with the contract address above</span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-semibold text-[#F0D77A] hover:underline">
      Swap on {venue} →
    </a>
  );
}

const steps = [
  {
    icon: Wallet,
    num: "01",
    title: "Get a wallet",
    desc: "A non-custodial Solana wallet you control. Any of the three below works — install the browser extension or mobile app and set it up in a couple of minutes.",
  },
  {
    icon: CircleDollarSign,
    num: "02",
    title: "Fund with SOL",
    desc: "New to Solana? Buy SOL with a card straight from inside your wallet's on-ramp. Already have SOL on an exchange? Send it to your wallet address.",
  },
  {
    icon: ArrowLeftRight,
    num: "03",
    title: "Swap for RARE",
    desc: "Paste or confirm the official contract address, then swap. Where you swap depends on whether the bonding curve has graduated to a DEX yet — the link below always points to the current venue.",
  },
  {
    icon: ShieldCheck,
    num: "04",
    title: "Verify & hold",
    desc: "Check your wallet balance matches what you swapped for. If RARE doesn't show up automatically, add it manually using the same contract address.",
  },
];

export default function GetRarePage() {
  return (
    <div className="bg-[#08090D]">
      <PageHero>
        <h1 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-[1.05] md:text-5xl lg:text-6xl">
          <span className="page-hero-word block">Four steps.</span>
          <span className="page-hero-word block text-[#D4AF37]">No jargon assumed.</span>
        </h1>
        <p className="page-hero-sub max-w-sm text-sm leading-relaxed text-white/45 sm:max-w-xl sm:text-base md:text-lg lg:max-w-2xl">
          Wallet, funds, swap, verify. If you&rsquo;ve never touched Solana before, start at step one.
        </p>
      </PageHero>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16">
        <div className="mx-auto max-w-2xl flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Official contract address</span>
          <ContractAddress />
          <p className="text-xs leading-relaxed text-white/30">
            A separate, unaffiliated token also uses the Rarecoin name on Solana. Always match the address above — never trust one shared in a DM or an unofficial group.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-4">
          {steps.map(({ icon: Icon, num, title, desc }) => (
            <div key={num} className="flex flex-col gap-4 rounded-3xl border border-white/6 bg-[#111318] p-7 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
                <Icon size={19} className="text-[#D4AF37]" strokeWidth={1.75} />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-white/25">{num}</span>
                  <h3 className="font-heading text-lg font-bold text-white">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/45">{desc}</p>

                {num === "01" && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {wallets.map(({ name, href }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-xs font-semibold text-white/60 transition-colors hover:border-[#D4AF37]/40 hover:text-white"
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                )}

                {num === "03" && <SwapStep />}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <Link
            href="/faq"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition-colors hover:text-[#D4AF37]"
          >
            More questions? Read the FAQ
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
