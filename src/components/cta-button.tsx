// Shared button styles (primary/secondary)
import Link from "next/link";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
};

const variants = {
  primary: "bg-rare-secondary text-white hover:bg-rare-primary",
  secondary:
    "border border-rare-ink/15 text-rare-ink hover:border-rare-ink/30 hover:bg-rare-ink/5",
};

export default function CtaButton({
  href,
  variant = "primary",
  children,
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
