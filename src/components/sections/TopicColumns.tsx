import { topicPairs, topicPairTitles } from "@/data/news";
import { RowArticle } from "@/components/ui/RowArticle";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import styles from "./sections.module.css";

/**
 * Each pair is one two-column band: two desk sections side by side.
 * Titles come from topicPairTitles so a desk can be renamed without touching
 * its article list.
 */
export function TopicColumns() {
  return (
    <>
      {topicPairs.map((desks, p) => {
        const [leftTitle, rightTitle] = topicPairTitles[p];
        const titles = [leftTitle, rightTitle];

        return (
          <section key={leftTitle} className={styles.pair} aria-label={leftTitle}>
            {desks.map((desk, i) => {
              const title = titles[i];
              return (
                <div key={title} className={`${styles.stack} reveal`}>
                  <SectionHeader title={title} />
                  {desk.map((article, a) => (
                    <div key={article.id} style={stagger(a)}>
                      <RowArticle article={article} />
                    </div>
                  ))}
                </div>
              );
            })}
          </section>
        );
      })}
    </>
  );
}
