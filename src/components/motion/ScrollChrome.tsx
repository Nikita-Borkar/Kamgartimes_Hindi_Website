"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One observer for the whole page. Adds .is-visible to any .reveal element as
 * it enters the viewport, and toggles data-scrolled on the sticky nav.
 *
 * Includes MutationObserver support so that dynamically fetched and rendered
 * content (videos, galleries, articles) automatically gets observed and revealed!
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
      { rootMargin: "0px 0px -4% 0px", threshold: 0.05 },
    );

    const observeNode = (n: HTMLElement) => {
      if (n.classList.contains("is-visible")) return;
      if (n.getBoundingClientRect().top < window.innerHeight + 100) {
        n.classList.add("is-visible");
      } else {
        observer.observe(n);
      }
    };

    for (const node of nodes) {
      observeNode(node);
    }

    // Watch for dynamically rendered client components (API driven data)
    let mutationObserver: MutationObserver | null = null;
    if ("MutationObserver" in window) {
      mutationObserver = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const added of Array.from(m.addedNodes)) {
            if (added instanceof HTMLElement) {
              if (added.classList.contains("reveal")) {
                observeNode(added);
              }
              const innerReveals = added.querySelectorAll<HTMLElement>(".reveal");
              innerReveals.forEach(observeNode);
            }
          }
        }
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    const nav = document.querySelector<HTMLElement>("[data-sticky-nav]");
    const onScroll = () => {
      if (nav) {
        nav.dataset.scrolled = String(window.scrollY > 24);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
