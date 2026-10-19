import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Media } from "./Media";
import styles from "./ui.module.css";
import type { CardAd } from "@/data/ads";

/**
 * A blog/story-card sized ad designed to sit inside 3-column / 2-column news grids
 * without interrupting the visual flow or layout rhythm.
 */
export function AdCard({
  ad,
  sizes = "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 320px",
}: {
  ad: CardAd;
  sizes?: string;
}) {
  return (
    <div className={styles.sponsoredCardWrapper}>
      <Link className={styles.sponsoredCard} href={ad.href} aria-label={ad.headline}>
        <div className={styles.sponsoredThumbWrap}>
          <Media
            src={ad.image}
            alt=""
            sizes={sizes}
            className={styles.cardThumb}
          />
          <span className={styles.sponsoredBadge}>{ad.badge}</span>
        </div>
        <div className={styles.sponsoredCatRow}>
          <span className={styles.cat}>{ad.category}</span>
          <span className={styles.sponsoredDisclaimer}>विज्ञापन</span>
        </div>
        <h3 className={styles.sponsoredTitle}>
          {ad.headline}
        </h3>
        <p className={styles.excerpt}>{ad.excerpt}</p>
        <div className={styles.sponsoredFooter}>
          <span className={styles.meta}>{ad.meta}</span>
          <span className={styles.sponsoredCta}>
            {ad.ctaText}
            <ExternalLink size={13} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </div>
  );
}
