import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Tokenomics",
  description:
    "RARE tokenomics: fixed 1,000,000,000 supply, zero team allocation, zero presale, 100% public bonding curve, and how trading fees fund contributor rewards and burns.",
  alternates: { canonical: "/tokenomics" },
};

export default function TokenomicsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Tokenomics", path: "/tokenomics" }]} />
      {children}
    </>
  );
}
