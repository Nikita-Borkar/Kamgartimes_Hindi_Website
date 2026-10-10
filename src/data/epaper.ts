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
   आवृत्त्या — one row per published PDF. The newest sits on top and is the
   "आजची आवृत्ती" on /e-paper. Adding an issue is one PDF drop + one row here.
   ------------------------------------------------------------------------- */
export const epaperEditions: EpaperEdition[] = [
  {
    id: "7",
    label: "रविवार, ४ ऑक्टोबर २०२६",
    date: "रविवार · ४ ऑक्टोबर २०२६",
    file: "/pdf/7.pdf",
    size: "४.० MB",
    blurb: "आजची संपूर्ण आवृत्ती एकाच PDF मध्ये.",
  },
];

export const latestEdition = epaperEditions[0];