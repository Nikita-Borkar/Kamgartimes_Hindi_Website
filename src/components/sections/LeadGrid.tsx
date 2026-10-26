"use client";

import { useEffect, useState } from "react";
import { leadRailAd } from "@/data/ads";
import { AdSlot } from "@/components/ui/AdSlot";
import { OverlayCard } from "@/components/ui/OverlayCard";
import { LeadVideoSlider } from "@/components/sections/LeadVideoSlider";
import { stagger } from "@/components/motion/stagger";
import { kamgarApi } from "@/services/apiClient";
import styles from "./sections.module.css";
import type { Article } from "@/data/types";

/** Below the hero: ad rail, video slider, and news articles from API (Zero Dummy Data) */
export function LeadGrid() {
  const [articleTiles, setArticleTiles] = useState<Article[]>([]);

  useEffect(() => {
    kamgarApi
      .getArticles({ limit: 4 })
      .then((res) => {
        if (res?.articles && res.articles.length > 0) {
          const mapped: Article[] = res.articles.map((a) => ({
            id: a.slug || a._id,
            category: a.category?.name || "समाचार",
            headline: a.title,
            excerpt: a.summary,
            image: a.featuredImage || "/img/img01.png",
            meta: `${a.readTime || 3} मिनट`,
            body: [],
          }));
          setArticleTiles(mapped);
        } else {
          setArticleTiles([]);
        }
      })
      .catch(() => {
        setArticleTiles([]);
      });
  }, []);

  return (
    <section className={styles.section} aria-label="कामगार टाइम्स वीडियो और मुख्य समाचार">
      <div className={styles.leadGrid}>
        <AdSlot ad={leadRailAd} slotKey="article_top" />
        <LeadVideoSlider />
      </div>

      {articleTiles.length > 0 && (
        <div className={styles.tiles} style={stagger(2)}>
          {articleTiles.map((article) => (
            <div key={article.id} className={styles.tile}>
              <OverlayCard
                article={article}
                sizes="(max-width: 900px) 100vw, 22vw"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
