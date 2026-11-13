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

  const safeLightLogo =
    hasSeparateTextLight && (logoLightUrl.includes("logo_withtext") || logoLightUrl.includes("logo-wordmark"))
      ? "/img/real_logo.png"
      : logoLightUrl;

  const safeDarkLogo =
    hasSeparateTextDark && (logoDarkUrl.includes("logo_withtext") || logoDarkUrl.includes("logo-wordmark"))
      ? "/img/real_logo.png"
      : logoDarkUrl;

  const isCompact = height <= 48;
  const emblemDim = hasSeparateTextLight || hasSeparateTextDark
    ? (isCompact ? Math.min(40, height) : 52)
    : width;
  const emblemHeight = hasSeparateTextLight || hasSeparateTextDark
    ? (isCompact ? Math.min(40, height) : 52)
    : height;
  const textWidth = isCompact
    ? Math.max(160, width > 50 ? width - emblemDim : 180)
    : Math.max(380, width > 60 ? width - 56 : 380);
  const textHeight = isCompact ? height : Math.max(56, height);

  return (
    <>
      <div className={`${styles.brandRow} ${styles.lightLogo} ${className}`}>
        <Image
          src={safeLightLogo}
          alt={alt}
          className={`${styles.logo} ${hasSeparateTextLight ? styles.logoEmblem : ""}`}
          width={emblemDim}
          height={emblemHeight}
          unoptimized
          priority
        />
        {hasSeparateTextLight && (
          <Image
            src={textLogoLightUrl}
            alt="Kamgar Times"
            className={styles.textLogo}
            width={textWidth}
            height={textHeight}
            unoptimized
            priority
          />
        )}
      </div>

      <div className={`${styles.brandRow} ${styles.darkLogo} ${className}`} aria-hidden="true">
        <Image
          src={safeDarkLogo}
          alt={alt}
          className={`${styles.logo} ${hasSeparateTextDark ? styles.logoEmblem : ""}`}
          width={emblemDim}
          height={emblemHeight}
          unoptimized
          priority
        />
        {hasSeparateTextDark && (
          <Image
            src={textLogoDarkUrl || textLogoLightUrl}
            alt="Kamgar Times"
            className={styles.textLogo}
            width={textWidth}
            height={textHeight}
            unoptimized
            priority
          />
        )}
      </div>
    </>
  );
}
