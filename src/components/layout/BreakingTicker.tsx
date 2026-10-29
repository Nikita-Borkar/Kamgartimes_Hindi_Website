"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pause, Play, Flame } from "lucide-react";
import { breakingNews } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import styles from "./layout.module.css";

interface TickerItem {
  label: string;
  text: string;
  href: string;
}

export function BreakingTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([...breakingNews]);

  useEffect(() => {
    kamgarApi
      .getNoticeTicker()
      .then((notices) => {
        if (Array.isArray(notices) && notices.length > 0) {
          setTickerItems(
            notices.map((n) => ({
              label: "ब्रेकिंग",
              text: n.message,
              href: n.linkUrl || "#",
            }))
          );
        }
      })
      .catch(() => {
        // Fallback to static breakingNews
      });
  }, []);

  return (
    <div className={styles.ticker}>
      <div className={`${styles.shell} ${styles.tickerInner}`}>
        <div className={styles.tickerBadge}>
          <Flame size={16} className={styles.flameIcon} />
          <span>ब्रेकिंग न्यूज़</span>
        </div>

        <div
          className={styles.tickerViewport}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={styles.tickerTrack}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {[
              ...tickerItems,
              ...tickerItems,
              ...tickerItems,
              ...tickerItems,
            ].map((item, index) => (
              <div key={index} className={styles.tickerItem}>
                <span className={styles.tickerChip}>{item.label}</span>
                <Link className={styles.tickerLink} href={item.href}>
                  {item.text}
                </Link>
                <span className={styles.tickerDot}>•</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tickerControls}>
          <button
            type="button"
            className={styles.tickerCtrlBtn}
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "चलाएं" : "रोकें"}
            aria-label={isPaused ? "टिकर चलाएं" : "टिकर रोकें"}
            suppressHydrationWarning
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
