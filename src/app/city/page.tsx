import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { citiesData } from "@/data/cities";
import { AdSlot } from "@/components/ui/AdSlot";
import { leaderboardAds } from "@/data/ads";
import { MapPin, ChevronRight, Sun, Wind, Sparkles } from "lucide-react";
import styles from "./[slug]/city.module.css";

export const metadata: Metadata = {
  title: "प्रमुख शहर – कामगार टाइम्स",
  description: "नागपुर, चंद्रपुर, वर्धा, अमरावती, गढ़चिरौली, मुंबई, पुणे सहित सभी प्रमुख शहरों के स्थानीय समाचार।",
};

export default function CityIndexPage() {
  const firstCities = citiesData.slice(0, 2);
  const remainingCities = citiesData.slice(2);

  return (
    <PageShell>
      <main id="main" className={styles.main}>
        <div className={styles.shell}>
          <header style={{ marginBottom: "32px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>
              स्थानीय समाचार और शहर विशेष बुलेटिन
            </h1>
            <p style={{ fontSize: "16px", color: "var(--muted)" }}>
              अपने शहर का नाम चुनें और ताज़ा हलचल, मौसम, श्रमिक कल्याण योजनाएं व विशेष रिपोर्ट देखें।
            </p>
          </header>

          <div className={styles.highlightsGrid}>
            {firstCities.map((city) => (
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
                    <span>शहर के समाचार पढ़ें</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}

            {/* In-grid card-sized sponsored bulletin */}
            <Link href="/advertise" style={{ textDecoration: "none", color: "inherit" }}>
              <div
                className={styles.highlightCard}
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "12px",
                  cursor: "pointer",
                  border: "1px solid rgba(211, 47, 47, 0.3)",
                  background: "linear-gradient(135deg, #fff9f6 0%, #ffffff 100%)",
                  boxShadow: "0 2px 8px rgba(211, 47, 47, 0.08)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", fontSize: "18px", color: "#d32f2f" }}>
                    <Sparkles size={18} />
                    <span>अपना शहर या व्यापार जोड़ें</span>
                  </div>
                  <span style={{ fontSize: "11px", background: "#d32f2f", color: "#fff", padding: "2px 8px", borderRadius: "10px", fontWeight: "700" }}>
                    प्रायोजित
                  </span>
                </div>
                <p style={{ fontSize: "14px", color: "#475569", fontWeight: "600", margin: 0 }}>
                  कामगार टाइम्स डिजिटल नेटवर्क पर स्थानीय विज्ञापन बुक करें
                </p>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  नागपुर, चंद्रपुर, वर्धा सहित 10+ शहरों के पाठकों तक अपने उत्पाद और सेवा का सीधा प्रचार करें।
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#d32f2f", fontWeight: "700", marginTop: "4px" }}>
                  <span>विज्ञापन दरें व पैकेज देखें</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </Link>

            {remainingCities.map((city) => (
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
                    <span>शहर के समाचार पढ़ें</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.adSection}>
            <AdSlot ad={leaderboardAds[2]} />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
