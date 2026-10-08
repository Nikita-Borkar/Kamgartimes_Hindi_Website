import { railAd } from "@/data/ads";
import { latestNews, trending } from "@/data/news";
import { AdSlot } from "@/components/ui/AdSlot";
import { RowArticle } from "@/components/ui/RowArticle";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import styles from "./sections.module.css";

/** ताज्या बातम्या on the wide side, ट्रेंडिंग in a 340px rail. */
export function LatestTrending() {
  return (
    <section className={styles.latestTrending} aria-label="ताज्या बातम्या">
      <div className={`${styles.stack} reveal`}>
        <SectionHeader title="ताज्या बातम्या" />
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
        <SectionHeader title="ट्रेंडिंग" action="अधिक →" />
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
