"use client";

import { useEffect, useState } from "react";
import { railAd } from "@/data/ads";
import { AdSlot } from "@/components/ui/AdSlot";
import { RowArticle } from "@/components/ui/RowArticle";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";
import { FileText, Loader2 } from "lucide-react";
import styles from "./sections.module.css";

/** ताज़ा ख़बरें on the wide side, ट्रेंडिंग in a 340px rail (Exclusively API Driven, Zero Dummy Data) */
export function LatestTrending() {
  const [latestList, setLatestList] = useState<Article[]>([]);
  const [trendingList, setTrendingList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    kamgarApi
      .getArticles({ limit: 8 })
      .then((res) => {
        if (!active) return;
        if (res?.articles && res.articles.length > 0) {
          const adapted = res.articles.map(adaptArticleListItem);
          setLatestList(adapted.slice(0, 4));
          setTrendingList(adapted.slice(4));
        } else {
          setLatestList([]);
          setTrendingList([]);
        }
      })
      .catch(() => {
        if (active) {
          setLatestList([]);
          setTrendingList([]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className={styles.latestTrending} aria-label="ताज़ा ख़बरें">
      <div className={styles.stack}>
        <SectionHeader title="ताज़ा ख़बरें" action="और पढ़ें" href="/category/ताज़ा-खबरें" />
        
        {loading && (
          <div className={styles.noDataLoading}>
            <Loader2 className="animate-spin" size={18} />
            <span>ताज़ा ख़बरें लोड हो रही हैं...</span>
          </div>
        )}

        {!loading && latestList.length === 0 && (
          <div className={styles.categoryNoDataCard}>
            <FileText className={styles.noDataIcon} size={28} />
            <h4 className={styles.noDataTitle}>ताज़ा समाचार उपलब्ध नहीं हैं</h4>
            <p className={styles.noDataDesc}>एडमिन पैनल से ताज़ा समाचार प्रकाशित होने के बाद यहाँ दिखेंगे।</p>
          </div>
        )}

        {!loading && latestList.length > 0 && (
          latestList.map((article, i) => (
            <div key={article.id} style={stagger(i)}>
              <RowArticle
                article={article}
                wide
                headlineSize="m"
                showExcerpt
                sizes="(max-width: 900px) 100vw, 220px"
              />
            </div>
          ))
        )}
      </div>

      <div className={styles.stack}>
        <SectionHeader title="ट्रेंडिंग" action="और पढ़ें" href="/category/ताज़ा-खबरें" />
        <AdSlot ad={railAd} slotKey="sidebar_square" />

        {!loading && trendingList.length === 0 && (
          <div className={styles.categoryNoDataCard}>
            <FileText className={styles.noDataIcon} size={28} />
            <h4 className={styles.noDataTitle}>ट्रेंडिंग समाचार उपलब्ध नहीं हैं</h4>
            <p className={styles.noDataDesc}>एडमिन पैनल से अधिक समाचार प्रकाशित होने पर ट्रेंडिंग सूची यहाँ दिखेगी।</p>
          </div>
        )}

        {!loading && trendingList.length > 0 && (
          trendingList.map((article, i) => (
            <div key={article.id} style={stagger(i)}>
              <RowArticle
                article={article}
                sizes="(max-width: 900px) 100vw, 340px"
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
