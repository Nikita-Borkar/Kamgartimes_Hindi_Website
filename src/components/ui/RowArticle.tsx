import type { Article } from "@/data/types";
import Link from "next/link";
import { articleHref } from "@/lib/links";
import { Media } from "./Media";
import { NewsShareBar } from "./NewsShareBar";
import styles from "./ui.module.css";

type HeadlineSize = "s" | "m";

const titleClass: Record<HeadlineSize, string> = {
  s: styles.titleS,
  m: styles.titleM,
};

export function RowArticle({
  article,
  wide = false,
  headlineSize = "s",
  showExcerpt = false,
  sizes = "(max-width: 900px) 220px, 220px",
  showShareBar = true,
}: {
  article: Article;
  wide?: boolean;
  headlineSize?: HeadlineSize;
  showExcerpt?: boolean;
  sizes?: string;
  showShareBar?: boolean;
}) {
  const targetUrl = articleHref(article.id);

  return (
    <div className={`${styles.rowWrapper}${wide ? ` ${styles.rowWrapperWide}` : ""}`}>
      <div className={`${styles.row}${wide ? ` ${styles.rowWide}` : ""}`}>
        <Link href={targetUrl} className={styles.rowMediaLink} aria-label={article.headline}>
          <Media
            src={article.image}
            alt=""
            sizes={wide ? sizes : "112px"}
            className={styles.rowThumb}
          />
        </Link>
        <div className={styles.rowBody}>
          <div className={styles.cat}>{article.category}</div>
          <h3 className={`${styles.rowTitle} ${titleClass[headlineSize]}`}>
            <Link href={targetUrl} className={styles.rowTitleLink}>
              {article.headline}
            </Link>
          </h3>
          {showExcerpt && article.excerpt ? (
            <p className={styles.excerpt}>{article.excerpt}</p>
          ) : null}
          <div className={styles.meta}>{article.meta}</div>
          {showShareBar ? (
            <NewsShareBar
              title={article.headline}
              url={targetUrl}
              excerpt={article.excerpt}
              compact
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
