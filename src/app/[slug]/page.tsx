import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { WeatherPage } from "@/components/pages/WeatherPage";
import { site } from "@/data/site";
import type { InfoPageData } from "@/data/types";
import { ApiError, kamgarApi } from "@/services/apiClient";
import type { StaticPage } from "@/types/api";

const getStaticPage = cache((slug: string) => kamgarApi.getStaticPage(slug));
const hindiWeatherMetadata: Metadata = {
  title: `मौसम पूर्वानुमान व तापमान रिकॉर्ड (महाराष्ट्र) – ${site.name}`,
  description:
    "महाराष्ट्र के प्रमुख शहरों का लाइव मौसम पूर्वानुमान, बीते 7 दिनों का तापमान रिकॉर्ड, आर्द्रता, वर्षा और वायु गुणवत्ता (AQI) रिपोर्ट।",
};

function decodeRouteSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

type StaticPageProps = {
  params: Promise<{ slug: string }>;
};

function isNotFoundError(error: unknown): boolean {
  return error instanceof ApiError && error.statusCode === 404;
}

export async function generateMetadata({
  params,
}: StaticPageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeRouteSlug(rawSlug);
  if (slug === "मौसम") return hindiWeatherMetadata;

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
  const { slug: rawSlug } = await params;
  const slug = decodeRouteSlug(rawSlug);
  if (slug === "मौसम") {
    return (
      <PageShell>
        <WeatherPage />
      </PageShell>
    );
  }

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
  const { InfoPage } = await import("@/components/pages/InfoPage");

  return (
    <PageShell>
      <InfoPage page={page} />
    </PageShell>
  );
}
