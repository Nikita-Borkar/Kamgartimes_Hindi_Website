"use client";

import { useState, useEffect } from "react";
import {
  Share2,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Check,
  Copy,
} from "lucide-react";
import {
  FacebookIcon,
  TwitterXIcon,
  WhatsappIcon,
  TelegramIcon,
} from "./SocialIcons";
import styles from "./ui.module.css";

interface NewsShareBarProps {
  title: string;
  url?: string;
  excerpt?: string;
  compact?: boolean;
}

export function NewsShareBar({
  title,
  url,
  excerpt,
  compact = false,
}: NewsShareBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>(url || "https://kamgartimes.com");

  useEffect(() => {
    if (url) return;
    const timer = window.setTimeout(() => {
      if (typeof window !== "undefined") {
        setShareUrl(window.location.href);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [url]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt || title,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopyLink(e);
    }
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleListen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("आपके ब्राउज़र में ऑडियो प्लेबैक सपोर्ट उपलब्ध नहीं है।");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${title}. ${excerpt || ""}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "hi-IN";
    utterance.rate = 0.9;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const iconSize = compact ? 13 : 16;

  const socialButtons = [
    {
      id: "share",
      component: () => <Share2 size={iconSize} strokeWidth={2.2} />,
      label: "शेयर करें",
      color: "#64748b",
      bg: "#f1f5f9",
      onClick: handleShare,
    },
    {
      id: "whatsapp",
      component: () => <WhatsappIcon size={compact ? 13 : 16} />,
      label: "व्हाट्सएप",
      color: "#25D366",
      bg: "#e7fce9",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      id: "facebook",
      component: () => <FacebookIcon size={compact ? 13 : 16} />,
      label: "फेसबुक",
      color: "#1877F2",
      bg: "#e7f0fd",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      id: "twitter",
      component: () => <TwitterXIcon size={compact ? 12 : 15} />,
      label: "एक्स (ट्विटर)",
      color: "#0f1419",
      bg: "#f1f5f9",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      id: "telegram",
      component: () => <TelegramIcon size={compact ? 13 : 16} />,
      label: "टेलीग्राम",
      color: "#229ED9",
      bg: "#e4f5fc",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ];

  return (
    <div
      className={`${styles.newsShareBar} ${compact ? styles.compactShareBar : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.shareIconGroup}>
        {socialButtons.map((btn) => {
          const RenderIcon = btn.component;
          if (btn.href) {
            return (
              <a
                key={btn.id}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareBtn}
                title={btn.label}
                aria-label={btn.label}
                style={{ color: btn.color, backgroundColor: btn.bg }}
                onClick={(e) => e.stopPropagation()}
              >
                <RenderIcon />
              </a>
            );
          }
          return (
            <button
              key={btn.id}
              type="button"
              className={styles.shareBtn}
              title={btn.label}
              aria-label={btn.label}
              style={{ color: btn.color, backgroundColor: btn.bg }}
              onClick={btn.onClick}
            >
              <RenderIcon />
            </button>
          );
        })}

        <div className={styles.moreWrapper}>
          <button
            type="button"
            className={styles.shareBtn}
            title="अधिक विकल्प (लिंक कॉपी करें)"
            aria-label="अधिक विकल्प"
            style={{ color: "#475569", backgroundColor: "#f1f5f9" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowMore(!showMore);
            }}
          >
            <MoreHorizontal size={iconSize} strokeWidth={2.2} />
          </button>

          {showMore && (
            <div className={styles.moreMenu}>
              <button
                type="button"
                className={styles.moreMenuItem}
                onClick={handleCopyLink}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "कॉपी हो गया!" : "लिंक कॉपी करें"}</span>
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.shareBtn}
          title={isPlaying ? "ऑडियो रोकें" : "समाचार सुनें"}
          aria-label={isPlaying ? "ऑडियो रोकें" : "समाचार सुनें"}
          style={{
            color: isPlaying ? "#ffffff" : "#d32f2f",
            backgroundColor: isPlaying ? "#d32f2f" : "#fef2f2",
          }}
          onClick={handleListen}
        >
          {isPlaying ? (
            <VolumeX size={iconSize} strokeWidth={2.2} />
          ) : (
            <Volume2 size={iconSize} strokeWidth={2.2} />
          )}
        </button>
      </div>
    </div>
  );
}
