import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { EpaperReader } from "@/components/pages/EpaperReader";
import { epaperEditions } from "@/data/epaper";
import { site } from "@/data/site";

export function generateStaticParams() {
  return epaperEditions.map((edition) => ({ id: edition.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const edition = epaperEditions.find((entry) => entry.id === id);
  return {
    title: edition ? `ई-पेपर — ${edition.label} – ${site.name}` : site.name,
  };
}

export default async function EpaperEditionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const edition = epaperEditions.find((entry) => entry.id === id);

  if (!edition) {
    notFound();
  }

  return (
    <PageShell>
      <EpaperReader edition={edition} />
    </PageShell>
  );
}