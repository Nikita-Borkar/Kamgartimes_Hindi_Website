import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CategoryPage } from "@/components/pages/CategoryPage";
import {
  allArticles,
  latestNews,
  features,
  editorsPicks,
  trending,
} from "@/data/news";
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

  let articles = allArticles.filter(
    (article) => article.category === category.label,
  );

  // For meta-categories (latest, trending, featured, editorial, etc.) provide rich curated feeds
  if (slug === "latest" || slug === "breaking") {
    const seen = new Set<string>();
    articles = [...latestNews, ...trending, ...allArticles].filter((a) => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
  } else if (slug === "trending") {
    const seen = new Set<string>();
    articles = [...trending, ...latestNews, ...allArticles].filter((a) => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
  } else if (
    slug === "featured" ||
    slug === "special-report" ||
    slug === "story-of-day"
  ) {
    const seen = new Set<string>();
    articles = [
      ...features,
      editorsPicks.hero,
      ...editorsPicks.stack,
      ...allArticles.filter(
        (a) =>
          a.category === "विशेष" ||
          a.category === "दीर्घ लेख" ||
          a.category === "फोटो फीचर",
      ),
    ].filter((a) => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
  } else if (slug === "editorial" || slug === "editorial-article") {
    const seen = new Set<string>();
    articles = [
      editorsPicks.hero,
      ...editorsPicks.reads.map((r) => ({ ...r, image: "/img/img24.png" })),
      ...editorsPicks.stack,
      ...allArticles.filter(
        (a) => a.category === "विचार" || a.category === "संपादकीय",
      ),
    ].filter((a) => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
  } else if (slug === "opinion" || slug === "readers-view" || slug === "manthan") {
    const seen = new Set<string>();
    articles = [
      ...allArticles.filter(
        (a) => a.category === "विचार" || a.category === "मंथन",
      ),
      ...editorsPicks.reads.map((r) => ({ ...r, image: "/img/img24.png" })),
    ].filter((a) => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
  } else if (
    slug === "labor" ||
    slug === "labor-rights" ||
    slug === "labor-union" ||
    slug === "wages" ||
    slug === "labor-laws"
  ) {
    const seen = new Set<string>();
    articles = [
      ...allArticles.filter(
        (a) =>
          a.category === "कामगार टाइम्स" ||
          a.category === "श्रम अधिकार" ||
          a.category === "प्रशासन" ||
          a.category === "नीति व नियम",
      ),
      ...allArticles.slice(0, 8),
    ].filter((a) => {
      if (seen.has(a.id)) return false;
      seen.add(a.id);
      return true;
    });
  } else if (articles.length === 0) {
    // Graceful fallback to allArticles matching similar topics or general articles so page isn't blank
    articles = allArticles.slice(0, 8);
  }

  return (
    <PageShell>
      <CategoryPage label={category.label} articles={articles} />
    </PageShell>
  );
}

