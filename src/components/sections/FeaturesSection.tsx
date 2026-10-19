import { towerAd } from "@/data/ads";
import { features } from "@/data/news";
import { AdSlot } from "@/components/ui/AdSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoryCard } from "@/components/ui/StoryCard";
import { stagger } from "@/components/motion/stagger";
import { categoryHref } from "@/lib/links";
import styles from "./sections.module.css";

/** विशेष लेख और विचार: three features, then a tall ad column. */
export function FeaturesSection() {
  return (
    <section className={styles.section} aria-label="विशेष लेख और विचार">
      <div className="reveal">
        <SectionHeader title="विशेष लेख और विचार" href={categoryHref("विचार")} />
      </div>
      <div className={`${styles.features} reveal`}>
        {features.map((article, i) => (
          <div key={article.id} className="reveal" style={stagger(i)}>
            <StoryCard
              article={article}
              sizes="(max-width: 900px) 100vw, 24vw"
            />
          </div>
        ))}
        <AdSlot ad={towerAd} />
      </div>
    </section>
  );
}
