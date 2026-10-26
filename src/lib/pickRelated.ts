import type { Article } from "@/data/types";

/** Convenience: the related band picks the same-section stories, minus self. */
export function pickRelated(article: Article, pool: Article[], limit = 3) {
  const sameSection = pool.filter(
    (item) => item.id !== article.id && item.category === article.category,
  );
  const fallback = pool.filter(
    (item) => item.id !== article.id && item.category !== article.category,
  );
  return [...sameSection, ...fallback].slice(0, limit);
}
