"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import type { NavItem, NavLink } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import type { Category } from "@/types/api";
import {
  getSafeSocialUrl,
  SocialPlatformIcon,
  socialPlatformLabel,
} from "@/components/ui/SocialIcons";
import { useSiteSettings } from "@/context/SiteSettingsContext";
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
          <span>{item.label}</span>
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
      <Link className={styles.navLink} href={item.href}>
        <span>{item.label}</span>
      </Link>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.navLink} ${styles.navLinkWithSub} ${styles.navSubToggle}${open ? ` ${styles.navLinkActive}` : ""}`}
        onClick={handleToggle}
        aria-expanded={open}
        aria-label={`${item.label} उपश्रेणियां ${open ? "बंद करें" : "खोलें"}`}
        suppressHydrationWarning
      >
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
  heading,
  onNavigate,
}: {
  items: NavItem[];
  heading?: string;
  onNavigate: () => void;
}) {
  const { siteName, contactPhone, socialLinks } = useSiteSettings();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggleGroup = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label));
  };

  return (
    <div className={styles.panelInnerWrapper}>
      <Link href="/search" className={styles.drawerSearchLink} onClick={onNavigate} aria-label="खोजें">
        <Search size={17} strokeWidth={2.2} aria-hidden="true" />
        <span>खोजें (Search)</span>
      </Link>

      <div className={styles.drawerMenuHeading}>{heading || "सभी श्रेणियां (Categories)"}</div>

      <ul className={styles.panelList}>
        {items.map((item) => {
          const hasDropdown = Boolean(item.children && item.children.length > 0);
          const isOpen = openGroup === item.label;

          return (
            <li key={item.label} className={styles.panelItem}>
              {hasDropdown ? (
                <div className={styles.panelRow}>
                  <Link
                    className={styles.panelDirectLink}
                    href={item.href}
                    onClick={onNavigate}
                  >
                    <span className={styles.panelLabelText}>{item.label}</span>
                  </Link>
                  <button
                    type="button"
                    className={styles.panelAccordionBtn}
                    aria-expanded={isOpen}
                    aria-label={`${item.label} उप-श्रेणी ${isOpen ? "बंद करें" : "खोलें"}`}
                    onClick={() => toggleGroup(item.label)}
                  >
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
        {contactPhone ? (
          <a
            href={`tel:${contactPhone.replace(/\s+/g, "")}`}
            className={styles.drawerQuickBtnSecondary}
            onClick={onNavigate}
            title={`हेल्पलाइन: ${contactPhone}`}
          >
            हेल्पलाइन: {contactPhone}
          </a>
        ) : null}
        <Link href="/advertise" className={styles.drawerQuickBtnSecondary} onClick={onNavigate}>
          विज्ञापन दें (Advertise)
        </Link>
        <Link href="/donate" className={styles.drawerQuickBtnSecondary} onClick={onNavigate}>
          सहयोग करें (Donate)
        </Link>

      </div>

      <div className={styles.drawerSocialsSection}>
        <div className={styles.drawerSocialsTitle}>सोशल मीडिया पर फॉलो करें</div>
        <div className={styles.drawerSocialIcons}>
          {socialLinks.map((social, index) => {
            const href = getSafeSocialUrl(social.url);
            if (!href) return null;
            const label = socialPlatformLabel(social.platform);

            return (
              <a
                key={`${social.platform}-${index}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={`${siteName} on ${label}`}
                className={styles.drawerSocialDot}
              >
                <SocialPlatformIcon platform={social.platform} size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function buildNavItemsFromCategoryTree(tree: Category[]): NavItem[] {
  const items: NavItem[] = [
    {
      label: "होम",
      href: "/",
    },
  ];

  for (const cat of [...tree].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
    if (!cat.name) continue;
    const trimmedName = cat.name.trim();

    // Skip "होम" if someone added it in categories to avoid duplicate home links
    if (trimmedName === "होम" || cat.slug === "home") continue;

    const topHref = `/category/${cat.slug || cat._id}`;

    // Backend can return subcategories under `subcategories` or `children`
    const rawSubcats =
      Array.isArray(cat.children) && cat.children.length > 0
        ? cat.children
        : Array.isArray((cat as any).subcategories) && (cat as any).subcategories.length > 0
        ? (cat as any).subcategories
        : [];

    const children: NavLink[] = [];
    if (rawSubcats.length > 0) {
      const sortedChildren = [...rawSubcats].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );

      for (const child of sortedChildren) {
        if (!child.name) continue;
        const childName = child.name.trim();
        const displayLabel =
          childName === "vichar"
            ? "विचार"
            : childName === "खाs"
            ? "खास रिपोर्ट"
            : childName;

        let childHref = `/category/${child.slug || child._id}`;

        if (
          childName.includes("पत्रकार") ||
          child.slug === "join-us" ||
          child.slug === "पत्रकार-प्रतिनिधि-नियुक्ति"
        ) {
          continue;
        }

        children.push({
          label: displayLabel,
          href: childHref,
        });
      }
    }

    items.push({
      label: trimmedName,
      href: topHref,
      ...(children.length > 0 ? { children } : {}),
    });
  }

  return items;
}

