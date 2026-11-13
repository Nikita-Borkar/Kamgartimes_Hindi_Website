"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import type { Ad, AdVariant } from "@/data/ads";
import { kamgarApi } from "@/services/apiClient";
import { Media } from "./Media";
import styles from "./ui.module.css";

// Global audio preference: default muted for browser autoplay policy.
// If the user un-mutes once, subsequent ads in the rotation continue with sound.
let globalAdMuted = true;

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
  const createFromInitial = (ad?: Ad): DisplayAd[] => {
    if (!ad) return [];
    return [{
      id: ad.id,
      campaignId: ad.campaignId,
      slotId: ad.slotId,
      label: ad.label || "विज्ञापन",
      headline: ad.headline,
      href: ad.href,
      image: ad.image,
      videoUrl: ad.videoUrl,
      mediaType: ad.mediaType || (ad.videoUrl ? "VIDEO" : "IMAGE"),
      variant: ad.variant || "leaderboard",
      target: ad.target || "_blank",
    }];
  };

  const [adsList, setAdsList] = useState<DisplayAd[]>(() => createFromInitial(initialAd));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => globalAdMuted);
  const impressedSetRef = useRef<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!slotKey) {
      if (initialAd) {
        setAdsList(createFromInitial(initialAd));
        setCurrentIndex(0);
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
            setAdsList(createFromInitial(initialAd));
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
          setAdsList(createFromInitial(initialAd));
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
  const isVideo =
    activeAd?.mediaType === "VIDEO" ||
    Boolean(activeAd?.videoUrl && activeAd.videoUrl.trim().length > 0) ||
    Boolean(activeAd?.image && activeAd.image.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i));

  const videoSrc =
    activeAd?.videoUrl && activeAd.videoUrl.trim().length > 0
      ? activeAd.videoUrl
      : (activeAd?.image && activeAd.image.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i) ? activeAd.image : "");

  const toggleSound = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    globalAdMuted = nextMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
    videoRef.current.defaultMuted = nextMuted;
    if (!nextMuted) {
      videoRef.current.play().catch(() => {});
    }
  }, [isMuted]);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.defaultMuted = isMuted;
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [isVideo, videoSrc, currentIndex, isMuted]);

  useEffect(() => {
    setIsMuted(globalAdMuted);
  }, [currentIndex, videoSrc]);

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
        {isVideo && videoSrc ? (
          <video
            ref={videoRef}
            key={videoSrc}
            src={videoSrc}
            poster={activeAd.image && !activeAd.image.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i) ? activeAd.image : undefined}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            className={styles.adMedia}
            onCanPlay={(e) => {
              e.currentTarget.muted = isMuted;
              e.currentTarget.play().catch(() => {});
            }}
            onLoadedData={(e) => {
              e.currentTarget.muted = isMuted;
              e.currentTarget.play().catch(() => {});
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
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

      {/* Sound Toggle Button for Video Ads */}
      {isVideo && (
        <button
          type="button"
          className={styles.adSoundBtn}
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          title={isMuted ? "आवाज़ चालू करें" : "आवाज़ बंद करें"}
        >
          {isMuted ? (
            <VolumeX size={18} />
          ) : (
            <Volume2 size={18} />
          )}
        </button>
      )}

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
