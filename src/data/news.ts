import type { Article, GalleryItem, VideoItem } from "./types";

/* ---------------------------------------------------------------------------
   Lead grid: ad rail, hero overlay story, two stacked overlays.
   The hero is the one story allowed the largest headline on the page.
   ------------------------------------------------------------------------- */
export const leadStory: Article = {
  id: "lead-1",
  image: "/img/img01.png",
  category: "राजकारण",
  headline: "निवडणूक सुधारणा समितीवर सत्ताधारी व विरोधकांचे दुर्मिळ एकमत",
  meta: "४ तासांपूर्वी",
};

export const leadStack: Article[] = [
  {
    id: "lead-2",
    image: "/img/img02.png",
    category: "अर्थ",
    headline: "सेन्सेक्सचा विक्रमी उच्चांक; बँकिंग व आयटी शेअर्सची आघाडी",
    meta: "५ तासांपूर्वी",
  },
  {
    id: "lead-3",
    image: "/img/img03.png",
    category: "क्रीडा",
    headline: "अखेरच्या क्षणी गोल; यजमान संघ गुणतालिकेत अव्वल",
    meta: "६ तासांपूर्वी",
  },
];

/* ---------------------------------------------------------------------------
   Four-up tile row under the lead grid.
   ------------------------------------------------------------------------- */
export const tiles: Article[] = [
  {
    id: "tile-1",
    image: "/img/img04.png",
    category: "तंत्रज्ञान",
    headline: "पहिल्या स्वदेशी एआय चिपचे उत्पादन सुरू",
    meta: "१ तासापूर्वी",
  },
  {
    id: "tile-2",
    image: "/img/img05.png",
    category: "आरोग्य",
    headline: "फ्लूचे रुग्ण वाढले; लवकर तपासणीचे आवाहन",
    meta: "२ तासांपूर्वी",
  },
  {
    id: "tile-3",
    image: "/img/img06.jpg",
    category: "मनोरंजन",
    headline: "सणासुदीत तीन चित्रपटांची बॉक्स ऑफिसवर बाजी",
    meta: "३ तासांपूर्वी",
  },
  {
    id: "tile-4",
    image: "/img/img07.png",
    category: "शिक्षण",
    headline: "विद्यापीठांत चार वर्षांची नवी पदवी रचना",
    meta: "४ तासांपूर्वी",
  },
];

/* ---------------------------------------------------------------------------
   ताज्या बातम्या — four wide rows with excerpt, left column.
   ------------------------------------------------------------------------- */
export const latestNews: Article[] = [
  {
    id: "latest-1",
    image: "/img/img08.png",
    category: "महाराष्ट्र",
    headline:
      "सर्व जिल्ह्यांत मार्चपर्यंत कागदविरहित न्यायालयीन दाखल प्रक्रिया",
    excerpt: "जलद सुनावणी आणि कमी गहाळ फाइल्स; मात्र प्रशिक्षणाची गरज कायम.",
    meta: "वृत्तसेवा · ५ तासांपूर्वी",
  },
  {
    id: "latest-2",
    image: "/img/img01.png",
    category: "जग",
    headline: "हवामान निधी परिषदेसाठी जागतिक नेते एकत्र",
    excerpt: "असुरक्षित देशांसाठीचा निधी हा चर्चेतील मुख्य मुद्दा आहे.",
    meta: "वृत्तसेवा · ६ तासांपूर्वी",
  },
  {
    id: "latest-3",
    image: "/img/img09.jpg",
    category: "अर्थ",
    headline: "करकपातीनंतर सणासुदीत लघुउद्योगांना मागणीत वाढ",
    excerpt: "छोट्या शहरांतील विक्रेत्यांच्या ऑर्डरमध्ये लक्षणीय वाढ.",
    meta: "वृत्तसेवा · १ तासापूर्वी",
  },
  {
    id: "latest-4",
    image: "/img/img10.png",
    category: "संस्कृती",
    headline: "दिवाळीपूर्वी जुन्या पेठेत कंदील व रांगोळीची लगबग",
    excerpt: "पारंपरिक कारागिरांना यंदा ऑनलाइन ग्राहकांचाही मोठा प्रतिसाद.",
    meta: "वृत्तसेवा · २ तासांपूर्वी",
  },
];

