import { PageShell } from "@/components/layout/PageShell";
import { NewsGridSkeleton } from "@/components/ui/NewsGridSkeleton";
import styles from "@/components/pages/pages.module.css";

export default function CategoryLoading() {
  return (
    <PageShell>
      <main id="main" className={styles.main}>
        <div style={{ marginBottom: "24px", paddingTop: "12px" }}>
          <div
            style={{
              width: "180px",
              height: "36px",
              borderRadius: "6px",
              background: "rgba(0,0,0,0.06)",
              marginBottom: "8px",
            }}
          />
          <div
            style={{
              width: "280px",
              height: "20px",
              borderRadius: "4px",
              background: "rgba(0,0,0,0.04)",
            }}
          />
        </div>
        <NewsGridSkeleton count={6} />
      </main>
    </PageShell>
  );
}
