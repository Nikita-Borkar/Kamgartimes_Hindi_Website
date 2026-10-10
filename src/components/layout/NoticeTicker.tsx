"use client";

import { useEffect } from "react";
import { notice } from "@/data/site";
import styles from "./layout.module.css";

/**
 * Notice bar pinned to the bottom of the viewport on the homepage. The notice
 * is repeated enough times that the track always fills the widest screen, and
 * the marquee keyframe translates by exactly half the track, so the loop is
 * seamless. The body gets a matching bottom pad so the footer clears the bar.
 */
const REPEATS = 8;

export function NoticeTicker() {
  useEffect(() => {
    document.body.classList.add("notice-ticker-on");
    return () => document.body.classList.remove("notice-ticker-on");
  }, []);

  return (
    <div
      className={styles.noticeTicker}
      role="region"
      aria-label={notice.label}
    >
      <div className={styles.tickerTrack}>
        {Array.from({ length: REPEATS }).map((_, index) => (
          <p
            key={index}
            className={styles.tickerItem}
            aria-hidden={index > 0 || undefined}
          >
            {index === 0 && <span className="srOnly">सतत अपडेट: </span>}
            <span className={styles.tickerChip}>{notice.label}</span>
            <span>{notice.text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
