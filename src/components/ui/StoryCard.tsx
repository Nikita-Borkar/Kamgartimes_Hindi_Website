import type { Article } from "@/data/types";
import { Media } from "./Media";
import styles from "./ui.module.css";

/**
 * Image on top, then category, headline, excerpt, wire time. Used by
 * राजकारण features (tall thumb), विशेष लेख व मते (default thumb), and the
 * editor's-picks read list, which passes no image and renders text only.
 */
export function StoryCard({
  article,
  tall = false,
  showExcerpt = true,
  sizes = "(max-width: 900px) 100vw, 33vw",
}: {
  article: Article;
  tall?: boolean;
  showExcerpt?: boolean;
  sizes?: string;
}) {
  const body = (
    <>
      <div className={styles.cat}>{article.category}</div>
      <h3 className={`${styles.cardTitle} ${styles.titleM}`}>
        {article.headline}
      </h3>
      {showExcerpt && article.excerpt ? (
        <p className={styles.excerpt}>{article.excerpt}</p>
      ) : null}
      <div className={styles.meta}>{article.meta}</div>
    </>
  );

  if (!article.image) {
    return <div className={styles.card}>{body}</div>;
  }

  return (
    <a className={styles.card} href="#" aria-label={article.headline}>
      <Media
        src={article.image}
        alt=""
        sizes={sizes}
        className={`${styles.cardThumb}${tall ? ` ${styles.cardThumbTall}` : ""}`}
      />
      {body}
    </a>
  );
}
