import Link from "next/link";
import styles from "./ui.module.css";

/**
 * Section heading: crimson bar, serif title, "see all" link on the right,
 * hairline underneath. The bar and the rule are what animate on reveal.
 */
export function SectionHeader({
  title,
  action = "सर्व पहा",
  href = "#",
}: {
  title: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className={styles.sectionHead}>
      <h2 className={`${styles.sectionTitle} reveal`}>
        <span className={`${styles.sectionBar} revealBar`} aria-hidden="true" />
        {title}
      </h2>
      <Link className={styles.sectionLink} href={href}>
        {action}
        <span aria-hidden="true"> →</span>
      </Link>
    </div>
  );
}
