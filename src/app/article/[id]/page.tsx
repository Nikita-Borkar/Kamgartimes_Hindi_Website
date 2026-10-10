import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ArticlePage, pickRelated } from "@/components/pages/ArticlePage";
import { allArticles } from "@/data/news";
import { site } from "@/data/site";

export function generateStaticParams() {
  return allArticles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = allArticles.find((entry) => entry.id === id);
  return {
    title: article ? `${article.headline} – ${site.name}` : site.name,
    description: article?.excerpt ?? site.description,
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = allArticles.find((entry) => entry.id === id);

  if (!article) {
    notFound();
  }

  return (
    <PageShell>
      <ArticlePage article={article} related={pickRelated(article, allArticles)} />
    </PageShell>
  );
}
