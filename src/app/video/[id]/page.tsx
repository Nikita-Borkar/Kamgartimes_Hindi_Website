import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { VideoWatchPage } from "@/components/pages/VideoWatchPage";
import { allVideos } from "@/data/news";
import { site } from "@/data/site";

export function generateStaticParams() {
  return allVideos.map((video) => ({ id: video.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const video = allVideos.find((entry) => entry.id === id);
  return {
    title: video ? `${video.title} – ${site.name}` : site.name,
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = allVideos.find((entry) => entry.id === id);

  if (!video) {
    notFound();
  }

  const related = allVideos.filter((entry) => entry.id !== id).slice(0, 4);

  return (
    <PageShell>
      <VideoWatchPage video={video} related={related} />
    </PageShell>
  );
}