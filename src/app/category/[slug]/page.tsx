import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { categories, site } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";
import type { Category as ApiCategory } from "@/types/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  let categoryLabel = categories.find((entry) => entry.slug === slug || entry.slug === decodedSlug)?.label;

  if (!categoryLabel) {
    try {
      const tree = await kamgarApi.getCategoryTree();
      const match = tree.flatMap((parent) => [parent, ...(parent.subcategories ?? [])]).find(
        (c) => c.slug === slug || c.slug === decodedSlug || c._id === slug || c.name === decodedSlug
      );
      if (match) categoryLabel = match.name;
    } catch {}
  }

  return {
    title: `${categoryLabel ?? decodedSlug} – ${site.name}`,
    description: `कामगार टाइम्स पर ${categoryLabel ?? decodedSlug} के ताज़ा समाचार व विशेष रिपोर्ट।`,
  };
}

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  let categoryLabel = categories.find((entry) => entry.slug === slug || entry.slug === decodedSlug)?.label;
  let apiCategoryId: string | undefined;
  let subcategories: Pick<ApiCategory, "_id" | "name" | "slug">[] = [];

  // Resolve the category and its child sections from the public navigation tree.
  try {
    const tree = await kamgarApi.getCategoryTree();
    if (tree.length > 0) {
      const match = tree.flatMap((parent) => [parent, ...(parent.subcategories ?? [])]).find(
        (c) =>
          c.slug === slug ||
          c.slug === decodedSlug ||
          c._id === slug ||
          c.name === categoryLabel ||
          c.name === decodedSlug
      );
      if (match) {
        apiCategoryId = match._id;
        if (!categoryLabel) categoryLabel = match.name;
        if (match.parent == null) {
          subcategories = (match.subcategories ?? []).map(({ _id, name, slug: categorySlug }) => ({
            _id,
            name,
            slug: categorySlug,
          }));
        }
      }
    }
  } catch {}

  if (!categoryLabel && !apiCategoryId) {
    categoryLabel = decodedSlug;
  }

  let articles: Article[] = [];

  // 1. Fetch live articles from backend API
  try {
    const isMetaCategory = slug === "latest" || slug === "breaking" || slug === "trending";
    const articleRes = isMetaCategory
      ? await kamgarApi.getArticles({ limit: 20 })
      : await kamgarApi.getArticles({
          category: apiCategoryId || categoryLabel || decodedSlug,
          limit: 20,
        });
    if (articleRes?.articles && articleRes.articles.length > 0) {
      articles = articleRes.articles.map(adaptArticleListItem);
    }
  } catch {
    articles = [];
  }

  // Pure dynamic data: No dummy or fallback data. If no articles exist in DB, CategoryPage renders EmptyState.
  return (
    <PageShell>
      <CategoryPage
        label={categoryLabel ?? decodedSlug ?? "समाचार"}
        subcategories={subcategories}
        articles={articles}
      />
    </PageShell>
  );
}
