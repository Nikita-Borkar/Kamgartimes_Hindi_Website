import type { AdvertisePageData } from "@/data/types";
import { AdvertiseForm } from "./AdvertiseForm";
import { BankDetails } from "./BankDetails";
import { PageHero } from "./PageHero";
import styles from "./pages.module.css";

/**
 * Advertising page: enquiry form on the left, the marketing pitch and ad
 * sizes on the right, bank details and the payment call-to-action below.
 */
export function AdvertisePage({ page }: { page: AdvertisePageData }) {
  return (
    <main id="main" className={styles.main}>
      <PageHero eyebrow={page.eyebrow} title={page.title} />

      <div className={`${styles.advertiseGrid} reveal`}>
        <section className={styles.formPanel}>
          <AdvertiseForm />
        </section>

        <aside className={styles.details}>
          <h2 className={styles.promoHeading}>{page.promo.heading}</h2>
          <p className={styles.promoBody}>{page.promo.body}</p>
          <ul className={styles.promoList}>
            {page.promo.lines.map((line) => (
              <li key={line} className={styles.promoItem}>
                {line}
              </li>
            ))}
          </ul>
          <p className={styles.promoBody}>{page.promo.closing}</p>
          <ul className={styles.sizeList}>
            {page.promo.sizes.map((size) => (
              <li key={size} className={styles.sizeItem}>
                {size}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <BankDetails data={page.bank} />

      <div className={`${styles.payNowRow} reveal`}>
        <button className={styles.payNow} type="button">
          {page.payNow}
        </button>
      </div>
    </main>
  );
}
