import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { disclaimerPage } from "@/data/pages";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${disclaimerPage.title} – ${site.name}`,
  description: disclaimerPage.lede,
};

export default function Disclaimer() {
  return (
    <PageShell>
      <InfoPage page={disclaimerPage} />
    </PageShell>
  );
}
