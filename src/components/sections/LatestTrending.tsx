import { railAd } from "@/data/ads";
import { latestNews, trending } from "@/data/news";
import { AdSlot } from "@/components/ui/AdSlot";
import { RowArticle } from "@/components/ui/RowArticle";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import styles from "./sections.module.css";

/** ताज़ा ख़बरें on the wide side, ट्रेंडिंग in a 340px rail. */
export function LatestTrending() {
  return (
    <section className={styles.latestTrending} aria-label="ताज़ा ख़बरें">
      <div className={`${styles.stack} reveal`}>
        <SectionHeader title="ताज़ा ख़बरें" />
        {latestNews.map((article, i) => (
          <div key={article.id} style={stagger(i)}>
            <RowArticle
              article={article}
              wide
              headlineSize="m"
              showExcerpt
              sizes="(max-width: 900px) 100vw, 220px"
            />
          </div>
        ))}
      </div>

      <div className={`${styles.stack} reveal`} style={stagger(1)}>
        <SectionHeader title="ट्रेंडिंग" action="और पढ़ें →" />
        <AdSlot ad={railAd} />
        {trending.map((article, i) => (
          <div key={article.id} style={stagger(i)}>
            <RowArticle article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}
