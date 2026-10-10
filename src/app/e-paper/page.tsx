import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { EpaperListingPage } from "@/components/pages/EpaperListingPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `ई-पेपर – ${site.name}`,
};

export default function EpaperPage() {
  return (
    <PageShell>
      <EpaperListingPage />
    </PageShell>
  );
}