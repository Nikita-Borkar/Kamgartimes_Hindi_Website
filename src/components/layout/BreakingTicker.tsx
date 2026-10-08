import { breakingNews } from "@/data/site";
import styles from "./layout.module.css";

/**
 * Single-item ticker rendered as an infinite marquee. The item is duplicated
 * so the loop has no seam; the second copy is hidden from assistive tech so
 * the headline is not announced twice.
 */
export function BreakingTicker() {
  return (
    <div className={styles.ticker}>
      <div className={`${styles.shell} ${styles.tickerViewport}`}>
        <div className={styles.tickerTrack}>
          <p className={styles.tickerItem}>
            <span className="srOnly">सतत अपडेट: </span>
            <span className={styles.tickerChip}>{breakingNews.label}</span>
            <span>{breakingNews.text}</span>
          </p>
          <p className={styles.tickerItem} aria-hidden="true">
            <span className={styles.tickerChip}>{breakingNews.label}</span>
            <span>{breakingNews.text}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
