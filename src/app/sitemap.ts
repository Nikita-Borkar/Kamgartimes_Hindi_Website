import type { MetadataRoute } from "next";
import { kamgarApi } from "@/services/apiClient";
import { absoluteSiteUrl, articlePath } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: absoluteSiteUrl("/"), changeFrequency: "hourly", priority: 1 },
  ];

  try {
    // The public articles endpoint caps page size at 50.
    const limit = 50;
    const firstPage = await kamgarApi.getArticles({ page: 1, limit });
    const pages = Math.min(Math.ceil(firstPage.total / limit), 500);
    const articles = [...(firstPage.articles || [])];
    for (let startPage = 2; startPage <= pages; startPage += 5) {
      const batch = await Promise.all(
        Array.from({ length: Math.min(5, pages - startPage + 1) }, (_, index) =>
          kamgarApi.getArticles({ page: startPage + index, limit }),
        ),
      );
      articles.push(...batch.flatMap((result) => result.articles || []));
    }
    const seenArticles = new Set<string>();

    for (const article of articles) {
      const slug = article.slug?.trim();
      if (!slug || seenArticles.has(slug)) continue;
      seenArticles.add(slug);
      entries.push({
        url: absoluteSiteUrl(articlePath(slug)),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch (error) {
    console.warn("Could not load article URLs for sitemap:", error);
  }

  return entries;
}
