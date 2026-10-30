import { permanentRedirect } from "next/navigation";
import { kamgarApi } from "@/services/apiClient";
import { articlePath } from "@/lib/seo";

/** Keep the legacy article URL working while consolidating indexing on /news/. */
export default async function LegacyArticleRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await kamgarApi.getArticleBySlug(id).catch(() => null);
  permanentRedirect(articlePath(article?.slug || id));
}
