"use client";

import { useEffect, useState } from "react";
import styles from "./layout.module.css";

const REVEAL_AFTER = 640;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > REVEAL_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={styles.toTop}
      href="#top"
      data-visible={visible}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      aria-label="वर जा"
    >
      ↑
    </a>
  );
}
