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
  {
    label: "होम",
    href: "/",
    children: [
      { label: "मुख्य बातमी", href: "/#lead-news" },
      { label: "ताजी अपडेट्स", href: "/#latest-news" },
      { label: "ट्रेंडिंग", href: "/#trending" },
    ],
  },
  {
    label: "कामगार टाइम्स",
    href: "/category/labor",
    children: [
      { label: "कामगार हक्क", href: "/category/labor-rights" },
      { label: "युनियन न्यूज", href: "/category/labor-union" },
      { label: "वेतन व भत्ते", href: "/category/wages" },
      { label: "कायदे व नियम", href: "/category/labor-laws" },
    ],
  },
  {
    label: "लोकल न्यूज़",
    href: "/city",
    children: [
      { label: "नागपूर शहर", href: "/city/nagpur" },
      { label: "चंद्रपूर", href: "/city/chandrapur" },
      { label: "वर्धा", href: "/city/wardha" },
      { label: "अमरावती", href: "/city/amravati" },
      { label: "गोंदिया", href: "/city/gondia" },
    ],
  },
  {
    label: "लेटेस्ट न्युज",
    href: "/category/latest",
    children: [
      { label: "ताजी घडामोडी", href: "/category/breaking" },
      { label: "महाराष्ट्र", href: "/category/maharashtra" },
      { label: "देश", href: "/category/national" },
      { label: "आंतरराष्ट्रीय", href: "/category/world" },
    ],
  },
  {
    label: "गुन्हेवार्ता",
    href: "/category/crime",
    children: [
      { label: "पोलीस कारवाई", href: "/category/police-action" },
      { label: "सायबर गुन्हे", href: "/category/cyber-crime" },
      { label: "न्यायालयीन निकाल", href: "/category/court-news" },
      { label: "विशेष तपास", href: "/category/investigation" },
    ],
  },
  {
    label: "संपादकीय",
    href: "/category/editorial",
    children: [
      { label: "अग्रलेख", href: "/category/editorial-article" },
      { label: "मंथन", href: "/category/manthan" },
      { label: "विचारपीठ", href: "/category/opinion" },
      { label: "वाचकांचे मत", href: "/category/readers-view" },
    ],
  },
  {
    label: "लक्षवेधी",
    href: "/category/featured",
    children: [
      { label: "विशेष रिपोर्ट", href: "/category/special-report" },
      { label: "स्टोरी ऑफ द डे", href: "/category/story-of-day" },
      { label: "खास मुलाखत", href: "/category/interview" },
    ],
  },
  {
    label: "सरकारी नोकरी",
    href: "/category/jobs",
    children: [
      { label: "MPSC / UPSC भरती", href: "/category/mpsc-upsc" },
      { label: "पोलीस भरती", href: "/category/police-jobs" },
      { label: "रेल्वे भरती", href: "/category/railway-jobs" },
      { label: "बँकिंग भरती", href: "/category/bank-jobs" },
    ],
  },
  {
    label: "मनोरंजन",
    href: "/category/entertainment",
    children: [
      { label: "बॉलिवूड", href: "/category/bollywood" },
      { label: "मराठी चित्रपट", href: "/category/marathi-cinema" },
      { label: "ओटीटी", href: "/category/ott" },
      { label: "टीव्ही मालिका", href: "/category/tv-shows" },
    ],
  },
  {
    label: "राजनीती",
    href: "/category/politics",
    children: [
      { label: "महाराष्ट्र राजकारण", href: "/category/maharashtra-politics" },
      { label: "राष्ट्रीय राजकारण", href: "/category/national-politics" },
      { label: "निवडणूक विशेष", href: "/category/election" },
    ],
  },
  {
    label: "क्रीडा",
    href: "/category/sports",
    children: [
      { label: "क्रिकेट", href: "/category/cricket" },
      { label: "आयपीएल", href: "/category/ipl" },
      { label: "फुटबॉल", href: "/category/football" },
      { label: "कबड्डी", href: "/category/kabaddi" },
    ],
  },
  {
    label: "ब्रह्मांड",
    href: "/category/space",
    children: [
      { label: "खगोलशास्त्र", href: "/category/astronomy" },
      { label: "अंतराळ मोहीम", href: "/category/space-missions" },
      { label: "रहस्यमय विज्ञान", href: "/category/science" },
    ],
  },
  { label: "ई-पेपर", href: "/e-paper" },
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
  { slug: "labor", label: "कामगार टाइम्स" },
  { slug: "labor-rights", label: "कामगार हक्क" },
  { slug: "labor-union", label: "युनियन न्यूज" },
  { slug: "wages", label: "वेतन व भत्ते" },
  { slug: "labor-laws", label: "कायदे व नियम" },
  { slug: "latest", label: "लेटेस्ट न्युज" },
  { slug: "breaking", label: "ताजी घडामोडी" },
  { slug: "national", label: "देश" },
  { slug: "crime", label: "गुन्हेवार्ता" },
  { slug: "police-action", label: "पोलीस कारवाई" },
  { slug: "cyber-crime", label: "सायबर गुन्हे" },
  { slug: "court-news", label: "न्यायालयीन निकाल" },
  { slug: "investigation", label: "विशेष तपास" },
  { slug: "editorial", label: "संपादकीय" },
  { slug: "editorial-article", label: "अग्रलेख" },
  { slug: "manthan", label: "मंथन" },
  { slug: "readers-view", label: "वाचकांचे मत" },
  { slug: "featured", label: "लक्षवेधी" },
  { slug: "special-report", label: "विशेष रिपोर्ट" },
  { slug: "story-of-day", label: "स्टोरी ऑफ द डे" },
  { slug: "interview", label: "खास मुलाखत" },
  { slug: "jobs", label: "सरकारी नोकरी" },
  { slug: "mpsc-upsc", label: "MPSC / UPSC भरती" },
  { slug: "police-jobs", label: "पोलीस भरती" },
  { slug: "railway-jobs", label: "रेल्वे भरती" },
  { slug: "bank-jobs", label: "बँकिंग भरती" },
  { slug: "bollywood", label: "बॉलिवूड" },
  { slug: "marathi-cinema", label: "मराठी चित्रपट" },
  { slug: "tv-shows", label: "टीव्ही मालिका" },
  { slug: "maharashtra-politics", label: "महाराष्ट्र राजकारण" },
  { slug: "national-politics", label: "राष्ट्रीय राजकारण" },
  { slug: "election", label: "निवडणूक विशेष" },
  { slug: "ipl", label: "आयपीएल" },
  { slug: "kabaddi", label: "कबड्डी" },
  { slug: "space", label: "ब्रह्मांड" },
  { slug: "astronomy", label: "खगोलशास्त्र" },
  { slug: "space-missions", label: "अंतराळ मोहीम" },
  { slug: "science", label: "रहस्यमय विज्ञान" },
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
    "ई-पेपर",
  ],
  actions: [
    { label: "Donet Us", href: "/donate" },
    { label: "Pay for Advertisement", href: "/advertise" },
  ],
  stores: ["App Store", "Google Play"],
  copyright: "© २०२६ दैनिक पल्स. सर्व हक्क राखीव.",
} as const;
