import type { Article } from "@/data/types";
import Link from "next/link";
import { articleHref, absoluteArticleUrl } from "@/lib/links";
import { Media } from "./Media";
import { NewsShareBar } from "./NewsShareBar";
import styles from "./ui.module.css";

export function StoryCard({
  article,
  tall = false,
  showExcerpt = true,
  sizes = "(max-width: 900px) 100vw, 33vw",
  showShareBar = true,
}: {
  article: Article;
  tall?: boolean;
  showExcerpt?: boolean;
  sizes?: string;
  showShareBar?: boolean;
}) {
  const targetUrl = articleHref(article.id);

  return (
    <div className={styles.cardWrapper}>
      <Link className={styles.card} href={targetUrl} aria-label={article.headline}>
        {article.image ? (
          <Media
            src={article.image}
            alt=""
            sizes={sizes}
            className={`${styles.cardThumb}${tall ? ` ${styles.cardThumbTall}` : ""}`}
          />
        ) : null}
        <div className={styles.cat}>{article.category}</div>
        <h3 className={`${styles.cardTitle} ${styles.titleM}`}>
          {article.headline}
        </h3>
        {showExcerpt && article.excerpt ? (
          <p className={styles.excerpt}>{article.excerpt}</p>
        ) : null}
        <div className={styles.meta}>{article.meta}</div>
      </Link>
      {showShareBar ? (
        <NewsShareBar
          title={article.headline}
          url={absoluteArticleUrl(article.id)}
          excerpt={article.excerpt}
          compact
          articleId={article.apiId}
        />
      ) : null}
    </div>
  );
}
