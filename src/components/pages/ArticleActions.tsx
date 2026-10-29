"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Link2,
  MessageCircle,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import {
  FacebookIcon,
  TwitterXIcon,
  WhatsappIcon,
} from "@/components/ui/SocialIcons";
import { kamgarApi, getAuthToken } from "@/services/apiClient";
import styles from "./article.module.css";

type Reaction = "LIKE" | "DISLIKE" | null;

export function ArticleActions({
  likes: initialLikes,
  dislikes: initialDislikes,
  commentCount,
  shareCount: initialShareCount,
  title,
  articleId,
}: {
  likes: number;
  dislikes: number;
  commentCount: number;
  shareCount: number;
  title: string;
  articleId?: string;
}) {
  const [reaction, setReaction] = useState<Reaction>(null);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [shares, setShares] = useState(initialShareCount);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (articleId) {
      kamgarApi
        .getArticleReactions(articleId)
        .then((data) => {
          if (data) {
            setLikes(data.likes);
            setDislikes(data.dislikes);
            setReaction(data.userReaction);
          }
        })
        .catch(() => {});
    }
  }, [articleId]);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const toggle = async (type: "LIKE" | "DISLIKE") => {
    if (!articleId) {
      setReaction((cur) => (cur === type ? null : type));
      return;
    }

    if (!getAuthToken()) {
      alert("प्रतिक्रिया देने के लिए कृपया लॉगिन करें। (Please login to react)");
      return;
    }

    try {
      const res = await kamgarApi.toggleArticleReaction(articleId, type);
      if (res) {
        setLikes(res.likes);
        setDislikes(res.dislikes);
        setReaction(res.userReaction);
      }
    } catch (err: any) {
      alert(err.message || "प्रतिक्रिया अपडेट करने में त्रुटि हुई।");
    }
  };

  const getUrl = () => typeof window === "undefined" ? "" : window.location.href;
  const recordShare = async () => {
    if (!articleId) return;
    try {
      const result = await kamgarApi.recordArticleShare(articleId);
      if (typeof result?.shares === "number") setShares(result.shares);
      else setShares((count) => count + 1);
    } catch {
      // Sharing should still work when analytics is unavailable.
    }
  };

  async function copyLink() {
    setShareError("");
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      await recordShare();
      window.setTimeout(() => setCopied(false), 2000);
      setOpen(false);
    } catch {
      setShareError("लिंक कॉपी नहीं हो सका। ब्राउज़र की अनुमति जाँचें।");
    }
  }

  async function onShare() {
    setShareError("");
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url: getUrl() });
        await recordShare();
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        setShareError("शेयर नहीं हो सका। नीचे दिए विकल्प आज़माएँ।");
      }
    }
    setOpen((value) => !value);
  }

  function onSocialShare() {
    void recordShare();
  }

  const url = getUrl();
  const shareText = encodeURIComponent(title);

  return (
    <div className={styles.actions} role="group" aria-label="समाचार पर प्रतिक्रिया">
      <button
        type="button"
        className={`${styles.action}${reaction === "LIKE" ? ` ${styles.actionOn}` : ""}`}
        aria-pressed={reaction === "LIKE"}
        onClick={() => toggle("LIKE")}
      >
        <ThumbsUp size={18} strokeWidth={2} aria-hidden="true" />
        पसंद
        <span className={styles.actionCount}>{likes}</span>
      </button>

      <button
        type="button"
        className={`${styles.action}${reaction === "DISLIKE" ? ` ${styles.actionOn}` : ""}`}
        aria-pressed={reaction === "DISLIKE"}
        onClick={() => toggle("DISLIKE")}
      >
        <ThumbsDown size={18} strokeWidth={2} aria-hidden="true" />
        नापसंद
        <span className={styles.actionCount}>{dislikes}</span>
      </button>

      <a className={styles.action} href="#comments">
        <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
        टिप्पणी
        <span className={styles.actionCount}>{commentCount}</span>
      </a>

      <div className={styles.shareWrap} ref={wrapRef}>
        <button
          type="button"
          className={styles.actionPrimary}
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={onShare}
        >
          <Share2 size={18} strokeWidth={2} aria-hidden="true" />
          शेयर
          <span className={styles.actionCount}>{shares}</span>
        </button>

        {open ? (
          <div className={styles.shareMenu} role="menu">
            <a
              className={styles.shareItem}
              role="menuitem"
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSocialShare}
            >
              <WhatsappIcon size={16} />
              व्हाट्सएप
            </a>
            <a
              className={styles.shareItem}
              role="menuitem"
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSocialShare}
            >
              <TwitterXIcon size={14} />
              एक्स (ट्विटर)
            </a>
            <a
              className={styles.shareItem}
              role="menuitem"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSocialShare}
            >
              <FacebookIcon size={16} />
              फेसबुक
            </a>
            <button
              type="button"
              className={styles.shareItem}
              role="menuitem"
              onClick={copyLink}
            >
              <Link2 size={16} strokeWidth={2} aria-hidden="true" />
              लिंक कॉपी करें
            </button>
          </div>
        ) : null}
      </div>

      {copied ? (
        <span className={`${styles.actionCount} ${styles.shareNote}`}>
          <Check size={14} strokeWidth={2} aria-hidden="true" /> लिंक कॉपी हो गई
        </span>
      ) : null}
      {shareError ? <span className={styles.shareNote} role="status">{shareError}</span> : null}
    </div>
  );
}
