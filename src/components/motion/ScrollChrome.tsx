"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole page. Adds .is-visible to any .reveal element as
 * it enters the viewport, and toggles data-scrolled on the sticky nav.
 * Everything stays server-rendered; this only flips classes after mount.
 *
 * The root layout persists across client-side navigations, so the effect is
 * keyed on the pathname: without it the observer is created once and the
 * .reveal nodes of every later page stay hidden at opacity 0.
 */
export function ScrollChrome() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    // Reveal what is already on screen before the observer's first callback
    // lands, otherwise the top of the page paints blank for a frame.
    for (const node of nodes) {
      if (node.getBoundingClientRect().top < window.innerHeight) {
        node.classList.add("is-visible");
      } else {
        observer.observe(node);
      }
    }

    const nav = document.querySelector<HTMLElement>("[data-sticky-nav]");
    if (!nav) return () => observer.disconnect();

    const onScroll = () => {
      nav.dataset.scrolled = String(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