/* ---------------------------------------------------------------------------
   ट्रेंडिंग — compact list, right rail. No excerpt, smallest headline.
   ------------------------------------------------------------------------- */
export const trending: Article[] = [
  {
    id: "trend-1",
    image: "/img/img11.png",
    category: "क्रीडा",
    headline: "युवा सलामीवीर चमकले; मालिका बरोबरीत",
    meta: "४ तासांपूर्वी",
  },
  {
    id: "trend-2",
    image: "/img/img04.png",
    category: "तंत्रज्ञान",
    headline: "चिप आयात नियमांपूर्वी मोबाइल कंपन्या सतर्क",
    meta: "५ तासांपूर्वी",
  },
  {
    id: "trend-3",
    image: "/img/img05.png",
    category: "आरोग्य",
    headline: "पहाटेच्या व्यायामाबाबत हृदयतज्ज्ञांचा सल्ला",
    meta: "६ तासांपूर्वी",
  },
];

/* ---------------------------------------------------------------------------
   राजकारण — two feature cards plus a text-only list column.
   ------------------------------------------------------------------------- */
export const politics = {
  features: [
    {
      id: "pol-1",
      image: "/img/img01.png",
      category: "राजकारण",
      headline: "विकास निधी विधेयकावर व्यापक सल्लामसलतीची समितीची मागणी",
      excerpt:
        "सर्व पक्षांच्या सदस्यांनी किमान दहा जिल्ह्यांत जाहीर सुनावणीची मागणी केली.",
      meta: "वृत्तसेवा · १ तासापूर्वी",
    },
    {
      id: "pol-2",
      image: "/img/img12.png",
      category: "विश्लेषण",
      headline: "हिवाळी अधिवेशनापूर्वी नव्या आघाडीचे गणित",
      excerpt:
        "वरिष्ठ सभागृहातील अल्प बहुमतामुळे तीन वादग्रस्त विधेयकांवर तडजोडीची शक्यता.",
      meta: "वृत्तसेवा · २ तासांपूर्वी",
    },
  ] satisfies Article[],
  briefs: [
    {
      id: "pol-3",
      image: "/img/img01.png",
      category: "निवडणूक",
      headline: "राज्य निवडणुकांच्या तारखा आयोगाकडून जाहीर",
      meta: "३ तासांपूर्वी",
    },
    {
      id: "pol-4",
      image: "/img/img04.png",
      category: "प्रशासन",
      headline: "४०,००० गावांत ब्रॉडबँड विस्तारास मंजुरी",
      meta: "४ तासांपूर्वी",
    },
    {
      id: "pol-5",
      image: "/img/img07.png",
      category: "धोरण",
      headline: "डेटा संरक्षण नियमांच्या मसुद्यावर सूचना खुल्या",
      meta: "५ तासांपूर्वी",
    },
    {
      id: "pol-6",
      image: "/img/img13.png",
      category: "मत",
      headline: "स्थानिक स्वराज्य सुधारणा: शहर प्रशासनाचा गहाळ दुवा",
      meta: "६ तासांपूर्वी",
    },
  ] satisfies Article[],
};

/* ---------------------------------------------------------------------------
   Topic desks. Each entry is one desk's articles, rendered as compact rows.
   Kept flat here and folded into two-desk bands below.
   ------------------------------------------------------------------------- */
