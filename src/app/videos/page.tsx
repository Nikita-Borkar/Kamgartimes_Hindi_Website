import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { VideoLibrary } from "@/components/pages/MediaLibraryPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `वीडियो – ${site.name}`,
};

export default function VideosPage() {
  return (
    <PageShell>
      <VideoLibrary />
    </PageShell>
  );
}