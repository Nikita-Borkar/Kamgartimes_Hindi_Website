import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { GalleryLibrary } from "@/components/pages/MediaLibraryPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `फोटो गॅलरी – ${site.name}`,
};

export default function GalleryPage() {
  return (
    <PageShell>
      <GalleryLibrary />
    </PageShell>
  );
}