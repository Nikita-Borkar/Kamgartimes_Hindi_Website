"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { heroAds, type Ad, type AdVariant } from "@/data/ads";
import { AdSlot } from "./AdSlot";
import { kamgarApi } from "@/services/apiClient";
import styles from "./ui.module.css";

const ROTATE_MS = 6000;

type HeroSlide = Ad & { campaignId?: string; slotId?: string; target?: string };

/**
 * The top billboard rotates on its own. Three ways to take control, because
 * each one leaves a different reader stranded without it:
 *  - an explicit pause button (WCAG 2.2.2, and the only one touch readers get)
 *  - keyboard focus inside the carousel
 *  - a dot press, which stops auto-advance for good
 *
 * Auto-advance never runs when the reader asked for reduced motion.
 */
export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [apiSlides, setApiSlides] = useState<HeroSlide[] | null>(null);
  const takenOver = useRef(false);
  const shell = useRef<HTMLDivElement>(null);
  const impressed = useRef<string | null>(null);

  const slides: HeroSlide[] = apiSlides ?? heroAds;
  const count = slides.length;

  // The hero is one admin-managed slot. When it has active campaigns, rotate
  // those creatives; otherwise keep the local design placeholders.
  useEffect(() => {
    let active = true;
    kamgarApi
      .getAds("hero_leaderboard")
      .then((res) => {
        if (!active) return;
        const mapped: HeroSlide[] = (res?.ads || []).map((ad) => ({
          id: ad.adCampaignId,
          campaignId: ad.adCampaignId,
          slotId: ad.adSlotId,
          label: "विज्ञापन",
          headline: ad.title || ad.imageAlt,
          image: ad.imageUrl,
          href: ad.clickUrl,
          target: ad.target || "_blank",
          variant: "billboard" as AdVariant,
        }));
        setApiSlides(mapped.length > 0 ? mapped : null);
        setIndex(0);
      })
      .catch(() => {
        // Keep the local placeholders when the API is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!apiSlides || apiSlides.length === 0) return;
    const ad = slides[index];
    if (!ad?.campaignId || !ad?.slotId) return;
    const key = `${ad.campaignId}:${ad.slotId}`;
    if (impressed.current === key) return;
    impressed.current = key;
    kamgarApi.recordAdImpression(ad.campaignId, ad.slotId).catch(() => {});
  }, [apiSlides, index, slides]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || paused || takenOver.current) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [count, paused]);

  // Focus pause. Tabbing into the carousel should not yank a new ad out from
  // under whoever is about to press a dot.
  useEffect(() => {
    const node = shell.current;
    if (!node) return;

    const onFocusIn = () => setPaused(true);
    const onFocusOut = (e: FocusEvent) => {
      if (!node.contains(e.relatedTarget as Node | null)) {
        setPaused(false);
      }
    };

    node.addEventListener("focusin", onFocusIn);
    node.addEventListener("focusout", onFocusOut);
    return () => {
      node.removeEventListener("focusin", onFocusIn);
      node.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const select = (next: number) => {
    takenOver.current = true;
    setIndex(next);
  };

  return (
    <div
      ref={shell}
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={slides[index].id} className={styles.slideFade}>
        <AdSlot ad={slides[index]} priority />
      </div>

      <div className={styles.dots} role="group" aria-label="विज्ञापन स्लाइडर">
        {slides.map((ad, i) => (
          <button
            key={ad.id}
            type="button"
            aria-label={`विज्ञापन ${i + 1}`}
            aria-current={i === index}
            className={styles.dot}
            data-active={i === index}
            onClick={() => select(i)}
            suppressHydrationWarning
          />
        ))}

        <button
          type="button"
          className={styles.pause}
          aria-label={paused ? "स्लाइडर शुरू करें" : "स्लाइडर रोकें"}
          onClick={() => {
            takenOver.current = !takenOver.current;
            setPaused(!paused);
          }}
          suppressHydrationWarning
        >
          {paused ? (
            <Play size={12} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Pause size={12} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}