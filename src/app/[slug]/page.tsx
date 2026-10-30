import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { WeatherPage } from "@/components/pages/WeatherPage";
import { ContactMessageForm } from "@/components/forms/ContactMessageForm";
import { site } from "@/data/site";
import type { InfoPageData } from "@/data/types";
import { ApiError, kamgarApi } from "@/services/apiClient";
import type { StaticPage } from "@/types/api";

const getStaticPage = cache((slug: string) => kamgarApi.getStaticPage(slug));
const backendPageSlug = (slug: string) =>
  slug === "about" ? "about-us" : slug === "contact" ? "contact-us" : slug;
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
  const pageSlug = backendPageSlug(slug);

  try {
    const page = await getStaticPage(pageSlug);
    return {
      title: `${page.seo?.metaTitle?.trim() || page.title} – ${site.name}`,
      description: page.seo?.metaDescription?.trim() || page.excerpt || undefined,
      alternates: { canonical: `/${encodeURIComponent(page.slug)}` },
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
  const pageSlug = backendPageSlug(slug);

  let staticPage: StaticPage;

  try {
    staticPage = await getStaticPage(pageSlug);
  } catch (error) {
    if (isNotFoundError(error)) notFound();
    throw error;
  }

  const settings =
    pageSlug === "contact-us"
      ? await kamgarApi.getSiteSettings().catch(() => null)
      : null;
  const contactDetails = [
    ...(settings?.contactEmail
      ? [{
          id: "email",
          label: "ईमेल",
          value: settings.contactEmail,
          href: `mailto:${settings.contactEmail}`,
        }]
      : []),
    ...(settings?.contactPhone
      ? [{
          id: "phone",
          label: "फ़ोन",
          value: settings.contactPhone,
          href: `tel:${settings.contactPhone.replace(/\s+/g, "")}`,
        }]
      : []),
    ...(settings?.address
      ? [{ id: "address", label: "कार्यालय पता", value: settings.address }]
      : []),
  ];

  const updatedAt =
    staticPage.updatedAt || staticPage.createdAt || staticPage.publishedAt;
  const page: InfoPageData = {
    slug: staticPage.slug,
    eyebrow:
      pageSlug === "about-us"
        ? "हमारे बारे में"
        : pageSlug === "contact-us"
          ? "संपर्क"
          : "जानकारी",
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
    ...(contactDetails.length ? { contacts: contactDetails } : {}),
  };
  const { InfoPage } = await import("@/components/pages/InfoPage");

  return (
    <PageShell>
      <InfoPage page={page} />
      {pageSlug === "contact-us" ? (
        <div
          style={{
            maxWidth: "var(--shell-max, 1280px)",
            margin: "0 auto var(--space-12, 48px)",
            padding: "0 var(--shell-pad, 20px)",
          }}
        >
          <ContactMessageForm />
        </div>
      ) : null}
    </PageShell>
  );
}
