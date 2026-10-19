"use client";

import { useEffect, useState } from "react";
import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import styles from "./layout.module.css";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="top"
      className={styles.stickyHeaderGroup}
      data-scrolled={scrolled}
      role="banner"
    >
      <TopBar />
      <MainNav />
    </header>
  );
}
