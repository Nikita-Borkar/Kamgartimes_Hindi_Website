import Link from "next/link";
import { latestEdition, epaperEditions } from "@/data/epaper";
import { epaperHref } from "@/lib/links";
import { VerticalAd } from "@/components/ui/VerticalAd";
import { AdSlot } from "@/components/ui/AdSlot";
import { verticalTowerAds, leaderboardAds } from "@/data/ads";
import { PageHero } from "./PageHero";
import styles from "./epaper.module.css";

/** /e-paper — today's edition with a "cover" card, then the archive rows with vertical sponsor ad. */
export function EpaperListingPage() {
  const current = latestEdition;

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
            {epaperEditions.length} संस्करण उपलब्ध
          </span>
        </div>

        <div className={styles.archiveLayout}>
          <div className={styles.archive}>
            {epaperEditions.map((edition, i) => (
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