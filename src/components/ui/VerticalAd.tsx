import Link from "next/link";
import { ArrowUpRight, PhoneCall, Sparkles } from "lucide-react";
import { Media } from "./Media";
import styles from "./ui.module.css";
import type { VerticalTowerAd } from "@/data/ads";

/**
 * A tall vertical skyscraper/tower ad designed for article sidebars,
 * editorial rails, and split section layouts.
 */
export function VerticalAd({
  ad,
}: {
  ad: VerticalTowerAd;
}) {
  return (
    <Link className={styles.verticalTowerAd} href={ad.href} aria-label={ad.headline}>
      <div className={styles.verticalAdBadgeRow}>
        <span className={styles.verticalAdBadge}>
          <Sparkles size={13} aria-hidden="true" />
          {ad.badge}
        </span>
        <span className={styles.verticalAdMark}>विज्ञापन</span>
      </div>

      <div className={styles.verticalAdMediaWrap}>
        <Media src={ad.image} alt="" sizes="320px" className={styles.verticalAdMedia} />
      </div>

      <div className={styles.verticalAdBody}>
        <span className={styles.verticalAdTagline}>{ad.tagline}</span>
        <h4 className={styles.verticalAdHeadline}>{ad.headline}</h4>

        {ad.highlights && ad.highlights.length > 0 && (
          <ul className={styles.verticalAdList}>
            {ad.highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        <div className={styles.verticalAdAction}>
          <span className={styles.verticalAdBtn}>
            {ad.ctaText}
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
          {ad.phone && (
            <span className={styles.verticalAdPhone}>
              <PhoneCall size={13} aria-hidden="true" />
              {ad.phone}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
