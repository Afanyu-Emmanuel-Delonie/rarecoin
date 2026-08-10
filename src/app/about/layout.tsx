import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rarecoin (RARE) is built on one principle: scarcity creates value. A fair-launch, community-owned token on Solana launched through Proof — no presale, no team allocation.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
      {children}
    </>
  );
}
