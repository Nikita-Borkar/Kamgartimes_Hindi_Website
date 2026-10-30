"use client";

import Image from "next/image";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import styles from "./themeAwareSiteLogo.module.css";

interface ThemeAwareSiteLogoProps {
  alt: string;
  className: string;
  width: number;
  height: number;
}

export function ThemeAwareSiteLogo({
  alt,
  className,
  width,
  height,
}: ThemeAwareSiteLogoProps) {
  const { logoLightUrl, logoDarkUrl } = useSiteSettings();

  return (
    <>
      <Image
        src={logoLightUrl}
        alt={alt}
        className={`${styles.logo} ${styles.lightLogo} ${className}`}
        width={width}
        height={height}
        unoptimized
      />
      <Image
        src={logoDarkUrl}
        alt={alt}
        aria-hidden="true"
        className={`${styles.logo} ${styles.darkLogo} ${className}`}
        width={width}
        height={height}
        unoptimized
      />
    </>
  );
}
