import { categories } from "@/data/site";

/* Single source for every route the card vocabulary links to, so a change to
   the URL scheme is one edit here instead of a hunt across components. */

/**
 * Returns the site's base origin.
 * Priority: NEXT_PUBLIC_SITE_URL env var → window.location.origin (client) → kamgartimes.com (SSR fallback)
 * Change NEXT_PUBLIC_SITE_URL in .env.local (or Netlify env settings) to move domains.
 */
export const siteOrigin = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://kamgartimes.com";
};

/** Returns an absolute article URL (for share links, OG tags, etc.) */
export const absoluteArticleUrl = (id: string): string =>
  `${siteOrigin()}${articleHref(id)}`;

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
export const epaperHref = (id?: string) => (id ? `/e-paper?edition=${id}` : "/e-paper");

const HINDI_CATEGORY_SLUGS: Record<string, string> = {
  latest: "ताज़ा-खबरें",
  opinion: "विचार",
  health: "स्वास्थ्य",
  education: "शिक्षा",
  entertainment: "मनोरंजन",
  technology: "तकनीक",
  economy: "व्यापार",
  sport: "खेल",
  sports: "खेल",
  politics: "राजनीति",
  editorial: "संपादकीय",
};

const ENGLISH_CATEGORY_SLUGS = Object.fromEntries(
  Object.entries(HINDI_CATEGORY_SLUGS).map(([english, hindi]) => [hindi, english]),
);

export function localizedCategorySlug(slug: string): string {
  return HINDI_CATEGORY_SLUGS[slug.toLowerCase()] ?? slug;
}

export function sourceCategorySlug(slug: string): string {
  return ENGLISH_CATEGORY_SLUGS[slug] ?? slug;
}

export function categoryRouteHref(slug: string): string {
  if (slug.toLowerCase() === "weather" || slug === "मौसम") return "/मौसम";
  if (slug.toLowerCase() === "videos" || slug === "वीडियो") return "/videos";
  if (slug.toLowerCase() === "shorts" || slug === "शॉर्ट्स") return "/shorts";
  if (slug.toLowerCase() === "gallery" || slug === "गैलरी") return "/gallery";
  return `/category/${encodeURIComponent(localizedCategorySlug(slug))}`;
}

const SECTION_TITLE_MAP: Record<string, string> = {
  "ताज़ा ख़बरें": "/category/ताज़ा-खबरें",
  "ताज़ा खबरें": "/category/ताज़ा-खबरें",
  "लेटेस्ट न्यूज़": "/category/ताज़ा-खबरें",
  "ताज़ा अपडेट्स": "/category/ताज़ा-खबरें",
  "ट्रेंडिंग": "/category/trending",
  "ट्रेंडिंग न्यूज़": "/category/trending",
  "संपादक की पसंद": "/category/संपादकीय",
  "संपादकीय": "/category/संपादकीय",
  "विशेष रूप से चुनिंदा": "/category/featured",
  "विशेष लेख और विचार": "/category/विचार",
  "विचार": "/category/विचार",
  "विशेष": "/category/featured",
  "विशेष रिपोर्ट": "/category/featured",
  "खास रिपोर्ट": "/category/featured",
  "मौसम": "/मौसम",
  "मौसम पूर्वानुमान": "/मौसम",
  "विस्तृत पूर्वानुमान": "/मौसम",
  "फोटो गैलरी": "/gallery",
  "गैलरी": "/gallery",
  "वीडियो": "/videos",
  "शॉर्ट्स": "/shorts",
  "ई-पेपर": "/e-paper",
  "लोकल न्यूज़": "/city",
  "कामगार टाइम्स": "/category/labor",
  "व्यापार": "/category/व्यापार",
};

/** Resolves a section label (e.g. "क्रीडा", "ताज़ा ख़बरें", "ट्रेंडिंग") to its proper route. */
export function categoryHref(label: string): string {
  if (!label) return "/category/latest";
  const trimmed = label.trim();
  if (SECTION_TITLE_MAP[trimmed]) {
    return SECTION_TITLE_MAP[trimmed];
  }
  const match = categories.find((category) => category.label === trimmed);
  return categoryRouteHref(match?.slug ?? "latest");
}

