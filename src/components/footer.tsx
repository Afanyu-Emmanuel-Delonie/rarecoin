import Link from "next/link";
import { X, MessageCircle, Globe } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="28" height="28" fill="none" aria-hidden="true">
        <mask id="footer-facet-cross">
          <rect width="100" height="100" fill="#fff" />
          <rect x="45" y="0" width="10" height="100" rx="4" fill="#000" />
          <rect x="0" y="45" width="100" height="10" rx="4" fill="#000" />
        </mask>
        <circle cx="50" cy="50" r="45" fill="#3355ff" mask="url(#footer-facet-cross)" />
      </svg>
      <span className="font-heading text-base font-bold tracking-tight text-white">
        Rarecoin
      </span>
    </div>
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
    <footer className="bg-[#0b0c12] px-6 pt-20 pb-10 lg:px-16">
      <div className="mx-auto max-w-7xl flex flex-col gap-16">

        {/* Top row */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* Brand col */}
          <div className="flex flex-col gap-5 md:col-span-2">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-white/35">
              A fixed-supply, community-first token on Solana. No presale, no team allocation — 100% public from the first trade.
            </p>
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
