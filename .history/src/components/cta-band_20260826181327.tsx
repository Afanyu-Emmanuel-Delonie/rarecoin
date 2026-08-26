import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBand() {
  return (
    <section id="roadmap" className="scroll-mt-20 bg-[#111318] px-6 py-20 lg:px-16">
      <div data-reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
        <h2 className="font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
          Five phases.<br />
          <span className="text-[#D4AF37]">One direction.</span>
        </h2>
        <p className="text-sm leading-relaxed text-white/45 md:text-base">
          Actual timing depends on community activity and market conditions. Each phase is a stated intention, not a guarantee — and every milestone is disclosed publicly.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/get-rare"
            className="group inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#08090D] transition-all hover:bg-[#F0D77A] hover:gap-3"
          >
            Get RARE
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#find-us"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:border-white/30 hover:bg-white/10"
          >
            Join the Community
          </Link>
        </div>
      </div>
    </section>
  );
}