const topicDesks: Article[][] = [
  [
    {
      id: "eco-1",
      image: "/img/img14.png",
      category: "बाजार",
      headline: "परकीय गुंतवणुकीमुळे रुपया स्थिर",
      meta: "२ तासांपूर्वी",
    },
    {
      id: "eco-2",
      image: "/img/img15.png",
      category: "कंपन्या",
      headline: "सणासुदीत वाहन कंपन्यांची विक्रमी नोंदणी",
      meta: "३ तासांपूर्वी",
    },
    {
      id: "eco-3",
      image: "/img/img16.jpg",
      category: "अर्थव्यवस्था",
      headline: "किरकोळ महागाई चार महिन्यांच्या नीचांकी",
      meta: "४ तासांपूर्वी",
    },
  ],
  [
    {
      id: "spo-1",
      image: "/img/img17.png",
      category: "क्रिकेट",
      headline: "गोलंदाजांच्या जोरावर मालिकेत बरोबरी",
      meta: "५ तासांपूर्वी",
    },
    {
      id: "spo-2",
      image: "/img/img18.png",
      category: "फुटबॉल",
      headline: "राजधानीतील डर्बी बरोबरीत सुटला",
      meta: "६ तासांपूर्वी",
    },
    {
      id: "spo-3",
      image: "/img/img19.png",
      category: "हॉकी",
      headline: "आशियाई क्रीडा पात्रतेसाठी संघ जाहीर",
      meta: "१ तासापूर्वी",
    },
  ],
  [
    {
      id: "ent-1",
      image: "/img/img20.png",
      category: "सिनेमा",
      headline: "पदार्पणातील कौटुंबिक चित्रपटाला महोत्सवात पुरस्कार",
      meta: "३ तासांपूर्वी",
    },
    {
      id: "ent-2",
      image: "/img/img21.jpg",
      category: "संगीत",
      headline: "तीन दिवसांच्या खुल्या संगीत महोत्सवाची घोषणा",
      meta: "४ तासांपूर्वी",
    },
    {
      id: "ent-3",
      image: "/img/img22.png",
      category: "ओटीटी",
      headline: "क्राईम थ्रिलर पहिल्याच आठवड्यात अव्वल",
      meta: "५ तासांपूर्वी",
    },
  ],
  [
    {
      id: "tec-1",
      image: "/img/img04.png",
      category: "एआय",
      headline: "प्रादेशिक भाषांसाठी एआय मॉडेल्सची स्टार्टअप्समध्ये स्पर्धा",
      meta: "६ तासांपूर्वी",
    },
    {
      id: "tec-2",
      image: "/img/img04.png",
      category: "गॅजेट्स",
      headline: "फोल्डेबल फोन स्वस्त होणार",
      meta: "१ तासापूर्वी",
    },
    {
      id: "tec-3",
      image: "/img/img04.png",
      category: "सायबर सुरक्षा",
      headline: "ऑनलाइन फसवणुकीविरोधात बँकांचा इशारा",
      meta: "२ तासांपूर्वी",
    },
  ],
  [
    {
      id: "hea-1",
      image: "/img/img05.png",
      category: "निरोगी जीवन",
      headline: "झोपेच्या सोप्या सवयी, आजारांचा धोका कमी",
      meta: "३ तासांपूर्वी",
    },
    {
      id: "hea-2",
      image: "/img/img05.png",
      category: "सार्वजनिक आरोग्य",
      headline: "जिल्हा रुग्णालयांत मोफत तपासणी शिबिरे",
      meta: "४ तासांपूर्वी",
    },
    {
      id: "hea-3",
      image: "/img/img23.png",
      category: "आहार",
      headline: "पारंपरिक भरड धान्यांकडे पुन्हा वळण",
      meta: "५ तासांपूर्वी",
    },
  ],
  [
    {
      id: "edu-1",
      image: "/img/img07.png",
      category: "परीक्षा",
      headline: "वार्षिक परीक्षांचे सुधारित वेळापत्रक जाहीर",
      meta: "६ तासांपूर्वी",
    },
    {
      id: "edu-2",
      image: "/img/img07.png",
      category: "कॅम्पस",
      headline: "अभियांत्रिकी महाविद्यालयांत एआय व हरित ऊर्जा अभ्यासक्रम",
      meta: "१ तासापूर्वी",
    },
    {
      id: "edu-3",
      image: "/img/img07.png",
      category: "शिष्यवृत्ती",
      headline: "गुणवत्ता शिष्यवृत्ती पोर्टल पुन्हा सुरू",
      meta: "२ तासांपूर्वी",
    },
  ],
];

