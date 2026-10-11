import { categories } from "@/data/site";

/* Single source for every route the card vocabulary links to, so a change to
   the URL scheme is one edit here instead of a hunt across components. */

export const articleHref = (id: string) => {
  if (
    id.includes("-") &&
    !id.startsWith("lead-") &&
    !id.startsWith("tile-") &&
    !id.startsWith("latest-") &&
    !id.startsWith("trend-") &&
    !id.startsWith("pol-") &&
    !id.startsWith("desk-") &&
    !id.startsWith("feat-") &&
    !id.startsWith("pick-")
  ) {
    return `/news/${id}`;
  }
  return `/article/${id}`;
};

export const videoHref = (id: string) => `/video/${id}`;
export const galleryHref = (id: string) => `/gallery/${id}`;
export const epaperHref = (id: string) => `/e-paper`;

/** Resolves a section label (e.g. "क्रीडा") to its /category/[slug] route. */
export function categoryHref(label: string): string {
  const match = categories.find((category) => category.label === label);
  return `/category/${match?.slug ?? "maharashtra"}`;
}
