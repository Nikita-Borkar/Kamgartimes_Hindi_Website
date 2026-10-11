import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ArticlePage, pickRelated } from "@/components/pages/ArticlePage";
import { allArticles } from "@/data/news";
import { site } from "@/data/site";

export function generateStaticParams() {
  return allArticles.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = allArticles.find((entry) => entry.id === slug);
  return {
    title: article ? `${article.headline} – ${site.name}` : site.name,
    description: article?.excerpt ?? site.description,
  };
}

export default async function NewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = allArticles.find((entry) => entry.id === slug);

  if (!article) {
    notFound();
  }

  return (
    <PageShell>
      <ArticlePage article={article} related={pickRelated(article, allArticles)} />
    </PageShell>
  );
}
