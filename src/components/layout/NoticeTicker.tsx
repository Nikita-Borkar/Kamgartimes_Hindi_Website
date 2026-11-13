"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { notice } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import type { NoticeTickerItem } from "@/types/api";
import styles from "./layout.module.css";

export function NoticeTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [notices, setNotices] = useState<NoticeTickerItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    const fallbackText = String(notice.text || "").trim();

    const loadNotices = async () => {
      try {
        const items = await kamgarApi.getNoticeTicker();
        if (!active) return;

        if (Array.isArray(items) && items.length > 0) {
          setNotices(items);
          document.body.classList.add("notice-ticker-on");
        } else if (fallbackText) {
          setNotices([
            {
              _id: "default-notice",
              message: fallbackText,
              linkUrl: "/join-us",
              kind: "NOTICE",
            },
          ]);
          document.body.classList.add("notice-ticker-on");
        } else {
          setNotices([]);
          document.body.classList.remove("notice-ticker-on");
        }
      } catch {
        if (!active) return;
        if (fallbackText) {
          setNotices([
            {
              _id: "default-notice",
              message: fallbackText,
              linkUrl: "/join-us",
              kind: "NOTICE",
            },
          ]);
          document.body.classList.add("notice-ticker-on");
        } else {
          setNotices([]);
          document.body.classList.remove("notice-ticker-on");
        }
      } finally {
        if (active) setHasLoaded(true);
      }
    };

    void loadNotices();
    // Auto-refresh notices every 60 seconds so newly added notices appear automatically
    const refreshTimer = window.setInterval(loadNotices, 60_000);

    return () => {
      active = false;
      window.clearInterval(refreshTimer);
      document.body.classList.remove("notice-ticker-on");
    };
  }, []);

  // Compute seamless loop items:
  // Duplicate the list so it has two identical halves for smooth -50% marquee translation
  const displayItems = useMemo(() => {
    if (notices.length === 0) return [];
    // Ensure base list has at least 4 items so short lists don't leave empty gaps on wide monitors
    const repeatCount = Math.max(1, Math.ceil(4 / notices.length));
    const baseList = Array.from({ length: repeatCount }).flatMap(() => notices);
    // Duplicate once for seamless -50% translateX marquee animation
    return [...baseList, ...baseList];
  }, [notices]);

  // Dynamic animation duration based on total text length for comfortable reading speed
  const animationDuration = useMemo(() => {
    if (notices.length === 0) return 30;
    const totalChars = notices.reduce((acc, n) => acc + (n.message?.length || 0), 0);
    return Math.max(25, Math.min(140, Math.round(totalChars * 0.35)));
  }, [notices]);

  if (!hasLoaded || notices.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.noticeTicker}
      role="region"
      aria-label={notice.label || "सूचना टिकर"}
    >
      <div className={styles.noticeBadge}>
        <span>{notice.label || "सूचना"}</span>
      </div>

      <div
        className={styles.noticeViewport}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className={styles.noticeTrack}
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            animationDuration: `${animationDuration}s`,
          }}
        >
          {displayItems.map((item, index) => {
            const hasLink = Boolean(item.linkUrl && item.linkUrl.trim());
            const isExternal = hasLink && /^https?:\/\//i.test(item.linkUrl!.trim());

            return (
              <div key={`${item._id || index}-${index}`} className={styles.noticeItem}>
                {hasLink ? (
                  isExternal ? (
                    <a
                      href={item.linkUrl!.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.noticeLink}
                    >
                      <span className={styles.noticeText}>{item.message}</span>
                    </a>
                  ) : (
                    <Link href={item.linkUrl!.trim()} className={styles.noticeLink}>
                      <span className={styles.noticeText}>{item.message}</span>
                    </Link>
                  )
                ) : (
                  <span className={styles.noticeText}>{item.message}</span>
                )}
                <span className={styles.noticeDot} aria-hidden="true">•</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.tickerControls} style={{ background: "#0d0d0d", paddingRight: 8 }}>
        <button
          type="button"
          className={styles.tickerCtrlBtn}
          onClick={() => setIsPaused(!isPaused)}
          title={isPaused ? "चलाएं" : "रोकें"}
          aria-label={isPaused ? "सूचना टिकर चलाएं" : "सूचना टिकर रोकें"}
          suppressHydrationWarning
        >
          {isPaused ? <Play size={13} /> : <Pause size={13} />}
        </button>
      </div>
    </div>
  );
}
