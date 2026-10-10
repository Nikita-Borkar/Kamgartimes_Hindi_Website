"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { allArticles } from "@/data/news";
import { RowArticle } from "@/components/ui/RowArticle";
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
      <PageHero eyebrow="शोध" title="शोध घ्या" />

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
          placeholder="बातम्या, विषय किंवा शब्द शोधा…"
          aria-label="शोध"
          autoFocus
        />
      </form>

      {!term ? (
        <p className={styles.searchHint}>
          शोधण्यासाठी वर शब्द लिहा — उदा. निवडणूक, क्रिकेट, अर्थ.
        </p>
      ) : results.length === 0 ? (
        <p className={styles.searchHint}>
          “{query.trim()}” साठी कोणताही निकाल सापडला नाही.
        </p>
      ) : (
        <>
          <p className={styles.searchCount}>
            {results.length} निकाल सापडले
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
        </>
      )}
    </main>
  );
}
