"use client";

import { useEffect, useState } from "react";
import { Clock3, Pause, Play } from "lucide-react";
import { kamgarApi } from "@/services/apiClient";
import { formatHindiTime } from "@/lib/apiAdapters";
import styles from "./liveUpdates.module.css";

interface UpdateItem {
  time: string;
  text: string;
  linkUrl?: string;
  linkText?: string;
}

const defaultUpdates: UpdateItem[] = [
  {
    time: "१०:४२",
    text: "मेट्रो के नए रूट विस्तार हेतु यात्री संगठनों ने सौंपे महत्वपूर्ण सुझाव",
  },
  {
    time: "१०:१५",
    text: "ठाणे और मुंबई उपनगरों के बीच कनेक्टिविटी सुधार पर उच्चस्तरीय बैठक",
  },
  {
    time: "०९:५२",
    text: "नगर निगम ने पेश किया पुनर्विकास और जल निकासी का संशोधित मास्टर प्लान",
  },
  {
    time: "०९:३०",
    text: "पर्यावरण मंजूरी और औद्योगिक नीति पर कैबिनेट उपसमिति की बैठक आज दोपहर",
  },
  {
    time: "०९:१०",
    text: "परिवहन विभाग ने उपनगरीय मार्गों पर अतिरिक्त ई-बसों के संचालन को दी हरी झंडी",
  },
];

export function LiveUpdates() {
  const [isPaused, setIsPaused] = useState(false);
  const [updates, setUpdates] = useState<UpdateItem[]>(defaultUpdates);
  const [headline, setHeadline] = useState<string>(
    "कामगार टाइम्स लाइव अपडेट्स और ब्रेकिंग बुलेटिन"
  );

  useEffect(() => {
    // 1. First attempt to fetch dedicated Live News items from backend API
    kamgarApi
      .getLiveNews(10)
      .then((liveItems) => {
        if (Array.isArray(liveItems) && liveItems.length > 0) {
          setHeadline(liveItems[0].heading);
          const mapped: UpdateItem[] = liveItems.map((item) => ({
            time: formatHindiTime(item.publishedAt || item.createdAt || new Date().toISOString()),
            text: item.heading,
            linkUrl: item.linkUrl,
            linkText: item.linkText || "पढ़ें",
          }));
          setUpdates(mapped);
          return;
        }

        // Fallback: If no live news items exist yet, load latest published articles
        kamgarApi.getArticles({ limit: 6 }).then((res) => {
          if (res?.articles && res.articles.length > 0) {
            setHeadline(res.articles[0].title);
            const mapped = res.articles.map((a) => ({
              time: formatHindiTime(a.publishedAt),
              text: a.title,
              linkUrl: `/article/${a.slug}`,
            }));
            setUpdates(mapped);
          }
        }).catch(() => {});
      })
      .catch(() => {
        kamgarApi.getArticles({ limit: 6 }).then((res) => {
          if (res?.articles && res.articles.length > 0) {
            setHeadline(res.articles[0].title);
            const mapped = res.articles.map((a) => ({
              time: formatHindiTime(a.publishedAt),
              text: a.title,
              linkUrl: `/article/${a.slug}`,
            }));
            setUpdates(mapped);
          }
        }).catch(() => {});
      });
  }, []);

  // Duplicate items for continuous seamless vertical loop
  const scrollItems = [...updates, ...updates];

  return (
    <aside className={styles.liveUpdates} aria-label="लाइव अपडेट्स">
      {/* Clean header */}
      <div className={styles.liveHeading}>
        <div className={styles.liveTitleGroup}>
          <span className={styles.liveDot} aria-hidden="true" />
          <h2>लाइव अपडेट्स</h2>
        </div>

        <div className={styles.liveActions}>
          <button
            type="button"
            className={styles.livePause}
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? "स्क्रॉल शुरू करें" : "स्क्रॉल रोकें"}
            aria-label={isPaused ? "स्क्रॉल शुरू करें" : "स्क्रॉल रोकें"}
            suppressHydrationWarning
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
      </div>

      {/* Main event headline */}
      <div className={styles.liveEventBox}>
        <h3 className={styles.liveEventTitle}>{headline}</h3>
        <div className={styles.liveEventMeta}>
          <Clock3 size={13} aria-hidden="true" />
          <span>लाइव ब्लॉग • {updates.length} ताज़ा अपडेट्स</span>
        </div>
      </div>

      {/* Smooth vertical scrolling ticker */}
      <div
        className={styles.tickerViewport}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className={styles.tickerTrack}
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {scrollItems.map((update, idx) => {
            const content = (
              <>
                <time className={styles.liveTime}>{update.time}</time>
                <p className={styles.liveText}>
                  {update.text}
                  {update.linkText && (
                    <span style={{ marginLeft: "6px", color: "#d32f2f", fontWeight: 600, fontSize: "0.85em" }}>
                      ({update.linkText} →)
                    </span>
                  )}
                </p>
              </>
            );

            return update.linkUrl ? (
              <a
                href={update.linkUrl}
                className={styles.liveItem}
                key={`${update.time}-${idx}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                {content}
              </a>
            ) : (
              <div className={styles.liveItem} key={`${update.time}-${idx}`}>
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom status */}
      <div className={styles.liveFoot}>
        <span className={styles.autoScrollHint}>
          <span className={styles.hintDot} />
          {isPaused ? "स्क्रॉलिंग रुकी हुई है" : "ऑटो-स्क्रॉल सक्रिय"}
        </span>
        <span>टच/माउस से रोकें</span>
      </div>
    </aside>
  );
}
