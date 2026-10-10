import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { aboutPage } from "@/data/pages";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${aboutPage.title} – ${site.name}`,
  description: aboutPage.lede,
};

export default function About() {
  return (
    <PageShell>
      <InfoPage page={aboutPage} />
    </PageShell>
  );
}
