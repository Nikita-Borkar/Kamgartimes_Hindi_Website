"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categories, footer, site } from "@/data/site";
import {
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
  TwitterXIcon,
  WhatsappIcon,
  TelegramIcon,
} from "@/components/ui/SocialIcons";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import styles from "./layout.module.css";
import { categoryHref } from "@/lib/links";

/** Resolves a section label to its /category/[slug] route, or the video/media desks. */
function sectionHref(label: string) {
  if (label === "होम") return "/";
  if (label === "वीडियो") return "/videos";
  if (label === "शॉर्ट्स") return "/shorts";
  if (label === "फोटो" || label === "गैलरी" || label === "फोटो गैलरी") return "/gallery";
  if (label === "ई-पेपर") return "/e-paper";
  return categoryHref(label);
}

const defaultSocials = [
  { id: "whatsapp", label: "व्हाट्सएप", icon: WhatsappIcon, fallback: "https://chat.whatsapp.com/kamgartimes" },
  { id: "facebook", label: "फेसबुक", icon: FacebookIcon, fallback: "https://facebook.com/kamgartimes" },
  { id: "youtube", label: "यूट्यूब", icon: YoutubeIcon, fallback: "https://youtube.com/@kamgartimes" },
  { id: "instagram", label: "इंस्टाग्राम", icon: InstagramIcon, fallback: "https://instagram.com/kamgartimes" },
  { id: "x", label: "एक्स (ट्विटर)", icon: TwitterXIcon, fallback: "https://twitter.com/kamgartimes" },
  { id: "telegram", label: "टेलीग्राम", icon: TelegramIcon, fallback: "https://t.me" },
];

interface SiteFooterProps {
  withNoticeTicker?: boolean;
}

export function SiteFooter({ withNoticeTicker = false }: SiteFooterProps = {}) {
  const { siteName, tagline, logoUrl, getSocialUrl } = useSiteSettings();
  const [logoSrc, setLogoSrc] = useState<string>("/img/logo_withtext.jpeg");

  useEffect(() => {
    if (logoUrl && logoUrl !== "/img/logo_withtext.jpeg") {
      setLogoSrc(logoUrl);
    } else {
      setLogoSrc("/img/logo_withtext.jpeg");
    }
  }, [logoUrl]);

  return (
    <footer className={styles.footer}>
      <div className={`${styles.shell} ${styles.footerInner}`}>
        <div>
          <Link href="/" className={styles.footerLogoLink} aria-label={`${siteName} - ${tagline}`}>
            <Image
              src={logoSrc}
              alt={`${siteName} - ${tagline}`}
              className={styles.footerLogoImg}
              width={220}
              height={55}
              unoptimized
              onError={() => setLogoSrc("/img/logo_withtext.jpeg")}
            />
          </Link>
          <p className={styles.footerBlurb}>{tagline}</p>
          <div className={styles.socialsGroup}>
            {defaultSocials.map((s) => {
              const Icon = s.icon;
              const href = getSocialUrl(s.id, s.fallback);

              return (
                <a
                  key={s.id}
                  className={styles.socialBtn}
                  href={href}
                  aria-label={s.label}
                  title={`${siteName} on ${s.label}`}
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

      <div
        className={`${styles.copy} ${withNoticeTicker ? styles.copyWithTicker : ""}`}
      >
        <div className={styles.copyInner}>
          <p className={styles.copyText}>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
