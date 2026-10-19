import Link from "next/link";
import styles from "./pages.module.css";

/**
 * Top of every internal page: breadcrumb, banner with crimson bar, updated
 * dateline and the serif lede. Shared by the utility pages and by donate /
 * advertise so the paper rhythm is identical across all of them.
 */
export function PageHero({
  eyebrow,
  title,
  updated,
  lede,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  lede?: string;
}) {
  return (
    <>
      <nav className={styles.crumbs} aria-label="पेज पथ">
        <Link className={styles.crumbLink} href="/">
          मुख्य पृष्ठ
        </Link>
        <span className={styles.crumbSep} aria-hidden="true">
          /
        </span>
        <span className={styles.crumbCurrent}>{eyebrow}</span>
      </nav>

      <header className={`${styles.head} reveal`}>
        <h1 className={styles.title}>
          <span className={styles.titleBar} aria-hidden="true" />
          {title}
        </h1>
        {updated && <p className={styles.updated}>{updated}</p>}
      </header>

      {lede && <p className={`${styles.lede} reveal`}>{lede}</p>}
    </>
  );
}