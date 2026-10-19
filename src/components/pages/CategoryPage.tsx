import type { Article } from "@/data/types";
import { StoryCard } from "@/components/ui/StoryCard";
import { AdCard } from "@/components/ui/AdCard";
import { VerticalAd } from "@/components/ui/VerticalAd";
import { AdSlot } from "@/components/ui/AdSlot";
import { cardAds, verticalTowerAds, leaderboardAds } from "@/data/ads";
import { PageHero } from "./PageHero";
import styles from "./pages.module.css";

/**
 * Section landing page for one category. Reads the articles tagged with the
 * category label and lays them out on the same paper grid as the front page.
 * Uses native blog-sized card ads in the grid and vertical tower ads in split sections.
 */
export function CategoryPage({
  label,
  articles,
}: {
  label: string;
  articles: Article[];
}) {
  const leadBatch = articles.slice(0, 5);
  const splitBatch = articles.slice(5, 9);
  const tailBatch = articles.slice(9);

  return (
    <main id="main" className={styles.main}>
      <PageHero eyebrow="श्रेणी" title={label} />

      {articles.length === 0 ? (
        <p className={styles.emptyState}>
          इस श्रेणी में अभी कोई समाचार उपलब्ध नहीं है।
        </p>
      ) : (
        <>
          {/* Main news grid with integrated card-sized sponsored story */}
          <div className={`${styles.categoryGrid} reveal`}>
            {leadBatch.slice(0, 2).map((article) => (
              <StoryCard
                key={article.id}
                article={article}
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 320px"
              />
            ))}

            {/* In-grid blog/card-sized ad in slot #3 */}
            <AdCard ad={cardAds[0]} />

            {leadBatch.slice(2).map((article) => (
              <StoryCard
                key={article.id}
                article={article}
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 320px"
              />
            ))}
          </div>

          {/* Split editorial section with tall vertical tower ad */}
          {splitBatch.length > 0 && (
            <div className={`${styles.categorySplitLayout} reveal`}>
              <div className={styles.categorySplitStories}>
                {splitBatch.map((article) => (
                  <StoryCard
                    key={article.id}
                    article={article}
                    sizes="(max-width: 560px) 100vw, 320px"
                  />
                ))}
              </div>
              <VerticalAd ad={verticalTowerAds[0]} />
            </div>
          )}

          {/* Remaining stories if any */}
          {tailBatch.length > 0 && (
            <div className={`${styles.categoryGrid} reveal`} style={{ marginTop: "var(--space-10)" }}>
              {tailBatch.map((article, idx) => (
                <div key={article.id} style={{ display: "contents" }}>
                  <StoryCard
                    article={article}
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 320px"
                  />
                  {idx === 2 && <AdCard ad={cardAds[1]} />}
                </div>
              ))}
            </div>
          )}

          <div className={styles.categoryAdBottom}>
            <AdSlot ad={leaderboardAds[2]} />
          </div>
        </>
      )}
    </main>
  );
}
