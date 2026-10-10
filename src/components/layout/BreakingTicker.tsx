import Link from "next/link";
import { breakingNews } from "@/data/site";
import styles from "./layout.module.css";

/**
 * Breaking-news ticker rendered as an infinite marquee. Every headline links
 * to its story; the whole set is duplicated so the loop has no seam and the
 * duplicate is hidden from assistive tech so nothing is announced twice.
 */
export function BreakingTicker() {
  return (
    <div className={styles.ticker}>
      <div className={`${styles.shell} ${styles.tickerViewport}`}>
        <div className={styles.tickerTrack}>
          {breakingNews.map((item, index) => (
            <p key={item.text} className={styles.tickerItem}>
              {index === 0 && <span className="srOnly">सतत अपडेट: </span>}
              <span className={styles.tickerChip}>{item.label}</span>
              <Link className={styles.tickerLink} href={item.href}>
                {item.text}
              </Link>
            </p>
          ))}
          {breakingNews.map((item) => (
            <p key={`dup-${item.text}`} className={styles.tickerItem} aria-hidden="true">
              <span className={styles.tickerChip}>{item.label}</span>
              <Link className={styles.tickerLink} href={item.href} tabIndex={-1}>
                {item.text}
              </Link>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