/** Section headings for each band, two desks per band, in desk order. */
export const topicPairTitles: readonly [string, string][] = [
  ["अर्थ", "क्रीडा"],
  ["मनोरंजन", "तंत्रज्ञान"],
  ["आरोग्य", "शिक्षण"],
];

/**
 * Topic desks folded into bands of two so each band is a two-column block.
 * topicPairs[bandIndex][deskIndex] is one desk's Article[].
 */
export const topicPairs: Article[][][] = Array.from(
  { length: topicDesks.length / 2 },
  (_, band) => topicDesks.slice(band * 2, band * 2 + 2),
);

/* ---------------------------------------------------------------------------
   विशेष लेख व मते — three features plus a tall ad.
   ------------------------------------------------------------------------- */
export const features: Article[] = [
  {
    id: "feat-1",
    image: "/img/img07.png",
    category: "मत",
    headline: "छोट्या शहरांतील वर्गखोल्यांतील शांत क्रांती",
    excerpt:
      "जिल्हा शाळांमधील शिक्षक कमी खर्चाच्या साधनांनी शिकवण्याची पद्धत बदलत आहेत.",
    meta: "वृत्तसेवा · ३ तासांपूर्वी",
  },
  {
    id: "feat-2",
    image: "/img/img10.png",
    category: "विशेष",
    headline: "शतकानुशतके जुनी कला जपणारी विणकरांची सहकारी संस्था",
    excerpt:
      "महिलांच्या सहकारी गटाला हातमाग वस्त्रांसाठी नवी बाजारपेठ मिळत आहे.",
    meta: "वृत्तसेवा · ४ तासांपूर्वी",
  },
  {
    id: "feat-3",
    image: "/img/img24.png",
    category: "जीवनशैली",
    headline: "महानगरांपासून जवळ: सात अनोखी सुट्टीची ठिकाणे",
    excerpt: "डोंगरगावांपासून नदीकाठच्या मुक्कामापर्यंत शांततेचे पर्याय.",
    meta: "वृत्तसेवा · ५ तासांपूर्वी",
  },
];

/* ---------------------------------------------------------------------------
   संपादकांची निवड — one hero overlay, two stacked overlays, three text-only.
   ------------------------------------------------------------------------- */
export const editorsPicks = {
  hero: {
    id: "pick-1",
    image: "/img/img24.png",
    category: "दीर्घ लेख",
    headline: "नदीसोबत जगायला शिकलेले शहर: पूरग्रस्त भागातील एक वर्ष",
    meta: "१ तासापूर्वी",
  } satisfies Article,
  stack: [
    {
      id: "pick-2",
      image: "/img/img25.png",
      category: "फोटो फीचर",
      headline: "पहाटेचा बाजार: फूलविक्रेत्यांसोबत एक दिवस",
      meta: "२ तासांपूर्वी",
    },
    {
      id: "pick-3",
      image: "/img/img26.png",
      category: "स्पष्टीकरण",
      headline: "छोट्या बँका बदलत आहेत बचतीची सवय",
      meta: "३ तासांपूर्वी",
    },
  ] satisfies Article[],
  reads: [
    {
      id: "pick-4",
      category: "रेल्वे",
      headline: "पाच नवे अर्ध-वेगवान मार्ग मंजूर",
      excerpt: "अर्थसंकल्पात रेल्वेसाठी भरीव तरतूद; कामे पुढील वर्षी सुरू.",
      meta: "वृत्तसेवा · ३ तासांपूर्वी",
    },
    {
      id: "pick-5",
      category: "शेती",
      headline: "डाळींच्या हमीभावाचे शेतकऱ्यांकडून स्वागत",
      excerpt: "वाढीव दरामुळे पेरणी क्षेत्र वाढण्याची अपेक्षा.",
      meta: "वृत्तसेवा · ३ तासांपूर्वी",
    },
    {
      id: "pick-6",
      category: "वारसा",
      headline: "जुन्या पेठेतील हेरिटेज वॉक पुन्हा सुरू",
      excerpt: "दोन वर्षांच्या खंडानंतर पर्यटकांसाठी पुन्हा खुला.",
      meta: "वृत्तसेवा · ३ तासांपूर्वी",
    },
  ] satisfies Omit<Article, "image">[],
};

