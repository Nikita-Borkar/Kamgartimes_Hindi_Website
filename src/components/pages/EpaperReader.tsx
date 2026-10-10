"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, Maximize, Minimize } from "lucide-react";
import type { EpaperEdition } from "@/data/epaper";
import styles from "./epaper.module.css";

/**
 * The ई-पेपर reader: a paper-branded toolbar above the browser's native
 * PDF sheet. Fullscreen toggles on the whole reader block so the reader
 * fills the viewport and the site chrome stays out of the way.
 */
export function EpaperReader({ edition }: { edition: EpaperEdition }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onChange = () => setExpanded(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void wrapRef.current?.requestFullscreen();
    }
  };

  return (
    <main id="main" className={styles.reader}>
      <div ref={wrapRef}>
        <div className={`${styles.toolbar} reveal`}>
          <span className={styles.brandMark} aria-hidden="true">
            प
          </span>
          <div className={styles.toolbarMeta}>
            <span className={styles.toolbarEyebrow}>ई-पेपर</span>
            <span className={styles.toolbarTitle}>{edition.label}</span>
          </div>

          <div className={styles.toolbarActions}>
            <a className={styles.toolBtn} href={edition.file} download>
              <Download size={16} aria-hidden="true" />
              डाउनलोड
            </a>
            <a
              className={styles.toolBtn}
              href={edition.file}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={16} aria-hidden="true" />
              नवीन टॅब
            </a>
            <button
              className={styles.toolBtn}
              type="button"
              onClick={toggleFullscreen}
              aria-label={expanded ? "पूर्ण स्क्रीनमधून बाहेर पडा" : "पूर्ण स्क्रीन"}
              aria-pressed={expanded}
            >
              {expanded ? (
                <Minimize size={16} aria-hidden="true" />
              ) : (
                <Maximize size={16} aria-hidden="true" />
              )}
              पूर्ण स्क्रीन
            </button>
          </div>
        </div>

        <div className={`${styles.frameWrap} reveal`}>
          <iframe
            className={styles.frame}
            src={edition.file}
            title={`कामगार टाइम्स ई-पेपर — ${edition.label}`}
            loading="eager"
          />
        </div>
      </div>

      <p className={styles.frameNote}>
        पाने उलटण्यासाठी दिशासूचक बाण वापरा. संगणकावर Ctrl+F ने शब्द शोधा;
        भिंगाच्या मदतीने मजकूर मोठा करा.
      </p>

      <Link className={styles.plainLink} href="/e-paper">
        <ArrowLeft size={16} aria-hidden="true" />
        सर्व आवृत्त्या
      </Link>
    </main>
  );
}