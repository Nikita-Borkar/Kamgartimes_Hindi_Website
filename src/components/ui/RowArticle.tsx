import type { Article } from "@/data/types";
import { Media } from "./Media";
import styles from "./ui.module.css";

type HeadlineSize = "s" | "m";

const titleClass: Record<HeadlineSize, string> = {
  s: styles.titleS,
  m: styles.titleM,
};

/**
 * Horizontal list row: fixed thumbnail, then category, headline, optional
 * excerpt and wire time. `wide` switches to the 220x148 thumbnail used by
 * ताज्या बातम्या.
 */
export function RowArticle({
  article,
  wide = false,
  headlineSize = "s",
  showExcerpt = false,
  sizes = "(max-width: 900px) 220px, 220px",
}: {
  article: Article;
  wide?: boolean;
  headlineSize?: HeadlineSize;
  showExcerpt?: boolean;
  sizes?: string;
}) {
  return (
    <a
      className={`${styles.row}${wide ? ` ${styles.rowWide}` : ""}`}
      href="#"
      aria-label={article.headline}
    >
      <Media
        src={article.image}
        alt=""
        sizes={wide ? sizes : "112px"}
        className={styles.rowThumb}
      />
      <div className={styles.rowBody}>
        <div className={styles.cat}>{article.category}</div>
        <h3 className={`${styles.rowTitle} ${titleClass[headlineSize]}`}>
          {article.headline}
        </h3>
        {showExcerpt && article.excerpt ? (
          <p className={styles.excerpt}>{article.excerpt}</p>
        ) : null}
        <div className={styles.meta}>{article.meta}</div>
      </div>
    </a>
  );
}
