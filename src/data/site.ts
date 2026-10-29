export const site = {
  name: "कामगार टाइम्स",
  /** The single glyph inside the crimson brand square. */
  mark: "क",
  tagline:
    "राजनीति, अर्थव्यवस्था, श्रम अधिकार, खेल और संस्कृति पर निष्पक्ष व स्वतंत्र पत्रकारिता.",
  /** Top bar, left of the wordmark. */
  edition: "रविवार, ४ अक्टूबर २०२६",
  editionTime: "सुबह १०:३०",
  language: "हिन्दी",
  description:
    "कामगार टाइम्स — भारत और महाराष्ट्र का विश्वसनीय दैनिक समाचार पत्र एवं डिजिटल पोर्टल. श्रम अधिकार, राजनीति, अर्थव्यवस्था, खेल, मनोरंजन, तकनीक और राष्ट्रीय-अंतरराष्ट्रीय समाचारों का निष्पक्ष मंच.",
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
  {
    label: "होम",
    href: "/",
  },
  {
    label: "कामगार टाइम्स",
    href: "/category/kamgar-times",
    children: [
      { label: "श्रमिक अधिकार", href: "/category/श्रमिक-अधिकार" },
      { label: "युनियन न्यूज", href: "/category/युनियन-न्यूज" },
      { label: "वेतन व भत्ते", href: "/category/वेतन-व-भत्ते" },
      { label: "श्रम कानून व नियम", href: "/category/श्रम-कानून-व-नियम" },
      { label: "पत्रकार / प्रतिनिधि नियुक्ति", href: "/join-us" },
    ],
  },
  {
    label: "लोकल न्यूज़",
    href: "/category/लोकल-न्यूज़",
    children: [
      { label: "नागपुर", href: "/city/नागपुर" },
      { label: "चंद्रपुर", href: "/city/चंद्रपुर" },
      { label: "अमरावती", href: "/city/अमरावती" },
      { label: "वर्धा", href: "/city/वर्धा" },
    ],
  },
  {
    label: "ताज़ा खबरें",
    href: "/category/ताज़ा-खबरें",
    children: [
      { label: "ताज़ा घटनाक्रम", href: "/category/ताज़ा-घटनाक्रम" },
      { label: "महाराष्ट्र", href: "/category/महाराष्ट्र" },
      { label: "देश", href: "/category/देश" },
      { label: "विदेश", href: "/category/विदेश" },
    ],
  },
  {
    label: "अपराध",
    href: "/category/अपराध",
  },
  {
    label: "संपादकीय",
    href: "/category/संपादकीय",
    children: [{ label: "विचार", href: "/category/vichar" }],
  },
  {
    label: "विशेष रिपोर्ट",
    href: "/category/विशेष-रिपोर्ट",
    children: [{ label: "खास रिपोर्ट", href: "/category/खाs" }],
  },
  {
    label: "सरकारी नौकरी",
    href: "/category/सरकारी-नौकरी",
    children: [
      { label: "MPSC", href: "/category/mpsc" },
      { label: "UPSC", href: "/category/upsc" },
    ],
  },
  {
    label: "मनोरंजन",
    href: "/category/मनोरंजन",
    children: [
      { label: "बॉलीवुड", href: "/category/बॉलीवुड" },
      { label: "सिनेमा", href: "/category/सिनेमा" },
      { label: "ओटीटी", href: "/category/ओटीटी" },
    ],
  },
  {
    label: "राजनीति",
    href: "/category/राजनीति",
    children: [
      { label: "महाराष्ट्र राजनीति", href: "/category/महाराष्ट्र-राजनीति" },
      { label: "राष्ट्रीय राजनीति", href: "/category/राष्ट्रीय-राजनीति" },
      { label: "चुनाव विशेष", href: "/category/चुनाव-विशेष" },
    ],
  },
  {
    label: "खेल",
    href: "/category/खेल",
    children: [
      { label: "क्रिकेट", href: "/category/क्रिकेट" },
      { label: "फुटबॉल", href: "/category/फुटबॉल" },
    ],
  },
  {
    label: "व्यापार",
    href: "/category/व्यापार",
    children: [{ label: "शेयर बाज़ार", href: "/category/शेयर-बाज़ार" }],
  },
  {
    label: "ब्रह्मांड",
    href: "/category/ब्रह्मांड",
    children: [
      { label: "अंतरिक्ष", href: "/category/अंतरिक्ष" },
      { label: "खगोल", href: "/category/खगोल" },
      { label: "विज्ञान", href: "/category/विज्ञान" },
    ],
  },
  { label: "ई-पेपर", href: "/e-paper" },
];

/* Section slugs → Hindi label articles are tagged with. Drives both the
   /category/[slug] routes and generateStaticParams for them. */
