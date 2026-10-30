import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { GalleryDetailPage } from "@/components/pages/GalleryDetailPage";
import { site } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import { adaptGalleryItem } from "@/lib/apiAdapters";
import type { GalleryItem } from "@/data/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let title: string | undefined;

  try {
    const res = await kamgarApi.getGallery(1, 50);
    const match = res?.items?.find((g) => g._id === id);
    if (match) title = match.title;
  } catch {}

  return {
    title: title ? `${title} – ${site.name}` : site.name,
  };
}

export default async function GalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let item: GalleryItem | undefined;
  let allGalleryItems: GalleryItem[] = [];

  // 1. Try finding in Public Gallery API by slug or ID
  try {
    const pubGallery = await kamgarApi.getPublicGalleryBySlug(id).catch(() => null);
    if (pubGallery && pubGallery.title) {
      item = {
        id: pubGallery.slug || pubGallery._id,
        image: pubGallery.coverImage || pubGallery.images?.[0]?.imageUrl || "",
        headline: pubGallery.title,
        category: pubGallery.category?.name || "फोटो गैलरी",
        paragraphs: pubGallery.description ? [pubGallery.description] : [],
        galleryImages: pubGallery.images?.map((img) => img.imageUrl).filter(Boolean) || [],
        galleryCaptions: pubGallery.images?.map((img) => img.caption || "") || [],
      };
    }
  } catch {}

  // 2. Try finding in legacy API gallery if not found
  if (!item) {
    try {
      const res = await kamgarApi.getGallery(1, 50);
      if (res?.items && res.items.length > 0) {
        allGalleryItems = res.items.map(adaptGalleryItem);
        item = allGalleryItems.find((g) => g.id === id || (g as any).slug === id);
      }
    } catch {}
  }

  // 3. Try finding in MediaImages
  if (!item) {
    try {
      const imgRes = await kamgarApi.getMediaImages(1, 50).catch(() => null);
      const match = imgRes?.images?.find((img) => img._id === id);
      if (match) {
        item = {
          id: match._id,
          image: match.url,
          headline: match.title || "फोटो गैलरी",
          category: "फोटो गैलरी",
          paragraphs: match.altText ? [match.altText] : [],
          galleryImages: [match.url],
        };
      }
    } catch {}
  }

  // Pure dynamic: If item not in DB, 404
  if (!item) {
    notFound();
  }

  const related = allGalleryItems.filter((entry) => entry.id !== id).slice(0, 3);

  return (
    <PageShell>
      <GalleryDetailPage item={item} related={related} />
    </PageShell>
  );
}
