import type { BankDetailsBlock } from "@/data/types";
import styles from "./pages.module.css";

/**
 * Two-up grid of account details (donate and advertise both need one). The
 * same hairlines and crimson bar as every other section on the internal pages.
 */
export function BankDetails({ data }: { data: BankDetailsBlock }) {
  return (
    <section className={`${styles.bank} reveal`}>
      <h2 className={styles.sectionHead}>
        <span className={styles.sectionBar} aria-hidden="true" />
        {data.title}
      </h2>
      <dl className={styles.bankGrid}>
        {data.items.map((item) => (
          <div key={item.label} className={styles.bankItem}>
            <dt className={styles.bankLabel}>{item.label}</dt>
            <dd className={styles.bankValue}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}