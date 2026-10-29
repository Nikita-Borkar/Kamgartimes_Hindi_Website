import type { AdSlot } from "./types";

/** Every ad on the page. `variant` maps to a height in AdSlot's CSS module. */
export type AdVariant =
  | "leaderboard"
  | "rail"
  | "billboard"
  | "tower"
  | "content"
  | "articleInside";

export type Ad = AdSlot & { variant: AdVariant };

const heroCreative = "/img/hero-ads.png";
const sectionCreative = "/img/section-ads.png";
const gridCreative = "/img/gird-ads.png";
const trendingCreative = "/img/trending-ads.png";

export const heroAds: Ad[] = [
  {
    id: "hero-1",
    label: "विज्ञापन",
    headline: "दीपावली महोत्सव · खरीदारी पर ५०% तक विशेष छूट",
    image: heroCreative,
    href: "#",
    variant: "billboard",
  },
  {
    id: "hero-2",
    label: "विज्ञापन",
    headline: "नवीनतम स्वास्थ्य बीमा योजना · विश्वस्तरीय सुरक्षा कवच",
    image: heroCreative,
    href: "#",
    variant: "billboard",
  },
  {
    id: "hero-3",
    label: "विज्ञापन",
    headline: "रविवार विशेष शिक्षा विशेषांक · स्कूल व कॉलेजों के लिए उपयोगी",
    image: heroCreative,
    href: "#",
    variant: "billboard",
  },
  {
    id: "hero-4",
    label: "विज्ञापन",
    headline: "त्योहारी सीज़न के नए कलेक्शन में से चुनें अपनी पसंद",
    image: heroCreative,
    href: "#",
    variant: "billboard",
  },
];

export const railAd: Ad = {
  id: "rail-1",
  label: "विज्ञापन",
  image: trendingCreative,
  href: "#",
  variant: "rail",
};

export const leaderboardAds: Ad[] = [
  {
    id: "lb-1",
    label: "विज्ञापन",
    headline: "कामगार टाइम्स पर अपना विज्ञापन दें · लाखों पाठकों तक सीधी पहुँच",
    image: sectionCreative,
    href: "/advertise",
    variant: "leaderboard",
  },
  {
    id: "lb-2",
    label: "विज्ञापन",
    headline: "व्यापार और सेवाओं के प्रचार के लिए कामगार टाइम्स · विशेष पैकेज उपलब्ध",
    image: sectionCreative,
    href: "/advertise",
    variant: "leaderboard",
  },
  {
    id: "lb-3",
    label: "विज्ञापन",
    headline: "विश्वसनीय व निष्पक्ष हिन्दी पत्रकारिता का सशक्त डिजिटल मंच",
    image: sectionCreative,
    href: "/advertise",
    variant: "leaderboard",
  },
  {
    id: "lb-4",
    label: "विज्ञापन",
    headline: "ई-पेपर और वेबसाइट पर विज्ञापन देने हेतु संपर्क करें: 8055502228",
    image: sectionCreative,
    href: "/advertise",
    variant: "leaderboard",
  },
  {
    id: "lb-5",
    label: "विज्ञापन",
    headline: "कामगार टाइम्स न्यूज़ नेटवर्क · विदर्भ और देश का अग्रणी डिजिटल मंच",
    image: sectionCreative,
    href: "/advertise",
    variant: "leaderboard",
  },
];

/** Tall slot in the lead grid, level with the 420px hero story. */
export const leadRailAd: Ad = {
  id: "lead-rail-1",
  label: "विज्ञापन",
  image: gridCreative,
  href: "#",
  variant: "tower",
};

export const towerAd: Ad = {
  id: "tower-1",
  label: "विज्ञापन",
  image: trendingCreative,
  href: "#",
  variant: "tower",
};

export const weatherPollAds: Ad[] = [
  {
    id: "weather-poll-1",
    label: "विज्ञापन",
    image: "/img/weather-ads.png",
    href: "#",
    variant: "content",
  },
  {
    id: "weather-poll-2",
    label: "विज्ञापन",
    image: "/img/poll-below-ads.png",
    href: "#",
    variant: "content",
  },
];

/** Card-sized sponsored story ad for news grids (fits naturally alongside StoryCards) */
export type CardAd = {
  id: string;
  badge: string;
  category: string;
  headline: string;
  excerpt: string;
  meta: string;
  image: string;
  href: string;
  ctaText: string;
};

