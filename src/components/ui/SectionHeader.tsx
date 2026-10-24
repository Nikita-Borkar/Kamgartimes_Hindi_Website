import Link from "next/link";
import { categoryHref } from "@/lib/links";
import styles from "./ui.module.css";

/**
 * Section heading: crimson bar, serif title, "see all" link on the right,
 * hairline underneath. The bar and the rule are what animate on reveal.
 */
export function SectionHeader({
  title,
  action = "सभी देखें",
  href,
}: {
  title: string;
  action?: string;
  href?: string;
}) {
  const targetHref = href && href !== "#" ? href : categoryHref(title);
  const cleanAction = (action || "सभी देखें").replace(/[\s→\->]+$/, "").trim();

  return (
    <div className={styles.sectionHead}>
      <h2 className={`${styles.sectionTitle} reveal`}>
        <span className={`${styles.sectionBar} revealBar`} aria-hidden="true" />
        <Link href={targetHref} className={styles.sectionTitleLink}>
          {title}
        </Link>
      </h2>
      <Link className={styles.sectionLink} href={targetHref}>
        <span className={styles.sectionLinkText}>{cleanAction}</span>
        <span className={styles.sectionArrow} aria-hidden="true"> →</span>
      </Link>
    </div>
  );
}