/* ---------------------------------------------------------------------------
   व्हिडिओ — editorial picks, trending clips, and the full video library.
   ------------------------------------------------------------------------- */
export const videoDiscovery = {
  recommended: [
    {
      id: "rec-vid-1",
      image: "/img/img24.png",
      duration: "१०:४६",
      title: "मान्सूनच्या वाटेवर: गावागावांतील बदल",
      meta: "महाराष्ट्र · दीर्घ व्हिडिओ",
    },
    {
      id: "rec-vid-2",
      image: "/img/img27.png",
      duration: "०:५४",
      title: "आजच्या सामन्यातील निर्णायक क्षण",
      meta: "क्रीडा · शॉर्ट",
    },
    {
      id: "rec-vid-4",
      image: "/img/img02.png",
      duration: "०५:३०",
      title: "ठाण्यातील नव्या जलवाहिनीचा आराखडा",
      meta: "नागरी प्रश्न · दीर्घ व्हिडिओ",
    },
    {
      id: "rec-vid-3",
      image: "/img/img01.png",
      duration: "०६:१८",
      title: "गृहनिर्माण विधेयकाचा शहरांवर काय परिणाम?",
      meta: "राजकारण · दीर्घ व्हिडिओ",
    },
  ] satisfies VideoItem[],
  trending: [
    {
      id: "trend-vid-1",
      image: "/img/img10.png",
      duration: "०:३८",
      title: "दिवाळीपूर्वी जुन्या पेठेतील लगबग",
      meta: "संस्कृती · १२ हजार दृश्ये",
    },
    {
      id: "trend-vid-2",
      image: "/img/img04.png",
      duration: "०५:४८",
      title: "नव्या चिपमुळे मोबाइलमध्ये काय बदलणार?",
      meta: "तंत्रज्ञान · ९ हजार दृश्ये",
    },
    {
      id: "trend-vid-4",
      image: "/img/img09.jpg",
      duration: "०४:१२",
      title: "लघुउद्योगांना सणासुदीत वाढती मागणी",
      meta: "अर्थ · ६ हजार दृश्ये",
    },
    {
      id: "trend-vid-5",
      image: "/img/img05.png",
      duration: "०:४५",
      title: "पावसाळ्यातील आजारांपासून बचाव कसा?",
      meta: "आरोग्य · ५ हजार दृश्ये",
    },
    {
      id: "trend-vid-3",
      image: "/img/img11.png",
      duration: "०:४२",
      title: "डर्बीतील शेवटच्या मिनिटाचा गोल",
      meta: "क्रीडा · ७ हजार दृश्ये",
    },
  ] satisfies VideoItem[],
};