export const cardAds: CardAd[] = [
  {
    id: "card-ad-1",
    badge: "प्रायोजित",
    category: "व्यापार व उद्योग प्रचार",
    headline: "कामगार टाइम्स पर अपना विज्ञापन दें · लाखों पाठकों तक सीधी डिजिटल पहुँच",
    excerpt: "अपने व्यवसाय, औद्योगिक सेवाओं और ब्रांड को विदर्भ व महाराष्ट्र के अग्रणी हिंदी पाठक वर्ग तक पहुंचाएं। विशेष रियायती पैकेज उपलब्ध।",
    meta: "विज्ञापन सेवा · आज ही संपर्क करें",
    image: "/img/img07.png",
    href: "/advertise",
    ctaText: "विज्ञापन दरें देखें",
  },
  {
    id: "card-ad-2",
    badge: "विशेष पेशकश",
    category: "डिजिटल मार्केटिंग",
    headline: "ई-पेपर और वेबसाइट पर एक साथ विज्ञापन: प्रिंट व डिजिटल का दोहरा लाभ",
    excerpt: "डेली ई-पेपर संस्करण और 24×7 लाइव न्यूज़ पोर्टल पर प्रीमियम बैनर, आर्टिकल और वीडियो प्रायोजन के किफायती विकल्प।",
    meta: "मार्केटिंग डेस्क · कामगार टाइम्स",
    image: "/img/img05.png",
    href: "/advertise",
    ctaText: "पैकेज जानें",
  },
  {
    id: "card-ad-3",
    badge: "प्रायोजित",
    category: "कॉर्पोरेट कवरेज",
    headline: "संस्थानों व उद्योगों के लिए विशेष ब्रांड कवरेज और डिजिटल विज्ञापन मंच",
    excerpt: "वार्षिक व अर्धवार्षिक अनुबंध पर आकर्षक छूट। अपने प्रतिष्ठान की सफलता गाथा और उपलब्धियों को दें राष्ट्रव्यापी पहचान।",
    meta: "कॉर्पोरेट संबंध · कामगार टाइम्स",
    image: "/img/img08.png",
    href: "/advertise",
    ctaText: "संपर्क करें",
  },
  {
    id: "card-ad-4",
    badge: "स्थानीय प्रचार",
    category: "लोकल बिजनेस बूस्ट",
    headline: "नागपुर, चंद्रपुर और विदर्भ के व्यापारियों के लिए विशेष लोकल प्रमोशन",
    excerpt: "सिटी पेजों पर लक्षित विज्ञापन देकर अपने शहर के ग्राहकों को सीधे अपने व्यवसाय और शोरूम से जोड़ें।",
    meta: "लोकल बिजनेस · सीमित समय ऑफर",
    image: "/img/img10.png",
    href: "/advertise",
    ctaText: "अभी शुरू करें",
  },
];

/** Vertical skyscraper/tower ad for sidebars, rails, and split sections */
export type VerticalTowerAd = {
  id: string;
  badge: string;
  tagline: string;
  headline: string;
  highlights: string[];
  ctaText: string;
  image: string;
  href: string;
  phone: string;
  email: string;
};

export const verticalTowerAds: VerticalTowerAd[] = [
  {
    id: "vert-ad-1",
    badge: "प्रीमियम विज्ञापन",
    tagline: "कामगार टाइम्स मीडिया नेटवर्क",
    headline: "अपने व्यवसाय और ब्रांड को दें विदर्भ व देशव्यापी पहचान",
    highlights: [
      "लाखों सक्रिय पाठक व डिजिटल फॉलोअर्स",
      "वेबसाइट, ई-पेपर व मोबाइल ऐप कवरेज",
      "किफायती व परिणामोन्मुख प्रायोजन प्लान्स",
      "सटीक टारगेटेड लोकल ऑडियंस रीच",
    ],
    ctaText: "विज्ञापन बुक करें",
    image: "/img/img01.png",
    href: "/advertise",
    phone: "8055502228",
    email: "kamgartimes@gmail.com",
  },
  {
    id: "vert-ad-2",
    badge: "विशेष प्रचार",
    tagline: "डिजिटल + प्रिंट ई-पेपर",
    headline: "उद्योग, व्यापार और सेवाओं के त्वरित प्रचार हेतु संपर्क करें",
    highlights: [
      "24×7 लाइव वेबसाइट बैनर डिस्प्ले",
      "दैनिक ई-पेपर के मुख्य पृष्ठ पर स्लॉट",
      "सोशल मीडिया व व्हाट्सएप बुलेटिन रीच",
    ],
    ctaText: "दरें और ऑफर देखें",
    image: "/img/img10.png",
    href: "/pay-for-ads",
    phone: "8055502228",
    email: "kamgartimes@gmail.com",
  },
];

/** In-article native sponsor callout box */
export type ArticleBoxAd = {
  id: string;
  badge: string;
  headline: string;
  excerpt: string;
  ctaText: string;
  image: string;
  href: string;
  phone: string;
};

export const articleBoxAds: ArticleBoxAd[] = [
  {
    id: "box-ad-1",
    badge: "प्रायोजित संदेश · विज्ञापन",
    headline: "कामगार टाइम्स पर अपने व्यवसाय का प्रचार करें और हज़ारों नए ग्राहकों तक पहुंचें",
    excerpt: "वेबसाइट, ई-पेपर और सोशल मीडिया पर विशेष विज्ञापन पैकेजों की विस्तृत जानकारी के लिए आज ही संपर्क करें।",
    ctaText: "विज्ञापन दरें व जानकारी",
    image: "/img/img07.png",
    href: "/advertise",
    phone: "8055502228",
  },
];

