"use client";

import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { RowArticle } from "@/components/ui/RowArticle";
import { EmptyState } from "@/components/ui/EmptyState";
import { NewsGridSkeleton } from "@/components/ui/NewsGridSkeleton";
import { AdSlot } from "@/components/ui/AdSlot";
import { leaderboardAds } from "@/data/ads";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";
import { PageHero } from "./PageHero";
import styles from "./pages.module.css";

/**
 * Site search. Integrated with server-side live search API (GET /public/articles?search=...)
 */
export function SearchPage() {
  const [query, setQuery] = useState("");
  const [serverResults, setServerResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const term = query.trim().toLowerCase();

  useEffect(() => {
    if (!term || term.length < 2) {
      setServerResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      kamgarApi
        .getArticles({ search: term, limit: 20 })
        .then((res) => {
          if (res?.articles) {
            setServerResults(res.articles.map(adaptArticleListItem));
          } else {
            setServerResults([]);
          }
        })
        .catch(() => {
          setServerResults([]);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [term]);

  const results = term ? serverResults : [];

  return (
    <main id="main" className={styles.main}>
      <PageHero eyebrow="खोज" title="समाचार खोजें" />

      <form
        className={styles.searchForm}
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        {isSearching ? (
          <Loader2 size={20} className={styles.spin} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Search size={20} strokeWidth={2} aria-hidden="true" />
        )}
        <input
          className={styles.searchInput}
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="समाचार, विषय या शब्द खोजें…"
          aria-label="खोज"
          autoFocus
        />
      </form>

      {!term ? (
        <p className={styles.searchHint}>
          खोजने के लिए ऊपर शब्द लिखें — जैसे चुनाव, बजट, कामगार, मुंबई, पुणे।
        </p>
      ) : isSearching ? (
        <NewsGridSkeleton count={3} />
      ) : results.length === 0 ? (
        <EmptyState
          title={`“${query.trim()}” के लिए कोई परिणाम नहीं मिला`}
          description="कृपया वर्तनी जांचें या कोई अन्य कीवर्ड आज़माएं।"
          actionLabel="मुख्य पृष्ठ पर जाएं"
          actionHref="/"
          secondaryLabel="ताज़ा समाचार देखें"
          secondaryHref="/category/ताज़ा-खबरें"
        />
      ) : (
        <>
          <p className={styles.searchCount}>
            {results.length} परिणाम मिले
          </p>
          <div className={`${styles.searchResults} reveal`}>
            {results.map((article) => (
              <RowArticle
                key={article.id}
                article={article}
                headlineSize="m"
                showExcerpt
                wide
                sizes="(max-width: 900px) 220px, 220px"
              />
            ))}
          </div>
          <div className={styles.categoryAdBottom}>
            <AdSlot ad={leaderboardAds[2]} slotKey="article_top" />
          </div>
        </>
      )}
    </main>
  );
}
