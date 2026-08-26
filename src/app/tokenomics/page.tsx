import Tokenomics from "@/components/tokenomics";

export default function TokenomicsPage() {
  return (
    <div className="bg-[#08090D] pt-20">
      <div className="bg-[#111318] px-6 pt-28 pb-16 lg:px-16">
        <div className="mx-auto max-w-7xl flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Tokenomics</span>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">Nothing hidden<br />in the numbers.</h1>
          <p className="max-w-xl text-sm leading-relaxed text-white/45">
            No allocation pools, no vesting cliffs, no team tranche. Every RARE token enters circulation the same way — through the public bonding curve on Proof.
          </p>
        </div>
      </div>
      <Tokenomics />
    </div>
  );
}
