import { leadRailAd } from "@/data/ads";
import { tiles } from "@/data/news";
import { AdSlot } from "@/components/ui/AdSlot";
import { OverlayCard } from "@/components/ui/OverlayCard";
import { LeadVideoSlider } from "@/components/sections/LeadVideoSlider";
import { stagger } from "@/components/motion/stagger";
import styles from "./sections.module.css";

/** Below the hero: ad rail and Kamgar Times YouTube video slider stage */
export function LeadGrid() {
  return (
    <section className={styles.section} aria-label="कामगार टाइम्स वीडियो और मुख्य समाचार">
      <div className={`${styles.leadGrid} reveal`}>
        <AdSlot ad={leadRailAd} />
        <LeadVideoSlider />
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
