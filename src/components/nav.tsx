"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useHashNavClick, useHashScrollOnLoad } from "@/lib/hash-nav";
import { trackEvent } from "@/lib/analytics";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About",       href: "/about" },
  { label: "Utility",     href: "/#utility" },
  { label: "Tokenomics",  href: "/#tokenomics" },
  { label: "Roadmap",     href: "/#roadmap" },
  { label: "Community",   href: "/#community" },
  { label: "Contact",     href: "/contact" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center justify-center gap-2 shrink-0">
      <img src="/rare-3.png" alt="Rarecoin" className="h-8 w-auto" />
      <span className="font-heading text-xl font-bold tracking-tight text-white">
        Rarecoin
      </span>
    </Link>
  );
}

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const onHashClick = useHashNavClick();
  useHashScrollOnLoad();

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    onHashClick(e, href);
  };

  const handleJoinClick = (location: "desktop" | "mobile") => {
    setMobileOpen(false);
    trackEvent("join_cta_click", { location });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#08090D]/90 backdrop-blur-md border-b border-white/8 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-16">
          <Logo />

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-sm font-medium text-white/50 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/join"
            onClick={() => handleJoinClick("desktop")}
            className="hidden rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#08090D] transition-all hover:bg-[#F0D77A] md:inline-flex"
          >
            Join RARE
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/50 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`overflow-hidden transition-all duration-300 md:hidden ${mobileOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="flex flex-col gap-1 border-t border-white/8 bg-[#08090D]/95 backdrop-blur-md px-6 py-4">
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => handleJoinClick("mobile")}
              className="mt-2 rounded-full bg-[#D4AF37] px-5 py-3 text-center text-sm font-semibold text-[#08090D]"
            >
              Join RARE
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
