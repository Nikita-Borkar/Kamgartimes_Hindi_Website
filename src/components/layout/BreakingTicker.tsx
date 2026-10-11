"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play, Flame } from "lucide-react";
import { breakingNews } from "@/data/site";
import styles from "./layout.module.css";

export function BreakingTicker() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className={styles.ticker}>
      <div className={`${styles.shell} ${styles.tickerInner}`}>
        <div className={styles.tickerBadge}>
          <Flame size={16} className={styles.flameIcon} />
          <span>ब्रेकिंग न्यूज</span>
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
              ...breakingNews,
              ...breakingNews,
              ...breakingNews,
              ...breakingNews,
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
            title={isPaused ? "प्ले करा" : "थांबवा"}
            aria-label="Pause or Play Ticker"
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
