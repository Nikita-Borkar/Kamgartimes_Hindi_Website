"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { VideoItem } from "@/data/types";
import styles from "./videoPopup.module.css";

function getAutoplayUrl(video: VideoItem) {
  const source = video.embedUrl || video.youtubeUrl;
  if (!source) return null;

  let embedUrl = source;
  const youtubeId = source.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|watch\?.*v=))([A-Za-z0-9_-]{11})/)?.[1];
  if (youtubeId) embedUrl = `https://www.youtube.com/embed/${youtubeId}`;

  try {
    const url = new URL(embedUrl);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("playsinline", "1");
    return url.toString();
  } catch {
    return null;
  }
}

export function VideoPopup({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  const playerUrl = getAutoplayUrl(video);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-label={video.title}>
        <button className={styles.close} type="button" onClick={onClose} aria-label="Close video">
          <X size={22} />
        </button>
        {playerUrl ? (
          <div className={styles.player}>
            <iframe
              src={playerUrl}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        ) : (
          <p className={styles.unavailable}>Video playback is unavailable for this item.</p>
        )}
        <h2 className={styles.title}>{video.title}</h2>
      </section>
    </div>,
    document.body,
  );
}
