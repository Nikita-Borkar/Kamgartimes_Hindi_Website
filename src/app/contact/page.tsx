import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { contactPage } from "@/data/pages";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${contactPage.title} – ${site.name}`,
  description: contactPage.lede,
};

export default function Contact() {
  return (
    <PageShell>
      <InfoPage page={contactPage} />
    </PageShell>
  );
}
