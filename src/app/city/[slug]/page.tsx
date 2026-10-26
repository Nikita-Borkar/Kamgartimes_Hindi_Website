import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { citiesData } from "@/data/cities";
import { EmptyState } from "@/components/ui/EmptyState";
import { StoryCard } from "@/components/ui/StoryCard";
import { AdCard } from "@/components/ui/AdCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { cardAds, leaderboardAds } from "@/data/ads";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";
import { MapPin, Sun, Wind, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import styles from "./city.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const city = citiesData.find(
    (c) =>
      c.slug === slug ||
      c.slug === decodedSlug ||
      c.name === slug ||
      c.name === decodedSlug ||
      c.nameEn?.toLowerCase() === decodedSlug.toLowerCase()
  );
  return {
    title: city
      ? `${city.name} स्थानीय समाचार – कामगार टाइम्स`
      : `${decodedSlug} स्थानीय समाचार – कामगार टाइम्स`,
    description:
      city?.description ||
      `${decodedSlug} और विदर्भ के प्रमुख शहरों के ताज़ा समाचार।`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // 1. First check dedicated backend Public Cities API
  let city: any = null;
  try {
    const apiCity = await kamgarApi.getCityBySlug(slug).catch(() => kamgarApi.getCityBySlug(decodedSlug));
    if (apiCity && apiCity.name) {
      city = {
        slug: apiCity.slug,
        name: apiCity.name,
        nameEn: apiCity.name,
        tagline: `${apiCity.name} स्थानीय बुलेटिन व ताज़ा हलचल`,
        temp: "31°C",
        weather: "धूप खिली ☀️",
        aqi: "48 (उत्तम)",
        bannerImage: apiCity.coverImage || "/img/img02.png",
        description:
          apiCity.description ||
          `${apiCity.name} के स्थानीय समाचार, घटनाएं व श्रमिक अपडेट्स।`,
        highlights: [
          `${apiCity.name} की ताज़ा और प्रमाणित खबरें कामगार टाइम्स पर`,
          `स्थानीय प्रशासन व जनसरोकार से जुड़े विशेष मुद्दे`,
          `नागरिकों और कामगारों के अधिकारों की प्रमुख आवाज़`,
        ],
      };
    }
  } catch {}

  // 2. If not found in backend DB, match from local static citiesData
  if (!city) {
    city = citiesData.find(
      (c) =>
        c.slug === slug ||
        c.slug === decodedSlug ||
        c.name === slug ||
        c.name === decodedSlug ||
        c.nameEn?.toLowerCase() === decodedSlug.toLowerCase()
    );
  }

  // 3. If still not found, check dynamic categories from backend API
  if (!city) {
    try {
      const catRes = await kamgarApi.getCategories();
      const match = catRes?.categories?.find(
        (c) =>
          c.slug === slug ||
          c.slug === decodedSlug ||
          c.name === slug ||
          c.name === decodedSlug
      );
      if (match) {
        city = {
          slug: match.slug,
          name: match.name,
          nameEn: match.name,
          tagline: `${match.name} स्थानीय बुलेटिन व ताज़ा हलचल`,
          temp: "31°C",
          weather: "धूप खिली ☀️",
          aqi: "48 (उत्तम)",
          bannerImage: "/img/img02.png",
          description:
            match.description ||
            `${match.name} के स्थानीय समाचार, घटनाएं व श्रमिक अपडेट्स।`,
          highlights: [
            `${match.name} की ताज़ा और प्रमाणित खबरें कामगार टाइम्स पर`,
            `स्थानीय प्रशासन व जनसरोकार से जुड़े विशेष मुद्दे`,
            `नागरिकों और कामगारों के अधिकारों की प्रमुख आवाज़`,
          ],
        };
      }
    } catch {}
  }

  // 4. Dynamic fallback city object if still not matched
  if (!city) {
    city = {
      slug: decodedSlug,
      name: decodedSlug,
      nameEn: decodedSlug,
      tagline: `${decodedSlug} स्थानीय बुलेटिन`,
      temp: "31°C",
      weather: "धूप खिली ☀️",
      aqi: "48 (उत्तम)",
      bannerImage: "/img/img02.png",
      description: `${decodedSlug} के स्थानीय समाचार, घटनाएं व श्रमिक अपडेट्स।`,
      highlights: [
        `${decodedSlug} की ताज़ा और प्रमाणित खबरें कामगार टाइम्स पर`,
        `स्थानीय प्रशासन व जनसरोकार से जुड़े विशेष मुद्दे`,
      ],
    };
  }

  // Filter articles for this city: first by citySlug, then category/search fallback
  let liveArticles: Article[] = [];
  try {
    let res = await kamgarApi.getArticles({ citySlug: city.slug, limit: 12 }).catch(() => null);
    if (!res?.articles || res.articles.length === 0) {
      res = await kamgarApi.getArticles({ category: city.name, limit: 12 }).catch(() => null);
    }
    if (!res?.articles || res.articles.length === 0) {
      res = await kamgarApi.getArticles({ search: city.name, limit: 12 }).catch(() => null);
    }
    if (res?.articles && res.articles.length > 0) {
      liveArticles = res.articles.map(adaptArticleListItem);
    }
  } catch {}

  const displayArticles = liveArticles;

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
              {city.highlights.map((item: string, idx: number) => (
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

            {displayArticles.length === 0 ? (
              <EmptyState
                title={`${city.name} में अभी कोई स्थानीय समाचार उपलब्ध नहीं है`}
                description={`एडमिन पैनल से ${city.name} के लिए अभी कोई विशेष समाचार प्रकाशित नहीं किया गया है।`}
                actionLabel="मुख्य पृष्ठ पर जाएं"
                actionHref="/"
                secondaryLabel="अन्य शहर देखें"
                secondaryHref="/category/लोकल-न्यूज़"
              />
            ) : (
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
            )}
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
