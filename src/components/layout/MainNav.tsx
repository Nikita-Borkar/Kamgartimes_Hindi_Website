"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { navItems, type NavItem } from "@/data/site";
import styles from "./layout.module.css";

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
        <ChevronDown
          size={13}
          strokeWidth={2.2}
          className={`${styles.navCaretIcon} ${open ? styles.caretRotated : ""}`}
          aria-hidden="true"
        />
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

function MobileDrawer({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className={styles.mobileDrawer}>
      <ul className={styles.drawerList}>
        {navItems.map((item) => (
          <li key={item.label} className={styles.drawerItem}>
            <div className={styles.drawerRow}>
              <Link
                className={styles.drawerLink}
                href={item.href}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
              {item.children?.length ? (
                <button
                  type="button"
                  className={styles.drawerCaret}
                  onClick={() =>
                    setOpenGroup((group) =>
                      group === item.label ? null : item.label,
                    )
                  }
                >
                  <ChevronDown
                    size={16}
                    className={openGroup === item.label ? styles.caretRotated : ""}
                  />
                </button>
              ) : null}
            </div>
            {item.children?.length && openGroup === item.label ? (
              <ul className={styles.drawerSubList}>
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      className={styles.drawerSubLink}
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
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Escape key closes mobile drawer */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <nav className={styles.nav} aria-label="मुख्य नेव्हिगेशन">
      <div className={styles.navContainer}>
        <div className={styles.navList}>
          {navItems.map((item) => (
            <NavEntry key={item.label} item={item} />
          ))}
        </div>

        <div className={styles.navRightActions}>
          <Link className={styles.searchBtn} href="/search" aria-label="शोधा">
            <Search size={17} strokeWidth={2.2} aria-hidden="true" />
          </Link>

          <button
            type="button"
            className={styles.mobileMenuToggle}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "मेनू बंद करा" : "मेनू उघडा"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={2.2} />
            ) : (
              <Menu size={22} strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>

      <MobileDrawer
        open={mobileOpen}
        onNavigate={() => setMobileOpen(false)}
      />
    </nav>
  );
}
