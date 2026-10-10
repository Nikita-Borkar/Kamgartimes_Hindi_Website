export type Article = {
  id: string;
  image: string;
  category: string;
  headline: string;
  excerpt?: string;
  /** Wire-time metadata, e.g. "वृत्तसेवा · ५ तासांपूर्वी" */
  meta: string;
};

export type VideoItem = {
  id: string;
  image: string;
  duration: string;
  title: string;
  meta: string;
};

export type AdSlot = {
  id: string;
  label: string;
  headline?: string;
  image: string;
  href: string;
};

export type GalleryItem = {
  id: string;
  image: string;
  category: string;
  headline: string;
};

/* ---------- Reading page (article body, engagement, comments) ------------- */

export type ArticleSection = {
  /** Anchor id; also the scroll-spy target for the section rail. */
  id: string;
  heading: string;
  paragraphs: string[];
  /** Optional bullet list under the paragraphs. */
  points?: string[];
};

export type ArticleComment = {
  id: string;
  name: string;
  time: string;
  text: string;
  likes: number;
};

export type ArticleBody = {
  /** Standfirst paragraphs printed under the lede. */
  intro: string[];
  /** "मुख्य मुद्दे" summary shown above the body. */
  keyPoints: string[];
  sections: ArticleSection[];
  tags: string[];
  author: { name: string; role: string };
  published: string;
  updated?: string;
  readTime: string;
  stats: { likes: number; dislikes: number; comments: number; shares: number };
  comments: ArticleComment[];
};

export type GalleryPhoto = {
  id: string;
  image: string;
  caption: string;
};

/* ---------- Internal / utility pages (about, contact, legal) ------------ */

export type InfoFact = {
  label: string;
  value: string;
};

export type InfoContact = {
  id: string;
  label: string;
  value: string;
  href?: string;
};

export type InfoSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type InfoSignature = {
  name: string;
  role: string;
  organisation: string;
};

export type InfoPageData = {
  /** Route slug, e.g. "about" maps to /about. */
  slug: string;
  /** Short label used in the breadcrumb trail. */
  eyebrow: string;
  title: string;
  updated: string;
  /** Serif lede under the banner, max ~62ch. */
  lede: string;
  intro?: string[];
  facts?: { title: string; items: InfoFact[] };
  contacts?: InfoContact[];
  sections: InfoSection[];
  note?: string;
  /** Optional editorial sign-off printed at the foot of the page. */
  signature?: InfoSignature;
};

/* ---------- Donate page ------------------------------------------------- */

export type BankDetailsBlock = {
  title: string;
  items: { label: string; value: string }[];
};

export type DonatePageData = Omit<InfoPageData, "intro" | "sections" | "note"> & {
  qr: { src: string; alt: string; caption: string; upi: string };
  intro: string[];
  sections: InfoSection[];
  facts: { title: string; items: InfoFact[] };
  bank: BankDetailsBlock;
  note: string;
};

/* ---------- Advertise page ---------------------------------------------- */

export type AdvertisePageData = {
  slug: string;
  eyebrow: string;
  title: string;
  /** Marketing pitch rendered alongside the enquiry form. */
  promo: {
    heading: string;
    body: string;
    lines: string[];
    closing: string;
    sizes: string[];
  };
  /** Bank account block shown with the payment call-to-action. */
  bank: BankDetailsBlock;
  /** Label for the payment button. */
  payNow: string;
};

/* ---------- Auth pages (login / register) -------------------------------- */

export type AuthPageData = {
  slug: string;
  eyebrow: string;
  title: string;
  lede: string;
};
