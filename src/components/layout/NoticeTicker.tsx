"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notice } from "@/data/site";
import styles from "./layout.module.css";

export function NoticeTicker() {
  const [isPaused, setIsPaused] = useState(false);

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
      <div className={styles.noticeBadge}>
        <span>{notice.label}</span>
      </div>
      <div
        className={styles.noticeViewport}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={styles.noticeTrack}
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.noticeItem}>
              <Link href="/join-us" className={styles.noticeLink}>
                <span className={styles.noticeText}>{notice.text}</span>
              </Link>
              <span className={styles.noticeDot}>•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
