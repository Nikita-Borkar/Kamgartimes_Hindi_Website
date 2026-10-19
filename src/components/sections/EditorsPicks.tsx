import { editorsPicks } from "@/data/news";
import Link from "next/link";
import { OverlayCard } from "@/components/ui/OverlayCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import { articleHref } from "@/lib/links";
import ui from "@/components/ui/ui.module.css";
import styles from "./sections.module.css";

/**
 * संपादक की पसंद: one hero overlay, two stacked overlays, then a
 * hairline-separated read list with no thumbnails.
 */
export function EditorsPicks() {
  return (
    <section className={styles.section} aria-label="संपादक की पसंद">
      <div className="reveal">
        <SectionHeader title="संपादक की पसंद" />
      </div>
      <div className={`${styles.picks} reveal`}>
        <div className={styles.picksHero}>
          <OverlayCard
            article={editorsPicks.hero}
            headlineSize="l"
            sizes="(max-width: 900px) 100vw, 33vw"
          />
        </div>

        <div className={styles.picksStack}>
          {editorsPicks.stack.map((article, i) => (
            <div
              key={article.id}
              className={`${styles.picksStackItem} reveal`}
              style={stagger(i)}
            >
              <OverlayCard
                article={article}
                sizes="(max-width: 900px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>

        <div className={`${styles.reads} reveal`} style={stagger(2)}>
          {editorsPicks.reads.map((article) => (
            <Link
              key={article.id}
              className={styles.read}
              href={articleHref(article.id)}
              aria-label={article.headline}
            >
              <div className={ui.cat}>{article.category}</div>
              <h3 className={`${styles.readTitle} ${ui.titleM}`}>
                {article.headline}
              </h3>
              <p className={ui.excerpt}>{article.excerpt}</p>
              <div className={ui.meta}>{article.meta}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