export function MainNav() {
  const [navItemsList, setNavItemsList] = useState<NavItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(14);
  const [panelOpen, setPanelOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    kamgarApi
      .getCategoryTree()
      .then((res) => {
        const tree = Array.isArray(res)
          ? res
          : (res as any)?.data || (res as any)?.categories || [];
        if (Array.isArray(tree)) setNavItemsList(buildNavItemsFromCategoryTree(tree));
      })
      .catch((err) => {
        console.warn("Failed to fetch public category tree:", err);
      });
  }, []);

  /* Fit as many links as the bar can hold up to 14 (ई-पेपर); the rest are in overflow panel. */
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
    const gap = parseFloat(cs.columnGap) || 8;
    const content = container.clientWidth - pad;

    const actionsW = actions.getBoundingClientRect().width || 120;
    const itemGap = 1;

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

    const available = content - actionsW - gap;
    let count = fit(available);

    // Primary items up to ई-पेपर are 14. Remaining items live in the overflow panel
    count = Math.min(count, 14);
    setVisibleCount((prev) => (prev === count ? prev : count));
  }, []);

  useEffect(() => {
    measure();
    const timer = window.setTimeout(measure, 60);

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
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [measure, navItemsList]);

  const overflow = visibleCount < navItemsList.length;
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
          {navItemsList.slice(0, visibleCount).map((item, idx) => (
            <NavEntry key={`nav-${item.href}-${item.label}-${idx}`} item={item} />
          ))}
        </div>

        <div className={styles.navRightActions} ref={actionsRef}>
          <button
            type="button"
            className={styles.navBurger}
            aria-expanded={panelOpen}
            aria-label={panelOpen ? "मेनू बंद करें" : "अन्य श्रेणियां / मेनू खोलें"}
            title="अन्य श्रेणियां"
            onClick={() => setPanelOpen((v) => !v)}
          >
            {panelOpen ? (
              <X size={18} strokeWidth={2.4} />
            ) : (
              <Menu size={18} strokeWidth={2.4} />
            )}
          </button>

        </div>
      </div>

      <div className={styles.navPanel} data-open={panelOpen}>
        <OverflowPanel
          items={
            isMobile || navItemsList.slice(visibleCount).length === 0
              ? navItemsList
              : navItemsList.slice(visibleCount)
          }
          heading={
            isMobile || navItemsList.slice(visibleCount).length === 0
              ? "सभी श्रेणियां (All Categories)"
              : "अन्य श्रेणियां (Other Categories)"
          }
          onNavigate={() => setPanelOpen(false)}
        />
      </div>

        {/* Off-screen ruler: an unclipped copy whose natural widths tell us
            how many links fit on the strip. */}
        <div className={styles.navMeasure} aria-hidden="true" ref={measureRef}>
          <ul className={styles.navMeasureList}>
            {navItemsList.map((item, idx) => (
              <li key={`measure-${item.href}-${item.label}-${idx}`} className={styles.navMeasureItem}>
                <span className={styles.navLink}>
                  <span>{item.label}</span>
                </span>
                {item.children?.length ? (
                  <span className={`${styles.navLink} ${styles.navLinkWithSub} ${styles.navSubToggle}`}>
                    <Caret />
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
    </nav>
  );
}

