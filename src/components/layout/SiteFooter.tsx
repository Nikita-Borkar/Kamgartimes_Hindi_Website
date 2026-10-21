import Link from "next/link";
import { categories, footer, site } from "@/data/site";
import { FacebookIcon, YoutubeIcon, InstagramIcon, TwitterXIcon, WhatsappIcon, TelegramIcon } from "@/components/ui/SocialIcons";
import styles from "./layout.module.css";

/** Resolves a section label to its /category/[slug] route, or the video/media desks. */
function sectionHref(label: string) {
  if (label === "होम") return "/";
  if (label === "वीडियो") return "/videos";
  if (label === "शॉर्ट्स") return "/shorts";
  if (label === "फोटो" || label === "गैलरी" || label === "फोटो गैलरी") return "/gallery";
  if (label === "ई-पेपर") return "/e-paper";
  const match = categories.find((category) => category.label === label);
  if (match) return `/category/${match.slug}`;
  return "#";
}

const colorfulSocials = [
  { id: "whatsapp", label: "व्हाट्सएप", icon: WhatsappIcon, href: "https://whatsapp.com" },
  { id: "facebook", label: "फेसबुक", icon: FacebookIcon, href: "https://facebook.com" },
  { id: "youtube", label: "यूट्यूब", icon: YoutubeIcon, href: "https://youtube.com" },
  { id: "instagram", label: "इंस्टाग्राम", icon: InstagramIcon, href: "https://instagram.com" },
  { id: "telegram", label: "टेलीग्राम", icon: TelegramIcon, href: "https://t.me" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.shell} ${styles.footerInner}`}>
        <div>
          <Link href="/" className={styles.footerLogoLink}>
            <img
              src="/img/logo_withtext.jpeg"
              alt="कामगार टाइम्स - जनसामान्य की बुलंद आवाज़..."
              className={styles.footerLogoImg}
            />
          </Link>
          <p className={styles.footerBlurb}>{site.tagline}</p>
          <div className={styles.socialsGroup}>
            {colorfulSocials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  className={styles.socialBtn}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <nav className={styles.footerLinks} aria-label="फ़ूटर नेविगेशन">
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
                className={`${styles.footerBtn}${
                  action.href === "/join-us" ? ` ${styles.footerBtnPrimary}` : ""
                }`}
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
