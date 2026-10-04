// Language translation helper supporting Hindi (hi), Marathi (mr), and English (en)

export type SupportedLanguage = 'hi' | 'mr' | 'en';

export const LANGUAGES: { code: SupportedLanguage; name: string; flag: string; nativeName: string }[] = [
  { code: 'hi', name: 'हिंदी', nativeName: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', nativeName: 'मराठी (Marathi)', flag: '🚩' },
  { code: 'en', name: 'English', nativeName: 'English (अंग्रेजी)', flag: '🌐' },
];

export function setPageLanguage(lang: SupportedLanguage) {
  if (typeof window === 'undefined') return;

  // Save preference in localStorage
  localStorage.setItem('userLanguage', lang);

  const cookieValue = lang === 'hi' ? '' : `/hi/${lang}`;

  // Set cookies across path & domain
  document.cookie = `googtrans=${cookieValue}; path=/;`;
  document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;

  // Check if Google Translate combobox exists
  const selectElem = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (selectElem) {
    selectElem.value = lang;
    selectElem.dispatchEvent(new Event('change'));
  }

  // Force reload to apply Google Translate cookie translation cleanly across DOM
  setTimeout(() => {
    window.location.reload();
  }, 150);
}
