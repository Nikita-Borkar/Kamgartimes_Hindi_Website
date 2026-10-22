"use client";

import { useEffect, useState } from "react";
import { Bell, ChevronUp } from "lucide-react";
import styles from "./floating.module.css";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=918055502228&text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20%E0%A4%95%E0%A4%BE%E0%A4%AE%E0%A4%97%E0%A4%BE%E0%A4%B0%20%E0%A4%9F%E0%A4%BE%E0%A4%87%E0%A4%AE%E0%A5%8D%E0%A4%B8";

function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.55C9.34 7.55 9.03 7.62 8.77 7.9C8.52 8.17 7.8 8.84 7.8 10.22C7.8 11.6 8.8 12.93 8.94 13.12C9.08 13.31 10.9 16.12 13.69 17.32C14.35 17.61 14.86 17.78 15.26 17.91C15.93 18.12 16.54 18.09 17.02 18.02C17.56 17.94 18.68 17.34 18.91 16.7C19.14 16.05 19.14 15.5 19.07 15.38C19 15.27 18.81 15.2 18.53 15.06C18.25 14.92 16.9 14.25 16.65 14.16C16.4 14.07 16.22 14.02 16.03 14.3C15.85 14.58 15.33 15.2 15.17 15.38C15.01 15.57 14.85 15.59 14.57 15.45C14.29 15.31 13.39 15.02 12.32 14.06C11.49 13.32 10.93 12.4 10.79 12.16C10.65 11.92 10.77 11.79 10.91 11.65C11.04 11.52 11.2 11.31 11.34 11.15C11.48 10.99 11.53 10.87 11.62 10.69C11.71 10.5 11.67 10.34 11.6 10.2C11.53 10.06 10.97 8.69 10.74 8.13C10.51 7.59 10.28 7.66 10.1 7.65C9.94 7.65 9.75 7.64 9.56 7.64L9.53 7.55Z" />
    </svg>
  );
}

export function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 750);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenBell = () => {
    window.dispatchEvent(new CustomEvent("open-notification-prompt"));
  };

  return (
    <aside className={styles.floatingDock} aria-label="त्वरित कार्य एवं सहायता">
      {/* Scroll to Top */}
      <div className={styles.btnWrap}>
        <button
          type="button"
          onClick={handleScrollTop}
          className={styles.scrollTopBtn}
          data-visible={showTop}
          aria-hidden={!showTop}
          tabIndex={showTop ? 0 : -1}
          aria-label="ऊपर जाएं"
          title="ऊपर जाएं"
        >
          <ChevronUp size={22} strokeWidth={2.5} />
        </button>
        <span className={styles.tooltip}>ऊपर जाएं</span>
      </div>

      {/* WhatsApp Button */}
      <div className={styles.btnWrap}>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappBtn}
          aria-label="व्हाट्सएप पर चैट करें"
          title="व्हाट्सएप पर चैट करें"
        >
          <WhatsAppIcon size={28} />
        </a>
        <span className={styles.tooltip}>व्हाट्सएप चैट</span>
      </div>

      {/* Red Bell Button (Matching User Image 2) */}
      <div className={styles.btnWrap}>
        <button
          type="button"
          onClick={handleOpenBell}
          className={styles.bellBtn}
          aria-label="ताज़ा समाचारों के नोटिफिकेशन प्राप्त करें"
          title="ताज़ा समाचारों के नोटिफिकेशन प्राप्त करें"
        >
          <div className={styles.bellInnerRing}>
            <Bell size={19} strokeWidth={2.4} fill="#ffffff" className={styles.bellIcon} />
          </div>
        </button>
        <span className={styles.tooltip}>सूचनाएं (Notifications)</span>
      </div>
    </aside>
  );
}
