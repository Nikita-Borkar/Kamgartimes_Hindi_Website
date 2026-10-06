import { footer, site, socialLinks } from "@/data/site";
import styles from "./layout.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.shell} ${styles.footerInner}`}>
        <div>
          <p className={styles.footerBrand}>
            <span className={styles.mark} aria-hidden="true">
              {site.mark}
            </span>
            {site.name}
          </p>
          <p className={styles.footerBlurb}>{site.tagline}</p>
          <div className={styles.socials}>
            {socialLinks.map((s) => (
              <a
                key={s.id}
                className={styles.social}
                href={s.href}
                aria-label={s.label}
              >
                {s.short}
              </a>
            ))}
          </div>
        </div>

        <div>
          <nav className={styles.footerLinks} aria-label="फुटर">
            {footer.sectionLinks.map((label) => (
              <a key={label} className={styles.footerLink} href="#">
                {label}
              </a>
            ))}
          </nav>
          <div className={styles.footerActions}>
            {footer.actions.map((label) => (
              <a key={label} className={styles.footerBtn} href="#">
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerColTitle}>
            {footer.sections[0].title}
          </h4>
          {footer.sections[0].links.map((label) => (
            <a key={label} className={styles.footerLink} href="#">
              {label}
            </a>
          ))}
          <div className={styles.storeRow}>
            {footer.stores.map((label) => (
              <a key={label} className={styles.storeBtn} href="#">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.copy}>{footer.copyright}</div>
    </footer>
  );
}
