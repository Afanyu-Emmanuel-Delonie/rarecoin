import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, FileText, Compass, Coins, Users, HelpCircle } from "lucide-react";
import ScrollAnimations from "@/components/scroll-animations";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

// ── Ghost decoration — oversized, low-opacity background mark ──────────────────
function GhostCircles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="none" className={className}>
      <path
        d="M 64 128 C 99.346 128 128 156.654 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 Z M 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 156.654 156.654 128 192 128 Z M 64 0 C 99.346 0 128 28.654 128 64 C 128 99.346 99.346 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 Z M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 C 128 28.654 156.654 0 192 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

const quickLinks = [
  { icon: Home,       label: "Home",        desc: "Back to the start",              href: "/" },
  { icon: Compass,    label: "About",       desc: "What Rarecoin stands for",        href: "/about" },
  { icon: Coins,      label: "Tokenomics",  desc: "Supply, burns, fee splits",       href: "/#tokenomics" },
  { icon: Users,      label: "Community",   desc: "Tiers and ambassador rewards",    href: "/#community" },
  { icon: FileText,   label: "White Paper", desc: "The full technical breakdown",    href: "/docs" },
  { icon: HelpCircle, label: "FAQ",         desc: "Legitimacy, contract, chain",     href: "/faq" },
];

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F4F6FB] pt-20 flex flex-col justify-center">
      <ScrollAnimations />
      {/* Top-edge gradient band */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,63,147,0.08) 0%, rgba(15,63,147,0.03) 50%, transparent 100%)",
        }}
      />
      {/* Ambient spot — right */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-105 w-105 translate-x-1/4 -translate-y-1/4 rounded-full sm:h-150 sm:w-150 xl:h-190 xl:w-190"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.10) 0%, transparent 68%)" }}
      />
      {/* Ambient spot — left-bottom */}
      <div
        className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 -translate-x-1/3 translate-y-1/3 rounded-full sm:h-110 sm:w-110 xl:h-140 xl:w-140"
        style={{ background: "radial-gradient(circle, rgba(15,63,147,0.07) 0%, transparent 68%)" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-5 py-16 text-center sm:px-6 sm:py-20 lg:px-10">

        <span data-reveal className="text-xs font-semibold uppercase tracking-widest text-[#3355ff]">
          404 — Off the bonding curve
        </span>

        <h1
          data-reveal
          data-reveal-delay="0.1"
          className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-[#0b0c12] sm:text-5xl sm:leading-[1.05] md:text-6xl"
        >
          This page didn&apos;t make it to circulation.
        </h1>

        <p data-reveal data-reveal-delay="0.2" className="max-w-md text-sm leading-relaxed text-[#0b0c12]/55 sm:max-w-xl sm:text-base">
          The page you're looking for doesn't exist, moved, or the link was mistyped. Everything real on Rarecoin lives at one of these:
        </p>

        <div data-reveal data-reveal-delay="0.3" className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-[#0b0c12] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0f3f93] hover:gap-3"
          >
            Back to Home
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full border border-[#3355ff]/25 bg-[#3355ff]/6 px-6 py-3 text-sm font-semibold text-[#0f3f93] transition-all hover:border-[#3355ff]/50 hover:bg-[#3355ff]/12"
          >
            Visit the FAQ
          </Link>
        </div>

        {/* Quick links grid */}
        <div data-stagger className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map(({ icon: Icon, label, desc, href }) => (
            <Link
              key={label}
              href={href}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[#0b0c12]/8 bg-white p-5 text-left transition-all hover:border-[#3355ff]/30 hover:bg-[#3355ff]/4"
            >
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 text-[#3355ff] opacity-[0.05]">
                <GhostCircles className="h-full w-full" />
              </div>
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3355ff]/10">
                <Icon size={17} className="text-[#3355ff]" strokeWidth={1.75} />
              </div>
              <div className="relative flex flex-col gap-0.5">
                <span className="font-heading text-sm font-bold text-[#0b0c12]">{label}</span>
                <span className="text-xs text-[#0b0c12]/45">{desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
