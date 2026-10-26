import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { disclaimerPage } from "@/data/pages";
import { site } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import type { InfoPageData } from "@/data/types";

export const metadata: Metadata = {
  title: `${disclaimerPage.title} – ${site.name}`,
  description: disclaimerPage.lede,
};

export default async function Disclaimer() {
  const pageData: InfoPageData = { ...disclaimerPage };

  try {
    const staticPage = await kamgarApi.getStaticPage("disclaimer");
    if (staticPage?.title) {
      pageData.title = staticPage.title;
      if (staticPage.excerpt) pageData.lede = staticPage.excerpt;
      if (staticPage.content) pageData.htmlContent = staticPage.content;
      if (staticPage.publishedAt) {
        pageData.updated = new Date(staticPage.publishedAt).toLocaleDateString("hi-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }
    }
  } catch {}

  return (
    <PageShell>
      <InfoPage page={pageData} />
    </PageShell>
  );
}
