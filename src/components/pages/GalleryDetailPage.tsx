import Link from "next/link";
import { Images } from "lucide-react";
import type { GalleryItem } from "@/data/types";
import { buildGalleryPhotos } from "@/data/articleContent";
import { galleryHref } from "@/lib/links";
import { Media } from "@/components/ui/Media";
import { AdSlot } from "@/components/ui/AdSlot";
import { leaderboardAds } from "@/data/ads";
import { ArticleActions } from "./ArticleActions";
import styles from "./media.module.css";

/** /gallery/[id] — one photo essay: cover, then the photo run with captions. */
export function GalleryDetailPage({
  item,
  related,
}: {
  item: GalleryItem;
  related: GalleryItem[];
}) {
  const photos = buildGalleryPhotos(item);

  return (
    <main id="main" className={styles.main}>
      <nav className={styles.watchMeta} aria-label="पेज पथ">
        <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
          मुख्य पृष्ठ
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href="/gallery"
          style={{ color: "var(--muted)", textDecoration: "none" }}
        >
          फोटो गैलरी
        </Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: "var(--brand)" }}>{item.headline}</span>
      </nav>

      <header className={styles.featureBody} style={{ marginTop: "var(--space-8)" }}>
        <Link className={styles.cardMeta} href="/gallery">
          {item.category}
        </Link>
        <h1 className={styles.featureTitle}>{item.headline}</h1>
      </header>

      <ArticleActions
        likes={210}
        dislikes={8}
        commentCount={25}
        shareCount={68}
        title={item.headline}
      />

      <div className={styles.photos}>
        {photos.map((photo, index) => (
          <figure key={photo.id} className={styles.photo}>
            <Media
              src={photo.image}
              alt=""
              sizes="(max-width: 900px) 100vw, 900px"
              priority={index === 0}
              className={styles.photoMedia}
            />
            <figcaption className={styles.photoCaption}>
              <span className={styles.photoIndex} aria-hidden="true">
                {index + 1} / {photos.length}
              </span>
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.tags}>
        <span className={styles.cardMeta} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Images size={14} strokeWidth={2} aria-hidden="true" />
          {photos.length} तस्वीरें
        </span>
      </div>

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[1]} />
      </div>

      {related.length > 0 ? (
        <section className={styles.related} aria-label="अन्य गैलरी">
          <h2 className={styles.relatedTitle}>
            <span className={styles.relatedBar} aria-hidden="true" />
            अन्य गैलरी
          </h2>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <Link key={item.id} className={styles.galleryCard} href={galleryHref(item.id)}>
                <span className={styles.galleryMedia}>
                  <Media src={item.image} alt="" sizes="(max-width: 560px) 100vw, 25vw" />
                  <span className={styles.galleryCount}>६ तस्वीरें</span>
                </span>
                <span className={styles.cardMeta}>{item.category}</span>
                <span className={styles.galleryCardTitle}>{item.headline}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}