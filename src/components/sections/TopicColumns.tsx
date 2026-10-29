"use client";

import { useEffect, useState } from "react";
import { RowArticle } from "@/components/ui/RowArticle";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import { categoryHref } from "@/lib/links";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";
import { FileText, Loader2 } from "lucide-react";
import styles from "./sections.module.css";

interface CategoryMeta {
  title: string;
  slug: string;
}

// Canonical editorial topic pairs
const BASE_TOPIC_PAIRS: [CategoryMeta, CategoryMeta][] = [
  [{ title: "व्यापार", slug: "व्यापार" }, { title: "खेल", slug: "खेल" }],
  [{ title: "मनोरंजन", slug: "मनोरंजन" }, { title: "तकनीक", slug: "तकनीक" }],
  [{ title: "स्वास्थ्य", slug: "स्वास्थ्य" }, { title: "शिक्षा", slug: "शिक्षा" }],
];

// Sections handled elsewhere on the page or media categories to exclude from topic columns
const EXCLUDED_SLUGS = new Set([
  "शहर",
  "ई-पेपर",
  "लोकल-न्यूज़",
  "लोकल न्यूज़",
  "kamgar-times",
  "ताज़ा-खबरें",
  "ताज़ा खबरें",
  "राजनीति", // Has dedicated PoliticsSection
  "संपादकीय", // Has dedicated EditorsPicks
  "विशेष रिपोर्ट", // Has dedicated FeaturesSection
  "विशेष-रिपोर्ट",
  "विशेष लेख",
  "फोटो गैलरी", // Has dedicated GallerySection
  "photo-gallery",
  "gallery",
  "वीडियो", // Has dedicated VideoSection
  "videos",
  "shorts",
]);

/**
 * Topic Columns: Two-column category bands (Exclusively API Driven, Zero Dummy Data)
 * Displays articles from the Admin Panel. If no articles exist, shows a clean empty state.
 */
export function TopicColumns() {
  const [topicPairs, setTopicPairs] = useState<[CategoryMeta, CategoryMeta][]>(BASE_TOPIC_PAIRS);
  const [desksData, setDesksData] = useState<Record<string, Article[]>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let active = true;

    // Fetch articles for the 3 core topic pairs
    BASE_TOPIC_PAIRS.flatMap((p) => [p[0], p[1]]).forEach((desk) => {
      setLoadingMap((prev) => ({ ...prev, [desk.title]: true }));
      kamgarApi
        .getArticles({ category: desk.slug || desk.title, limit: 3 })
        .then((res) => {
          if (!active) return;
          if (res?.articles && res.articles.length > 0) {
            const adapted = res.articles.map(adaptArticleListItem);
            setDesksData((prev) => ({ ...prev, [desk.title]: adapted }));
          } else {
            setDesksData((prev) => ({ ...prev, [desk.title]: [] }));
          }
        })
        .catch(() => {
          if (active) setDesksData((prev) => ({ ...prev, [desk.title]: [] }));
        })
        .finally(() => {
          if (active) setLoadingMap((prev) => ({ ...prev, [desk.title]: false }));
        });
    });

    // Check backend category tree for any extra news categories created in Admin Panel
    kamgarApi
      .getCategoryTree()
      .then(async (cats) => {
        if (!active || !Array.isArray(cats) || cats.length === 0) return;

        const coveredTitles = new Set(BASE_TOPIC_PAIRS.flatMap((p) => [p[0].title, p[1].title]));
        const extraCandidates = cats.filter(
          (c) =>
            !coveredTitles.has(c.name) &&
            !EXCLUDED_SLUGS.has(c.slug) &&
            !EXCLUDED_SLUGS.has(c.name) &&
            !c.name.includes("शहर") &&
            !c.name.includes("ई-पेपर") &&
            !c.name.includes("गैलरी") &&
            !c.name.includes("वीडियो")
        );

        if (extraCandidates.length === 0) return;

        // For extra categories, only show if they actually have published articles in admin panel
        const extraWithArticles: CategoryMeta[] = [];
        for (const candidate of extraCandidates) {
          try {
            const res = await kamgarApi.getArticles({
              category: candidate.slug || candidate.name,
              limit: 3,
            });
            if (res?.articles && res.articles.length > 0) {
              extraWithArticles.push({ title: candidate.name, slug: candidate.slug || candidate.name });
              if (active) {
                setDesksData((prev) => ({
                  ...prev,
                  [candidate.name]: res.articles.map(adaptArticleListItem),
                }));
                setLoadingMap((prev) => ({ ...prev, [candidate.name]: false }));
              }
            }
          } catch {}
        }

        if (!active || extraWithArticles.length === 0) return;

        const extraPairs: [CategoryMeta, CategoryMeta][] = [];
        for (let i = 0; i < extraWithArticles.length; i += 2) {
          if (extraWithArticles[i + 1]) {
            extraPairs.push([extraWithArticles[i], extraWithArticles[i + 1]]);
          } else {
            extraPairs.push([extraWithArticles[i], { title: "विशेष कवरेज", slug: "विशेष-कवरेज" }]);
          }
        }

        setTopicPairs([...BASE_TOPIC_PAIRS, ...extraPairs]);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {topicPairs.map(([leftDesk, rightDesk]) => (
        <section key={leftDesk.title} className={styles.pair} aria-label={`${leftDesk.title} और ${rightDesk.title}`}>
          {[leftDesk, rightDesk].map((desk) => {
            const articles = desksData[desk.title] || [];
            const isLoading = loadingMap[desk.title] ?? true;

            return (
              <div key={desk.title} className={styles.stack}>
                <SectionHeader title={desk.title} href={categoryHref(desk.slug || desk.title)} />

                {isLoading && (
                  <div className={styles.noDataLoading}>
                    <Loader2 className="animate-spin" size={18} />
                    <span>{desk.title} समाचार लोड हो रहे हैं...</span>
                  </div>
                )}

                {!isLoading && articles.length === 0 && (
                  <div className={styles.categoryNoDataCard}>
                    <FileText className={styles.noDataIcon} size={28} />
                    <h4 className={styles.noDataTitle}>समाचार उपलब्ध नहीं हैं</h4>
                    <p className={styles.noDataDesc}>
                      शीघ्र ही &apos;{desk.title}&apos; से जुड़े ताज़ा समाचार यहाँ उपलब्ध होंगे।
                    </p>
                  </div>
                )}

                {!isLoading && articles.length > 0 && (
                  articles.map((article, a) => (
                    <div key={article.id} style={stagger(a)}>
                      <RowArticle article={article} />
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </section>
      ))}
    </>
  );
}
