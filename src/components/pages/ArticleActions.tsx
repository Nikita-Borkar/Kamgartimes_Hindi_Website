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
import styles from "./article.module.css";

type Reaction = "like" | "dislike" | null;

/**
 * Engagement bar: like, dislike, comment and share.
 *
 * Every control keeps the same min-height and font size in every state, so the
 * row does not jitter when a reaction is toggled or the share menu opens. Like
 * and dislike are mutually exclusive. Share prefers the native sheet and falls
 * back to a copy-link action; both are real, the counts are optimistic.
 */
export function ArticleActions({
  likes,
  dislikes,
  commentCount,
  shareCount,
  title,
}: {
  likes: number;
  dislikes: number;
  commentCount: number;
  shareCount: number;
  title: string;
}) {
  const [reaction, setReaction] = useState<Reaction>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const likeCount = likes + (reaction === "like" ? 1 : 0);
  const dislikeCount = dislikes + (reaction === "dislike" ? 1 : 0);
  const shares = shareCount + (copied ? 1 : 0);

  const toggle = (next: Exclude<Reaction, null>) =>
    setReaction((current) => (current === next ? null : next));

  const url = typeof window === "undefined" ? "" : window.location.href;
  const shareText = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked: the visible share links still work. */
    }
    setOpen(false);
  }

  async function onShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* The reader dismissed the native sheet; fall through to the menu. */
      }
    }
    setOpen((value) => !value);
  }

  return (
    <div className={styles.actions} role="group" aria-label="समाचार पर प्रतिक्रिया">
      <button
        type="button"
        className={`${styles.action}${reaction === "like" ? ` ${styles.actionOn}` : ""}`}
        aria-pressed={reaction === "like"}
        onClick={() => toggle("like")}
      >
        <ThumbsUp size={18} strokeWidth={2} aria-hidden="true" />
        पसंद
        <span className={styles.actionCount}>{likeCount}</span>
      </button>

      <button
        type="button"
        className={`${styles.action}${reaction === "dislike" ? ` ${styles.actionOn}` : ""}`}
        aria-pressed={reaction === "dislike"}
        onClick={() => toggle("dislike")}
      >
        <ThumbsDown size={18} strokeWidth={2} aria-hidden="true" />
        नापसंद
        <span className={styles.actionCount}>{dislikeCount}</span>
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
    </div>
  );
}
