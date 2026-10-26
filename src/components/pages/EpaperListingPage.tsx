"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { latestEdition as defaultLatest, epaperEditions as defaultEditions } from "@/data/epaper";
import { epaperHref } from "@/lib/links";
import { VerticalAd } from "@/components/ui/VerticalAd";
import { AdSlot } from "@/components/ui/AdSlot";
import { verticalTowerAds, leaderboardAds } from "@/data/ads";
import { kamgarApi } from "@/services/apiClient";
import type { EpaperEditionItem } from "@/types/api";
import { PageHero } from "./PageHero";
import styles from "./epaper.module.css";

const formatHindiDate = (d: string | number | Date | undefined) => {
  if (!d) return "";
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(d);
  }
};

/** /e-paper — today's edition with a "cover" card, then the archive rows with vertical sponsor ad. */
export function EpaperListingPage() {
  const [current, setCurrent] = useState<any>(defaultLatest);
  const [editions, setEditions] = useState<any[]>(defaultEditions);

  useEffect(() => {
    kamgarApi
      .getEpaperEditions({ limit: 20 })
      .then((res) => {
        if (res?.editions && res.editions.length > 0) {
          const mapped = res.editions.map((ed) => ({
            id: ed.slug || ed._id,
            label: `${formatHindiDate(ed.editionDate)}${ed.city?.name ? ` (${ed.city.name})` : ""}`,
            date: ed.editionDate,
            size: ed.fileSize || "18 MB",
            pages: ed.pageCount || 8,
            blurb: ed.title || ed.blurb || "कामगार टाइम्स डिजिटल ई-पेपर",
            file: ed.pdfUrl,
          }));

          setEditions(mapped);
          const top = res.latest
            ? {
                id: res.latest.slug || res.latest._id,
                label: `${formatHindiDate(res.latest.editionDate)}${res.latest.city?.name ? ` (${res.latest.city.name})` : ""}`,
                date: res.latest.editionDate,
                size: res.latest.fileSize || "18 MB",
                pages: res.latest.pageCount || 8,
                blurb: res.latest.title || res.latest.blurb || "कामगार टाइम्स डिजिटल ई-पेपर",
                file: res.latest.pdfUrl,
              }
            : mapped[0];
          setCurrent(top);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="ई-पेपर"
        title="ई-पेपर"
        lede="समाचार पत्र के डिजिटल पृष्ठ कंप्यूटर, टैबलेट और मोबाइल पर। रोज़ाना सुबह नया संस्करण।"
      />

      <section className={`${styles.feature} reveal`} aria-label="आज का संस्करण">
        <Link
          className={styles.cover}
          href={epaperHref(current.id)}
          aria-label={`${current.label} पढ़ने के लिए`}
        >
          <span className={styles.coverMark} aria-hidden="true">
            ई
          </span>
          <span className={styles.coverRule} aria-hidden="true" />
          <span className={styles.coverDate}>{current.label}</span>
          <span className={styles.coverMeta}>PDF · {current.size}</span>
        </Link>

        <div className={styles.featureBody}>
          <h2 className={styles.featureTitle}>{current.blurb}</h2>
          <p className={styles.featureBlurb}>
            आज के अंक के सभी समाचार, लेख और विज्ञापन मूल पृष्ठ विन्यास सहित।
            एक ही PDF फाइल में संपूर्ण समाचार पत्र।
          </p>
          <p className={styles.featureNote}>
            रीडर में खोलने के लिए &quot;पढ़ें&quot; पर क्लिक करें। कंप्यूटर पर खोजने के लिए
            Ctrl+F (Mac पर Cmd+F) का उपयोग करें।
          </p>
          <div className={styles.actions}>
            <Link className={styles.readBtn} href={epaperHref(current.id)}>
              पढ़ें <span aria-hidden="true">→</span>
            </Link>
            <a className={styles.ghostBtn} href={current.file} download>
              डाउनलोड
            </a>
            <a
              className={styles.plainLink}
              href={current.file}
              target="_blank"
              rel="noreferrer"
            >
              नए टैब में खोलें
            </a>
          </div>
        </div>
      </section>

      <section aria-label="संस्करण">
        <div className={`${styles.archiveHead} reveal`}>
          <h2 className={styles.archiveTitle}>संस्करण आर्काइव</h2>
          <span className={styles.archiveNote}>
            {editions.length} संस्करण उपलब्ध
          </span>
        </div>

        <div className={styles.archiveLayout}>
          <div className={styles.archive}>
            {editions.map((edition, i) => (
              <div
                key={edition.id}
                className={`${styles.archiveRow} reveal`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div>
                  <Link
                    className={styles.archiveDate}
                    href={epaperHref(edition.id)}
                  >
                    {edition.label}
                  </Link>
                  <div className={styles.archiveMeta}>
                    <span>PDF</span>
                    <span>{edition.size}</span>
                  </div>
                </div>
                <Link className={styles.plainLink} href={epaperHref(edition.id)}>
                  पढ़ें <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Vertical Skyscraper Ad alongside archive */}
          <VerticalAd ad={verticalTowerAds[1]} />
        </div>
      </section>

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[3]} />
      </div>
    </main>
  );
}