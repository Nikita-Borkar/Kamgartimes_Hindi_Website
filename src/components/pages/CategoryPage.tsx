import type { Article } from "@/data/types";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StoryCard } from "@/components/ui/StoryCard";
import { AdCard } from "@/components/ui/AdCard";
import { AdSlot } from "@/components/ui/AdSlot";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Category } from "@/types/api";
import { PageHero } from "./PageHero";
import { cardAds, leaderboardAds } from "@/data/ads";
import styles from "./pages.module.css";

type Section = Pick<Category, "_id" | "name" | "slug">;

function CategoryPagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string;
  page: number;
  totalPages: number;
}) {
  const visiblePages = new Set<number>([1, totalPages]);
  for (let current = Math.max(1, page - 2); current <= Math.min(totalPages, page + 2); current += 1) {
    visiblePages.add(current);
  }
  const pages = [...visiblePages].sort((a, b) => a - b);

  return (
    <nav className={styles.categoryPagination} aria-label="पृष्ठ नेविगेशन">
      {page > 1 ? (
        <Link className={styles.paginationEdge} href={`${basePath}?page=${page - 1}`} rel="prev">
          <ArrowLeft size={15} aria-hidden="true" /> पिछला पृष्ठ
        </Link>
      ) : <span className={styles.paginationEdgeDisabled} aria-disabled="true">पिछला पृष्ठ</span>}

      <div className={styles.paginationNumbers}>
        {pages.map((number, index) => (
          <span className={styles.paginationItem} key={number}>
            {index > 0 && number - pages[index - 1] > 1 && <span className={styles.paginationEllipsis}>…</span>}
            <Link
              className={styles.paginationNumber}
              href={`${basePath}?page=${number}`}
              aria-current={number === page ? "page" : undefined}
              aria-label={`पृष्ठ ${number}`}
            >
              {number}
            </Link>
          </span>
        ))}
      </div>

      {page < totalPages ? (
        <Link className={styles.paginationEdge} href={`${basePath}?page=${page + 1}`} rel="next">
          अगला पृष्ठ <ArrowRight size={15} aria-hidden="true" />
        </Link>
      ) : <span className={styles.paginationEdgeDisabled} aria-disabled="true">अगला पृष्ठ</span>}
    </nav>
  );
}

export function CategoryPage({
  label,
  subcategories = [],
  articles,
  parentCategory,
  basePath,
  page = 1,
  pageSize = 12,
  totalArticles = articles.length,
}: {
  label: string;
  subcategories?: Section[];
  articles: Article[];
  parentCategory?: Pick<Category, "name" | "slug">;
  basePath: string;
  page?: number;
  pageSize?: number;
  totalArticles?: number;
}) {
  const isParentCategory = subcategories.length > 0;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const firstArticle = totalArticles === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastArticle = Math.min(page * pageSize, totalArticles);

  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow={parentCategory ? `${parentCategory.name} / ${label}` : "श्रेणी"}
        title={label}
        lede={isParentCategory ? "इस श्रेणी की उपश्रेणियाँ चुनें और संबंधित खबरें पढ़ें।" : undefined}
      />

      {isParentCategory ? (
        <section className={styles.subcategorySection} aria-labelledby="subcategory-heading">
          <div className={styles.categorySectionHeading}>
            <div>
              <p className={styles.categorySectionEyebrow}>इस श्रेणी में</p>
              <h2 id="subcategory-heading" className={styles.categorySectionTitle}>उपश्रेणियाँ</h2>
            </div>
            <span className={styles.categoryCount}>{subcategories.length} विभाग</span>
          </div>
          <ul className={styles.subcategoryList}>
            {subcategories.map((subcategory, index) => (
              <li key={subcategory._id}>
                <Link
                  className={styles.subcategoryLink}
                  href={`/category/${encodeURIComponent(subcategory.slug)}`}
                >
                  <span className={styles.subcategoryIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.subcategoryName}>{subcategory.name}</span>
                  <ArrowRight className={styles.subcategoryArrow} size={17} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : articles.length === 0 ? (
        <EmptyState
          title={`'${label}' श्रेणी में अभी कोई समाचार उपलब्ध नहीं है`}
          description="इस श्रेणी में नए लेख प्रकाशित होने पर वे यहाँ दिखाई देंगे।"
          actionLabel="मुख्य पृष्ठ पर जाएँ"
          actionHref="/"
          secondaryLabel="ताज़ा खबरें देखें"
          secondaryHref="/category/latest"
        />
      ) : (
        <section className={styles.categoryStories} aria-labelledby="category-stories-heading">
          <div className={styles.categorySectionHeading}>
            <div>
              <p className={styles.categorySectionEyebrow}>ताज़ा अपडेट</p>
              <h2 id="category-stories-heading" className={styles.categorySectionTitle}>{label} की खबरें</h2>
            </div>
            <span className={styles.categoryCount} aria-live="polite">
              {firstArticle}–{lastArticle} / {totalArticles}
            </span>
          </div>

          <div className={`${styles.categoryGrid} reveal`}>
            {articles.map((article, index) => (
              <div className={styles.categoryStoryItem} key={article.id}>
                <StoryCard article={article} sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 320px" />
                {index === 4 && page === 1 && <AdCard ad={cardAds[0]} />}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <CategoryPagination basePath={basePath} page={page} totalPages={totalPages} />
          )}
          <div className={styles.categoryAdBottom}>
            <AdSlot ad={leaderboardAds[2]} />
          </div>
        </section>
      )}
    </main>
  );
}
