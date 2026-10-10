"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { navItems, type NavItem } from "@/data/site";
import styles from "./layout.module.css";

/** Hard cap on links shown on the bar; the rest always go to the hamburger. */
const MAX_VISIBLE = 15;
/** Reserved room for the burger + search cluster when there is overflow. */
const RESERVE_OVERFLOW = 106;
/** Reserved room for just the search icon when everything fits. */
const RESERVE_FIT = 60;
/** The leading link has no left padding, so the ruler over-counts it. */
const FIRST_PAD = 16;

/**
 * One nav entry in the full horizontal bar. Plain links render directly;
 * entries with children get a dropdown that opens on hover, focus or click, so
 * it works with a mouse, a keyboard and a touch screen alike.
 */
function NavEntry({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);

  if (!item.children?.length) {
    return (
      <Link className={styles.navLink} href={item.href}>
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className={styles.navItem}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link className={styles.navLink} href={item.href}>
        {item.label}
      </Link>
      <button
        type="button"
        className={styles.navCaret}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${item.label} उपविभाग`}
        onClick={() => setOpen((value) => !value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
      </button>
      <ul className={styles.subNav} data-open={open}>
        {item.children.map((child) => (
          <li key={child.href}>
            <Link className={styles.subNavLink} href={child.href}>
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The hamburger panel. Holds every link that did not fit on the strip, so the
 * bar keeps a readable handful of sections while the tail stays one tap away.
 */
function OverflowNav({
  items,
  open,
  onNavigate,
}: {
  items: NavItem[];
  open: boolean;
  onNavigate: () => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div className={styles.navPanel} id="main-nav-panel" data-open={open}>
      <ul className={styles.panelList}>
        {items.map((item) => (
          <li key={item.label} className={styles.panelItem}>
            <div className={styles.panelRow}>
              <Link
                className={styles.panelLink}
                href={item.href}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
              {item.children?.length ? (
                <button
                  type="button"
                  className={styles.panelCaret}
                  aria-expanded={openGroup === item.label}
                  aria-label={`${item.label} उपविभाग`}
                  onClick={() =>
                    setOpenGroup((group) =>
                      group === item.label ? null : item.label,
                    )
                  }
                >
                  <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              ) : null}
            </div>
            {item.children?.length ? (
              <ul
                className={styles.panelSub}
                data-open={openGroup === item.label}
              >
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
    </div>
  );
}

export function MainNav() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [visibleCount, setVisibleCount] = useState(
    Math.min(MAX_VISIBLE, navItems.length),
  );
  const visibleRef = useRef(visibleCount);
  const readyRef = useRef(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);

  /* Keep as many links as genuinely fit on the strip (never more than
     MAX_VISIBLE, never zero) and push the rest into the hamburger. A hidden
     ruler measures each link, so this works for any label widths at any
     viewport, not a fixed breakpoint. */
  useEffect(() => {
    const inner = innerRef.current;
    const strip = stripRef.current;
    if (!inner || !strip) return;

    const measure = () => {
      const styles = getComputedStyle(inner);
      const gutter =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const available = inner.clientWidth - gutter;

      const cells = Array.from(strip.children) as HTMLElement[];
      const widths = cells.map(
        (cell, index) => cell.offsetWidth - (index === 0 ? FIRST_PAD : 0),
      );
      const total = widths.reduce((sum, width) => sum + width, 0);

      let fit = cells.length;
      if (total > available - RESERVE_FIT) {
        const budget = available - RESERVE_OVERFLOW;
        let running = 0;
        fit = 0;
        for (const width of widths) {
          if (running + width > budget) break;
          running += width;
          fit += 1;
        }
        fit = Math.max(fit, 1);
      }

      const count = Math.min(MAX_VISIBLE, fit, cells.length);

      /* Once the first measurement lands we can stop clipping the strip, which
         is what allows the sub-nav dropdowns to show. */
      if (!readyRef.current) {
        readyRef.current = true;
        setReady(true);
      }

      if (count === visibleRef.current) return;
      visibleRef.current = count;
      setVisibleCount(count);
      if (count === cells.length) setOpen(false);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* Escape closes the panel. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const visibleItems = navItems.slice(0, visibleCount);
  const overflowItems = navItems.slice(visibleCount);
  const hasOverflow = overflowItems.length > 0;

  return (
    <nav
      className={`${styles.nav} ${styles.sticky}`}
      data-sticky-nav
      data-overflow={hasOverflow}
      data-ready={ready}
      aria-label="मुख्य"
    >
      <div className={`${styles.shell} ${styles.navInner}`} ref={innerRef}>
        {/* Off-screen, clipped ruler: the natural width of every link. */}
        <div className={styles.navMeasure} aria-hidden="true">
          <ul className={styles.navMeasureList} ref={stripRef}>
            {navItems.map((item) => (
              <li key={item.label} className={styles.navMeasureItem}>
                <span className={styles.navLink}>{item.label}</span>
                {item.children?.length ? (
                  <span className={styles.navMeasureCaret}>
                    <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.navList}>
          {visibleItems.map((item) => (
            <NavEntry key={item.label} item={item} />
          ))}
        </div>

        <div className={styles.navActions}>
          <button
            type="button"
            className={styles.navBurger}
            aria-expanded={open}
            aria-controls="main-nav-panel"
            aria-label={open ? "अधिक विभाग बंद करा" : "अधिक विभाग उघडा"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X size={22} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
          <Link className={styles.search} href="/search" aria-label="शोधा">
            <Search size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>

        <OverflowNav
          items={overflowItems}
          open={open}
          onNavigate={() => setOpen(false)}
        />
      </div>
    </nav>
  );
}
