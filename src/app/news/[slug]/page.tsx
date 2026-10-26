import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { site } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleDetail, adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";

export const revalidate = 30;

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

  // 1. Parallel fetch: article detail + related articles at the exact same time
  const [apiDetailRes, relatedRes] = await Promise.allSettled([
    kamgarApi.getArticleBySlug(slug),
    kamgarApi.getArticles({ limit: 5 }),
  ]);

  let article: Article | undefined;
  if (apiDetailRes.status === "fulfilled" && apiDetailRes.value) {
    const apiDetail = apiDetailRes.value;
    if (apiDetail && (apiDetail.title || apiDetail.slug)) {
      article = adaptArticleDetail(apiDetail);
    }
  }

  // Pure dynamic: If article is not in database, show 404 (not found)
  if (!article) {
    notFound();
  }

  // Related articles
  let related: Article[] = [];
  if (relatedRes.status === "fulfilled" && relatedRes.value?.articles) {
    related = relatedRes.value.articles
      .filter((a) => (a.slug || a._id) !== article?.id)
      .slice(0, 4)
      .map(adaptArticleListItem);
  }

  return (
    <PageShell>
      <ArticlePage article={article} related={related} />
    </PageShell>
  );
}
