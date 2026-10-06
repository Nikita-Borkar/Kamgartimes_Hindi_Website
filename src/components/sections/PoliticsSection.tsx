import { politics } from "@/data/news";
import { RowArticle } from "@/components/ui/RowArticle";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoryCard } from "@/components/ui/StoryCard";
import { stagger } from "@/components/motion/stagger";
import styles from "./sections.module.css";

/** राजकारण: two image features, then a compact brief list. */
export function PoliticsSection() {
  return (
    <section className={styles.section} aria-label="राजकारण">
      <div className="reveal">
        <SectionHeader title="राजकारण" />
      </div>
      <div className={`${styles.politics} reveal`}>
        {politics.features.map((article, i) => (
          <div key={article.id} className="reveal" style={stagger(i)}>
            <StoryCard
              article={article}
              tall
              sizes="(max-width: 1100px) 100vw, 32vw"
            />
          </div>
        ))}
        <div className={styles.stack} style={stagger(2)}>
          {politics.briefs.map((article) => (
            <RowArticle key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
