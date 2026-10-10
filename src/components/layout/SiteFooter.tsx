import Link from "next/link";
import { categories, footer, site, socialLinks } from "@/data/site";
import styles from "./layout.module.css";

/** Resolves a section label to its /category/[slug] route, or the video desk. */
function sectionHref(label: string) {
  const match = categories.find((category) => category.label === label);
  if (match) return `/category/${match.slug}`;
  if (label === "व्हिडिओ") return "/videos";
  if (label === "शॉर्ट्स") return "/shorts";
  if (label === "फोटो") return "/gallery";
  if (label === "ई-पेपर") return "/e-paper";
  return "#";
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.shell} ${styles.footerInner}`}>
        <div>
          <p className={styles.footerBrand}>
            <img
              className={styles.logoImg}
              src="/img/logo.png"
              alt=""
              width={42}
              height={42}
            />
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
              <Link
                key={label}
                className={styles.footerLink}
                href={sectionHref(label)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className={styles.footerActions}>
            {footer.actions.map((action) => (
              <Link
                key={action.href}
                className={styles.footerBtn}
                href={action.href}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerColTitle}>{footer.sections[0].title}</h4>
          {footer.sections[0].links.map((link) => (
            <Link
              key={link.href}
              className={styles.footerLink}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.copy}>{footer.copyright}</div>
    </footer>
  );
}
