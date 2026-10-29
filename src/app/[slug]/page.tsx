import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { InfoPage } from "@/components/pages/InfoPage";
import { PageShell } from "@/components/layout/PageShell";
import { site } from "@/data/site";
import type { InfoPageData } from "@/data/types";
import { ApiError, kamgarApi } from "@/services/apiClient";
import type { StaticPage } from "@/types/api";

const getStaticPage = cache((slug: string) => kamgarApi.getStaticPage(slug));

type StaticPageProps = {
  params: Promise<{ slug: string }>;
};

function isNotFoundError(error: unknown): boolean {
  return error instanceof ApiError && error.statusCode === 404;
}

export async function generateMetadata({
  params,
}: StaticPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const page = await getStaticPage(slug);
    return {
      title: `${page.seo?.metaTitle?.trim() || page.title} – ${site.name}`,
      description: page.seo?.metaDescription?.trim() || page.excerpt || undefined,
    };
  } catch (error) {
    if (isNotFoundError(error)) {
      return { title: `${slug} – ${site.name}` };
    }
    throw error;
  }
}

export default async function BackendStaticPage({ params }: StaticPageProps) {
  const { slug } = await params;
  let staticPage: StaticPage;

  try {
    staticPage = await getStaticPage(slug);
  } catch (error) {
    if (isNotFoundError(error)) notFound();
    throw error;
  }

  const updatedAt =
    staticPage.updatedAt || staticPage.createdAt || staticPage.publishedAt;
  const page: InfoPageData = {
    slug: staticPage.slug,
    eyebrow: "जानकारी",
    title: staticPage.title,
    updated: updatedAt
      ? `अद्यतन: ${new Date(updatedAt).toLocaleDateString("hi-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`
      : "",
    lede: staticPage.excerpt || "",
    htmlContent: staticPage.content,
    sections: [],
  };

  return (
    <PageShell>
      <InfoPage page={page} />
    </PageShell>
  );
}
