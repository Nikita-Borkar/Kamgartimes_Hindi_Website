"use client";

import { useState, useEffect } from "react";
import {
  Share2,
  MessageCircle,
  Send,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Check,
  Copy,
} from "lucide-react";
import styles from "./ui.module.css";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterXIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

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
    if (!url && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
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
      alert("तुमच्या ब्राऊझरमध्ये ऑडिओ प्लेबॅक सपोर्ट उपलब्ध नाही.");
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
    utterance.lang = "mr-IN";
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
      label: "शेअर करा",
      color: "#64748b",
      bg: "#f1f5f9",
      onClick: handleShare,
    },
    {
      id: "whatsapp",
      component: () => <MessageCircle size={iconSize} strokeWidth={2.2} />,
      label: "व्हॉट्सॲप",
      color: "#25D366",
      bg: "#e7fce9",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      id: "facebook",
      component: () => <FacebookIcon size={iconSize} />,
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
      component: () => <Send size={iconSize} strokeWidth={2.2} />,
      label: "टेलिग्राम",
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
            title="अधिक पर्याय (लिंक कॉपी करा)"
            aria-label="अधिक पर्याय"
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
                <span>{copied ? "कॉपी झाले!" : "लिंक कॉपी करा"}</span>
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.shareBtn}
          title={isPlaying ? "ऑडिओ थांबवा" : "बातमी ऐका"}
          aria-label={isPlaying ? "ऑडिओ थांबवा" : "बातमी ऐका"}
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
