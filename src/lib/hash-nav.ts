"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { trackEvent } from "./analytics";

/**
 * Drives scroll position on every route change: land on a hash (e.g. "/#find-us")
 * and it scrolls to that section; land anywhere else and it resets to the top.
 * Needed because Next's <Link> doesn't reliably re-jump to a hash when you're
 * already on that route (only the hash changes, not the pathname), and cross-page
 * navigation doesn't guarantee the target section exists yet when the browser
 * first processes the fragment.
 */
export function useHashScrollOnLoad() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
}

export function useHashNavClick() {
  const pathname = usePathname();
  const router = useRouter();

  return (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return;
    const id = href.slice(2);
    e.preventDefault();
    trackEvent("section_nav_click", { section: id });
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", href);
    } else {
      router.push(href);
    }
  };
}
