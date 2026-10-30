"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryPhoto } from "@/data/types";
import { Media } from "@/components/ui/Media";
import styles from "./media.module.css";

export function GalleryPhotoGrid({
  photos,
  title,
}: {
  photos: GalleryPhoto[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) =>
          index === null ? null : (index - 1 + photos.length) % photos.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) =>
          index === null ? null : (index + 1) % photos.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, photos.length]);

  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  return (
    <>
      <div className={styles.photos}>
        {photos.map((photo, index) => (
          <figure key={photo.id} className={styles.photo}>
            <button
              className={styles.photoTrigger}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${title}: तस्वीर ${index + 1} बड़े आकार में देखें`}
            >
              <Media
                src={photo.image}
                alt={photo.caption || title}
                sizes="(max-width: 900px) 100vw, 450px"
                priority={index === 0}
                className={styles.photoMedia}
              />
            </button>
            <figcaption className={styles.photoCaption}>
              <span className={styles.photoIndex} aria-hidden="true">
                {index + 1} / {photos.length}
              </span>
              {photo.caption ? <span>{photo.caption}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {activePhoto ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — तस्वीर ${activeIndex! + 1} / ${photos.length}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button
            className={styles.lightboxClose}
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="बंद करें"
          >
            <X size={24} aria-hidden="true" />
          </button>

          {photos.length > 1 ? (
            <>
              <button
                className={`${styles.lightboxNav} ${styles.lightboxPrevious}`}
                type="button"
                onClick={() =>
                  setActiveIndex((activeIndex! - 1 + photos.length) % photos.length)
                }
                aria-label="पिछली तस्वीर"
              >
                <ChevronLeft size={30} aria-hidden="true" />
              </button>
              <button
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                type="button"
                onClick={() => setActiveIndex((activeIndex! + 1) % photos.length)}
                aria-label="अगली तस्वीर"
              >
                <ChevronRight size={30} aria-hidden="true" />
              </button>
            </>
          ) : null}

          <div className={styles.lightboxImageFrame}>
            <Media
              src={activePhoto.image}
              alt={activePhoto.caption || title}
              sizes="100vw"
              priority
              className={styles.lightboxMedia}
            />
          </div>
          <p className={styles.lightboxCaption}>
            {activePhoto.caption || title}
            <span>{activeIndex! + 1} / {photos.length}</span>
          </p>
        </div>
      ) : null}
    </>
  );
}
