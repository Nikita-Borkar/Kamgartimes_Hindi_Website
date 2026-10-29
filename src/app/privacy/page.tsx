import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { site } from "@/data/site";
import { toInfoPageData } from "@/lib/staticPageInfo";
import { ApiError, kamgarApi } from "@/services/apiClient";

const getPrivacyPolicy = cache(() => kamgarApi.getStaticPage("privacy-policy"));

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getPrivacyPolicy();
    return {
      title: `${page.seo?.metaTitle?.trim() || page.title} – ${site.name}`,
      description: page.seo?.metaDescription?.trim() || page.excerpt || undefined,
    };
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return { title: `Privacy Policy – ${site.name}` };
    }
    throw error;
  }
}

export default async function PrivacyPolicy() {
  let page;
  try {
    page = await getPrivacyPolicy();
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) notFound();
    throw error;
  }

  return (
    <PageShell>
      <InfoPage page={toInfoPageData(page, "गोपनीयता नीति")} />
    </PageShell>
  );
}
