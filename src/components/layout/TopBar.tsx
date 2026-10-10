import Link from "next/link";
import { User } from "lucide-react";
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
      <img
        className={styles.logoImg}
        src="/img/logo.png"
        alt=""
        width={42}
        height={42}
      />
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
        <Link
          className={`${styles.dot} ${styles.avatar}`}
          href="/login"
          aria-label="लॉग इन किंवा नोंदणी"
        >
          <User size={18} strokeWidth={2} aria-hidden="true" />
        </Link>
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
