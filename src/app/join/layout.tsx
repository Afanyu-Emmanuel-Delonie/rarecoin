import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Join Early Access",
  description:
    "Be first to know when Rarecoin (RARE) launches on Proof — sign up for the launch notification.",
  alternates: { canonical: "/join" },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Join", path: "/join" }]} />
      {children}
    </>
  );
}
