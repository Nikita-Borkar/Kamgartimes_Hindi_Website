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
export const epaperHref = (id?: string) => (id ? `/e-paper?edition=${id}` : "/e-paper");

const SECTION_TITLE_MAP: Record<string, string> = {
  "ताज़ा ख़बरें": "/category/latest",
  "ताज़ा खबरें": "/category/latest",
  "लेटेस्ट न्यूज़": "/category/latest",
  "ताज़ा अपडेट्स": "/category/latest",
  "ट्रेंडिंग": "/category/trending",
  "ट्रेंडिंग न्यूज़": "/category/trending",
  "संपादक की पसंद": "/category/editorial",
  "संपादकीय": "/category/editorial",
  "विशेष रूप से चुनिंदा": "/category/featured",
  "विशेष लेख और विचार": "/category/opinion",
  "विचार": "/category/opinion",
  "विशेष": "/category/featured",
  "विशेष रिपोर्ट": "/category/featured",
  "खास रिपोर्ट": "/category/featured",
  "मौसम": "/weather",
  "मौसम पूर्वानुमान": "/weather",
  "विस्तृत पूर्वानुमान": "/weather",
  "फोटो गैलरी": "/gallery",
  "गैलरी": "/gallery",
  "वीडियो": "/videos",
  "शॉर्ट्स": "/shorts",
  "ई-पेपर": "/e-paper",
  "लोकल न्यूज़": "/city",
  "कामगार टाइम्स": "/category/labor",
  "व्यापार": "/category/economy",
};

/** Resolves a section label (e.g. "क्रीडा", "ताज़ा ख़बरें", "ट्रेंडिंग") to its proper route. */
export function categoryHref(label: string): string {
  if (!label) return "/category/latest";
  const trimmed = label.trim();
  if (SECTION_TITLE_MAP[trimmed]) {
    return SECTION_TITLE_MAP[trimmed];
  }
  const match = categories.find((category) => category.label === trimmed);
  return `/category/${match?.slug ?? "latest"}`;
}

