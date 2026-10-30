import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { categories, site } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";
import type { Category as ApiCategory } from "@/types/api";
import {
  categoryRouteHref,
  localizedCategorySlug,
  sourceCategorySlug,
} from "@/lib/links";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const lookupSlug = sourceCategorySlug(decodedSlug);
  let categoryLabel = categories.find((entry) => entry.slug === slug || entry.slug === lookupSlug)?.label;

  if (!categoryLabel) {
    try {
      const tree = await kamgarApi.getCategoryTree();
      const match = tree.flatMap((parent) => [parent, ...(parent.subcategories ?? [])]).find(
        (c) => c.slug === slug || c.slug === decodedSlug || c.slug === lookupSlug || c._id === slug || c.name === decodedSlug
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
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const requestedPage = Array.isArray(query.page) ? query.page[0] : query.page;
  const page = Math.max(1, Number.parseInt(requestedPage || "1", 10) || 1);
  const pageSize = 12;
  const decodedSlug = decodeURIComponent(slug);
  const lookupSlug = sourceCategorySlug(decodedSlug);
  const canonicalSlug = localizedCategorySlug(lookupSlug);
  if (decodedSlug !== canonicalSlug) {
    const pageQuery = requestedPage ? `?page=${encodeURIComponent(requestedPage)}` : "";
    redirect(`${categoryRouteHref(lookupSlug)}${pageQuery}`);
  }

  let categoryLabel = categories.find((entry) => entry.slug === slug || entry.slug === lookupSlug)?.label;
  let apiCategoryId: string | undefined;
  let subcategories: Pick<ApiCategory, "_id" | "name" | "slug">[] = [];
  let parentCategory: Pick<ApiCategory, "name" | "slug"> | undefined;

  // Resolve the category and its child sections from the public navigation tree.
  try {
    const tree = await kamgarApi.getCategoryTree();
    if (tree.length > 0) {
      const match = tree.flatMap((parent) => [parent, ...(parent.subcategories ?? [])]).find(
        (c) =>
          c.slug === slug ||
          c.slug === decodedSlug ||
          c.slug === lookupSlug ||
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
        } else {
          const parent = tree.find((item) => item._id === match.parent);
          if (parent) parentCategory = { name: parent.name, slug: parent.slug };
        }
      }
    }
  } catch {}

  if (!categoryLabel && !apiCategoryId) {
    categoryLabel = decodedSlug;
  }

  let articles: Article[] = [];
  let totalArticles = 0;
  let currentPage = page;
  let totalPages = 0;

  // Parent pages surface their child sections; child pages list all matching stories in pages.
  if (subcategories.length === 0) {
    try {
      const isMetaCategory = slug === "latest" || slug === "breaking" || slug === "trending";
      const articleRes = await kamgarApi.getArticles({
        ...(!isMetaCategory && { category: apiCategoryId || categoryLabel || decodedSlug }),
        page,
        limit: pageSize,
      });
      articles = (articleRes?.articles || []).map(adaptArticleListItem);
      totalArticles = articleRes?.total || 0;
      currentPage = articleRes?.page || page;
      totalPages = Math.ceil(totalArticles / pageSize);
    } catch {
      articles = [];
    }
  }
  if (totalPages > 0 && page > totalPages) {
    redirect(`/category/${encodeURIComponent(slug)}?page=${totalPages}`);
  }

  // Pure dynamic data: No dummy or fallback data. If no articles exist in DB, CategoryPage renders EmptyState.
  return (
    <PageShell>
      <CategoryPage
        label={categoryLabel ?? decodedSlug ?? "समाचार"}
        subcategories={subcategories}
        articles={articles}
        parentCategory={parentCategory}
        basePath={`/category/${encodeURIComponent(slug)}`}
        page={currentPage}
        pageSize={pageSize}
        totalArticles={totalArticles}
      />
    </PageShell>
  );
}
