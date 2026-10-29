"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notice } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import styles from "./layout.module.css";

export function NoticeTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [noticeData, setNoticeData] = useState<{ label: string; text: string; link: string }>({
    label: notice.label,
    text: notice.text,
    link: "/join-us",
  });

  useEffect(() => {
    document.body.classList.add("notice-ticker-on");
    kamgarApi
      .getNoticeTicker()
      .then((notices) => {
        if (Array.isArray(notices) && notices.length > 0) {
          const top = notices[0];
          setNoticeData({
            label: notice.label,
            text: top.message || notice.text,
            link: top.linkUrl || "/join-us",
          });
        }
      })
      .catch(() => {});

    return () => document.body.classList.remove("notice-ticker-on");
  }, []);

  return (
    <div
      className={styles.noticeTicker}
      role="region"
      aria-label={noticeData.label}
    >
      <div className={styles.noticeBadge}>
        <span>{noticeData.label}</span>
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
              <Link href={noticeData.link} className={styles.noticeLink}>
                <span className={styles.noticeText}>{noticeData.text}</span>
              </Link>
              <span className={styles.noticeDot}>•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
