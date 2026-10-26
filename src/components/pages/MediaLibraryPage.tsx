"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play, VideoOff, ImageOff, Loader2 } from "lucide-react";
import type { GalleryItem, VideoItem } from "@/data/types";
import { galleryHref, videoHref } from "@/lib/links";
import { Media } from "@/components/ui/Media";
import { AdSlot } from "@/components/ui/AdSlot";
import { leaderboardAds } from "@/data/ads";
import { kamgarApi } from "@/services/apiClient";
import { adaptMediaVideo } from "@/lib/apiAdapters";
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

/** /videos — the long-form video desk, with a shorts teaser below (Exclusively API Driven) */
export function VideoLibrary() {
  const [featureVideo, setFeatureVideo] = useState<VideoItem | null>(null);
  const [longVideos, setLongVideos] = useState<VideoItem[]>([]);
  const [shortsList, setShortsList] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.allSettled([
      kamgarApi.getMediaVideos({ videoType: "VIDEO", limit: 30 }),
      kamgarApi.getMediaVideos({ videoType: "SHORT", limit: 8 }),
    ])
      .then(([longsRes, shortsRes]) => {
        if (!active) return;

        if (longsRes.status === "fulfilled" && longsRes.value?.videos?.length) {
          const adapted = longsRes.value.videos.map(adaptMediaVideo);
          setFeatureVideo(adapted[0] || null);
          setLongVideos(adapted.slice(1));
        } else {
          setFeatureVideo(null);
          setLongVideos([]);
        }

        if (shortsRes.status === "fulfilled" && shortsRes.value?.videos?.length) {
          setShortsList(shortsRes.value.videos.map(adaptMediaVideo));
        } else {
          setShortsList([]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const hasAnyVideos = featureVideo !== null || longVideos.length > 0;

  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="वीडियो"
        title="वीडियो"
        lede="ग्राउंड रिपोर्टिंग, साक्षात्कार और विश्लेषण। हर बड़ी हलचल एक नज़र में।"
      />

      {loading && (
        <div className={styles.noDataLoading}>
          <Loader2 className="animate-spin" size={24} />
          <span>वीडियो लोड हो रहे हैं...</span>
        </div>
      )}

      {!loading && !hasAnyVideos && shortsList.length === 0 && (
        <div className={styles.noDataCard}>
          <VideoOff className={styles.noDataIcon} size={48} />
          <h4 className={styles.noDataTitle}>वीडियो उपलब्ध नहीं हैं</h4>
          <p className={styles.noDataDesc}>
            एडमिन पैनल से वीडियो अपलोड होने के बाद यहाँ प्रदर्शित किए जाएंगे।
          </p>
        </div>
      )}

      {!loading && featureVideo && (
        <article className={styles.feature}>
          <Link
            className={styles.featureMedia}
            href={videoHref(featureVideo.id)}
            aria-label={featureVideo.title}
          >
            <Media
              src={featureVideo.image}
              alt=""
              sizes="(max-width: 900px) 100vw, 60vw"
            />
            <PlayGlyph />
            <span className={styles.duration}>{featureVideo.duration}</span>
          </Link>
          <div className={styles.featureBody}>
            <span className={styles.chip}>{featureVideo.meta}</span>
            <h2 className={styles.featureTitle}>
              <Link
                href={videoHref(featureVideo.id)}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {featureVideo.title}
              </Link>
            </h2>
            <p className={styles.featureExcerpt}>{featureVideo.title}</p>
          </div>
        </article>
      )}

      {!loading && longVideos.length > 0 && (
        <div className={styles.grid}>
          {longVideos.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Shorts teaser section */}
      {!loading && shortsList.length > 0 && (
        <>
          <h2 className={styles.subhead}>
            <span>शॉर्ट्स</span>
            <Link className={styles.subheadLink} href="/shorts">
              सभी शॉर्ट्स →
            </Link>
          </h2>

          <div className={styles.shortGrid}>
            {shortsList.map((item) => (
              <VideoCard key={item.id} item={item} portrait />
            ))}
          </div>
        </>
      )}

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[4]} slotKey="hero_leaderboard" />
      </div>
    </main>
  );
}

/** /shorts — the vertical short-video desk (Exclusively API Driven) */
export function ShortsLibrary() {
  const [shortsList, setShortsList] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    kamgarApi
      .getMediaVideos({ videoType: "SHORT", limit: 40 })
      .then((res) => {
        if (res?.videos && res.videos.length > 0) {
          setShortsList(res.videos.map(adaptMediaVideo));
        } else {
          setShortsList([]);
        }
      })
      .catch(() => {
        setShortsList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="वीडियो"
        title="शॉर्ट्स"
        lede="एक मिनट में महत्वपूर्ण घटनाक्रम। स्क्रोल करें और अपडेट रहें।"
      />

      {loading && (
        <div className={styles.noDataLoading}>
          <Loader2 className="animate-spin" size={24} />
          <span>शॉर्ट्स लोड हो रहे हैं...</span>
        </div>
      )}

      {!loading && shortsList.length === 0 && (
        <div className={styles.noDataCard}>
          <VideoOff className={styles.noDataIcon} size={48} />
          <h4 className={styles.noDataTitle}>शॉर्ट्स वीडियो उपलब्ध नहीं हैं</h4>
          <p className={styles.noDataDesc}>
            एडमिन पैनल से &apos;शॉर्ट्स&apos; श्रेणी में वीडियो अपलोड होने के बाद यहाँ दिखेंगे।
          </p>
        </div>
      )}

      {!loading && shortsList.length > 0 && (
        <div className={styles.shortGrid}>
          {shortsList.map((item) => (
            <VideoCard key={item.id} item={item} portrait />
          ))}
        </div>
      )}

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[3]} slotKey="hero_leaderboard" />
      </div>
    </main>
  );
}

/** /gallery — every photo story (Exclusively API Driven: Galleries or Media Images) */
export function GalleryLibrary() {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. First check published photo galleries
    kamgarApi
      .getPublicGalleries({ page: 1, limit: 30 })
      .then((res) => {
        if (res?.galleries && res.galleries.length > 0) {
          const mapped: GalleryItem[] = res.galleries.map((g) => ({
            id: g.slug || g._id,
            image: g.coverImage || (g.images?.[0]?.imageUrl ?? ""),
            headline: g.title,
            category: g.category?.name || "फोटो गैलरी",
          }));
          setGalleryList(mapped.filter((m) => Boolean(m.image)));
          setLoading(false);
          return;
        }

        // 2. Fallback to Media Images if no galleries created
        return kamgarApi.getMediaImages(1, 30).then((imgRes) => {
          if (imgRes?.images && imgRes.images.length > 0) {
            const mappedImgs: GalleryItem[] = imgRes.images.map((img) => ({
              id: img._id,
              headline: img.title || "फोटो गैलरी",
              image: img.url,
              category: "फोटो गैलरी",
            }));
            setGalleryList(mappedImgs.filter((m) => Boolean(m.image)));
          } else {
            setGalleryList([]);
          }
          setLoading(false);
        });
      })
      .catch(() => {
        kamgarApi
          .getMediaImages(1, 30)
          .then((imgRes) => {
            if (imgRes?.images && imgRes.images.length > 0) {
              const mappedImgs: GalleryItem[] = imgRes.images.map((img) => ({
                id: img._id,
                headline: img.title || "फोटो गैलरी",
                image: img.url,
                category: "फोटो गैलरी",
              }));
              setGalleryList(mappedImgs.filter((m) => Boolean(m.image)));
            } else {
              setGalleryList([]);
            }
          })
          .catch(() => {
            setGalleryList([]);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }, []);

  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow="तस्वीरें"
        title="फोटो गैलरी"
        lede="घटनाएं, स्थल और संस्कृति: तस्वीरों के माध्यम से सटीक रिपोर्टिंग।"
      />

      {loading && (
        <div className={styles.noDataLoading}>
          <Loader2 className="animate-spin" size={24} />
          <span>फोटो गैलरी लोड हो रही है...</span>
        </div>
      )}

      {!loading && galleryList.length === 0 && (
        <div className={styles.noDataCard}>
          <ImageOff className={styles.noDataIcon} size={48} />
          <h4 className={styles.noDataTitle}>फोटो गैलरी उपलब्ध नहीं है</h4>
          <p className={styles.noDataDesc}>
            एडमिन पैनल से फोटो गैलरी या तस्वीरें अपलोड होने के बाद यहाँ प्रदर्शित की जाएंगी।
          </p>
        </div>
      )}

      {!loading && galleryList.length > 0 && (
        <div className={styles.masonry}>
          {galleryList.map((item: GalleryItem) => (
            <Link key={item.id} className={styles.galleryCard} href={galleryHref(item.id)}>
              <span className={styles.galleryMedia}>
                <Media
                  src={item.image}
                  alt={item.headline}
                  sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
                <span className={styles.galleryCount}>तस्वीर</span>
              </span>
              <span className={styles.cardMeta}>{item.category}</span>
              <span className={styles.galleryCardTitle}>{item.headline}</span>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[1]} slotKey="hero_leaderboard" />
      </div>
    </main>
  );
}
