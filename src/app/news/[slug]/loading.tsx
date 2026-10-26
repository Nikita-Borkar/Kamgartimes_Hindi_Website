import { PageShell } from "@/components/layout/PageShell";
import { ArticleSkeleton } from "@/components/ui/ArticleSkeleton";

export default function NewsSlugLoading() {
  return (
    <PageShell>
      <ArticleSkeleton />
    </PageShell>
  );
}
