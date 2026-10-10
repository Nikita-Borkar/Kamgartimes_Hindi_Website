import Link from "next/link";
import { companyLinks } from "@/data/site";
import styles from "./pages.module.css";

/**
 * Hairline-separated band at the foot of every internal page. Links to the
 * other company pages so a reader landing on a legal page can keep moving.
 */
export function RelatedLinks({ currentHref }: { currentHref?: string }) {
  const links = companyLinks.filter((link) => link.href !== currentHref);

  return (
    <nav className={styles.related} aria-label="इतर माहिती पाने">
      <h2 className={styles.relatedTitle}>इतर माहिती</h2>
      <div className={styles.relatedLinks}>
        {links.map((link) => (
          <Link key={link.href} className={styles.relatedLink} href={link.href}>
            {link.label}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}