"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Tracks sticky navigation state. Reveal animations are CSS-driven so this
 * component never mutates React-rendered content before it hydrates.
 */
export function ScrollChrome() {
  const pathname = usePathname();

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("[data-sticky-nav]");
    const onScroll = () => {
      if (nav) {
        nav.dataset.scrolled = String(window.scrollY > 24);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
