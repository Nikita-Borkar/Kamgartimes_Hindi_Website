"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { AdSlot } from "@/components/ui/AdSlot";
import { leaderboardAds } from "@/data/ads";
import Image from "next/image";
import { Download, Maximize2, ChevronLeft, ChevronRight, FileText, Loader2 } from "lucide-react";
import { kamgarApi } from "@/services/apiClient";
import type { EpaperEditionItem } from "@/types/api";
import styles from "./epaper.module.css";

const formatHindiDate = (d: string | number | Date | undefined) => {
  if (!d) return "";
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString("hi-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(d);
  }
};

export default function EPaperPage() {
  const [activePage, setActivePage] = useState(1);
  const [editionsList, setEditionsList] = useState<EpaperEditionItem[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [currentEdition, setCurrentEdition] = useState<EpaperEditionItem | null>(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const totalPages = currentEdition?.pageCount || 8;

  useEffect(() => {
    kamgarApi
      .getEpaperEditions({ limit: 12 })
      .then((res) => {
        if (res?.editions && res.editions.length > 0) {
          setEditionsList(res.editions);
          const initial = res.latest || res.editions[0];
          setCurrentEdition(initial);
          setSelectedSlug(initial.slug);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleEditionChange = (slug: string) => {
    setSelectedSlug(slug);
    const matched = editionsList.find((e) => e.slug === slug);
    if (matched) {
      setCurrentEdition(matched);
      setActivePage(1);
    }
  };

  const handlePrev = () => {
    setActivePage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNext = () => {
    setActivePage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  return (
    <PageShell>
      <main id="main" className={styles.main}>
        <div className={styles.shell}>
          {/* Header Bar */}
          <header className={styles.header}>
            <div>
              <span className={styles.badge}>दैनिक ई-पेपर (E-Paper)</span>
              <h1 className={styles.title}>
                {currentEdition?.title || "कामगार टाइम्स डिजिटल ई-पेपर"}
              </h1>
              <p className={styles.dateStr}>
                {currentEdition?.editionDate
                  ? formatHindiDate(currentEdition.editionDate)
                  : `${formatHindiDate(new Date())} · मुख्य संस्करण`}
                {currentEdition?.city?.name ? ` · ${currentEdition.city.name}` : ""}
              </p>
            </div>

            <div className={styles.headerActions}>
              <div className={styles.selectGroup}>
                <label htmlFor="edition-select">संस्करण (Edition):</label>
                <select
                  id="edition-select"
                  value={selectedSlug || "nagpur"}
                  onChange={(e) => handleEditionChange(e.target.value)}
                >
                  {editionsList.length > 0 ? (
                    editionsList.map((ed) => (
                      <option key={ed._id} value={ed.slug}>
                        {ed.title} ({formatHindiDate(ed.editionDate)})
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="nagpur">नागपुर मुख्य संस्करण</option>
                      <option value="vidarbha">विदर्भ प्रादेशिक</option>
                      <option value="mumbai">मुंबई विशेष</option>
                    </>
                  )}
                </select>
              </div>

              <a
                href={currentEdition?.pdfUrl || "/pdf/kamgartimes-epaper.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                download={currentEdition?.slug ? `${currentEdition.slug}.pdf` : "KamgarTimes-EPaper.pdf"}
                className={styles.downloadPdfBtn}
                title="संपूर्ण PDF डाउनलोड करें"
              >
                <Download size={16} />
                <span>PDF डाउनलोड करें</span>
              </a>
            </div>
          </header>

          {/* E-Paper Viewer Canvas */}
          <div className={`${styles.viewerCard} ${fullScreen ? styles.fullScreenViewer : ""}`}>
            <div className={styles.viewerToolbar}>
              <div className={styles.pageIndicator}>
                <FileText size={16} />
                <span>पृष्ठ <strong>{activePage}</strong> / {totalPages}</span>
              </div>

              <div className={styles.toolBtns}>
                <button
                  type="button"
                  className={styles.toolBtn}
                  onClick={handlePrev}
                  title="पिछला पृष्ठ"
                >
                  <ChevronLeft size={18} />
                  <span>पिछला</span>
                </button>

                <button
                  type="button"
                  className={styles.toolBtn}
                  onClick={handleNext}
                  title="अगला पृष्ठ"
                >
                  <span>अगला</span>
                  <ChevronRight size={18} />
                </button>

                <button
                  type="button"
                  className={styles.toolBtn}
                  onClick={() => setFullScreen(!fullScreen)}
                  title="फुलस्क्रीन देखें"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Simulated High-Res E-Paper Page Image */}
            <div className={styles.paperStage}>
              <Image
                src={`/img/img0${(activePage % 8) + 1}.png`}
                alt={`कामगार टाइम्स ई-पेपर पृष्ठ ${activePage}`}
                className={styles.paperImg}
                width={800}
                height={1100}
                priority
              />
            </div>

            {/* Thumbnail Strip */}
            <div className={styles.thumbStrip}>
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    className={`${styles.pageThumbBtn} ${pageNum === activePage ? styles.activeThumb : ""}`}
                    onClick={() => setActivePage(pageNum)}
                  >
                    <span>पृष्ठ {pageNum}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.adSection}>
            <AdSlot ad={leaderboardAds[3]} />
          </div>
        </div>
      </main>
    </PageShell>
  );
}
