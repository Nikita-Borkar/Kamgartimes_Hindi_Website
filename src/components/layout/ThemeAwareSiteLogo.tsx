"use client";

import Image from "next/image";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import styles from "./themeAwareSiteLogo.module.css";

interface ThemeAwareSiteLogoProps {
  alt: string;
  className?: string;
  width: number;
  height: number;
}

export function ThemeAwareSiteLogo({
  alt,
  className = "",
  width,
  height,
}: ThemeAwareSiteLogoProps) {
  const { logoLightUrl, logoDarkUrl, textLogoLightUrl, textLogoDarkUrl } = useSiteSettings();

  const hasSeparateTextLight = Boolean(textLogoLightUrl && textLogoLightUrl.trim());
  const hasSeparateTextDark = Boolean((textLogoDarkUrl || textLogoLightUrl)?.trim());

  return (
    <>
      <div className={`${styles.brandRow} ${styles.lightLogo} ${className}`}>
        <Image
          src={logoLightUrl}
          alt={alt}
          className={styles.logo}
          width={hasSeparateTextLight ? 48 : width}
          height={hasSeparateTextLight ? 48 : height}
          unoptimized
        />
        {hasSeparateTextLight && (
          <Image
            src={textLogoLightUrl}
            alt="Kamgar Times"
            className={styles.textLogo}
            width={width > 56 ? width - 56 : 180}
            height={height}
            unoptimized
          />
        )}
      </div>

      <div className={`${styles.brandRow} ${styles.darkLogo} ${className}`} aria-hidden="true">
        <Image
          src={logoDarkUrl}
          alt={alt}
          className={styles.logo}
          width={hasSeparateTextDark ? 48 : width}
          height={hasSeparateTextDark ? 48 : height}
          unoptimized
        />
        {hasSeparateTextDark && (
          <Image
            src={textLogoDarkUrl || textLogoLightUrl}
            alt="Kamgar Times"
            className={styles.textLogo}
            width={width > 56 ? width - 56 : 180}
            height={height}
            unoptimized
          />
        )}
      </div>
    </>
  );
}
