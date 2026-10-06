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

export const navItems = [
  { label: "मुख्यपृष्ठ", href: "#" },
  { label: "जग", href: "#" },
  { label: "राजकारण", href: "#" },
  { label: "अर्थ", href: "#" },
  { label: "क्रीडा", href: "#" },
  { label: "मनोरंजन", href: "#" },
  { label: "तंत्रज्ञान", href: "#" },
  { label: "आरोग्य", href: "#" },
  { label: "शिक्षण", href: "#" },
  { label: "विचार", href: "#" },
  { label: "व्हिडिओ", href: "#" },
] as const;

export const socialLinks = [
  { id: "whatsapp", label: "व्हॉट्सॲप", short: "f", href: "#" },
  { id: "facebook", label: "फेसबुक", short: "f", href: "#" },
  { id: "youtube", label: "यूट्यूब", short: "▶", href: "#" },
  { id: "instagram", label: "इन्स्टाग्राम", short: "ig", href: "#" },
  { id: "x", label: "एक्स", short: "X", href: "#" },
] as const;

export const breakingNews = {
  label: "ताजी बातमी",
  text: "राज्य सरकारकडून नव्या मेट्रो मार्गाची घोषणा; पुढील तिमाहीत कामाला सुरुवात",
} as const;

export const footer = {
  sections: [
    {
      title: "कंपनी",
      links: ["आमच्याबद्दल", "संपर्क", "अस्वीकरण", "गोपनीयता धोरण"],
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
  actions: ["देणगी द्या", "जाहिरातीसाठी संपर्क"],
  stores: ["App Store", "Google Play"],
  copyright: "© २०२६ दैनिक पल्स. सर्व हक्क राखीव.",
} as const;
