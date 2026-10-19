export type EpaperEdition = {
  id: string;
  /** Shown in the reader toolbar and on the archive row, e.g. the issue date. */
  label: string;
  /** Also the date line on the cover block. */
  date: string;
  /** Public path of the PDF under /public/pdf. */
  file: string;
  /** Human file size for the archive row and cover. */
  size: string;
  blurb: string;
};

/* ---------------------------------------------------------------------------
   संस्करण सूची — one row per published PDF. The newest sits on top and is the
   "आज का संस्करण" on /e-paper. Adding an issue is one PDF drop + one row here.
   ------------------------------------------------------------------------- */
export const epaperEditions: EpaperEdition[] = [
  {
    id: "7",
    label: "रविवार, ४ अक्टूबर २०२६",
    date: "रविवार · ४ अक्टूबर २०२६",
    file: "/pdf/7.pdf",
    size: "४.० MB",
    blurb: "आज का संपूर्ण संस्करण एक ही डिजिटल PDF में उपलब्ध.",
  },
];

export const latestEdition = epaperEditions[0];