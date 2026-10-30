import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { site } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import { adaptArticleDetail, adaptArticleListItem } from "@/lib/apiAdapters";
import type { Article } from "@/data/types";
import { absoluteSiteUrl, articlePath } from "@/lib/seo";

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
      const canonicalPath = articlePath(apiDetail.slug || slug);
      const image = apiDetail.featuredImage?.trim();
      const description = apiDetail.summary?.trim() || site.description;
      return {
        title: `${apiDetail.title} – ${site.name}`,
        description,
        alternates: { canonical: canonicalPath },
        openGraph: {
          type: "article",
          locale: "hi_IN",
          siteName: site.name,
          title: apiDetail.title,
          description,
          url: absoluteSiteUrl(canonicalPath),
          ...(image ? { images: [image] } : {}),
          publishedTime: apiDetail.publishedAt,
          authors: apiDetail.author?.name ? [apiDetail.author.name] : undefined,
          section: apiDetail.category?.name,
        },
        twitter: {
          card: image ? "summary_large_image" : "summary",
          title: apiDetail.title,
          description,
          ...(image ? { images: [image] } : {}),
        },
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
  if (article.id !== slug) {
    permanentRedirect(articlePath(article.id));
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.headline,
            description: article.excerpt || undefined,
            inLanguage: "hi-IN",
            mainEntityOfPage: absoluteSiteUrl(articlePath(article.id)),
            ...(article.image && !article.image.startsWith("/")
              ? { image: [article.image] }
              : article.image
                ? { image: [absoluteSiteUrl(article.image)] }
                : {}),
            ...(article.publishedAt && !Number.isNaN(Date.parse(article.publishedAt))
              ? { datePublished: new Date(article.publishedAt).toISOString() }
              : {}),
            ...(article.author?.name
              ? { author: { "@type": "Person", name: article.author.name } }
              : {}),
            publisher: {
              "@type": "Organization",
              name: site.name,
              url: absoluteSiteUrl("/"),
              logo: {
                "@type": "ImageObject",
                url: absoluteSiteUrl("/img/logo.png"),
              },
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <ArticlePage article={article} related={related} />
    </PageShell>
  );
}
