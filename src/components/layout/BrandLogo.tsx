"use client";

import Image from "next/image";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import styles from "./layout.module.css";

interface BrandLogoProps {
  light?: boolean;
}

export function BrandLogo({ light = false }: BrandLogoProps) {
  const { siteName, tagline } = useSiteSettings();

  const parts = siteName.split(" ");
  const firstWord = parts[0] || "कामगार";
  const restWords = parts.slice(1).join(" ") || "टाइम्स";

  return (
    <div className={styles.exactBrandLogo}>
      {/* Logo emblem image */}
      <Image
        src="/img/real_logo.png"
        alt={siteName}
        className={styles.exactLogoBadge}
        width={48}
        height={48}
      />

      {/* Code-rendered typography matching reference image */}
      <div className={styles.exactTextColumn}>
        <div className={styles.exactHeaderTopRow}>
          <span className={`${styles.exactTagline} ${light ? styles.exactTaglineLight : ""}`}>
            {tagline}
          </span>
        </div>
        <div className={`${styles.exactRedLine} ${light ? styles.exactRedLineLight : ""}`} />
        <div className={`${styles.exactBrandTitle} ${light ? styles.exactBrandTitleLight : ""}`}>
          <span className={styles.wordKamgar}>{firstWord}</span>
          <span className={styles.wordTimes}>{restWords}</span>
        </div>
      </div>
    </div>
  );
}
