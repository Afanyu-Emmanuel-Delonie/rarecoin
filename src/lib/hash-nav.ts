"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Next's <Link> doesn't reliably re-jump to a "/#id" hash when you're already
 * on that route (only the hash changes, not the pathname), so scrolling has
 * to be driven manually. This hook also picks up the hash after a cross-page
 * navigation lands on "/", since the target section isn't guaranteed to be
 * scrolled-to by the time the browser processes the fragment.
 */
export function useHashScrollOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [pathname]);
}

export function useHashNavClick() {
  const pathname = usePathname();
  const router = useRouter();

  return (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return;
    const id = href.slice(2);
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", href);
    } else {
      router.push(href);
    }
  };
}
