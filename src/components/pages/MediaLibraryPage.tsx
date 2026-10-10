import Link from "next/link";
import { Play } from "lucide-react";
import type { GalleryItem, VideoItem } from "@/data/types";
import { videos, gallery } from "@/data/news";
import { galleryHref, videoHref } from "@/lib/links";
import { Media } from "@/components/ui/Media";
import { PageHero } from "./PageHero";
import styles from "./media.module.css";

function PlayGlyph() {
  return (
    <span className={styles.play} aria-hidden="true">
      <Play size={22} fill="currentColor" strokeWidth={1.5} />
    </span>
  );
}

function VideoCard({ item, portrait = false }: { item: VideoItem; portrait?: boolean }) {
  return (
    <Link className={styles.card} href={videoHref(item.id)}>
      <span
        className={`${styles.thumb}${portrait ? ` ${styles.thumbPortrait}` : ""}`}
      >
        <Media
          src={item.image}
          alt=""
          sizes={
            portrait
              ? "(max-width: 560px) 50vw, 20vw"
              : "(max-width: 560px) 100vw, 25vw"
          }
        />
        <PlayGlyph />
        <span className={styles.duration}>{item.duration}</span>
      </span>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <span className={styles.cardMeta}>{item.meta}</span>
    </Link>
  );
}

/** /videos — the long-form video desk, with a shorts teaser below. */
export function VideoLibrary() {
  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="व्हिडिओ"
        title="व्हिडिओ"
        lede="प्रत्यक्ष वार्तांकन, मुलाखती आणि विश्लेषण. संपूर्ण घडामोड एका दृष्टिक्षेपात."
      />

      <Link className={`${styles.feature} reveal`} href={videoHref(videos.feature.id)}>
        <span className={styles.featureMedia}>
          <Media
            src={videos.feature.image}
            alt=""
            sizes="(max-width: 900px) 100vw, 60vw"
            priority
          />
          <span className={styles.play} aria-hidden="true">
            <Play size={26} fill="currentColor" strokeWidth={1.5} />
          </span>
          <span className={styles.duration}>{videos.feature.duration}</span>
        </span>
        <span className={styles.featureBody}>
          <span className={styles.cardMeta}>{videos.feature.category}</span>
          <span className={styles.featureTitle}>{videos.feature.title}</span>
          {videos.feature.excerpt ? (
            <span className={styles.featureExcerpt}>{videos.feature.excerpt}</span>
          ) : null}
        </span>
      </Link>

      <div className={styles.grid}>
        {videos.longVideos.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
      </div>

      <h2 className={styles.relatedTitle} style={{ marginTop: "var(--space-12)" }}>
        <span className={styles.relatedBar} aria-hidden="true" />
        शॉर्ट्स
        <Link
          className={styles.cardMeta}
          href="/shorts"
          style={{ marginLeft: "auto", color: "var(--brand)" }}
        >
          सर्व शॉर्ट्स →
        </Link>
      </h2>

      <div className={styles.shortGrid}>
        {videos.shorts.map((item) => (
          <VideoCard key={item.id} item={item} portrait />
        ))}
      </div>
    </main>
  );
}

/** /shorts — the vertical short-video desk. */
export function ShortsLibrary() {
  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="व्हिडिओ"
        title="शॉर्ट्स"
        lede="एका मिनिटात महत्त्वाच्या घडामोडी. स्क्रोल करा आणि अपडेट राहा."
      />

      <div className={`${styles.shortGrid} reveal`}>
        {videos.shorts.map((item) => (
          <VideoCard key={item.id} item={item} portrait />
        ))}
      </div>
    </main>
  );
}

/** /gallery — every photo story. */
export function GalleryLibrary() {
  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="फोटो"
        title="फोटो गॅलरी"
        lede="घटना, ठिकाणे आणि संस्कृती: छायाचित्रांतून केलेले वार्तांकन."
      />

      <div className={`${styles.masonry} reveal`}>
        {gallery.map((item: GalleryItem) => (
          <Link key={item.id} className={styles.galleryCard} href={galleryHref(item.id)}>
            <span className={styles.galleryMedia}>
              <Media
                src={item.image}
                alt=""
                sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span className={styles.galleryCount}>६ छायाचित्रे</span>
            </span>
            <span className={styles.cardMeta}>{item.category}</span>
            <span className={styles.galleryCardTitle}>{item.headline}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
