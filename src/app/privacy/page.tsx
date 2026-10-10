import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { privacyPage } from "@/data/pages";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${privacyPage.title} – ${site.name}`,
  description: privacyPage.lede,
};

export default function PrivacyPolicy() {
  return (
    <PageShell>
      <InfoPage page={privacyPage} />
    </PageShell>
  );
}
