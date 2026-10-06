import Link from "next/link";
import { site, socialLinks } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./layout.module.css";

/**
 * The masthead wordmark. It carries the page's single h1, so the site name is
 * the first thing a screen reader and a crawler meet.
 */
function Logo() {
  return (
    <h1 className={styles.wordmark}>
      <span className={styles.mark} aria-hidden="true">
        {site.mark}
      </span>
      {site.name}
    </h1>
  );
}

export function TopBar() {
  return (
    <div className={`${styles.shell} ${styles.topBar}`}>
      <p className={styles.edition}>
        {site.edition} · {site.editionTime}
        <span className={styles.lang}>{site.language}</span>
      </p>

      <Link
        className={styles.logo}
        href="/"
        aria-label={`${site.name} - मुख्यपृष्ठ`}
      >
        <Logo />
      </Link>

      <div className={styles.actions}>
        <a className={styles.wa} href="#">
          व्हॉट्सॲपवर जोडा
        </a>
        <span className={`${styles.dot} ${styles.avatar}`} aria-hidden="true" />
        {socialLinks
          .filter((s) => s.id !== "whatsapp")
          .map((s) => (
            <a key={s.id} className={styles.dot} href={s.href} aria-label={s.label}>
              {s.short}
            </a>
          ))}
        <ThemeToggle />
      </div>
    </div>
  );
}
