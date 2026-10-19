"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { AdSlot } from "@/components/ui/AdSlot";
import { leaderboardAds } from "@/data/ads";
import { Download, Calendar, Maximize2, ChevronLeft, ChevronRight, FileText, Share2 } from "lucide-react";
import styles from "./epaper.module.css";

export default function EPaperPage() {
  const [activePage, setActivePage] = useState(1);
  const [edition, setEdition] = useState("nagpur");
  const [fullScreen, setFullScreen] = useState(false);

  const totalPages = 8;

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
              <h1 className={styles.title}>कामगार टाइम्स डिजिटल ई-पेपर</h1>
              <p className={styles.dateStr}>रविवार, ४ अक्टूबर २०२६ · मुख्य नागपुर संस्करण</p>
            </div>

            <div className={styles.headerActions}>
              <div className={styles.selectGroup}>
                <label htmlFor="edition-select">संस्करण (Edition):</label>
                <select
                  id="edition-select"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                >
                  <option value="nagpur">नागपुर मुख्य संस्करण</option>
                  <option value="vidarbha">विदर्भ प्रादेशिक</option>
                  <option value="mumbai">मुंबई विशेष</option>
                </select>
              </div>

              <a
                href="/pdf/kamgartimes-epaper.pdf"
                download="KamgarTimes-EPaper-4Oct2026.pdf"
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
              <img
                src={`/img/img0${(activePage % 8) + 1}.png`}
                alt={`कामगार टाइम्स ई-पेपर पृष्ठ ${activePage}`}
                className={styles.paperImg}
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
