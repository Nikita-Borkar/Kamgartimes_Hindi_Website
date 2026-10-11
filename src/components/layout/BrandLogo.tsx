import styles from "./layout.module.css";

interface BrandLogoProps {
  light?: boolean;
}

export function BrandLogo({ light = false }: BrandLogoProps) {
  return (
    <div className={styles.exactBrandLogo}>
      {/* Logo emblem image only */}
      <img
        src="/img/real_logo.png"
        alt="कामगार टाइम्स"
        className={styles.exactLogoBadge}
      />

      {/* Code-rendered typography matching 2nd reference image */}
      <div className={styles.exactTextColumn}>
        <div className={styles.exactHeaderTopRow}>
          <span className={`${styles.exactTagline} ${light ? styles.exactTaglineLight : ""}`}>
            जनसामान्यांचा बुलंद आवाज...
          </span>
        </div>
        <div className={`${styles.exactRedLine} ${light ? styles.exactRedLineLight : ""}`} />
        <div className={`${styles.exactBrandTitle} ${light ? styles.exactBrandTitleLight : ""}`}>
          <span className={styles.wordKamgar}>कामगार</span>
          <span className={styles.wordTimes}>टाइम्स</span>
        </div>
      </div>
    </div>
  );
}
