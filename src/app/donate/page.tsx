import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { toInfoPageData } from "@/lib/staticPageInfo";
import { kamgarApi } from "@/services/apiClient";
import { site } from "@/data/site";
import type { StaticPage } from "@/types/api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await kamgarApi.getStaticPage("donate-us");
    return {
      title: `${page.seo?.metaTitle || page.title} – ${site.name}`,
      description: page.seo?.metaDescription || page.excerpt,
    };
  } catch {
    return { title: `सहयोग करें – ${site.name}` };
  }
}

export default async function Donate() {
  let page: StaticPage;
  try {
    page = await kamgarApi.getStaticPage("donate-us");
  } catch {
    notFound();
  }

  return (
    <PageShell>
      <InfoPage page={toInfoPageData(page, "सहयोग करें")} />
    </PageShell>
  );
}
