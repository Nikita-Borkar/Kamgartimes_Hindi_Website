"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { allArticles } from "@/data/news";
import { RowArticle } from "@/components/ui/RowArticle";
import { AdSlot } from "@/components/ui/AdSlot";
import { leaderboardAds } from "@/data/ads";
import { PageHero } from "./PageHero";
import styles from "./pages.module.css";

/**
 * Site search. Filters the flat article index by headline, section or excerpt
 * as the reader types. Client-side for now; swap the filter for an API call
 * when a search backend exists.
 */
export function SearchPage() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!term) return [];
    return allArticles.filter(
      (article) =>
        article.headline.toLowerCase().includes(term) ||
        article.category.toLowerCase().includes(term) ||
        (article.excerpt?.toLowerCase().includes(term) ?? false),
    );
  }, [term]);

  return (
    <main id="main" className={styles.main}>
      <PageHero eyebrow="खोज" title="समाचार खोजें" />

      <form
        className={styles.searchForm}
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <Search size={20} strokeWidth={2} aria-hidden="true" />
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
          खोजने के लिए ऊपर शब्द लिखें — जैसे चुनाव, क्रिकेट, व्यापार।
        </p>
      ) : results.length === 0 ? (
        <p className={styles.searchHint}>
          “{query.trim()}” के लिए कोई परिणाम नहीं मिला।
        </p>
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
            <AdSlot ad={leaderboardAds[2]} />
          </div>
        </>
      )}
    </main>
  );
}
