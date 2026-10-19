import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "./Media";
import styles from "./ui.module.css";
import type { ArticleBoxAd } from "@/data/ads";

/**
 * Native editorial in-article box ad. Fits comfortably inside reading prose
 * without stretching full-screen width or breaking reading rhythm.
 */
export function InArticleBoxAd({
  ad,
}: {
  ad: ArticleBoxAd;
}) {
  return (
    <Link className={styles.inArticleBox} href={ad.href} aria-label={ad.headline}>
      <div className={styles.inArticleBoxThumb}>
        <Media src={ad.image} alt="" sizes="140px" />
      </div>
      <div className={styles.inArticleBoxContent}>
        <span className={styles.inArticleBoxBadge}>{ad.badge}</span>
        <h4 className={styles.inArticleBoxTitle}>{ad.headline}</h4>
        <p className={styles.inArticleBoxText}>{ad.excerpt}</p>
        <span className={styles.inArticleBoxCta}>
          {ad.ctaText}
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