export const categories: { slug: string; label: string }[] = [
  { slug: "world", label: "विदेश" },
  { slug: "maharashtra", label: "महाराष्ट्र" },
  { slug: "politics", label: "राजनीति" },
  { slug: "economy", label: "व्यापार" },
  { slug: "sports", label: "खेल" },
  { slug: "cricket", label: "क्रिकेट" },
  { slug: "football", label: "फुटबॉल" },
  { slug: "hockey", label: "हॉकी" },
  { slug: "entertainment", label: "मनोरंजन" },
  { slug: "cinema", label: "सिनेमा" },
  { slug: "music", label: "संगीत" },
  { slug: "ott", label: "ओटीटी" },
  { slug: "technology", label: "तकनीक" },
  { slug: "health", label: "स्वास्थ्य" },
  { slug: "education", label: "शिक्षा" },
  { slug: "opinion", label: "विचार" },
  { slug: "culture", label: "संस्कृति" },
  { slug: "videos", label: "वीडियो" },
  { slug: "labor", label: "कामगार टाइम्स" },
  { slug: "labor-rights", label: "श्रमिक अधिकार" },
  { slug: "labor-union", label: "यूनियन न्यूज़" },
  { slug: "wages", label: "वेतन व भत्ते" },
  { slug: "labor-laws", label: "श्रम कानून व नियम" },
  { slug: "latest", label: "ताज़ा ख़बरें" },
  { slug: "trending", label: "ट्रेंडिंग" },
  { slug: "breaking", label: "ताज़ा घटनाक्रम" },
  { slug: "national", label: "देश" },
  { slug: "crime", label: "अपराध" },
  { slug: "police-action", label: "पुलिस कार्रवाई" },
  { slug: "cyber-crime", label: "साइबर अपराध" },
  { slug: "court-news", label: "अदालती फ़ैसले" },
  { slug: "investigation", label: "विशेष जांच" },
  { slug: "editorial", label: "संपादकीय" },
  { slug: "editorial-article", label: "संपादकीय लेख" },
  { slug: "manthan", label: "मंथन" },
  { slug: "readers-view", label: "पाठकों की राय" },
  { slug: "featured", label: "विशेष रिपोर्ट" },
  { slug: "special-report", label: "खास रिपोर्ट" },
  { slug: "story-of-day", label: "स्टोरी ऑफ द डे" },
  { slug: "interview", label: "विशेष साक्षात्कार" },
  { slug: "jobs", label: "सरकारी नौकरी" },
  { slug: "mpsc-upsc", label: "UPSC / राज्य PSC भर्ती" },
  { slug: "police-jobs", label: "पुलिस भर्ती" },
  { slug: "railway-jobs", label: "रेलवे भर्ती" },
  { slug: "bank-jobs", label: "बैंकिंग भर्ती" },
  { slug: "bollywood", label: "बॉलीवुड" },
  { slug: "marathi-cinema", label: "क्षेत्रीय सिनेमा" },
  { slug: "tv-shows", label: "टीवी शो" },
  { slug: "maharashtra-politics", label: "महाराष्ट्र राजनीति" },
  { slug: "national-politics", label: "राष्ट्रीय राजनीति" },
  { slug: "election", label: "चुनाव विशेष" },
  { slug: "ipl", label: "आईपीएल" },
  { slug: "kabaddi", label: "कबड्डी" },
  { slug: "space", label: "ब्रह्मांड" },
  { slug: "astronomy", label: "खगोल विज्ञान" },
  { slug: "space-missions", label: "अंतरिक्ष अभियान" },
  { slug: "science", label: "रोचक विज्ञान" },
  { slug: "city", label: "लोकल न्यूज़" },
];

export const socialLinks = [
  { id: "whatsapp", label: "व्हाट्सएप", short: "wa", href: "#" },
  { id: "facebook", label: "फेसबुक", short: "fb", href: "#" },
  { id: "youtube", label: "यूट्यूब", short: "yt", href: "#" },
  { id: "instagram", label: "इंस्टाग्राम", short: "ig", href: "#" },
  { id: "x", label: "एक्स", short: "X", href: "#" },
] as const;

export const breakingNews = [
  {
    label: "ताज़ा ख़बर",
    text: "राज्य सरकार द्वारा नए मेट्रो कॉरिडोर की घोषणा; आगामी तिमाही में कार्य शुरू होगा",
    href: "/category/latest",
  },
  {
    label: "ताज़ा ख़बर",
    text: "मुंबई और तटीय इलाकों में भारी बारिश का अलर्ट; प्रशासन पूरी तरह सतर्क",
    href: "/category/maharashtra",
  },
  {
    label: "ताज़ा ख़बर",
    text: "राज्य में नई औद्योगिक व श्रमिक कल्याण नीति को कैबिनेट की हरी झंडी",
    href: "/category/labor",
  },
] as const;

/* Rolling notice shown in the bar pinned to the bottom of the homepage. */
export const notice = {
  label: "सूचना",
  text: "",
} as const;

export const footer = {
  sections: [
    {
      title: "कंपनी",
    },
  ],
  sectionLinks: [
    "होम",
    "राजनीति",
    "मनोरंजन",
    "शिक्षा",
    "महाराष्ट्र",
    "व्यापार",
    "तकनीक",
    "विदेश",
    "खेल",
    "स्वास्थ्य",
    "ई-पेपर",
  ],
  actions: [
    { label: "पत्रकार बनें (Join as Reporter)", href: "/join-us" },
    { label: "सहयोग करें (Donate Us)", href: "/donate" },
    { label: "विज्ञापन दें (Advertise)", href: "/advertise" },
  ],
  stores: ["App Store", "Google Play"],
  copyright: "© २०२६ कामगार टाइम्स. सर्वाधिकार सुरक्षित.",
} as const;
