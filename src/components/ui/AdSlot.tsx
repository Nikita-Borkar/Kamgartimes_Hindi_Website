"use client";

import { useEffect, useRef, useState } from "react";
import type { Ad } from "@/data/ads";
import { kamgarApi } from "@/services/apiClient";
import { Media } from "./Media";
import styles from "./ui.module.css";

const variantClass: Record<string, string> = {
  billboard: styles.adBillboard,
  tower: styles.adTower,
  rail: styles.adRail,
  leaderboard: styles.adLeaderboard,
  content: styles.adContent,
};

type DisplayAd = Ad & { campaignId?: string; slotId?: string; target?: string };

export function AdSlot({
  ad: initialAd,
  slotKey,
  priority = false,
}: {
  ad?: Ad;
  slotKey?: string;
  priority?: boolean;
}) {
  const [adData, setAdData] = useState<DisplayAd | null>(
    slotKey ? null : initialAd || null,
  );
  const impressedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!slotKey) return;

    let active = true;
    kamgarApi
      .getAds(slotKey)
      .then((res) => {
        if (!active) return;
        const topAd = res?.ads?.[0];
        if (!topAd) {
          // Slot is configured but has no active campaign — render nothing
          // rather than silently showing the local design placeholder.
          setAdData(null);
          return;
        }

        setAdData({
          id: topAd.adCampaignId,
          campaignId: topAd.adCampaignId,
          slotId: topAd.adSlotId,
          label: initialAd?.label || "विज्ञापन",
          headline: topAd.title || topAd.imageAlt || initialAd?.headline,
          href: topAd.clickUrl,
          image: topAd.imageUrl,
          target: topAd.target || "_blank",
          variant: initialAd?.variant || "leaderboard",
        });

        const impressionKey = `${topAd.adCampaignId}:${topAd.adSlotId}`;
        if (impressedRef.current !== impressionKey) {
          impressedRef.current = impressionKey;
          kamgarApi.recordAdImpression(topAd.adCampaignId, topAd.adSlotId).catch(() => {});
        }
      })
      .catch(() => {
        // Slot missing or API unavailable — fall back to the local placeholder.
        if (active) setAdData(initialAd || null);
      });

    return () => {
      active = false;
    };
  }, [slotKey, initialAd]);

  if (!adData) return null;

  const handleClick = async (e: React.MouseEvent) => {
    if (adData.campaignId) {
      e.preventDefault();
      try {
        const res = await kamgarApi.recordAdClick(adData.campaignId, adData.slotId);
        const destination = res?.clickUrl || adData.href || "https://kamgartimes.in";
        window.open(destination, res?.target || adData.target || "_blank");
      } catch {
        window.open(adData.href || "https://kamgartimes.in", adData.target || "_blank");
      }
    }
  };

  const cssClass = variantClass[adData.variant] || styles.adLeaderboard;

  return (
    <a
      className={`${styles.ad} ${cssClass}`}
      href={adData.href}
      onClick={handleClick}
      target={adData.target || "_blank"}
      rel="noopener noreferrer"
      aria-label={`${adData.label || "विज्ञापन"}: ${adData.headline ?? ""}`}
    >
      <Media
        src={adData.image}
        alt={adData.headline || "विज्ञापन"}
        sizes="100vw"
        priority={priority}
        className={styles.adMedia}
      />
      <span className={styles.adLabel}>{adData.label || "विज्ञापन"}</span>
      {adData.headline ? (
        <p className={styles.adHeadline}>{adData.headline}</p>
      ) : null}
    </a>
  );
}
