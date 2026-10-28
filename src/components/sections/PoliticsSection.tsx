"use client";

import { useEffect, useState } from "react";
import { RowArticle } from "@/components/ui/RowArticle";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoryCard } from "@/components/ui/StoryCard";
import { stagger } from "@/components/motion/stagger";
import { categoryHref } from "@/lib/links";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";
import { FileText, Loader2 } from "lucide-react";
import styles from "./sections.module.css";

/** राजनीति: Two image features, then a compact brief list (Exclusively API Driven, Zero Dummy Data) */
export function PoliticsSection() {
  const [featuresList, setFeaturesList] = useState<Article[]>([]);
  const [briefsList, setBriefsList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    kamgarApi
      .getArticles({ category: "राजनीति", limit: 6 })
      .then((res) => {
        if (!active) return;
        if (res?.articles && res.articles.length > 0) {
          const adapted = res.articles.map(adaptArticleListItem);
          setFeaturesList(adapted.slice(0, 2));
          if (adapted.length > 2) {
            setBriefsList(adapted.slice(2));
          } else {
            setBriefsList([]);
          }
        } else {
          setFeaturesList([]);
          setBriefsList([]);
        }
      })
      .catch(() => {
        if (active) {
          setFeaturesList([]);
          setBriefsList([]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const hasAnyPolitics = featuresList.length > 0 || briefsList.length > 0;

  return (
    <section className={styles.section} aria-label="राजनीति">
      <div>
        <SectionHeader title="राजनीति" href={categoryHref("राजनीति")} />
      </div>

      {loading && (
        <div className={styles.noDataLoading}>
          <Loader2 className="animate-spin" size={20} />
          <span>राजनीति समाचार लोड हो रहे हैं...</span>
        </div>
      )}

      {!loading && !hasAnyPolitics && (
        <div className={styles.noDataCard}>
          <FileText className={styles.noDataIcon} size={40} />
          <h4 className={styles.noDataTitle}>राजनीति समाचार उपलब्ध नहीं हैं</h4>
          <p className={styles.noDataDesc}>
            शीघ्र ही राजनीति से जुड़े ताज़ा समाचार यहाँ उपलब्ध होंगे।
          </p>
        </div>
      )}

      {!loading && hasAnyPolitics && (
        <div className={styles.politics}>
          {featuresList.map((article, i) => (
            <div key={article.id} style={stagger(i)}>
              <StoryCard
                article={article}
                tall
                sizes="(max-width: 900px) 100vw, 32vw"
              />
            </div>
          ))}
          {briefsList.length > 0 && (
            <div className={styles.stack} style={stagger(2)}>
              {briefsList.map((article) => (
                <RowArticle key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
