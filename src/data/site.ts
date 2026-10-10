export const site = {
  name: "कामगार टाइम्स",
  /** The single glyph inside the crimson brand square. */
  mark: "प",
  tagline: "राजकारण, अर्थ, क्रीडा आणि संस्कृतीवरील स्वतंत्र वार्तांकन.",
  /** Top bar, left of the wordmark. */
  edition: "रविवार, ४ ऑक्टोबर २०२६",
  editionTime: "सकाळी १०:३०",
  language: "मराठी",
  description:
    "दैनिक पल्स — महाराष्ट्र, राजकारण, अर्थ, क्रीडा, मनोरंजन, तंत्रज्ञान आणि आरोग्य या विषयांवरील स्वतंत्र मराठी वृत्तपत्र.",
} as const;

/* ---------------------------------------------------------------------------
   Navigation. The header nav is data-driven: an admin can add any number of
   top-level items and, optionally, a sub-nav of child links. Every item points
   at a real route — top-level links open /category/[slug] pages, which renders
   the articles tagged with that section's label (see data/news.ts).
   ------------------------------------------------------------------------- */
export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export const navItems: NavItem[] = [
  { label: "मुख्यपृष्ठ", href: "/" },
  { label: "जग", href: "/category/world" },
  { label: "महाराष्ट्र", href: "/category/maharashtra" },
  { label: "राजकारण", href: "/category/politics" },
  { label: "अर्थ", href: "/category/economy" },
  {
    label: "क्रीडा",
    href: "/category/sports",
    children: [
      { label: "क्रिकेट", href: "/category/cricket" },
      { label: "फुटबॉल", href: "/category/football" },
      { label: "हॉकी", href: "/category/hockey" },
    ],
  },
  {
    label: "मनोरंजन",
    href: "/category/entertainment",
    children: [
      { label: "सिनेमा", href: "/category/cinema" },
      { label: "संगीत", href: "/category/music" },
      { label: "ओटीटी", href: "/category/ott" },
    ],
  },
  { label: "तंत्रज्ञान", href: "/category/technology" },
  { label: "E-Paper", href: "/category/e-paper" },
  { label: "आरोग्य", href: "/category/health" },
  { label: "शिक्षण", href: "/category/education" },
  { label: "विचार", href: "/category/opinion" },
  { label: "व्हिडिओ", href: "/videos" },
  { label: "शॉर्ट्स", href: "/shorts" },
  { label: "फोटो", href: "/gallery" },
];

/* Section slugs → the Marathi label articles are tagged with. Drives both the
   /category/[slug] routes and generateStaticParams for them. */
export const categories: { slug: string; label: string }[] = [
  { slug: "world", label: "जग" },
  { slug: "maharashtra", label: "महाराष्ट्र" },
  { slug: "politics", label: "राजकारण" },
  { slug: "economy", label: "अर्थ" },
  { slug: "sports", label: "क्रीडा" },
  { slug: "cricket", label: "क्रिकेट" },
  { slug: "football", label: "फुटबॉल" },
  { slug: "hockey", label: "हॉकी" },
  { slug: "entertainment", label: "मनोरंजन" },
  { slug: "cinema", label: "सिनेमा" },
  { slug: "music", label: "संगीत" },
  { slug: "ott", label: "ओटीटी" },
  { slug: "technology", label: "तंत्रज्ञान" },
  { slug: "health", label: "आरोग्य" },
  { slug: "education", label: "शिक्षण" },
  { slug: "opinion", label: "विचार" },
  { slug: "culture", label: "संस्कृती" },
  { slug: "videos", label: "व्हिडिओ" },
];

export const socialLinks = [
  { id: "whatsapp", label: "व्हॉट्सॲप", short: "f", href: "#" },
  { id: "facebook", label: "फेसबुक", short: "f", href: "#" },
  { id: "youtube", label: "यूट्यूब", short: "▶", href: "#" },
  { id: "instagram", label: "इन्स्टाग्राम", short: "ig", href: "#" },
  { id: "x", label: "एक्स", short: "X", href: "#" },
] as const;

export const breakingNews = [
  {
    label: "ताजी बातमी",
    text: "राज्य सरकारकडून नव्या मेट्रो मार्गाची घोषणा; पुढील तिमाहीत कामाला सुरुवात",
    href: "#",
  },
  {
    label: "ताजी बातमी",
    text: "मुंबईत पावसाचा इशारा; काही भागांत पाणी साचले",
    href: "#",
  },
  {
    label: "ताजी बातमी",
    text: "राज्यात नव्या औद्योगिक धोरणाला मंत्रिमंडळाची मंजुरी",
    href: "#",
  },
] as const;

/* Rolling notice shown in the bar pinned to the bottom of the homepage. */
export const notice = {
  label: "सूचना",
  text: "जाहिरात देण्यासाठी आम्हाला contact@kamgartimes.com वर संपर्क करा किंवा 8055502228 वर कॉल करा.",
} as const;

/* The four internal utility pages. Single source for the footer "कंपनी"
   column and the cross-links shown at the base of each utility page. */
export const companyLinks = [
  { label: "आमच्याबद्दल", href: "/about" },
  { label: "संपर्क", href: "/contact" },
  { label: "अस्वीकरण", href: "/disclaimer" },
  { label: "गोपनीयता धोरण", href: "/privacy" },
] as const;

export const footer = {
  sections: [
    {
      title: "कंपनी",
      links: companyLinks,
    },
  ],
  sectionLinks: [
    "मुख्यपृष्ठ",
    "राजकारण",
    "मनोरंजन",
    "शिक्षण",
    "महाराष्ट्र",
    "अर्थ",
    "तंत्रज्ञान",
    "जग",
    "क्रीडा",
    "आरोग्य",
  ],
  actions: [
    { label: "Donet Us", href: "/donate" },
    { label: "Pay for Advertisement", href: "/advertise" },
  ],
  stores: ["App Store", "Google Play"],
  copyright: "© २०२६ दैनिक पल्स. सर्व हक्क राखीव.",
} as const;
