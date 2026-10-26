import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { site } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleDetail, adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const apiDetail = await kamgarApi.getArticleBySlug(slug);
    if (apiDetail?.title) {
      return {
        title: `${apiDetail.title} – ${site.name}`,
        description: apiDetail.summary || site.description,
      };
    }
  } catch {}

  return {
    title: site.name,
    description: site.description,
  };
}

export default async function NewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let article: Article | undefined;

  // 1. Fetch live article by slug/ID from backend API
  try {
    const apiDetail = await kamgarApi.getArticleBySlug(slug);
    if (apiDetail && (apiDetail.title || apiDetail.slug)) {
      article = adaptArticleDetail(apiDetail);
    }
  } catch {
    // API not reachable or article not found in DB
  }

  // Pure dynamic: If article is not in database, show 404 (not found)
  if (!article) {
    notFound();
  }

  // Fetch live related articles
  let related: Article[] = [];
  try {
    const res = await kamgarApi.getArticles({ limit: 5 });
    if (res?.articles && res.articles.length > 0) {
      related = res.articles
        .filter((a) => (a.slug || a._id) !== article?.id)
        .slice(0, 4)
        .map(adaptArticleListItem);
    }
  } catch {}

  return (
    <PageShell>
      <ArticlePage article={article} related={related} />
    </PageShell>
  );
}
