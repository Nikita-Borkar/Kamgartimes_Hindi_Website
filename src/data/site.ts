export const site = {
  name: "कामगार टाइम्स",
  /** The single glyph inside the crimson brand square. */
  mark: "क",
  tagline: "राजनीति, अर्थव्यवस्था, श्रम अधिकार, खेल और संस्कृति पर निष्पक्ष व स्वतंत्र पत्रकारिता.",
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
    children: [
      { label: "मुख्य समाचार", href: "/#lead-news" },
      { label: "ताज़ा अपडेट्स", href: "/#latest-news" },
      { label: "ट्रेंडिंग", href: "/#trending" },
    ],
  },
  {
    label: "कामगार टाइम्स",
    href: "/category/labor",
    children: [
      { label: "श्रमिक अधिकार", href: "/category/labor-rights" },
      { label: "यूनियन न्यूज़", href: "/category/labor-union" },
      { label: "वेतन व भत्ते", href: "/category/wages" },
      { label: "श्रम कानून व नियम", href: "/category/labor-laws" },
      { label: "पत्रकार / प्रतिनिधी नियुक्ती", href: "/join-us" },
    ],
  },
  {
    label: "लोकल न्यूज़",
    href: "/city",
    children: [
      { label: "नागपुर शहर", href: "/city/nagpur" },
      { label: "चंद्रपुर", href: "/city/chandrapur" },
      { label: "वर्धा", href: "/city/wardha" },
      { label: "अमरावती", href: "/city/amravati" },
      { label: "गोंदिया", href: "/city/gondia" },
    ],
  },
  {
    label: "ताज़ा ख़बरें",
    href: "/category/latest",
    children: [
      { label: "ताज़ा घटनाक्रम", href: "/category/breaking" },
      { label: "महाराष्ट्र", href: "/category/maharashtra" },
      { label: "देश", href: "/category/national" },
      { label: "विदेश", href: "/category/world" },
    ],
  },
  {
    label: "अपराध",
    href: "/category/crime",
    children: [
      { label: "पुलिस कार्रवाई", href: "/category/police-action" },
      { label: "साइबर अपराध", href: "/category/cyber-crime" },
      { label: "अदालती फ़ैसले", href: "/category/court-news" },
      { label: "विशेष जांच", href: "/category/investigation" },
    ],
  },
  {
    label: "संपादकीय",
    href: "/category/editorial",
    children: [
      { label: "संपादकीय लेख", href: "/category/editorial-article" },
      { label: "मंथन", href: "/category/manthan" },
      { label: "विचार", href: "/category/opinion" },
      { label: "पाठकों की राय", href: "/category/readers-view" },
    ],
  },
  {
    label: "विशेष रिपोर्ट",
    href: "/category/featured",
    children: [
      { label: "खास रिपोर्ट", href: "/category/special-report" },
      { label: "स्टोरी ऑफ द डे", href: "/category/story-of-day" },
      { label: "विशेष साक्षात्कार", href: "/category/interview" },
    ],
  },
  {
    label: "सरकारी नौकरी",
    href: "/category/jobs",
    children: [
      { label: "UPSC / राज्य PSC भर्ती", href: "/category/mpsc-upsc" },
      { label: "पुलिस भर्ती", href: "/category/police-jobs" },
      { label: "रेलवे भर्ती", href: "/category/railway-jobs" },
      { label: "बैंकिंग भर्ती", href: "/category/bank-jobs" },
    ],
  },
  {
    label: "मनोरंजन",
    href: "/category/entertainment",
    children: [
      { label: "बॉलीवुड", href: "/category/bollywood" },
      { label: "सिनेमा", href: "/category/cinema" },
      { label: "ओटीटी", href: "/category/ott" },
      { label: "टीवी शो", href: "/category/tv-shows" },
    ],
  },
  {
    label: "राजनीति",
    href: "/category/politics",
    children: [
      { label: "महाराष्ट्र राजनीति", href: "/category/maharashtra-politics" },
      { label: "राष्ट्रीय राजनीति", href: "/category/national-politics" },
      { label: "चुनाव विशेष", href: "/category/election" },
    ],
  },
  {
    label: "खेल",
    href: "/category/sports",
    children: [
      { label: "क्रिकेट", href: "/category/cricket" },
      { label: "आईपीएल", href: "/category/ipl" },
      { label: "फुटबॉल", href: "/category/football" },
      { label: "कबड्डी", href: "/category/kabaddi" },
    ],
  },
  {
    label: "ब्रह्मांड",
    href: "/category/space",
    children: [
      { label: "खगोल विज्ञान", href: "/category/astronomy" },
      { label: "अंतरिक्ष अभियान", href: "/category/space-missions" },
      { label: "रोचक विज्ञान", href: "/category/science" },
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
  text: "कामगार टाइम्स महाराष्ट्र राज्य पत्रकार / प्रतिनिधी नियुक्ती अर्ज 2026-2027 सुरू (ऑनलाइन अर्ज भरें) • विज्ञापन देने के लिए संपर्क करें: 8055502228",
} as const;

/* The four internal utility pages. Single source for the footer "कंपनी"
   column and the cross-links shown at the base of each utility page. */
export const companyLinks = [
  { label: "हमारे बारे में", href: "/about" },
  { label: "पत्रकार भर्ती 2026-27", href: "/join-us" },
  { label: "संपर्क करें", href: "/contact" },
  { label: "अस्वीकरण", href: "/disclaimer" },
  { label: "गोपनीयता नीति", href: "/privacy" },
] as const;

export const footer = {
  sections: [
    {
      title: "कंपनी",
      links: companyLinks,
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
