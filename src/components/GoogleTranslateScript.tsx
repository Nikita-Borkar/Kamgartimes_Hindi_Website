'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function GoogleTranslateScript() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Hide Google Translate iframe/toolbar bar cleanly
    const style = document.createElement('style');
    style.innerHTML = `
      .goog-te-banner-frame, .skiptranslate, iframe.goog-te-banner-frame {
        display: none !important;
      }
      body {
        top: 0px !important;
        position: static !important;
      }
      #goog-gt-tt, .goog-te-balloon-frame {
        display: none !important;
      }
      .goog-text-highlight {
        background: transparent !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'hi',
            includedLanguages: 'hi,mr,en',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      }
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div id="google_translate_element" className="hidden border-none p-0 m-0 w-0 h-0 overflow-hidden"></div>
  );
}
