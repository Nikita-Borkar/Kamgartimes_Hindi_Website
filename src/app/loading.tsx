import { PageShell } from "@/components/layout/PageShell";
import { NewsGridSkeleton } from "@/components/ui/NewsGridSkeleton";
import styles from "@/components/pages/pages.module.css";

export default function RootLoading() {
  return (
    <PageShell>
      <main id="main" className={styles.main}>
        <div style={{ marginBottom: "28px", paddingTop: "16px" }}>
          <div
            style={{
              width: "220px",
              height: "36px",
              borderRadius: "6px",
              background: "rgba(0,0,0,0.06)",
              marginBottom: "12px",
            }}
          />
          <div
            style={{
              width: "320px",
              height: "18px",
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
