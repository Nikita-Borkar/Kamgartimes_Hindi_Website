import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { site } from "@/data/site";
import { toInfoPageData } from "@/lib/staticPageInfo";
import { ApiError, kamgarApi } from "@/services/apiClient";

const getDisclaimer = cache(() => kamgarApi.getStaticPage("disclaimer"));

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await getDisclaimer();
    return {
      title: `${page.seo?.metaTitle?.trim() || page.title} – ${site.name}`,
      description: page.seo?.metaDescription?.trim() || page.excerpt || undefined,
    };
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return { title: `Disclaimer – ${site.name}` };
    }
    throw error;
  }
}

export default async function Disclaimer() {
  let page;
  try {
    page = await getDisclaimer();
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) notFound();
    throw error;
  }

  return (
    <PageShell>
      <InfoPage page={toInfoPageData(page, "अस्वीकरण")} />
    </PageShell>
  );
}
