import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { privacyPage } from "@/data/pages";
import { site } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import type { InfoPageData } from "@/data/types";

export const metadata: Metadata = {
  title: `${privacyPage.title} – ${site.name}`,
  description: privacyPage.lede,
};

export default async function PrivacyPolicy() {
  const pageData: InfoPageData = { ...privacyPage };

  try {
    const staticPage = await kamgarApi.getStaticPage("privacy-policy");
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
