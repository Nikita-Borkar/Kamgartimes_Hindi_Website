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
