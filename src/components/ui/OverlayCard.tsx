import type { Article } from "@/data/types";
import Link from "next/link";
import { articleHref } from "@/lib/links";
import { Media } from "./Media";
import { NewsShareBar } from "./NewsShareBar";
import styles from "./ui.module.css";

type HeadlineSize = "s" | "m" | "l";

const titleClass: Record<HeadlineSize, string> = {
  s: styles.titleS,
  m: styles.titleM,
  l: styles.titleL,
};

export function OverlayCard({
  article,
  headlineSize = "m",
  showMeta = true,
  sizes,
  priority = false,
  showShareBar = true,
}: {
  article: Article;
  headlineSize?: HeadlineSize;
  showMeta?: boolean;
  sizes: string;
  priority?: boolean;
  showShareBar?: boolean;
}) {
  const targetUrl = articleHref(article.id);

  return (
    <div className={styles.overlayWrapper}>
      <Link className={styles.overlay} href={targetUrl} aria-label={article.headline}>
        <Media
          src={article.image}
          alt=""
          sizes={sizes}
          priority={priority}
          className={styles.overlayMedia}
        />
        <div className={styles.overlayBody}>
          <span className={styles.chip}>{article.category}</span>
          <h3 className={`${styles.overlayTitle} ${titleClass[headlineSize]}`}>
            {article.headline}
          </h3>
        </div>
      </Link>
      {showShareBar ? (
        <NewsShareBar
          title={article.headline}
          url={targetUrl}
          excerpt={article.excerpt}
          compact
        />
      ) : null}
    </div>
  );
}
