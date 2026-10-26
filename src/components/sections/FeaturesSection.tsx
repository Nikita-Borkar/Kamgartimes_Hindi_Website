"use client";

import { useEffect, useState } from "react";
import { towerAd } from "@/data/ads";
import { AdSlot } from "@/components/ui/AdSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoryCard } from "@/components/ui/StoryCard";
import { stagger } from "@/components/motion/stagger";
import { categoryHref } from "@/lib/links";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";
import { FileText, Loader2 } from "lucide-react";
import styles from "./sections.module.css";

/** विशेष लेख और विचार: Three features, then a tall ad column (Exclusively API Driven, Zero Dummy Data) */
export function FeaturesSection() {
  const [featuresList, setFeaturesList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    kamgarApi
      .getArticles({ category: "विशेष-रिपोर्ट", limit: 3 })
      .then((res) => {
        if (!active) return;
        if (res?.articles && res.articles.length > 0) {
          setFeaturesList(res.articles.map(adaptArticleListItem));
        } else {
          // If no special reports, check for विचार or संपादकीय
          kamgarApi
            .getArticles({ category: "संपादकीय", limit: 3 })
            .then((edRes) => {
              if (!active) return;
              if (edRes?.articles && edRes.articles.length > 0) {
                setFeaturesList(edRes.articles.map(adaptArticleListItem));
              } else {
                setFeaturesList([]);
              }
            })
            .catch(() => {
              if (active) setFeaturesList([]);
            })
            .finally(() => {
              if (active) setLoading(false);
            });
          return;
        }
      })
      .catch(() => {
        if (active) setFeaturesList([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className={styles.section} aria-label="विशेष लेख और विचार">
      <div>
        <SectionHeader title="विशेष लेख और विचार" href={categoryHref("विचार")} />
      </div>

      {loading && (
        <div className={styles.noDataLoading}>
          <Loader2 className="animate-spin" size={20} />
          <span>विशेष लेख लोड हो रहे हैं...</span>
        </div>
      )}

      {!loading && featuresList.length === 0 && (
        <div className={styles.noDataCard}>
          <FileText className={styles.noDataIcon} size={40} />
          <h4 className={styles.noDataTitle}>विशेष लेख उपलब्ध नहीं हैं</h4>
          <p className={styles.noDataDesc}>
            एडमिन पैनल से &apos;विशेष रिपोर्ट&apos; या &apos;संपादकीय&apos; में लेख प्रकाशित होने के बाद यहाँ दिखेंगे।
          </p>
        </div>
      )}

      {!loading && featuresList.length > 0 && (
        <div className={styles.features}>
          {featuresList.map((article, i) => (
            <div key={article.id} style={stagger(i)}>
              <StoryCard
                article={article}
                sizes="(max-width: 900px) 100vw, 24vw"
              />
            </div>
          ))}
          <AdSlot ad={towerAd} slotKey="sidebar_square" />
        </div>
      )}
    </section>
  );
}
