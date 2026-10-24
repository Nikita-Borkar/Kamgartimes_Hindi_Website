"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, X, User, Mic } from "lucide-react";
import { navItems, type NavItem } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import {
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
  TwitterXIcon,
  WhatsappIcon,
  TelegramIcon,
} from "@/components/ui/SocialIcons";
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
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = 240;
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - menuWidth - 8));
    setCoords({
      top: rect.bottom + 4,
      left,
    });
  }, []);

  const handleToggle = () => {
    if (!open) {
      updatePosition();
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleReposition = () => {
      updatePosition();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("scroll", handleReposition, { passive: true });
    window.addEventListener("resize", handleReposition);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("scroll", handleReposition);
      window.removeEventListener("resize", handleReposition);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, updatePosition]);

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
      onMouseEnter={() => {
        if (typeof window !== "undefined" && window.innerWidth > 768) {
          updatePosition();
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (typeof window !== "undefined" && window.innerWidth > 768) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.navLink} ${styles.navLinkWithSub}${open ? ` ${styles.navLinkActive}` : ""}`}
        onClick={handleToggle}
        aria-expanded={open}
        suppressHydrationWarning
      >
        <span>{item.label}</span>
        <Caret open={open} />
      </button>

      {open && coords && (
        <ul
          ref={menuRef}
          className={styles.subNav}
          data-open={open}
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
        >
          <li className={styles.subNavItem}>
            <Link
              className={`${styles.subNavLink} ${styles.subNavLinkAll}`}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <span>सभी {item.label} →</span>
            </Link>
          </li>
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
      )}
    </div>
  );
}

/** The links that did not fit the bar, stacked as an accordion, with mobile quick links & socials. */
function OverflowPanel({
  items,
  onNavigate,
}: {
  items: NavItem[];
  onNavigate: () => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggleGroup = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label));
  };

  return (
    <div className={styles.panelInnerWrapper}>
      {/* Mobile Top Header: Dedicated Red Reporter button + User Login & Search */}
      <div className={styles.drawerTopCard}>
        <Link
          href="/join-us"
          className={styles.drawerJoinBtn}
          onClick={onNavigate}
          aria-label="कामगार टाइम्स पत्रकार / प्रतिनिधी नियुक्ती अर्ज २०२६-२०२७"
        >
          <Mic size={17} strokeWidth={2.4} aria-hidden="true" />
          <span>पत्रकार बनें (Join as Reporter)</span>
        </Link>

        <div className={styles.drawerToolsRow}>
          <Link
            href="/login"
            className={styles.drawerToolBtn}
            onClick={onNavigate}
            aria-label="लॉग इन करें"
          >
            <User size={16} strokeWidth={2.2} />
            <span>लॉग इन / प्रोफ़ाइल</span>
          </Link>
          <Link
            href="/search"
            className={styles.drawerToolBtn}
            onClick={onNavigate}
            aria-label="खोजें"
          >
            <Search size={16} strokeWidth={2.2} />
            <span>खोजें (Search)</span>
          </Link>
        </div>
      </div>

      <div className={styles.drawerMenuHeading}>सभी श्रेणियां (Categories)</div>

      <ul className={styles.panelList}>
        {items.map((item) => {
          const hasDropdown = Boolean(item.children && item.children.length > 0);
          const isOpen = openGroup === item.label;

          return (
            <li key={item.label} className={styles.panelItem}>
              {hasDropdown ? (
                <div className={styles.panelRow}>
                  <button
                    type="button"
                    className={styles.panelAccordionBtn}
                    aria-expanded={isOpen}
                    aria-label={`${item.label} उप-श्रेणी ${isOpen ? "बंद करें" : "खोलें"}`}
                    onClick={() => toggleGroup(item.label)}
                  >
                    <span className={styles.panelLabelText}>{item.label}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2.4}
                      aria-hidden="true"
                      className={`${styles.panelCaretIcon}${isOpen ? ` ${styles.caretRotated}` : ""}`}
                    />
                  </button>
                </div>
              ) : (
                <div className={styles.panelRow}>
                  <Link
                    className={styles.panelDirectLink}
                    href={item.href}
                    onClick={onNavigate}
                  >
                    <span className={styles.panelLabelText}>{item.label}</span>
                  </Link>
                </div>
              )}

              {hasDropdown && item.children ? (
                <ul className={styles.panelSub} data-open={isOpen}>
                  <li key={`${item.label}-all`} className={styles.panelSubItem}>
                    <Link
                      className={`${styles.panelSubLink} ${styles.panelSubLinkAll}`}
                      href={item.href}
                      onClick={onNavigate}
                    >
                      <span>सभी {item.label} समाचार देखें →</span>
                    </Link>
                  </li>
                  {item.children.map((child) => (
                    <li key={child.href} className={styles.panelSubItem}>
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
          );
        })}
      </ul>

      <div className={styles.drawerQuickLinks}>
        <Link href="/advertise" className={styles.drawerQuickBtnSecondary} onClick={onNavigate}>
          विज्ञापन दें (Advertise)
        </Link>
        <Link href="/donate" className={styles.drawerQuickBtnSecondary} onClick={onNavigate}>
          सहयोग करें (Donate)
        </Link>
        <Link href="/send-news" className={styles.drawerQuickBtnSecondary} onClick={onNavigate}>
          खबर भेजें (Send News)
        </Link>
      </div>

      <div className={styles.drawerSocialsSection}>
        <div className={styles.drawerSocialsTitle}>सोशल मीडिया पर फॉलो करें</div>
        <div className={styles.drawerSocialIcons}>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="व्हाट्सएप" className={styles.drawerSocialDot}>
            <WhatsappIcon size={18} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="फेसबुक" className={styles.drawerSocialDot}>
            <FacebookIcon size={18} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="यूट्यूब" className={styles.drawerSocialDot}>
            <YoutubeIcon size={18} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="इंस्टाग्राम" className={styles.drawerSocialDot}>
            <InstagramIcon size={18} />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="एक्स" className={styles.drawerSocialDot}>
            <TwitterXIcon size={16} />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="टेलीग्राम" className={styles.drawerSocialDot}>
            <TelegramIcon size={18} />
          </a>
        </div>
      </div>
    </div>
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleCheck = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    const t = window.setTimeout(handleCheck, 0);
    window.addEventListener("resize", handleCheck);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", handleCheck);
    };
  }, []);

  useEffect(() => {
    if (!overflow) {
      const timer = window.setTimeout(() => setPanelOpen(false), 0);
      return () => window.clearTimeout(timer);
    }
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
          <Link className={styles.searchBtn} href="/search" aria-label="खोजें" title="खोजें">
            <Search size={17} strokeWidth={2.2} aria-hidden="true" />
          </Link>

          <div className={styles.navThemeToggle}>
            <ThemeToggle />
          </div>

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
            items={isMobile ? navItems : navItems.slice(visibleCount)}
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
