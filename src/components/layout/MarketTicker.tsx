"use client";

import { useState } from "react";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Pause, Play } from "lucide-react";
import styles from "./market.module.css";

const quotes = [
  { name: "NIFTY 50", value: "24,875.35", change: "+0.38%", trend: "up" },
  { name: "SENSEX", value: "81,725.91", change: "+0.21%", trend: "up" },
  { name: "BANK NIFTY", value: "55,312.40", change: "-0.14%", trend: "down" },
  { name: "NIFTY IT", value: "38,497.25", change: "+0.64%", trend: "up" },
  { name: "GOLD (10g)", value: "₹78,450", change: "+0.45%", trend: "up" },
  { name: "SILVER (1kg)", value: "₹92,300", change: "-0.32%", trend: "down" },
  { name: "USD/INR", value: "₹84.08", change: "+0.04%", trend: "up" },
] as const;

export function MarketTicker() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for a seamless continuous marquee loop
  const tickerItems = [...quotes, ...quotes, ...quotes];

  return (
    <section className={styles.marketBar} aria-label="शेयर बाज़ार लाइव सूचकांक">
      <div className={styles.marketShell}>
        {/* Leading Market Badge */}
        <div className={styles.marketBadge}>
          <span className={styles.marketBadgeIcon}>
            <TrendingUp size={15} strokeWidth={2.4} />
          </span>
          <span className={styles.marketBadgeTitle}>शेयर बाज़ार</span>
          <span className={styles.liveIndicator}>
            <span className={styles.liveDot} />
            <span>LIVE</span>
          </span>
        </div>

        {/* Scrolling Quotes Viewport */}
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
            {tickerItems.map((quote, idx) => {
              const isUp = quote.trend === "up";
              return (
                <div
                  className={styles.marketItem}
                  key={`${quote.name}-${idx}`}
                  title={`${quote.name}: ${quote.value} (${quote.change})`}
                >
                  <span className={styles.itemName}>{quote.name}</span>
                  <span className={styles.itemValue}>{quote.value}</span>
                  <span
                    className={`${styles.itemBadge} ${isUp ? styles.itemUp : styles.itemDown}`}
                  >
                    {isUp ? (
                      <ArrowUpRight size={13} strokeWidth={2.5} />
                    ) : (
                      <ArrowDownRight size={13} strokeWidth={2.5} />
                    )}
                    <span>{quote.change}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Play/Pause Control */}
        <div className={styles.marketControls}>
          <button
            type="button"
            className={styles.marketCtrlBtn}
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "बाज़ार टिकर चलाएं" : "बाज़ार टिकर रोकें"}
            aria-label={isPaused ? "बाज़ार टिकर चलाएं" : "बाज़ार टिकर रोकें"}
            suppressHydrationWarning
          >
            {isPaused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        </div>
      </div>
    </section>
  );
}
