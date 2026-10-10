import type { Article } from "@/data/types";
import { StoryCard } from "@/components/ui/StoryCard";
import { PageHero } from "./PageHero";
import styles from "./pages.module.css";

/**
 * Section landing page for one category. Reads the articles tagged with the
 * category label and lays them out on the same paper grid as the front page.
 */
export function CategoryPage({
  label,
  articles,
}: {
  label: string;
  articles: Article[];
}) {
  return (
    <main id="main" className={styles.main}>
      <PageHero eyebrow="विभाग" title={label} />

      {articles.length === 0 ? (
        <p className={styles.emptyState}>
          या विभागात सध्या कोणतीही बातमी उपलब्ध नाही.
        </p>
      ) : (
        <div className={`${styles.categoryGrid} reveal`}>
          {articles.map((article) => (
            <StoryCard
              key={article.id}
              article={article}
              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 320px"
            />
          ))}
        </div>
      )}
    </main>
  );
}
