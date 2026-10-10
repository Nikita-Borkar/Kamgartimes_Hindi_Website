import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ShortsLibrary } from "@/components/pages/MediaLibraryPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `शॉर्ट्स – ${site.name}`,
};

export default function ShortsPage() {
  return (
    <PageShell>
      <ShortsLibrary />
    </PageShell>
  );
}