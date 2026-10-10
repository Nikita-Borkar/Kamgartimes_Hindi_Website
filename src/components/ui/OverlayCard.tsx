import type { Article } from "@/data/types";
import Link from "next/link";
import { articleHref } from "@/lib/links";
import { Media } from "./Media";
import styles from "./ui.module.css";

type HeadlineSize = "s" | "m" | "l";

const titleClass: Record<HeadlineSize, string> = {
  s: styles.titleS,
  m: styles.titleM,
  l: styles.titleL,
};

/**
 * Image with a bottom scrim, category chip, headline and wire time.
 * The whole card is one link, so there is exactly one tab stop per story.
 */
export function OverlayCard({
  article,
  headlineSize = "m",
  showMeta = true,
  sizes,
  priority = false,
}: {
  article: Article;
  headlineSize?: HeadlineSize;
  showMeta?: boolean;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Link className={styles.overlay} href={articleHref(article.id)} aria-label={article.headline}>
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
        {showMeta ? <span className={`${styles.meta} ${styles.overlayMeta}`}>{article.meta}</span> : null}
      </div>
    </Link>
  );
}
