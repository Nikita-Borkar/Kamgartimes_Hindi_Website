"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { Media } from "@/components/ui/Media";
import styles from "./media.module.css";

export function PlayerShell({
  src,
  title,
  duration,
  embedUrl,
  youtubeUrl,
}: {
  src: string;
  title: string;
  duration: string;
  embedUrl?: string;
  youtubeUrl?: string;
}) {
  const [started, setStarted] = useState(false);

  const finalEmbedUrl =
    embedUrl ||
    (youtubeUrl?.includes("watch?v=")
      ? `https://www.youtube.com/embed/${youtubeUrl.split("watch?v=")[1].split("&")[0]}`
      : youtubeUrl?.includes("youtu.be/")
      ? `https://www.youtube.com/embed/${youtubeUrl.split("youtu.be/")[1].split("?")[0]}`
      : null);

  return (
    <div className={styles.player}>
      {started && finalEmbedUrl ? (
        <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 380 }}>
          <iframe
            src={finalEmbedUrl.includes("autoplay") ? finalEmbedUrl : `${finalEmbedUrl}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
          <button
            type="button"
            className={styles.playerNoteClose}
            onClick={() => setStarted(false)}
            style={{ position: "absolute", top: 10, right: 10, zIndex: 10, background: "rgba(0,0,0,0.7)" }}
          >
            <X size={16} /> बंद करें
          </button>
        </div>
      ) : (
        <>
          <Media
            src={src}
            alt=""
            sizes="(max-width: 900px) 100vw, 60vw"
            priority
            className={styles.playerMedia}
          />
          <span className={styles.playerDuration}>{duration}</span>

          {started && !finalEmbedUrl ? (
            <div className={styles.playerNote} role="status">
              <span>यह डेमो वीडियो है। कामगार टाइम्स डिजिटल बुलेटिन शीघ्र प्रसारित होगा।</span>
              <button
                type="button"
                className={styles.playerNoteClose}
                onClick={() => setStarted(false)}
              >
                बंद करें
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.playerPlay}
              aria-label={`${title} प्ले करें`}
              onClick={() => setStarted(true)}
            >
              <Play size={30} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
