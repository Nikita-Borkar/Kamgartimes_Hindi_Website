"use client";

import { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Pause,
  Play,
} from "lucide-react";
import styles from "./market.module.css";

interface MarketQuote {
  name: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

type MarketResponse = {
  success: boolean;
  data?: MarketQuote[];
  source?: string;
  timestamp?: number;
};

type MarketStatus = "loading" | "available" | "stale" | "unavailable";

const REFRESH_INTERVAL = 60_000;

export function MarketTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const quotesRef = useRef<MarketQuote[]>([]);
  const [status, setStatus] = useState<MarketStatus>("loading");
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    const loadQuotes = async () => {
      try {
        const response = await fetch("/api/market", { cache: "no-store" });
        const result = (await response.json()) as MarketResponse;
        if (!response.ok || !result.success || !Array.isArray(result.data) || result.data.length === 0) {
          throw new Error("Market data is unavailable.");
        }
        if (!active) return;

        quotesRef.current = result.data;
        setQuotes(result.data);
        setStatus(result.source === "cache-stale" ? "stale" : "available");
        setUpdatedAt(result.timestamp ?? Date.now());
      } catch {
        if (!active) return;
        setStatus(quotesRef.current.length > 0 ? "stale" : "unavailable");
      }
    };

    void loadQuotes();
    const timer = window.setInterval(loadQuotes, REFRESH_INTERVAL);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const tickerItems = quotes.length > 0 ? [...quotes, ...quotes] : [];
  const statusLabel =
    status === "loading"
      ? "लोड हो रहा है"
      : status === "stale"
        ? "पुराना डेटा"
        : status === "unavailable"
          ? "डेटा उपलब्ध नहीं"
          : "बाज़ार डेटा";

  return (
    <section className={styles.marketBar} aria-label="शेयर बाज़ार सूचकांक">
      <div className={styles.marketShell}>
        <div className={styles.marketBadge}>
          <span className={styles.marketBadgeIcon}>
            <TrendingUp size={15} strokeWidth={2.4} aria-hidden="true" />
          </span>
          <span className={styles.marketBadgeTitle}>शेयर बाज़ार</span>
          <span className={`${styles.liveIndicator} ${status !== "available" ? styles.marketStatusMuted : ""}`}>
            <span className={styles.liveDot} />
            <span>{statusLabel}</span>
          </span>
        </div>

        <div
          className={styles.tickerViewport}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          aria-live="polite"
        >
          {tickerItems.length > 0 ? (
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
                    <span className={`${styles.itemBadge} ${isUp ? styles.itemUp : styles.itemDown}`}>
                      {isUp ? (
                        <ArrowUpRight size={13} strokeWidth={2.5} aria-hidden="true" />
                      ) : (
                        <ArrowDownRight size={13} strokeWidth={2.5} aria-hidden="true" />
                      )}
                      <span>{quote.change}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <span className={styles.marketEmptyState}>
              {status === "loading" ? "बाज़ार भाव लाए जा रहे हैं…" : "बाज़ार भाव अभी उपलब्ध नहीं हैं"}
            </span>
          )}
        </div>

        {updatedAt ? (
          <time className={styles.marketUpdatedAt} dateTime={new Date(updatedAt).toISOString()}>
            {new Intl.DateTimeFormat("hi-IN", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Kolkata",
            }).format(updatedAt)}
          </time>
        ) : null}

        {quotes.length > 0 ? (
          <div className={styles.marketControls}>
            <button
              type="button"
              className={styles.marketCtrlBtn}
              onClick={() => setIsPaused((paused) => !paused)}
              title={isPaused ? "बाज़ार टिकर चलाएँ" : "बाज़ार टिकर रोकें"}
              aria-label={isPaused ? "बाज़ार टिकर चलाएँ" : "बाज़ार टिकर रोकें"}
            >
              {isPaused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
