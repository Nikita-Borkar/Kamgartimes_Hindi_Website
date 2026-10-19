import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { allArticles } from "@/data/news";
import { categories, site } from "@/data/site";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((entry) => entry.slug === slug);
  return {
    title: `${category?.label ?? "श्रेणी"} – ${site.name}`,
  };
}

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((entry) => entry.slug === slug);

  if (!category) {
    notFound();
  }

  const articles = allArticles.filter(
    (article) => article.category === category.label,
  );

  return (
    <PageShell>
      <CategoryPage label={category.label} articles={articles} />
    </PageShell>
  );
}
