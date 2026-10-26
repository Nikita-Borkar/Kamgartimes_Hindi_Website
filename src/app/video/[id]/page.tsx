import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { VideoWatchPage } from "@/components/pages/VideoWatchPage";
import { site } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import { adaptMediaVideo } from "@/lib/apiAdapters";
import type { VideoItem } from "@/data/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let title: string | undefined;

  try {
    const res = await kamgarApi.getMediaVideos({ limit: 50 });
    const match = res?.videos?.find((v) => v._id === id);
    if (match) title = match.title;
  } catch {}

  return {
    title: title ? `${title} – ${site.name}` : site.name,
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let video: VideoItem | undefined;
  let allApiVideos: VideoItem[] = [];

  // Try finding in API videos
  try {
    const res = await kamgarApi.getMediaVideos({ limit: 50 });
    if (res?.videos && res.videos.length > 0) {
      allApiVideos = res.videos.map(adaptMediaVideo);
      video = allApiVideos.find((v) => v.id === id);
    }
  } catch {}

  // Pure dynamic: If video not in DB, 404
  if (!video) {
    notFound();
  }

  const related = allApiVideos.filter((entry) => entry.id !== id).slice(0, 4);

  return (
    <PageShell>
      <VideoWatchPage video={video} related={related} />
    </PageShell>
  );
}