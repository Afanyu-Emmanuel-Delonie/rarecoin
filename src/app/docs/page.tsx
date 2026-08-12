import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "White Paper",
  description:
    "The Rarecoin (RARE) white paper: fair launch mechanics on Proof, fixed 1,000,000,000 RARE supply, burn model, signal-based governance, and full tokenomics.",
  alternates: { canonical: "/docs" },
};

const sections = [
  { num: "01", title: "Executive Summary",              anchor: "executive-summary" },
  { num: "02", title: "Vision & Mission",               anchor: "vision-mission" },
  { num: "03", title: "Core Values",                    anchor: "core-values" },
  { num: "04", title: "Market Overview & The Problem",  anchor: "market-overview" },
  { num: "05", title: "The Rarecoin Solution",          anchor: "solution" },
  { num: "06", title: "Community Ecosystem",            anchor: "ecosystem" },
  { num: "07", title: "Utility Cases",                  anchor: "utility" },
  { num: "08", title: "Technical Architecture",         anchor: "technical" },
  { num: "09", title: "Tokenomics",                     anchor: "tokenomics" },
  { num: "10", title: "Fair Launch Mechanics",          anchor: "fair-launch" },
  { num: "11", title: "Deflationary Model & Burn",      anchor: "burn" },
  { num: "12", title: "Governance Model",               anchor: "governance" },
  { num: "13", title: "Security & Risk Management",     anchor: "security" },
  { num: "14", title: "Community & Growth Strategy",    anchor: "growth" },
  { num: "15", title: "Revenue Model & Sustainability", anchor: "revenue" },
  { num: "16", title: "Competitive Landscape",          anchor: "competitive" },
  { num: "17", title: "Roadmap",                        anchor: "roadmap" },
  { num: "18", title: "Long-Term Vision (5 Years)",     anchor: "vision-5yr" },
  { num: "19", title: "Team & Advisors",                anchor: "team" },
  { num: "20", title: "Legal & Regulatory",             anchor: "legal" },
  { num: "21", title: "Risk Factors & Disclosures",     anchor: "risks" },
  { num: "22", title: "Glossary of Terms",              anchor: "glossary" },
  { num: "23", title: "Conclusion",                     anchor: "conclusion" },
  { num: "24", title: "Full Disclaimer & Legal Notice", anchor: "disclaimer" },
];

const glossary = [
  { term: "Bonding Curve",    def: "A pre-set pricing formula where a token's price rises and falls automatically with buy and sell volume, without a traditional order book." },
  { term: "Fair Launch",      def: "A token distribution method with no presale or pre-allocated insider tranche; all participants acquire tokens through the same public mechanism." },
  { term: "Graduation",       def: "The point at which a bonding-curve token's accumulated liquidity migrates to a decentralized exchange." },
  { term: "Backer Wallet",    def: "A wallet holding RARE affiliated with the Rarecoin project's contributors or founders, disclosed publicly for transparency." },
  { term: "Creator Fee",      def: "A share of trading fees that launch platforms such as Proof pay to a token's creator wallet based on trading activity." },
  { term: "Burn",             def: "The permanent removal of tokens from circulating supply by sending them to an inaccessible address." },
  { term: "SPL Token",        def: "The standard token format on the Solana blockchain." },
  { term: "DAO",              def: "An organization governed by rules encoded in smart contracts with binding, token-holder voting. Rarecoin does not currently operate as a DAO." },
];

export default function DocsPage() {
  return (
    <div className="bg-[#08090D] pt-20">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "White Paper", path: "/docs" }]} />
      <div className="bg-[#111318] px-6 pt-28 pb-16 lg:px-16">
        <div className="mx-auto max-w-7xl flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Documentation</span>
            <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">White Paper<br />25th July 2026</h1>
          </div>
          <Link href="https://x.com/TherealRarecoin" target="_blank"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#08090D] transition-all hover:bg-[#F0D77A] hover:gap-3">
            Follow Updates
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-16">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">

          {/* Table of contents */}
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-white/30">Table of Contents</h2>
            <div className="flex flex-col divide-y divide-white/8">
              {sections.map(({ num, title, anchor }) => (
                <a key={num} href={`#${anchor}`}
                  className="group flex items-center gap-3 py-3 text-sm text-white/45 transition-colors hover:text-[#D4AF37]">
                  <span className="font-heading text-xs font-bold text-white/20">{num}</span>
                  {title}
                </a>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col gap-12 md:col-span-2">

            {/* Important notice */}
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6">
              <p className="text-sm leading-relaxed text-white/60">
                <strong className="text-white">Important Notice:</strong> This White Paper is provided for general informational purposes only. It does not constitute an offer to sell, or a solicitation of an offer to buy, any security or investment product. Digital assets are volatile and involve significant risk, including the possible loss of the entire amount contributed.
              </p>
            </div>

            {/* Glossary */}
            <div id="glossary" className="flex flex-col gap-6">
              <h2 className="font-heading text-2xl font-bold text-white">Glossary of Terms</h2>
              <div className="flex flex-col gap-4">
                {glossary.map(({ term, def }) => (
                  <div key={term} className="flex flex-col gap-1.5 rounded-xl border border-white/6 bg-white/3 p-5">
                    <span className="font-heading text-sm font-bold text-[#D4AF37]">{term}</span>
                    <p className="text-sm leading-relaxed text-white/50">{def}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div id="disclaimer" className="flex flex-col gap-4 rounded-2xl bg-[#0b0c12] p-8">
              <h2 className="font-heading text-xl font-bold text-white">Full Disclaimer & Legal Notice</h2>
              <p className="text-sm leading-relaxed text-white/45">
                This White Paper is provided for general informational purposes only. It does not constitute, and must not be relied upon as, an offer to sell, or a solicitation of an offer to buy, any security, investment, or financial product in any jurisdiction, nor does it constitute financial, investment, legal, accounting, or tax advice.
              </p>
              <p className="text-sm leading-relaxed text-white/45">
                Digital assets, including RARE, are volatile, speculative, and involve a high degree of risk, including the potential loss of the entire amount contributed or held. Prospective participants are strongly encouraged to conduct independent research and to consult qualified legal, financial, and tax advisors before acquiring, holding, or using RARE.
              </p>
              <p className="text-sm leading-relaxed text-white/35">
                The Rarecoin project, its founders, team members, advisors, and affiliates disclaim, to the fullest extent permitted by applicable law, any liability for direct or indirect loss arising from the use of, or reliance on, this Document or participation in the Rarecoin ecosystem.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
