import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { citiesData } from "@/data/cities";
import { allArticles } from "@/data/news";
import { StoryCard } from "@/components/ui/StoryCard";
import { AdCard } from "@/components/ui/AdCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { cardAds, leaderboardAds } from "@/data/ads";
import { MapPin, Sun, Wind, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import styles from "./city.module.css";

export function generateStaticParams() {
  return citiesData.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesData.find((c) => c.slug === slug);
  return {
    title: city ? `${city.name} स्थानीय समाचार – कामगार टाइम्स` : "शहर समाचार – कामगार टाइम्स",
    description: city?.description || "विदर्भ और देश के प्रमुख शहरों के ताज़ा समाचार।",
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = citiesData.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  // Filter articles for this city or general local articles
  const cityArticles = allArticles.filter(
    (a) =>
      a.headline.includes(city.name) ||
      a.excerpt?.includes(city.name) ||
      a.category === "राज्य" ||
      a.category === "लोकल न्यूज़",
  );

  const displayArticles = cityArticles.length > 0 ? cityArticles : allArticles.slice(0, 6);

  return (
    <PageShell>
      <main id="main" className={styles.main}>
        <div className={styles.shell}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="पेज पथ">
            <Link href="/" className={styles.breadLink}>मुख्य पृष्ठ</Link>
            <span>/</span>
            <Link href="/city" className={styles.breadLink}>शहर</Link>
            <span>/</span>
            <span className={styles.breadCurrent}>{city.name}</span>
          </nav>

          {/* City Header Banner */}
          <header className={styles.cityHero}>
            <div className={styles.cityHeroContent}>
              <div className={styles.cityBadge}>
                <MapPin size={16} />
                <span>स्थानीय बुलेटिन</span>
              </div>
              <h1 className={styles.cityName}>{city.name}</h1>
              <p className={styles.cityTagline}>{city.tagline}</p>
              <p className={styles.cityDesc}>{city.description}</p>
            </div>

            <div className={styles.weatherCard}>
              <div className={styles.weatherTop}>
                <Sun size={32} color="#f59e0b" />
                <div>
                  <div className={styles.temp}>{city.temp}</div>
                  <div className={styles.weatherCondition}>{city.weather}</div>
                </div>
              </div>
              <div className={styles.weatherMeta}>
                <div className={styles.metaRow}>
                  <Wind size={15} />
                  <span>AQI इंडेक्स: <strong>{city.aqi}</strong></span>
                </div>
                <div className={styles.metaRow}>
                  <ShieldCheck size={15} />
                  <span>श्रमिक कल्याण हेल्पलाइन: 1800-22-1234</span>
                </div>
              </div>
            </div>
          </header>

          {/* City Highlights */}
          <section className={styles.highlightsSection}>
            <h2 className={styles.sectionTitle}>
              <span>{city.name} महत्वपूर्ण अपडेट्स</span>
            </h2>
            <div className={styles.highlightsGrid}>
              {city.highlights.map((item, idx) => (
                <div key={idx} className={styles.highlightCard}>
                  <CheckCircle2 size={18} color="#d32f2f" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* City News Articles Grid with integrated blog-sized sponsored card */}
          <section className={styles.newsSection}>
            <h2 className={styles.sectionTitle}>
              <span>{city.name} ताज़ा हलचल व समाचार</span>
            </h2>

            <div className={styles.newsGrid}>
              {displayArticles.slice(0, 2).map((article) => (
                <StoryCard key={article.id} article={article} />
              ))}

              {/* In-grid blog/card-sized sponsored ad */}
              <AdCard ad={cardAds[3]} />

              {displayArticles.slice(2).map((article) => (
                <StoryCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          <div className={styles.adSection}>
            <AdSlot ad={leaderboardAds[3]} />
          </div>

          {/* Other Cities Links */}
          <section className={styles.otherCitiesSection}>
            <h3 className={styles.otherTitle}>अन्य शहरों के समाचार देखें</h3>
            <div className={styles.citiesPills}>
              {citiesData.map((c) => (
                <Link
                  key={c.slug}
                  href={`/city/${c.slug}`}
                  className={`${styles.cityPill} ${c.slug === slug ? styles.activePill : ""}`}
                >
                  <MapPin size={13} />
                  <span>{c.name}</span>
                  <ChevronRight size={13} />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </PageShell>
  );
}
