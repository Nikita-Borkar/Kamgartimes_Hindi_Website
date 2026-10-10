"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Media } from "@/components/ui/Media";
import styles from "./media.module.css";

/**
 * Video surface for the watch page. There is no real media file wired yet, so
 * the play control is honest about it: pressing play swaps the cover for a
 * clear placeholder note rather than pretending to stream. Drop a <video> in
 * here once the asset pipeline exists; the surrounding layout does not change.
 */
export function PlayerShell({
  src,
  title,
  duration,
}: {
  src: string;
  title: string;
  duration: string;
}) {
  const [started, setStarted] = useState(false);

  return (
    <div className={styles.player}>
      <Media
        src={src}
        alt=""
        sizes="(max-width: 900px) 100vw, 60vw"
        priority
        className={styles.playerMedia}
      />
      <span className={styles.playerDuration}>{duration}</span>

      {started ? (
        <div className={styles.playerNote} role="status">
          <span>हा नमुना प्लेअर आहे. व्हिडिओ फाइल जोडल्यावर येथे प्ले होईल.</span>
          <button
            type="button"
            className={styles.playerNoteClose}
            onClick={() => setStarted(false)}
          >
            बंद करा
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={styles.playerPlay}
          aria-label={`${title} प्ले करा`}
          onClick={() => setStarted(true)}
        >
          <Play size={30} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