export const videos = {
  feature: {
    id: "vid-1",
    image: "/img/img24.png",
    duration: "१०:४६",
    category: "प्रत्यक्ष वृत्त",
    title: "मान्सूनच्या वाटेवर दहा दिवस: देशभरातील प्रवास",
    excerpt:
      "आमचे व्हिडिओ पथक शेतकरी, नावाडी आणि शहर नियोजकांसोबत ऋतुबदल टिपते.",
  },
  longVideos: [
    {
      id: "vid-2",
      image: "/img/img27.png",
      duration: "३:१२",
      title: "ठळक घडामोडी: राजधानी डर्बी",
      meta: "क्रीडा · ६ तासांपूर्वी",
    },
    {
      id: "vid-3",
      image: "/img/img01.png",
      duration: "५:४८",
      title: "समजून घ्या: गृहनिर्माण विधेयक",
      meta: "राजकारण · १ तासापूर्वी",
    },
    {
      id: "vid-4",
      image: "/img/img10.png",
      duration: "२:०५",
      title: "दिवाळीची तयारी: जुन्या पेठेत लगबग",
      meta: "जीवनशैली · २ तासांपूर्वी",
    },
    {
      id: "vid-5",
      image: "/img/img04.png",
      duration: "७:३०",
      title: "मुलाखत: चिप डिझाइनर्स",
      meta: "तंत्रज्ञान · ३ तासांपूर्वी",
    },
  ] satisfies VideoItem[],
  shorts: [
    {
      id: "short-1",
      image: "/img/img10.png",
      duration: "०:३८",
      title: "दिवाळीपूर्वी जुन्या पेठेतील लगबग",
      meta: "संस्कृती · शॉर्ट",
    },
    {
      id: "short-2",
      image: "/img/img27.png",
      duration: "०:४२",
      title: "डर्बीतील शेवटच्या मिनिटाचा गोल",
      meta: "क्रीडा · शॉर्ट",
    },
    {
      id: "short-3",
      image: "/img/img04.png",
      duration: "०:५१",
      title: "नव्या चिपची खासियत अर्ध्या मिनिटात",
      meta: "तंत्रज्ञान · शॉर्ट",
    },
    {
      id: "short-4",
      image: "/img/img01.png",
      duration: "०:४७",
      title: "आजच्या पाच महत्त्वाच्या बातम्या",
      meta: "महाराष्ट्र · शॉर्ट",
    },
    {
      id: "short-5",
      image: "/img/img02.png",
      duration: "०:४९",
      title: "ठाण्यातील नव्या जलवाहिनीचा आराखडा",
      meta: "नागरी प्रश्न · शॉर्ट",
    },
  ] satisfies VideoItem[],
};

