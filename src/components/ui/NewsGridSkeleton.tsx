import React from "react";
import styles from "./ui.module.css";

export function NewsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={styles.skeletonGrid} aria-label="लोड हो रहा है..." role="status">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={styles.skeletonCard}>
          <div className={styles.skeletonThumb} />
          <div className={styles.skeletonBadge} />
          <div className={styles.skeletonLine} />
          <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
        </div>
      ))}
    </div>
  );
}
