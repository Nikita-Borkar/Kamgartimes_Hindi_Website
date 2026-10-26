import React from "react";
import styles from "./ui.module.css";
import articleStyles from "@/components/pages/article.module.css";

export function ArticleSkeleton() {
  return (
    <main id="main" className={articleStyles.main} aria-label="समाचार लोड हो रहा है..." role="status">
      <div className={styles.skeletonArticleLayout}>
        {/* Main reading column */}
        <div>
          {/* Breadcrumb skeleton */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ width: "90px", height: "14px", borderRadius: "4px" }} className={styles.skeletonBadge} />
            <span style={{ color: "var(--border, #e2e8f0)" }}>/</span>
            <div style={{ width: "70px", height: "14px", borderRadius: "4px" }} className={styles.skeletonBadge} />
          </div>

          {/* Title skeleton (2 lines) */}
          <div className={styles.skeletonTitle} style={{ width: "95%" }} />
          <div className={styles.skeletonTitle} style={{ width: "75%", height: "30px", marginTop: "8px" }} />

          {/* Meta row skeleton */}
          <div style={{ display: "flex", gap: "16px", marginTop: "16px", alignItems: "center" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%" }} className={styles.skeletonThumb} />
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ width: "120px", height: "14px", borderRadius: "4px" }} className={styles.skeletonBadge} />
              <div style={{ width: "160px", height: "12px", borderRadius: "4px" }} className={styles.skeletonLine} />
            </div>
          </div>

          {/* Big Featured Image */}
          <div className={styles.skeletonImageHero} />

          {/* Paragraphs */}
          <div style={{ marginTop: "28px" }}>
            <div className={styles.skeletonLine} style={{ width: "100%" }} />
            <div className={styles.skeletonLine} style={{ width: "98%" }} />
            <div className={styles.skeletonLine} style={{ width: "94%" }} />
            <div className={styles.skeletonLine} style={{ width: "65%" }} />
          </div>

          <div style={{ marginTop: "24px" }}>
            <div className={styles.skeletonLine} style={{ width: "97%" }} />
            <div className={styles.skeletonLine} style={{ width: "100%" }} />
            <div className={styles.skeletonLine} style={{ width: "92%" }} />
            <div className={styles.skeletonLine} style={{ width: "50%" }} />
          </div>
        </div>

        {/* Right Rail (Sidebar) */}
        <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid var(--border, #eef2f6)",
              background: "var(--surface, #ffffff)",
            }}
          >
            <div style={{ width: "130px", height: "20px", marginBottom: "16px" }} className={styles.skeletonBadge} />
            <div className={styles.skeletonLine} style={{ width: "85%" }} />
            <div className={styles.skeletonLine} style={{ width: "70%" }} />
            <div className={styles.skeletonLine} style={{ width: "90%" }} />
          </div>

          <div
            style={{
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid var(--border, #eef2f6)",
              background: "var(--surface, #ffffff)",
            }}
          >
            <div style={{ width: "140px", height: "20px", marginBottom: "16px" }} className={styles.skeletonBadge} />
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ display: "flex", gap: "12px" }}>
                  <div style={{ width: "80px", height: "60px", flexShrink: 0, borderRadius: "6px" }} className={styles.skeletonThumb} />
                  <div style={{ flex: 1 }}>
                    <div className={styles.skeletonLine} style={{ width: "100%", height: "12px", marginTop: "2px" }} />
                    <div className={styles.skeletonLine} style={{ width: "80%", height: "12px", marginTop: "6px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
