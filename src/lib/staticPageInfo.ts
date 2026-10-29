import type { StaticPage } from "@/types/api";
import type { InfoPageData } from "@/data/types";

export function toInfoPageData(page: StaticPage, eyebrow: string): InfoPageData {
  const updatedAt = page.updatedAt || page.createdAt || page.publishedAt;

  return {
    slug: page.slug,
    eyebrow,
    title: page.title,
    updated: updatedAt
      ? `अद्यतन: ${new Date(updatedAt).toLocaleDateString("hi-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`
      : "",
    lede: page.excerpt || "",
    htmlContent: page.content,
    sections: [],
  };
}
