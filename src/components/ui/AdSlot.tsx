import type { Ad } from "@/data/ads";
import { Media } from "./Media";
import styles from "./ui.module.css";

const variantClass: Record<Ad["variant"], string> = {
  billboard: styles.adBillboard,
  tower: styles.adTower,
  rail: styles.adRail,
  leaderboard: styles.adLeaderboard,
};

/**
 * House ad slot. `variant` picks the geometry, `headline` only renders on
 * the billboard. The dashed outline is the visible "this is an ad" signal,
 * so it stays even when a creative fills the slot.
 *
 * The headline is a p, not a heading: the link carries an aria-label, and an
 * ad has no business in the document outline.
 */
export function AdSlot({
  ad,
  priority = false,
}: {
  ad: Ad;
  priority?: boolean;
}) {
  return (
    <a
      className={`${styles.ad} ${variantClass[ad.variant]}`}
      href={ad.href}
      aria-label={`${ad.label}: ${ad.headline ?? ""}`}
    >
      <Media
        src={ad.image}
        alt=""
        sizes="100vw"
        priority={priority}
        className={styles.adMedia}
      />
      <span className={styles.adLabel}>{ad.label}</span>
      {ad.headline ? (
        <p className={styles.adHeadline}>{ad.headline}</p>
      ) : null}
    </a>
  );
}
