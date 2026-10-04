// Comprehensive translation dictionary for Hindi, Marathi, and English

export type SupportedLang = 'hi' | 'mr' | 'en';

export const TRANSLATIONS: Record<string, Record<SupportedLang, string>> = {
  // Navigation & Categories
  'होम': { hi: 'होम', mr: 'मुखपृष्ठ', en: 'Home' },
  'कामगार टाइम्स': { hi: 'कामगार टाइम्स', mr: 'कामगार टाईम्स', en: 'Labor Times' },
  'लोकल न्यूज़': { hi: 'लोकल न्यूज़', mr: 'स्थानिक बातम्या', en: 'Local News' },
  'लेटेस्ट न्युज': { hi: 'लेटेस्ट न्युज', mr: 'ताजा घडामोडी', en: 'Latest News' },
  'गुन्हेवार्ता': { hi: 'गुन्हेवार्ता', mr: 'गुन्हेगारी वृत्त', en: 'Crime News' },
  'संपादकीय': { hi: 'संपादकीय', mr: 'संपादकीय अग्रलेख', en: 'Editorial' },
  'लक्षवेधी': { hi: 'लक्षवेधी', mr: 'विशेष लक्षवेधी', en: 'Special Focus' },
  'सरकारी नोकरी': { hi: 'सरकारी नोकरी', mr: 'शासकीय नोकरी भरती', en: 'Govt Jobs' },
  'मनोरंजन': { hi: 'मनोरंजन', mr: 'मनोरंजन व चित्रपट', en: 'Entertainment' },
  'राजनीती': { hi: 'राजनीती', mr: 'राजकारण', en: 'Politics' },
  'क्रीडा': { hi: 'क्रीडा', mr: 'क्रीडा व खेळ', en: 'Sports' },
  'ब्रह्मांड': { hi: 'ब्रह्मांड', mr: 'विश्व घडामोडी', en: 'World' },
  'ई-पेपर': { hi: 'ई-पेपर', mr: 'ई-पेपर (डिजिटल)', en: 'E-Paper' },

  // Header & Buttons
  'अपनी ख़बर भेजें': { hi: 'अपनी ख़बर भेजें', mr: 'आपली बातमी पाठवा', en: 'Send News' },
  'खोजें': { hi: 'खोजें', mr: 'शोधा', en: 'Search' },
  'दिन मोड': { hi: 'दिन मोड', mr: 'दिवस मोड', en: 'Day Mode' },
  'रात मोड': { hi: 'रात मोड', mr: 'रात्र मोड', en: 'Night Mode' },
  'शहर': { hi: 'शहर', mr: 'शहर', en: 'City' },
  'मुख्य मेनू': { hi: 'मुख्य मेनू', mr: 'मुख्य मेनू', en: 'Main Menu' },
  'ब्रेकिंग न्यूज़': { hi: 'ब्रेकिंग न्यूज़', mr: 'ब्रेकिंग न्यूज', en: 'Breaking News' },
  'सुनें': { hi: 'सुनें', mr: 'ऐका', en: 'Listen' },
  'रोके': { hi: 'रोके', mr: 'थांबवा', en: 'Stop' },

  // Cities
  'नागपुर': { hi: 'नागपुर', mr: 'नागपूर', en: 'Nagpur' },
  'मुंबई': { hi: 'मुंबई', mr: 'मुंबई', en: 'Mumbai' },
  'दिल्ली': { hi: 'दिल्ली', mr: 'दिल्ली', en: 'Delhi' },

  // Widgets & Sections
  'आज की ताज़ा खबरे': { hi: 'आज की ताज़ा खबरे', mr: 'आजच्या ताज्या बातम्या', en: "Today's Top News" },
  'लाइव अपडेट्स': { hi: 'लाइव अपडेट्स', mr: 'थेट घडामोडी', en: 'Live Updates' },
  'फोटो गैलरी': { hi: 'फोटो गैलरी', mr: 'फोटो गॅलरी', en: 'Photo Gallery' },
  'न्यूज रील्स': { hi: 'न्यूज रील्स', mr: 'व्हिडिओ रील्स', en: 'News Reels' },
  'दैनिक राशिफल': { hi: 'दैनिक राशिफल', mr: 'दैनंदिन राशीभविष्य', en: 'Daily Horoscope' },
  'जनमत सर्वेक्षण': { hi: 'जनमत सर्वेक्षण', mr: 'जनमत कौल', en: 'Public Opinion Poll' },
  'कामगार टाइम्स ई-पेपर': { hi: 'कामगार टाइम्स ई-पेपर', mr: 'कामगार टाईम्स ई-पेपर', en: 'Kamgar Times E-Paper' },
  'सब्सक्राइब करें': { hi: 'सब्सक्राइब करें', mr: 'सबस्क्राईब करा', en: 'Subscribe' },
};

/**
 * Helper to translate UI string safely
 */
export function translateText(text: string, lang: SupportedLang): string {
  if (lang === 'hi' || !text) return text;
  
  if (TRANSLATIONS[text] && TRANSLATIONS[text][lang]) {
    return TRANSLATIONS[text][lang];
  }

  // Simple auto-phrase replacements for Marathi
  if (lang === 'mr') {
    return text
      .replace(/मजदूरों/g, 'कामगारांसाठी')
      .replace(/कामगारों/g, 'कामगारांच्या')
      .replace(/खबरें/g, 'बातम्या')
      .replace(/समाचार/g, 'वृत्त')
      .replace(/भर्ती/g, 'भरती')
      .replace(/बढ़ोतरी/g, 'वाढ')
      .replace(/घोषणा/g, 'घोषणा')
      .replace(/पेंशन/g, 'पिन्शन')
      .replace(/योजनाएं/g, 'योजना')
      .replace(/अपडेट्स/g, 'अपडेट्स');
  }

  // Simple auto-phrase replacements for English
  if (lang === 'en') {
    return text
      .replace(/कामगारों के लिए बड़ी खुशखबरी/g, 'Big Good News for Workers')
      .replace(/न्यूनतम दैनिक मजदूरी में 15% बढ़ोतरी/g, '15% Wage Hike Approved')
      .replace(/नागपुर/g, 'Nagpur')
      .replace(/मुंबई/g, 'Mumbai')
      .replace(/दिल्ली/g, 'Delhi');
  }

  return text;
}
