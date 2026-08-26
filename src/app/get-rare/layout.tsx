import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Get RARE",
  description:
    "How to get Rarecoin (RARE): get a Solana wallet, fund it with SOL, swap for RARE, and verify your holding. Always confirm the official contract address first.",
  alternates: { canonical: "/get-rare" },
};

export default function GetRareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Get RARE", path: "/get-rare" }]} />
      {children}
    </>
  );
}
