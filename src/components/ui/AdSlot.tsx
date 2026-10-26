"use client";

import { useEffect, useState } from "react";
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

export function AdSlot({
  ad: initialAd,
  slotKey,
  priority = false,
}: {
  ad?: Ad;
  slotKey?: string;
  priority?: boolean;
}) {
  const [adData, setAdData] = useState<any>(initialAd || null);

  useEffect(() => {
    const key = slotKey || (initialAd?.id ? `hero_leaderboard` : "hero_leaderboard");
    if (slotKey || !initialAd) {
      kamgarApi
        .getAds(key)
        .then((res) => {
          if (res?.ads && res.ads.length > 0) {
            const topAd = res.ads[0];
            setAdData({
              id: topAd.campaignId,
              campaignId: topAd.campaignId,
              slotId: topAd.slotId,
              label: "विज्ञापन",
              headline: topAd.title,
              href: topAd.clickUrl,
              image: topAd.image,
              target: topAd.target || "_blank",
              variant: initialAd?.variant || "leaderboard",
            });
          }
        })
        .catch(() => {
          // Fallback to initialAd
        });
    }
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
