"use client";

import { useState } from "react";
import { Clock3, Pause, Play } from "lucide-react";
import styles from "./liveUpdates.module.css";

interface UpdateItem {
  time: string;
  text: string;
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

  // Duplicate items for continuous seamless vertical loop
  const scrollItems = [...defaultUpdates, ...defaultUpdates];

  return (
    <aside className={styles.liveUpdates} aria-label="लाइव अपडेट्स">
      {/* Clean header */}
      <div className={styles.liveHeading}>
        <div className={styles.liveTitleGroup}>
          <span className={styles.liveDot} aria-hidden="true" />
          <h2>लाइव अपडेट्स</h2>
        </div>

        <div className={styles.liveActions}>
          <span className={styles.liveBadge}>लाइव</span>
          <button
            type="button"
            className={styles.pausePlayBtn}
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? "स्क्रॉल शुरू करें" : "स्क्रॉल रोकें"}
            aria-label={isPaused ? "स्क्रॉल शुरू करें" : "स्क्रॉल रोकें"}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
      </div>

      {/* Main event headline */}
      <div className={styles.liveEventBox}>
        <h3 className={styles.liveEventTitle}>
          मुंबई मेट्रो विस्तार और औद्योगिक गलियारे की प्रगति पर विशेष बैठक
        </h3>
        <div className={styles.liveEventMeta}>
          <Clock3 size={13} aria-hidden="true" />
          <span>संपादकीय लाइव ब्लॉग • {defaultUpdates.length} अपडेट्स</span>
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
          {scrollItems.map((update, idx) => (
            <div className={styles.liveItem} key={`${update.time}-${idx}`}>
              <time className={styles.liveTime}>{update.time}</time>
              <p className={styles.liveText}>{update.text}</p>
            </div>
          ))}
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
