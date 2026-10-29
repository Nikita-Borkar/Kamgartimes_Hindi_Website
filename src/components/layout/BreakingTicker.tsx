"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pause, Play, Flame } from "lucide-react";
import { kamgarApi } from "@/services/apiClient";
import type { ArticleListItem } from "@/types/api";
import styles from "./layout.module.css";

export function BreakingTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [tickerItems, setTickerItems] = useState<ArticleListItem[]>([]);

  useEffect(() => {
    let active = true;
    const loadLatestNews = async () => {
      try {
        const articles = await kamgarApi.getLatestArticleTicker(20);
        if (active && Array.isArray(articles)) setTickerItems(articles);
      } catch {
        if (active) setTickerItems([]);
      }
    };

    void loadLatestNews();
    const refreshTimer = window.setInterval(loadLatestNews, 60_000);

    return () => {
      active = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  if (tickerItems.length === 0) return null;

  return (
    <div className={styles.ticker}>
      <div className={`${styles.shell} ${styles.tickerInner}`}>
        <div className={styles.tickerBadge}>
          <Flame size={16} className={styles.flameIcon} />
          <span>ताज़ा खबरें</span>
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
                <span className={styles.tickerChip}>{item.category?.name || "ताज़ा"}</span>
                <Link className={styles.tickerLink} href={`/article/${item.slug}`}>
                  {item.title}
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
