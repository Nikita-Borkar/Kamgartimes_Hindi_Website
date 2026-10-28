"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import {
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
  TwitterXIcon,
  WhatsappIcon,
  TelegramIcon,
} from "@/components/ui/SocialIcons";
import { kamgarApi, getAuthToken, clearAuthTokens } from "@/services/apiClient";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import type { UserProfile } from "@/types/api";
import styles from "./layout.module.css";

const defaultSocials = [
  { id: "whatsapp", label: "व्हाट्सएप", icon: WhatsappIcon, fallback: "https://chat.whatsapp.com/kamgartimes" },
  { id: "facebook", label: "फेसबुक", icon: FacebookIcon, fallback: "https://facebook.com/kamgartimes" },
  { id: "youtube", label: "यूट्यूब", icon: YoutubeIcon, fallback: "https://youtube.com/@kamgartimes" },
  { id: "instagram", label: "इंस्टाग्राम", icon: InstagramIcon, fallback: "https://instagram.com/kamgartimes" },
  { id: "x", label: "एक्स (Twitter)", icon: TwitterXIcon, fallback: "https://twitter.com/kamgartimes" },
  { id: "telegram", label: "टेलीग्राम", icon: TelegramIcon, fallback: "https://t.me" },
];

function formatHindiDate(date: Date = new Date()): string {
  // Ensure consistent IST date on server and client
  const istDateString = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const istDate = new Date(istDateString);

  const days = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
  const months = [
    "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
  ];
  const dayName = days[istDate.getDay()];
  const dayNum = istDate.getDate();
  const monthName = months[istDate.getMonth()];
  const year = istDate.getFullYear();

  return `${dayName}, ${dayNum} ${monthName} ${year}`;
}

export function TopBar() {
  const { siteName, tagline, logoUrl, getSocialUrl } = useSiteSettings();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [liveDate, setLiveDate] = useState<string>(() => formatHindiDate(new Date()));
  const [logoSrc, setLogoSrc] = useState<string>("/img/logo_withtext.jpeg");
  const [hasLogoError, setHasLogoError] = useState(false);

  // Sync logoSrc when logoUrl from site setting updates
  useEffect(() => {
    if (logoUrl && logoUrl !== "/img/logo_withtext.jpeg") {
      setLogoSrc(logoUrl);
      setHasLogoError(false);
    } else {
      setLogoSrc("/img/logo_withtext.jpeg");
    }
  }, [logoUrl]);

  // Dynamic live date in Hindi: updates on mount and every minute
  useEffect(() => {
    setLiveDate(formatHindiDate(new Date()));
    const timer = setInterval(() => {
      setLiveDate(formatHindiDate(new Date()));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Check user auth
  useEffect(() => {
    if (getAuthToken()) {
      kamgarApi
        .getMe()
        .then((profile) => {
          if (profile && profile.name) {
            setCurrentUser(profile);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleLogout = () => {
    clearAuthTokens();
    setCurrentUser(null);
    window.location.reload();
  };

  const handleLogoError = () => {
    if (!hasLogoError) {
      setHasLogoError(true);
      setLogoSrc("/img/logo_withtext.jpeg");
    }
  };

  return (
    <div className={`${styles.shell} ${styles.topBar}`}>
      {/* Left: Dynamic Live Hindi Edition / Date */}
      <div className={styles.editionArea}>
        <p className={styles.edition}>
          <span className={styles.editionDateText} suppressHydrationWarning>{liveDate}</span>
        </p>
      </div>

      {/* Center: Dynamic Brand Logo & Site Identity */}
      <Link
        className={styles.headerLogoLink}
        href="/"
        aria-label={`${siteName} - ${tagline}`}
        title={`${siteName} - ${tagline}`}
      >
        <Image
          src={logoSrc}
          alt={`${siteName} - ${tagline}`}
          className={styles.headerLogoImg}
          width={240}
          height={60}
          priority
          unoptimized
          onError={handleLogoError}
        />
      </Link>

      {/* Right: Dynamic Social Links, Auth, Theme Toggle */}
      <div className={styles.actions}>
        {/* Dynamic Social Media Links */}
        <div className={styles.topSocials}>
          {defaultSocials.map((s) => {
            const Icon = s.icon;
            const targetUrl = getSocialUrl(s.id, s.fallback);
            return (
              <a
                key={s.id}
                className={styles.topSocialDot}
                href={targetUrl}
                aria-label={s.label}
                title={`${siteName} on ${s.label}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        {/* User Account / Profile */}
        {currentUser ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--brand)",
                background: "var(--surface)",
                padding: "3px 8px",
                borderRadius: 12,
                border: "1px solid var(--border)",
              }}
              title={currentUser.email}
            >
              {currentUser.name}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className={styles.loginDotHeader}
              title="Logout"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <LogOut size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <Link
            className={styles.loginDotHeader}
            href="/login"
            aria-label="Login"
            title="Login"
          >
            <User size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        )}

        <ThemeToggle />
      </div>
    </div>
  );
}
