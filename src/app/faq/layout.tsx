import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Rarecoin (RARE): is it legit, is it the same as other tokens named Rarecoin or RARE, how to verify the official contract address, fair launch mechanics, and tokenomics.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      {children}
    </>
  );
}
