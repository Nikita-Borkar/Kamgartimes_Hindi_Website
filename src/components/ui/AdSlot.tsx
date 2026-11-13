"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Ad, AdVariant } from "@/data/ads";
import { kamgarApi } from "@/services/apiClient";
import { Media } from "./Media";
import styles from "./ui.module.css";

const variantClass: Record<string, string> = {
  billboard: styles.adBillboard,
  tower: styles.adTower,
  rail: styles.adRail,
  leaderboard: styles.adLeaderboard,
  content: styles.adContent,
  articleInside: styles.adArticleInside,
};

type DisplayAd = {
  id: string;
  campaignId?: string;
  slotId?: string;
  label?: string;
  headline?: string;
  href?: string;
  image?: string;
  videoUrl?: string;
  mediaType?: "IMAGE" | "VIDEO";
  target?: string;
  variant: AdVariant;
};

export function AdSlot({
  ad: initialAd,
  slotKey,
  priority = false,
}: {
  ad?: Ad;
  slotKey?: string;
  priority?: boolean;
}) {
  const [adsList, setAdsList] = useState<DisplayAd[]>(() => {
    if (initialAd) {
      return [{
        id: initialAd.id,
        label: initialAd.label || "विज्ञापन",
        headline: initialAd.headline,
        href: initialAd.href,
        image: initialAd.image,
        variant: initialAd.variant || "leaderboard",
        target: "_blank",
      }];
    }
    return [];
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const impressedSetRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!slotKey) {
      if (initialAd) {
        setAdsList([{
          id: initialAd.id,
          label: initialAd.label || "विज्ञापन",
          headline: initialAd.headline,
          href: initialAd.href,
          image: initialAd.image,
          variant: initialAd.variant || "leaderboard",
          target: "_blank",
        }]);
      }
      return;
    }

    let active = true;
    kamgarApi
      .getAds(slotKey)
      .then((res) => {
        if (!active) return;
        const fetched = res?.ads || [];
        if (fetched.length === 0) {
          if (initialAd) {
            setAdsList([{
              id: initialAd.id,
              label: initialAd.label || "विज्ञापन",
              headline: initialAd.headline,
              href: initialAd.href,
              image: initialAd.image,
              variant: initialAd.variant || "leaderboard",
              target: "_blank",
            }]);
          } else {
            setAdsList([]);
          }
          return;
        }

        const mapped: DisplayAd[] = fetched.map((adItem) => ({
          id: adItem.adCampaignId,
          campaignId: adItem.adCampaignId,
          slotId: adItem.adSlotId,
          label: initialAd?.label || "विज्ञापन",
          headline: adItem.title || adItem.imageAlt || initialAd?.headline,
          href: adItem.clickUrl,
          image: adItem.imageUrl,
          videoUrl: adItem.videoUrl,
          mediaType: adItem.mediaType || (adItem.videoUrl ? "VIDEO" : "IMAGE"),
          target: adItem.target || "_blank",
          variant: initialAd?.variant || "leaderboard",
        }));

        setAdsList(mapped);
        setCurrentIndex(0);
      })
      .catch(() => {
        if (active && initialAd) {
          setAdsList([{
            id: initialAd.id,
            label: initialAd.label || "विज्ञापन",
            headline: initialAd.headline,
            href: initialAd.href,
            image: initialAd.image,
            variant: initialAd.variant || "leaderboard",
            target: "_blank",
          }]);
        }
      });

    return () => {
      active = false;
    };
  }, [slotKey, initialAd]);

  // Auto-slide when multiple ads are present
  useEffect(() => {
    if (adsList.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adsList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [adsList.length, isHovered]);

  // Record impression for active ad
  useEffect(() => {
    const cur = adsList[currentIndex];
    if (!cur?.campaignId || !cur?.slotId) return;

    const key = `${cur.campaignId}:${cur.slotId}`;
    if (!impressedSetRef.current.has(key)) {
      impressedSetRef.current.add(key);
      kamgarApi.recordAdImpression(cur.campaignId, cur.slotId).catch(() => {});
    }
  }, [adsList, currentIndex]);

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + adsList.length) % adsList.length);
  }, [adsList.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % adsList.length);
  }, [adsList.length]);

  if (adsList.length === 0) return null;

  const activeAd = adsList[currentIndex] || adsList[0];
  const isVideo = activeAd.mediaType === "VIDEO" || Boolean(activeAd.videoUrl);

  const handleClick = async (e: React.MouseEvent) => {
    if (activeAd.campaignId) {
      e.preventDefault();
      try {
        const res = await kamgarApi.recordAdClick(activeAd.campaignId, activeAd.slotId);
        const destination = res?.clickUrl || activeAd.href || "https://kamgartimes.in";
        window.open(destination, res?.target || activeAd.target || "_blank");
      } catch {
        window.open(activeAd.href || "https://kamgartimes.in", activeAd.target || "_blank");
      }
    }
  };

  const cssClass = variantClass[activeAd.variant] || styles.adLeaderboard;

  return (
    <div
      className={styles.adSliderContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        className={`${styles.ad} ${cssClass}`}
        href={activeAd.href}
        onClick={handleClick}
        target={activeAd.target || "_blank"}
        rel="noopener noreferrer"
        aria-label={`${activeAd.label || "विज्ञापन"}: ${activeAd.headline ?? ""}`}
      >
        {isVideo ? (
          <video
            key={activeAd.videoUrl || activeAd.image}
            src={activeAd.videoUrl || activeAd.image}
            autoPlay
            loop
            muted
            playsInline
            className={styles.adMedia}
          />
        ) : (
          <Media
            key={activeAd.image}
            src={activeAd.image || "/img/hero-ads.png"}
            alt={activeAd.headline || "विज्ञापन"}
            sizes="100vw"
            priority={priority}
            className={styles.adMedia}
          />
        )}

        {isVideo && (
          <span className={styles.adVideoBadge}>
            <Play size={10} fill="currentColor" /> VIDEO
          </span>
        )}

        <span className={styles.adLabel}>{activeAd.label || "विज्ञापन"}</span>
        {activeAd.headline ? (
          <p className={styles.adHeadline}>{activeAd.headline}</p>
        ) : null}
      </a>

      {/* Multiple Ads Controls: Prev/Next & Dots */}
      {adsList.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.adNavArrow} ${styles.adNavPrev}`}
            onClick={handlePrev}
            aria-label="Previous Ad"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            className={`${styles.adNavArrow} ${styles.adNavNext}`}
            onClick={handleNext}
            aria-label="Next Ad"
          >
            <ChevronRight size={18} />
          </button>

          <div className={styles.adDotsOverlay}>
            {adsList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to ad ${idx + 1}`}
                data-active={idx === currentIndex}
                className={styles.adDotIndicator}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
