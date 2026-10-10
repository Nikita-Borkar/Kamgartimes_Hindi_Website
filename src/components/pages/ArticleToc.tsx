"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, List } from "lucide-react";
import styles from "./article.module.css";

export type TocItem = { id: string; label: string };

/**
 * Section rail for the reading page.
 *
 * Desktop: a sticky list where the section currently in view is marked with a
 * crimson bar. Mobile: the same list collapses into an accordion whose header
 * always names the section you are reading.
 *
 * The "current section follows the reader" behaviour is driven by one
 * IntersectionObserver over the real section elements, not by scroll maths, so
 * it stays correct through font swaps, image loads and resizes. When several
 * sections are visible at once the earliest in document order wins, and the
 * last known section is kept while the reader crosses a gap between sections.
 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        }

        const first = items.find((item) => visible.current.has(item.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-16% 0px -62% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));

    /* A cheap fallback for the very top and the very bottom of the page, where
       no mid-viewport band intersects. */
    const onScroll = () => {
      if (window.scrollY < 120 && items[0]) setActive(items[0].id);
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom && items.length) setActive(items[items.length - 1].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  const activeItem = items.find((item) => item.id === active) ?? items[0];

  return (
    <nav
      className={styles.toc}
      data-open={open}
      aria-label="बातमीतील विभाग"
    >
      <button
        type="button"
        className={styles.tocToggle}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.tocToggleLabel}>
          <span className={styles.tocToggleEyebrow}>या बातमीत</span>
          <span className={styles.tocToggleCurrent}>
            {activeItem?.label ?? "विभाग"}
          </span>
        </span>
        <ChevronDown size={18} strokeWidth={2} aria-hidden="true" />
      </button>

      <p className={styles.tocHead}>
        <List size={18} strokeWidth={2} aria-hidden="true" />
        या बातमीत
      </p>

      <ol className={styles.tocList}>
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              className={styles.tocLink}
              href={`#${item.id}`}
              aria-current={item.id === active}
              onClick={() => setOpen(false)}
            >
              <span className={styles.tocIndex} aria-hidden="true">
                {index + 1}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
