import Link from "next/link";
import { Play } from "lucide-react";
import type { GalleryItem, VideoItem } from "@/data/types";
import { videos, gallery } from "@/data/news";
import { galleryHref, videoHref } from "@/lib/links";
import { Media } from "@/components/ui/Media";
import { AdSlot } from "@/components/ui/AdSlot";
import { leaderboardAds } from "@/data/ads";
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
  const sponsoredVideo: VideoItem = {
    id: "sponsored-video",
    title: "कामगार टाइम्स मीडिया नेटवर्क पर अपना वीडियो व डिजिटल विज्ञापन दें",
    duration: "प्रायोजित",
    meta: "विज्ञापन सेवा · 8055502228",
    image: "/img/img07.png",
  };

  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="वीडियो"
        title="वीडियो"
        lede="ग्राउंड रिपोर्टिंग, साक्षात्कार और विश्लेषण। हर बड़ी हलचल एक नज़र में।"
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
        {videos.longVideos.slice(0, 3).map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}

        {/* In-grid video-sized sponsored card */}
        <Link className={styles.card} href="/advertise">
          <span className={styles.thumb}>
            <Media src={sponsoredVideo.image} alt="" sizes="(max-width: 560px) 100vw, 25vw" />
            <span style={{ position: "absolute", top: 8, left: 8, background: "#d32f2f", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, zIndex: 2 }}>
              प्रायोजित
            </span>
          </span>
          <h3 className={styles.cardTitle}>{sponsoredVideo.title}</h3>
          <span className={styles.cardMeta} style={{ color: "#d32f2f", fontWeight: 600 }}>{sponsoredVideo.meta}</span>
        </Link>

        {videos.longVideos.slice(3).map((item) => (
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
          सभी शॉर्ट्स →
        </Link>
      </h2>

      <div className={styles.shortGrid}>
        {videos.shorts.slice(0, 4).map((item) => (
          <VideoCard key={item.id} item={item} portrait />
        ))}

        {/* Vertical sponsor short card */}
        <Link className={styles.card} href="/advertise">
          <span className={`${styles.thumb} ${styles.thumbPortrait}`}>
            <Media src="/img/img05.png" alt="" sizes="(max-width: 560px) 50vw, 20vw" />
            <span style={{ position: "absolute", top: 8, left: 8, background: "#d32f2f", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, zIndex: 2 }}>
              प्रायोजित
            </span>
          </span>
          <h3 className={styles.cardTitle}>व्यापार प्रचार हेतु विशेष डिजिटल रील व शॉर्ट्स</h3>
          <span className={styles.cardMeta} style={{ color: "#d32f2f" }}>कामगार टाइम्स विज्ञापन</span>
        </Link>
      </div>

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[4]} />
      </div>
    </main>
  );
}

/** /shorts — the vertical short-video desk. */
export function ShortsLibrary() {
  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="वीडियो"
        title="शॉर्ट्स"
        lede="एक मिनट में महत्वपूर्ण घटनाक्रम। स्क्रोल करें और अपडेट रहें।"
      />

      <div className={`${styles.shortGrid} reveal`}>
        {videos.shorts.slice(0, 4).map((item) => (
          <VideoCard key={item.id} item={item} portrait />
        ))}

        {/* In-feed vertical sponsored short */}
        <Link className={styles.card} href="/advertise">
          <span className={`${styles.thumb} ${styles.thumbPortrait}`}>
            <Media src="/img/img05.png" alt="" sizes="(max-width: 560px) 50vw, 20vw" />
            <span style={{ position: "absolute", top: 8, left: 8, background: "#d32f2f", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, zIndex: 2 }}>
              प्रायोजित
            </span>
          </span>
          <h3 className={styles.cardTitle}>अपने उत्पाद का डिजिटल प्रचार रील बनाएं</h3>
          <span className={styles.cardMeta} style={{ color: "#d32f2f" }}>प्रायोजित · संपर्क करें</span>
        </Link>

        {videos.shorts.slice(4).map((item) => (
          <VideoCard key={item.id} item={item} portrait />
        ))}
      </div>

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[3]} />
      </div>
    </main>
  );
}

/** /gallery — every photo story. */
export function GalleryLibrary() {
  const firstBatch = gallery.slice(0, 3);
  const secondBatch = gallery.slice(3);

  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="तस्वीरें"
        title="फोटो गैलरी"
        lede="घटनाएं, स्थल और संस्कृति: तस्वीरों के माध्यम से सटीक रिपोर्टिंग।"
      />

      <div className={`${styles.masonry} reveal`}>
        {firstBatch.map((item: GalleryItem) => (
          <Link key={item.id} className={styles.galleryCard} href={galleryHref(item.id)}>
            <span className={styles.galleryMedia}>
              <Media
                src={item.image}
                alt=""
                sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span className={styles.galleryCount}>६ तस्वीरें</span>
            </span>
            <span className={styles.cardMeta}>{item.category}</span>
            <span className={styles.galleryCardTitle}>{item.headline}</span>
          </Link>
        ))}

        {/* Sponsored Photo Story Card in the masonry */}
        <Link className={styles.galleryCard} href="/advertise" style={{ border: "1px solid rgba(211, 47, 47, 0.25)", background: "var(--surface)", borderRadius: "var(--r-md)", padding: "12px" }}>
          <span className={styles.galleryMedia}>
            <Media
              src="/img/img08.png"
              alt=""
              sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 33vw"
            />
            <span style={{ position: "absolute", top: 8, left: 8, background: "#d32f2f", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, zIndex: 2 }}>
              प्रायोजित
            </span>
          </span>
          <span className={styles.cardMeta} style={{ color: "#d32f2f", marginTop: 8 }}>कॉर्पोरेट फोटो फीचर</span>
          <span className={styles.galleryCardTitle}>संस्थानों और कंपनियों के लिए विशेष फोटो व वीडियो कवरेज</span>
        </Link>

        {secondBatch.map((item: GalleryItem) => (
          <Link key={item.id} className={styles.galleryCard} href={galleryHref(item.id)}>
            <span className={styles.galleryMedia}>
              <Media
                src={item.image}
                alt=""
                sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span className={styles.galleryCount}>६ तस्वीरें</span>
            </span>
            <span className={styles.cardMeta}>{item.category}</span>
            <span className={styles.galleryCardTitle}>{item.headline}</span>
          </Link>
        ))}
      </div>

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[1]} />
      </div>
    </main>
  );
}
