import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { citiesData } from "@/data/cities";
import { MapPin, ChevronRight, Sun, Wind } from "lucide-react";
import styles from "./[slug]/city.module.css";

export const metadata: Metadata = {
  title: "महाराष्ट्रातील प्रमुख शहरे – कामगार टाइम्स",
  description: "नागपूर, चंद्रपूर, वर्धा, अमरावती, गडचिरोली, मुंबई, पुणे सह सर्व शहरांच्या स्थानिक बातम्या.",
};

export default function CityIndexPage() {
  return (
    <PageShell>
      <main id="main" className={styles.main}>
        <div className={styles.shell}>
          <header style={{ marginBottom: "32px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>
              स्थानिक बातम्या व शहर विशेष बुलेटिन
            </h1>
            <p style={{ fontSize: "16px", color: "var(--muted)" }}>
              आपल्या शहराचे नाव निवडा आणि ताज्या घडामोडी, हवामान, कामगार कल्याण योजना व विशेष वार्तांकन पहा.
            </p>
          </header>

          <div className={styles.highlightsGrid}>
            {citiesData.map((city) => (
              <Link
                key={city.slug}
                href={`/city/${city.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className={styles.highlightCard}
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "12px",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", fontSize: "20px", color: "#d32f2f" }}>
                      <MapPin size={20} />
                      <span>{city.name}</span>
                    </div>
                    <span style={{ fontSize: "13px", background: "#e2e8f0", padding: "2px 8px", borderRadius: "12px" }}>
                      {city.temp}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "#475569", fontWeight: "500", margin: 0 }}>
                    {city.tagline}
                  </p>
                  <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                    {city.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#007bff", fontWeight: "600", marginTop: "4px" }}>
                    <span>शहरातील बातम्या वाचा</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
