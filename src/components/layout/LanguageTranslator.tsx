"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./translator.module.css";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const LANGUAGES = [
  { code: "bn", label: "Bengali" },
  { code: "en", label: "English" },
  { code: "gu", label: "Gujarati" },
  { code: "hi", label: "Hindi" },
  { code: "mr", label: "Marathi" },
  { code: "pa", label: "Punjabi" },
  { code: "ur", label: "Urdu" },
];

export function LanguageTranslator() {
  const [currentLang, setCurrentLang] = useState("hi");

  useEffect(() => {
    // Read current language from googtrans cookie asynchronously if set
    const timer = window.setTimeout(() => {
      try {
        const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
        if (match && match[1]) {
          setCurrentLang(match[1]);
        }
      } catch {
        // ignore
      }
    }, 0);

    // Define Google Translate initialization function
    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "hi",
              includedLanguages: "bn,en,gu,hi,mr,pa,ur",
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      } catch {
        // ignore
      }
    };

    // Load Google Translate script if not already in document
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (!lang) return;
    setCurrentLang(lang);

    try {
      const hostname = window.location.hostname;
      const cookieVal = `/hi/${lang}`;

      document.cookie = `googtrans=${cookieVal}; path=/;`;
      if (hostname && hostname !== "localhost") {
        document.cookie = `googtrans=${cookieVal}; domain=${hostname}; path=/;`;
        document.cookie = `googtrans=${cookieVal}; domain=.${hostname}; path=/;`;
      }

      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event("change"));
      } else {
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  };

  return (
    <div className={`${styles.translatorWrap} notranslate`} translate="no">
      {/* Hidden container for Google Translate Widget */}
      <div id="google_translate_element" className={styles.hiddenTranslate} />

      <div className={styles.selectBox}>
        <select
          className={styles.select}
          value={currentLang}
          onChange={handleChange}
          aria-label="Select Language"
        >
          <option value="" disabled>
            Select Language
          </option>
          {LANGUAGES.map((item) => (
            <option key={item.code} value={item.code}>
              {item.label}
            </option>
          ))}
        </select>
        <ChevronDown size={14} strokeWidth={2.4} className={styles.chevron} aria-hidden="true" />
      </div>
    </div>
  );
}
