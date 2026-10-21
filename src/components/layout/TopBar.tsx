import Link from "next/link";
import { User, Mic } from "lucide-react";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageTranslator } from "./LanguageTranslator";
import { FacebookIcon, YoutubeIcon, InstagramIcon, TwitterXIcon, WhatsappIcon } from "@/components/ui/SocialIcons";
import styles from "./layout.module.css";

const colorfulSocials = [
  { id: "whatsapp", label: "व्हाट्सएप", icon: WhatsappIcon, href: "https://whatsapp.com" },
  { id: "facebook", label: "फेसबुक", icon: FacebookIcon, href: "https://facebook.com" },
  { id: "youtube", label: "यूट्यूब", icon: YoutubeIcon, href: "https://youtube.com" },
  { id: "instagram", label: "इंस्टाग्राम", icon: InstagramIcon, href: "https://instagram.com" },
  { id: "x", label: "एक्स", icon: TwitterXIcon, href: "https://x.com" },
];

export function TopBar() {
  return (
    <div className={`${styles.shell} ${styles.topBar}`}>
      <div className={styles.editionArea}>
        <p className={styles.edition}>
          {site.edition} · {site.editionTime}
        </p>
        <LanguageTranslator />
      </div>

      <Link
        className={styles.headerLogoLink}
        href="/"
        aria-label={`${site.name} - जनसामान्य की बुलंद आवाज़...`}
      >
        <img
          src="/img/logo_withtext.jpeg"
          alt="कामगार टाइम्स - जनसामान्य की बुलंद आवाज़..."
          className={styles.headerLogoImg}
        />
      </Link>

      <div className={styles.actions}>
        <Link
          className={styles.joinUsBtnHeader}
          href="/join-us"
          aria-label="कामगार टाइम्स पत्रकार / प्रतिनिधी नियुक्ती अर्ज २०२६-२०२७"
          title="पत्रकार / प्रतिनिधी नियुक्ती अर्ज २०२६-२०२७"
        >
          <Mic size={14} strokeWidth={2.4} aria-hidden="true" />
          <span>पत्रकार बनें</span>
        </Link>

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
          title="लॉग इन करें"
        >
          <User size={18} strokeWidth={2} aria-hidden="true" />
        </Link>

        <ThemeToggle />
      </div>
    </div>
  );
}
