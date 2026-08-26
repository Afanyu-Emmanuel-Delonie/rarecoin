import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Disclaimer & Risk Factors",
  description:
    "Rarecoin (RARE) legal disclaimer and risk factors: no offer to sell securities, digital asset volatility, platform dependency, regulatory uncertainty, and impersonation risk.",
  alternates: { canonical: "/legal" },
};

const riskFactors = [
  { title: "Price volatility", body: "RARE is a speculative digital asset. Its price can rise or fall sharply with no floor, and holders can lose the entire amount contributed." },
  { title: "Platform dependency", body: "RARE's launch and trading mechanics rely on Proof and the Solana network. Outages, exploits, or changes to either are outside the Rarecoin project's control." },
  { title: "No guarantee of utility or value", body: "Utility features described across this site are intentions, not guarantees. None of them entitle a holder to profit, dividends, or a claim on any entity." },
  { title: "Regulatory uncertainty", body: "The legal treatment of digital assets varies by jurisdiction and is evolving. Future regulation could restrict how RARE is bought, sold, or used." },
  { title: "Community-dependent roadmap", body: "Timing for every roadmap phase depends on community activity and market conditions. No phase is a binding commitment." },
  { title: "Impersonation risk", body: "Tokens using the Rarecoin name exist at other, unaffiliated contract addresses. Always verify the official contract through @TherealRarecoin before transacting." },
];

export default function LegalPage() {
  return (
    <div className="bg-[#08090D] pt-20">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Disclaimer & Risk Factors", path: "/legal" }]} />
      <div className="bg-[#111318] px-6 pt-28 pb-16 lg:px-16">
        <div className="mx-auto max-w-3xl flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Legal</span>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">Disclaimer &<br />Risk Factors</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-16">
        <div className="flex flex-col gap-16">

          <section id="disclaimer" className="scroll-mt-24 flex flex-col gap-4 rounded-2xl bg-[#111318] border border-white/6 p-8">
            <h2 className="font-heading text-xl font-bold text-white">Full Disclaimer & Legal Notice</h2>
            <p className="text-sm leading-relaxed text-white/45">
              This site is provided for general informational purposes only. It does not constitute, and must not be relied upon as, an offer to sell, or a solicitation of an offer to buy, any security, investment, or financial product in any jurisdiction, nor does it constitute financial, investment, legal, accounting, or tax advice.
            </p>
            <p className="text-sm leading-relaxed text-white/45">
              Digital assets, including RARE, are volatile, speculative, and involve a high degree of risk, including the potential loss of the entire amount contributed or held. Prospective participants are strongly encouraged to conduct independent research and to consult qualified legal, financial, and tax advisors before acquiring, holding, or using RARE.
            </p>
            <p className="text-sm leading-relaxed text-white/35">
              The Rarecoin project, its founders, team members, advisors, and affiliates disclaim, to the fullest extent permitted by applicable law, any liability for direct or indirect loss arising from the use of, or reliance on, this site or participation in the Rarecoin ecosystem.
            </p>
          </section>

          <section id="risk-factors" className="scroll-mt-24 flex flex-col gap-6">
            <h2 className="font-heading text-2xl font-bold text-white">Risk Factors</h2>
            <div className="flex flex-col gap-4">
              {riskFactors.map(({ title, body }) => (
                <div key={title} className="flex flex-col gap-1.5 rounded-xl border border-white/6 bg-white/3 p-5">
                  <span className="font-heading text-sm font-bold text-[#D4AF37]">{title}</span>
                  <p className="text-sm leading-relaxed text-white/50">{body}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