export const netlifyArticles: Article[] = [
  {
    id: "labor-wage-hike-2026",
    image: "/img/img02.png",
    category: "कामगार टाइम्स",
    headline: "मजदूरों के न्यूनतम वेतन में 15% की बढ़ोतरी का श्रम मंत्रालय का बड़ा फैसला, अधिसूचना जारी।",
    excerpt: "केंद्र सरकार ने असंगठित क्षेत्र के मजदूरों, निर्माण श्रमिकों और औद्योगिक कर्मचारियों के लिए न्यूनतम वेतन की समीक्षा करते हुए दैनिक मजदूरी दरों में इजाफे का ऐतिहासिक फैसला लिया है।",
    meta: "कामगार कल्याण · १ तासापूर्वी",
  },
  {
    id: "epfo-pension-digital-life-certificate",
    image: "/img/img03.png",
    category: "कामगार टाइम्स",
    headline: "EPFO का बड़ा अपडेट: EPS-95 पेंशनभोगी अब घर बैठे मोबाइल ऐप से जमा कर सकेंगे डिजिटल जीवन प्रमाण पत्र",
    excerpt: "कर्मचारी भविष्य निधि संगठन (EPFO) ने देश के 78 लाख से अधिक पेंशनभोगियों के लिए फेस ऑथेंटिकेशन आधारित जीवन प्रमाण पत्र सेवा को और सुगम बना दिया है।",
    meta: "ईपीएफओ · २ तासांपूर्वी",
  },
  {
    id: "crime-nagpur-police-drug-bust",
    image: "/img/img04.png",
    category: "गुन्हेवार्ता",
    headline: "गुन्हेवार्ता: नागपुर पुलिस की बड़ी कार्रवाई, 50 लाख का अवैध नशीला पदार्थ जब्त; गिरोह के 3 शातिर तस्कर अरेस्ट",
    excerpt: "नागपुर पुलिस की गुन्हेवार्ता शाखा ने गुप्त सूचना के आधार पर छापेमारी कर 50 लाख रुपये मूल्य का मादक पदार्थ जब्त किया।",
    meta: "नागपूर पोलीस · ३ तासांपूर्वी",
  },
  {
    id: "editorial-shende-labor-rights-2026",
    image: "/img/img05.png",
    category: "संपादकीय",
    headline: "संपादकीय: 'असंगठित कामगारों की सामाजिक सुरक्षा - वादे और हकीकत' - प्रधान संपादक महेंद्र शेंडे का विशेष विश्लेषण।",
    excerpt: "देश की अर्थव्यवस्था में 90% योगदान देने वाले असंगठित क्षेत्र के कामगार आज भी स्वास्थ्य सुरक्षा, पेंशन और न्यूनतम वेतन के लिए संघर्षरत हैं।",
    meta: "प्रधान संपादक महेंद्र शेंडे · ४ तासांपूर्वी",
  },
  {
    id: "focus-nagpur-bocw-welfare-scheme",
    image: "/img/img06.jpg",
    category: "लक्षवेधी",
    headline: "लक्षवेधी: नागपुर इमारत व इतर बांधकाम कामगार बोर्ड की नई पहल - 25,000 मजदूरों को टूलकिट व साइकिल वितरण",
    excerpt: "महाराष्ट्र इमारत व इतर बांधकाम कामगार कल्याण मंडळाने नागपूर जिल्ह्यातील नोंदणीकृत मजुरांसाठी कल्याणकारी योजना गतिमान केल्या आहेत.",
    meta: "विदर्भ डेस्क · ५ तासांपूर्वी",
  },
  {
    id: "railway-recruitment-2026-announcement",
    image: "/img/img07.png",
    category: "सरकारी नोकरी",
    headline: "रेलवे भर्ती बोर्ड (RRB) ने जारी किया नोटिफिकेशन: 45,000 से ज्यादा पदों पर आवेदन शुरू, 10वीं पास भी योग्य",
    excerpt: "भारतीय रेल्वेत ४५,००० हून अधिक ग्रुप डी आणि तंत्रज्ञ पदांची बंपर भरती जाहीर झाली असून ऑनलाईन अर्ज प्रक्रिया सुरु झाली आहे.",
    meta: "नोकरी अलर्ट · ६ तासांपूर्वी",
  },
  {
    id: "nagpur-metro-phase-2-work-status",
    image: "/img/img08.png",
    category: "लोकल न्यूज़",
    headline: "नागपुर मेट्रो फेज-2 का काम तेज गति से जारी: हिंगना और वाडी रूट पर ट्रायल रन अगले माह संभव",
    excerpt: "नागपूर मेट्रो टप्पा २ चे काम वेगाने सुरु असून हिंगणा आणि वाडी मार्गावर पुढील महिन्यात पहिली चाचणी धाव घेतली जाणार आहे.",
    meta: "नागपूर मेट्रो · ७ तासांपूर्वी",
  },
  {
    id: "cricket-ind-vs-aus-odi-series",
    image: "/img/img11.png",
    category: "क्रीडा",
    headline: "भारत बनाम ऑस्ट्रेलिया वनडे सीरीज: रोहित-विराट की जोड़ी का मैदान पर धमाल, भारत ने 50 रन से जीता पहला मैच",
    excerpt: "वानखेडे मैदानावर भारत व ऑस्ट्रेलिया दरम्यान झालेल्या पहिल्या एकदिवसीय सामन्यात भारतीय संघाने ५० धावांनी दणदणीत विजय मिळवला.",
    meta: "क्रिकेट डेस्क · ८ तासांपूर्वी",
  },
  {
    id: "delhi-pg-building-collapse",
    image: "/img/img12.png",
    category: "लेटेस्ट न्युज",
    headline: "दिल्ली सत्य निकेतन: 4 मंजिला PG इमारत ढही, रेस्क्यू टीम ने 7 शव बरामद किए; मलबे से 5 मजदूरों को सुरक्षित निकाला",
    excerpt: "साउथ दिल्ली के सत्य निकेतन इलाके में निर्माणाधीन 4 मंजिला पीजी इमारत ताश के पत्तों की तरह ढह गई।",
    meta: "राष्ट्रीय · ९ तासांपूर्वी",
  },
  {
    id: "delhi-kharge-speech-controversy",
    image: "/img/img13.png",
    category: "राजनीती",
    headline: "खरगे के भाषण के बाद मंच के 'शुद्धीकरण' पर सियासत गरमाई: राहुल गांधी का कड़ा प्रहार - 'दलितों का अपमान सहन नहीं होगा'",
    excerpt: "मल्लिकार्जुन खरगे के संबोधन के बाद विरोधी नेताओं द्वारा मंच पर गंगाजल छिड़कने की घटना पर राजनीतिक घमासान मच गया है।",
    meta: "राजकारण · १० तासांपूर्वी",
  },
  {
    id: "delhi-sim-card-telecom-rules",
    image: "/img/img14.png",
    category: "लेटेस्ट न्युज",
    headline: "२४ ऑगस्ट से नया नियम लागू: डिजिटल SIM कार्ड और टेलीकॉम सुरक्षा की नई सख्त गाइडलाइंस जारी",
    excerpt: "दूरसंचार विभाग (DoT) ने सिम कार्ड बिक्री और बायोमेट्रिक सत्यापन के लिए नए सुरक्षा दिशानिर्देश अनिवार्य कर दिए हैं।",
    meta: "तंत्रज्ञान · ११ तासांपूर्वी",
  },
  {
    id: "politics-maharashtra-assembly-session",
    image: "/img/img01.png",
    category: "राजनीती",
    headline: "राजनीती: महाराष्ट्र विधानसभा का विशेष शीतकालीन सत्र नागपुर में, कामगार नीति पर हंगामा होने के आसार",
    excerpt: "महाराष्ट्र विधानसभेचे हिवाळी अधिवेशन नागपुरात सुरु होत असून कामगार धोरण आणि किमान वेतनावर गदारोळ होण्याची शक्यता.",
    meta: "विधानसभा · १२ तासांपूर्वी",
  },
  {
    id: "entertainment-bollywood-superstar-movie",
    image: "/img/img06.jpg",
    category: "मनोरंजन",
    headline: "मनोरंजन: सुपरस्टार की नई एक्शन थ्रिलर का धांसू टीज़र रिलीज़: 24 घंटे में मिले 50 मिलियन व्यूज",
    excerpt: "बॉलीवूड सुपरस्टारच्या आगामी बिग बजेट ॲक्शन थ्रिलर चित्रपटाचा बहुप्रतिक्षित टीझर यूट्यूबवर प्रदर्शित झाला आहे.",
    meta: "चित्रपट · १३ तासांपूर्वी",
  },
];

