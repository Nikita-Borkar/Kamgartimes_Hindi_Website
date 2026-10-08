import { leadRailAd } from "@/data/ads";
import { leadStack, leadStory, tiles } from "@/data/news";
import { AdSlot } from "@/components/ui/AdSlot";
import { OverlayCard } from "@/components/ui/OverlayCard";
import { stagger } from "@/components/motion/stagger";
import styles from "./sections.module.css";

/** Below the hero: ad rail, one hero story, then a stack of two. */
export function LeadGrid() {
  return (
    <section className={styles.section} aria-label="मुख्य बातम्या">
      <div className={`${styles.leadGrid} reveal`}>
        <AdSlot ad={leadRailAd} />
        <div className={styles.leadHero}>
          <OverlayCard
            article={leadStory}
            headlineSize="l"
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
        <div className={styles.leadStack}>
          {leadStack.map((article, i) => (
            <div
              key={article.id}
              className={styles.leadStackItem}
              style={stagger(i)}
            >
              <OverlayCard
                article={article}
                sizes="(max-width: 900px) 100vw, 30vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.tiles} reveal`} style={stagger(2)}>
        {tiles.map((article) => (
          <div key={article.id} className={styles.tile}>
            <OverlayCard
              article={article}
              sizes="(max-width: 900px) 100vw, 22vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
