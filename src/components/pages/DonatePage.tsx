import type { DonatePageData } from "@/data/types";
import { BankDetails } from "./BankDetails";
import { PageHero } from "./PageHero";
import { RelatedLinks } from "./RelatedLinks";
import styles from "./pages.module.css";

/**
 * Donation page: editorial appeal in the body column, a sticky QR rail on the
 * right, then the impact-allocation band and the bank account block below.
 */
export function DonatePage({ page }: { page: DonatePageData }) {
  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        updated={page.updated}
        lede={page.lede}
      />

      <div className={styles.layout}>
        <div className={`${styles.body} reveal`}>
          <div className={styles.prose}>
            {page.intro.map((para) => (
              <p key={para} className={styles.para}>
                {para}
              </p>
            ))}
          </div>

          {page.sections.map((section) => (
            <section key={section.id} className={styles.section}>
              <h2 className={styles.sectionHead}>
                <span className={styles.sectionBar} aria-hidden="true" />
                {section.heading}
              </h2>
              <div className={styles.sectionBody}>
                {section.paragraphs?.map((para) => (
                  <p key={para} className={styles.para}>
                    {para}
                  </p>
                ))}
                {section.list && (
                  <ul className={styles.list}>
                    {section.list.map((item) => (
                      <li key={item} className={styles.listItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <p className={styles.note}>{page.note}</p>
        </div>

        <aside className={`${styles.aside} reveal`}>
          <figure className={styles.qrBox}>
            <img
              className={styles.qrImg}
              src={page.qr.src}
              alt={page.qr.alt}
              width={200}
              height={200}
            />
            <figcaption className={styles.qrCaption}>
              {page.qr.caption}
            </figcaption>
          </figure>
          <p className={styles.qrUpi}>{page.qr.upi}</p>
        </aside>
      </div>

      <RelatedLinks currentHref={`/${page.slug}`} />
    </main>
  );
}