/* ---------------------------------------------------------------------------
   Flat index of every article that carries an image, used by the search page
   and the /category/[slug] section pages.
   ------------------------------------------------------------------------- */
export const allArticles: Article[] = (() => {
  const seen = new Set<string>();
  return [
    ...netlifyArticles,
    leadStory,
    ...leadStack,
    ...tiles,
    ...latestNews,
    ...trending,
    ...politics.features,
    ...politics.briefs,
    ...topicDesks.flat(),
    ...features,
    editorsPicks.hero,
    ...editorsPicks.stack,
  ].filter((article) => {
    if (seen.has(article.id)) return false;
    seen.add(article.id);
    return true;
  });
})();


/* ---------------------------------------------------------------------------
   Flat index of every video the site links to, used by /video/[id] routes.
   ------------------------------------------------------------------------- */
export const allVideos: VideoItem[] = (() => {
  const seen = new Set<string>();
  const feature: VideoItem = {
    id: videos.feature.id,
    image: videos.feature.image,
    duration: videos.feature.duration,
    title: videos.feature.title,
    meta: videos.feature.category,
  };
  return [
    feature,
    ...videos.longVideos,
    ...videos.shorts,
    ...videoDiscovery.recommended,
    ...videoDiscovery.trending,
  ].filter((video) => {
    if (seen.has(video.id)) return false;
    seen.add(video.id);
    return true;
  });
})();

/* ---------------------------------------------------------------------------
   फोटो गॅलरी
   ------------------------------------------------------------------------- */
export const gallery: GalleryItem[] = [
  {
    id: "gal-1",
    image: "/img/img24.png",
    category: "निसर्ग",
    headline: "धुके आणि डोंगर: मोसमातील पहिला बर्फ",
  },
  {
    id: "gal-2",
    image: "/img/img28.png",
    category: "शहर",
    headline: "पावसानंतरची छते: शहराचा देखावा",
  },
  {
    id: "gal-3",
    image: "/img/img10.png",
    category: "संस्कृती",
    headline: "कापणी उत्सवाची रंगमंचामागील तयारी",
  },
];
