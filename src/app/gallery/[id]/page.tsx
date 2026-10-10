import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { GalleryDetailPage } from "@/components/pages/GalleryDetailPage";
import { gallery } from "@/data/news";
import { site } from "@/data/site";

export function generateStaticParams() {
  return gallery.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = gallery.find((entry) => entry.id === id);
  return {
    title: item ? `${item.headline} – ${site.name}` : site.name,
  };
}

export default async function GalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = gallery.find((entry) => entry.id === id);

  if (!item) {
    notFound();
  }

  const related = gallery.filter((entry) => entry.id !== id).slice(0, 3);

  return (
    <PageShell>
      <GalleryDetailPage item={item} related={related} />
    </PageShell>
  );
}