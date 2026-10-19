"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { navItems, type NavItem } from "@/data/site";
import styles from "./layout.module.css";

function Caret({ open }: { open?: boolean }) {
  return (
    <ChevronDown
      size={13}
      strokeWidth={2.2}
      aria-hidden="true"
      className={`${styles.navCaretIcon}${open ? ` ${styles.caretRotated}` : ""}`}
    />
  );
}

function NavEntry({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children?.length) {
    return (
      <div className={styles.navItem}>
        <Link className={styles.navLink} href={item.href}>
          {item.label}
        </Link>
      </div>
    );
  }

  return (
    <div
      className={styles.navItem}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        className={`${styles.navLink} ${styles.navLinkWithSub}`}
        href={item.href}
        onClick={() => setOpen((prev) => !prev)}
        onFocus={() => setOpen(true)}
      >
        <span>{item.label}</span>
        <Caret open={open} />
      </Link>
      <ul className={styles.subNav} data-open={open}>
        {item.children.map((child) => (
          <li key={child.href} className={styles.subNavItem}>
            <Link
              className={styles.subNavLink}
              href={child.href}
              onClick={() => setOpen(false)}
            >
              <span>{child.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The links that did not fit the bar, stacked as an accordion. */
function OverflowPanel({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate: () => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <ul className={styles.panelList}>
      {items.map((item) => (
        <li key={item.label} className={styles.panelItem}>
          <div className={styles.panelRow}>
            <Link className={styles.panelLink} href={item.href} onClick={onNavigate}>
              {item.label}
            </Link>
            {item.children?.length ? (
              <button
                type="button"
                className={styles.panelCaret}
                aria-expanded={openGroup === item.label}
                aria-label={`${item.label} उप-श्रेणी`}
                onClick={() =>
                  setOpenGroup((group) =>
                    group === item.label ? null : item.label,
                  )
                }
              >
                <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" />
              </button>
            ) : null}
          </div>
          {item.children?.length ? (
            <ul className={styles.panelSub} data-open={openGroup === item.label}>
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    className={styles.panelSubLink}
                    href={child.href}
                    onClick={onNavigate}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function MainNav() {
  const [visibleCount, setVisibleCount] = useState(navItems.length);
  const [panelOpen, setPanelOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  /* Fit as many links as the bar can hold; the rest fall into the panel. */
  const measure = useCallback(() => {
    const container = containerRef.current;
    const actions = actionsRef.current;
    const ruler = measureRef.current?.firstElementChild;
    if (!container || !actions || !ruler) return;

    const items = Array.from(ruler.children) as HTMLElement[];
    if (!items.length) return;
    const widths = items.map((el) => el.getBoundingClientRect().width);

    const cs = getComputedStyle(container);
    const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const gap = parseFloat(cs.columnGap) || 12;
    const content = container.clientWidth - pad;

    const searchEl = actions.querySelector("a");
    const burgerEl = actions.querySelector("button");
    const searchW = searchEl ? searchEl.getBoundingClientRect().width : 34;
    const burgerW = burgerEl?.getBoundingClientRect().width || 42;

    const itemGap = 2;
    const fit = (avail: number) => {
      let used = 0;
      let count = 0;
      for (const width of widths) {
        const next = used + (count ? itemGap : 0) + width;
        if (next > avail - 2) break;
        used = next;
        count += 1;
      }
      return count;
    };

    const available = content - searchW - gap;
    let count = fit(available);
    if (count < widths.length) {
      count = fit(available - burgerW - gap);
    }
    setVisibleCount((prev) => (prev === count ? prev : count));
  }, []);

  useEffect(() => {
    measure();

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && navRef.current) {
      observer = new ResizeObserver(onResize);
      observer.observe(navRef.current);
    }

    if (document.fonts?.ready) {
      void document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [measure]);

  const overflow = visibleCount < navItems.length;

  useEffect(() => {
    if (!overflow) setPanelOpen(false);
  }, [overflow]);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanelOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panelOpen]);

  return (
    <nav
      className={styles.nav}
      data-overflow={overflow ? "true" : "false"}
      aria-label="मुख्य नेविगेशन"
      ref={navRef}
    >
      <div className={styles.navContainer} ref={containerRef}>
        <div className={styles.navList}>
          {navItems.slice(0, visibleCount).map((item) => (
            <NavEntry key={item.label} item={item} />
          ))}
        </div>

        <div className={styles.navRightActions} ref={actionsRef}>
          <Link className={styles.searchBtn} href="/search" aria-label="खोजें">
            <Search size={17} strokeWidth={2.2} aria-hidden="true" />
          </Link>

          <button
            type="button"
            className={styles.navBurger}
            aria-expanded={panelOpen}
            aria-label={panelOpen ? "मेनू बंद करें" : "अन्य विकल्प खोलें"}
            onClick={() => setPanelOpen((v) => !v)}
          >
            {panelOpen ? (
              <X size={22} strokeWidth={2.2} />
            ) : (
              <Menu size={22} strokeWidth={2.2} />
            )}
          </button>
        </div>

        <div className={styles.navPanel} data-open={panelOpen}>
          <OverflowPanel
            items={navItems.slice(visibleCount)}
            onNavigate={() => setPanelOpen(false)}
          />
        </div>

        {/* Off-screen ruler: an unclipped copy whose natural widths tell us
            how many links fit on the strip. */}
        <div className={styles.navMeasure} aria-hidden="true" ref={measureRef}>
          <ul className={styles.navMeasureList}>
            {navItems.map((item) => (
              <li key={item.label} className={styles.navMeasureItem}>
                <span
                  className={`${styles.navLink}${
                    item.children?.length ? ` ${styles.navLinkWithSub}` : ""
                  }`}
                >
                  <span>{item.label}</span>
                  {item.children?.length ? <Caret /> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
