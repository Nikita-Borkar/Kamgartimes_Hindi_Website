import Link from "next/link";
import { latestEdition, epaperEditions } from "@/data/epaper";
import { epaperHref } from "@/lib/links";
import { PageHero } from "./PageHero";
import styles from "./epaper.module.css";

/** /e-paper — today's edition with a "cover" card, then the archive rows. */
export function EpaperListingPage() {
  const current = latestEdition;

  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="ई-पेपर"
        title="ई-पेपर"
        lede="वर्तमानपत्राची प्रत्यक्ष पाने संगणकावर, टॅबलेटवर आणि मोबाइलवर. दररोज सकाळी नवी आवृत्ती."
      />

      <section className={`${styles.feature} reveal`} aria-label="आजची आवृत्ती">
        <Link
          className={styles.cover}
          href={epaperHref(current.id)}
          aria-label={`${current.label} वाचण्यासाठी`}
        >
          <span className={styles.coverMark} aria-hidden="true">
            प
          </span>
          <span className={styles.coverRule} aria-hidden="true" />
          <span className={styles.coverDate}>{current.label}</span>
          <span className={styles.coverMeta}>PDF · {current.size}</span>
        </Link>

        <div className={styles.featureBody}>
          <h2 className={styles.featureTitle}>{current.blurb}</h2>
          <p className={styles.featureBlurb}>
            आजच्या अंकाची सर्व बातम्या, लेख आणि जाहिराती मूळ पृष्ठ-मांडणीसह.
            एकाच PDF फाईलमध्ये संपूर्ण वर्तमानपत्र.
          </p>
          <p className={styles.featureNote}>
            वाचन क्षेत्रात उघडण्यासाठी &quot;वाचा&quot; वर क्लिक करा. संगणकावर शोधण्यासाठी
            Ctrl+F (मॅकवर Cmd+F) वापरा.
          </p>
          <div className={styles.actions}>
            <Link className={styles.readBtn} href={epaperHref(current.id)}>
              वाचा <span aria-hidden="true">→</span>
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
              नवीन टॅबमध्ये उघडा
            </a>
          </div>
        </div>
      </section>

      <section aria-label="आवृत्त्या">
        <div className={`${styles.archiveHead} reveal`}>
          <h2 className={styles.archiveTitle}>आवृत्त्या</h2>
          <span className={styles.archiveNote}>
            {epaperEditions.length} आवृत्ती उपलब्ध
          </span>
        </div>

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
                वाचा <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}