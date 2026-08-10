import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Rarecoin (RARE) team for partnership enquiries, press, or general questions about the Proof fair launch on Solana.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      {children}
    </>
  );
}
