"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OverlayCard } from "@/components/ui/OverlayCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import { articleHref } from "@/lib/links";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";
import { FileText, Loader2 } from "lucide-react";
import ui from "@/components/ui/ui.module.css";
import styles from "./sections.module.css";

type ReadItem = {
  id: string;
  category: string;
  headline: string;
  excerpt?: string;
  meta: string;
  image?: string;
};

/**
 * संपादक की पसंद: One hero overlay, two stacked overlays, then a read list (Exclusively API Driven, Zero Dummy Data)
 */
export function EditorsPicks() {
  const [heroArticle, setHeroArticle] = useState<Article | null>(null);
  const [stackArticles, setStackArticles] = useState<Article[]>([]);
  const [readArticles, setReadArticles] = useState<ReadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    // 1. Try fetching editorial articles specifically
    kamgarApi
      .getArticles({ category: "संपादकीय", limit: 6 })
      .then((res) => {
        if (!active) return;
        if (res?.articles && res.articles.length > 0) {
          const adapted = res.articles.map(adaptArticleListItem);
          setHeroArticle(adapted[0] || null);
          setStackArticles(adapted.slice(1, 3));
          setReadArticles(adapted.slice(3));
          setLoading(false);
        } else {
          // If no specific editorial, load latest published articles
          kamgarApi
            .getArticles({ limit: 6 })
            .then((allRes) => {
              if (!active) return;
              if (allRes?.articles && allRes.articles.length > 0) {
                const adapted = allRes.articles.map(adaptArticleListItem);
                setHeroArticle(adapted[0] || null);
                setStackArticles(adapted.slice(1, 3));
                setReadArticles(adapted.slice(3));
              } else {
                setHeroArticle(null);
                setStackArticles([]);
                setReadArticles([]);
              }
            })
            .catch(() => {
              if (active) {
                setHeroArticle(null);
                setStackArticles([]);
                setReadArticles([]);
              }
            })
            .finally(() => {
              if (active) setLoading(false);
            });
        }
      })
      .catch(() => {
        if (active) {
          setHeroArticle(null);
          setStackArticles([]);
          setReadArticles([]);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const hasAnyPicks = heroArticle !== null || stackArticles.length > 0;

  return (
    <section className={styles.section} aria-label="संपादक की पसंद">
      <div>
        <SectionHeader title="संपादक की पसंद" href="/category/संपादकीय" />
      </div>

      {loading && (
        <div className={styles.noDataLoading}>
          <Loader2 className="animate-spin" size={20} />
          <span>संपादक की पसंद लोड हो रही है...</span>
        </div>
      )}

      {!loading && !hasAnyPicks && (
        <div className={styles.noDataCard}>
          <FileText className={styles.noDataIcon} size={40} />
          <h4 className={styles.noDataTitle}>संपादक की पसंद के लेख उपलब्ध नहीं हैं</h4>
          <p className={styles.noDataDesc}>
            शीघ्र ही संपादक की पसंद के लेख यहाँ उपलब्ध होंगे।
          </p>
        </div>
      )}

      {!loading && heroArticle && (
        <div className={styles.picks}>
          <div className={styles.picksHero}>
            <OverlayCard
              article={heroArticle}
              headlineSize="l"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          </div>

          {stackArticles.length > 0 && (
            <div className={styles.picksStack}>
              {stackArticles.map((article, i) => (
                <div key={article.id} className={styles.picksStackItem} style={stagger(i)}>
                  <OverlayCard
                    article={article}
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}

          {readArticles.length > 0 && (
            <div className={styles.reads} style={stagger(2)}>
              {readArticles.map((article) => (
                <Link
                  key={article.id}
                  className={styles.read}
                  href={articleHref(article.id)}
                  aria-label={article.headline}
                >
                  <div className={ui.cat}>{article.category}</div>
                  <h3 className={`${styles.readTitle} ${ui.titleM}`}>
                    {article.headline}
                  </h3>
                  <div className={ui.meta}>{article.meta}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
