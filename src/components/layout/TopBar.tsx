import Link from "next/link";
import { User } from "lucide-react";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { FacebookIcon, YoutubeIcon, InstagramIcon, TwitterXIcon, WhatsappIcon } from "@/components/ui/SocialIcons";
import styles from "./layout.module.css";

const colorfulSocials = [
  { id: "whatsapp", label: "व्हॉट्सॲप", icon: WhatsappIcon, href: "https://whatsapp.com" },
  { id: "facebook", label: "फेसबुक", icon: FacebookIcon, href: "https://facebook.com" },
  { id: "youtube", label: "यूट्यूब", icon: YoutubeIcon, href: "https://youtube.com" },
  { id: "instagram", label: "इन्स्टाग्राम", icon: InstagramIcon, href: "https://instagram.com" },
  { id: "x", label: "एक्स", icon: TwitterXIcon, href: "https://x.com" },
];

export function TopBar() {
  return (
    <div className={`${styles.shell} ${styles.topBar}`}>
      <p className={styles.edition}>
        {site.edition} · {site.editionTime}
        <span className={styles.lang}>{site.language}</span>
      </p>

      <Link
        className={styles.headerLogoLink}
        href="/"
        aria-label={`${site.name} - जनसामान्यांचा बुलंद आवाज...`}
      >
        <img
          src="/img/logo_withtext.jpeg"
          alt="कामगार टाइम्स - जनसामान्यांचा बुलंद आवाज..."
          className={styles.headerLogoImg}
        />
      </Link>

      <div className={styles.actions}>
        <div className={styles.topSocials}>
          {colorfulSocials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.id}
                className={styles.topSocialDot}
                href={s.href}
                aria-label={s.label}
                title={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <Link
          className={styles.loginDotHeader}
          href="/login"
          aria-label="लॉग इन"
          title="लॉग इन करा"
        >
          <User size={18} strokeWidth={2} aria-hidden="true" />
        </Link>

        <ThemeToggle />
      </div>
    </div>
  );
}
