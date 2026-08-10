"use client";

import Link from "next/link";
import { X, MessageCircle, Globe } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <img src="/rarecoin.svg" alt="Rarecoin" className="h-6 w-auto" />
      <span className="font-heading text-base font-bold tracking-tight text-white">
        Rarecoin
      </span>
    </div>
  );
}

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

const footerLinks = [
  {
    heading: "Token",
    links: [
      { label: "Tokenomics",  href: "/tokenomics" },
      { label: "Utility",     href: "/utility" },
      { label: "Roadmap",     href: "/roadmap" },
      { label: "White Paper", href: "/docs" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Ambassador Program", href: "/community" },
      { label: "Membership Tiers",   href: "/community" },
      { label: "Contributor Rewards",href: "/utility" },
      { label: "Contact",            href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Disclaimer",   href: "/docs#disclaimer" },
      { label: "Risk Factors", href: "/docs#risks" },
      { label: "FAQ",          href: "/faq" },
      { label: "About",        href: "/about" },
    ],
  },
];

const socials = [
  { icon: X,             href: "https://x.com/TherealRarecoin", label: "X" },
  { icon: MessageCircle, href: "#", label: "Telegram" },
  { icon: Globe,         href: "#", label: "Website" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b0c12] px-6 pt-20 pb-10 lg:px-16">
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 text-[#3355ff] opacity-[0.05]">
        <GhostRings className="h-full w-full" />
      </div>

      <div className="relative mx-auto max-w-7xl flex flex-col gap-16">

        {/* Top row */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* Brand col */}
          <div className="flex flex-col gap-5 md:col-span-2">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-white/35">
              A fixed-supply, community-first token on Solana. No presale, no team allocation — 100% public from the first trade.
            </p>
            {/* Footer mini signup */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/25">Get launch updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 rounded-xl bg-white/8 px-4 py-2.5 text-xs text-white placeholder:text-white/25 outline-none focus:bg-white/12 transition-all"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#0f3f93] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0f3f93]/80"
                >
                  Notify me
                </button>
              </div>
            </form>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/40 transition-all hover:border-[#3355ff]/50 hover:text-[#3355ff]"
                >
                  <Icon size={15} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/25">
                {heading}
              </span>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/45 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8" />

        {/* Bottom row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Rarecoin. All rights reserved.
          </p>
          <p className="max-w-xl text-xs leading-relaxed text-white/20">
            RARE is a utility token. Nothing on this site constitutes financial, investment, or legal advice. Digital assets are volatile and involve significant risk. Read the full disclaimer before participating.
          </p>
        </div>

      </div>
    </footer>
  );
}
