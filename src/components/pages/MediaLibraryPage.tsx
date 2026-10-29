"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Play, VideoOff, ImageOff, Loader2 } from "lucide-react";
import type { GalleryItem, VideoItem } from "@/data/types";
import { galleryHref } from "@/lib/links";
import { Media } from "@/components/ui/Media";
import { VideoPopup } from "@/components/ui/VideoPopup";
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

function VideoCard({ item, portrait = false, onSelect }: { item: VideoItem; portrait?: boolean; onSelect: (item: VideoItem) => void }) {
  return (
    <button className={`${styles.card} ${styles.videoCardButton}`} type="button" onClick={() => onSelect(item)} aria-label={item.title}>
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
    </button>
  );
}

/** /videos — the long-form video desk, with a shorts teaser below (Exclusively API Driven) */
export function VideoLibrary() {
  const [featureVideo, setFeatureVideo] = useState<VideoItem | null>(null);
  const [longVideos, setLongVideos] = useState<VideoItem[]>([]);
  const [shortsList, setShortsList] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [videoTotal, setVideoTotal] = useState(0);
  const [videoPage, setVideoPage] = useState(1);
  const closePopup = useCallback(() => setSelectedVideo(null), []);

  useEffect(() => {
    let active = true;
    Promise.allSettled([
      kamgarApi.getMediaVideos({ videoType: "VIDEO", page: 1, limit: 30 }),
      kamgarApi.getMediaVideos({ videoType: "SHORT", limit: 8 }),
    ])
      .then(([longsRes, shortsRes]) => {
        if (!active) return;

        if (longsRes.status === "fulfilled" && longsRes.value?.videos?.length) {
          const adapted = longsRes.value.videos.map(adaptMediaVideo);
          setFeatureVideo(adapted[0] || null);
          setLongVideos(adapted.slice(1));
          setVideoTotal(longsRes.value.total);
        } else {
          setFeatureVideo(null);
          setLongVideos([]);
          setVideoTotal(0);
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

  const loadMoreVideos = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const nextPage = videoPage + 1;
      const res = await kamgarApi.getMediaVideos({ videoType: "VIDEO", page: nextPage, limit: 30 });
      setLongVideos((current) => [...current, ...res.videos.map(adaptMediaVideo)]);
      setVideoPage(nextPage);
    } catch {
      // Keep the current list available if a later page cannot be fetched.
    } finally {
      setLoadingMore(false);
    }
  };

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
            शीघ्र ही नए वीडियो यहाँ उपलब्ध होंगे। कृपया थोड़ी देर बाद देखें।
          </p>
        </div>
      )}

      {!loading && featureVideo && (
        <article className={styles.feature}>
          <button
            className={`${styles.featureMedia} ${styles.videoCardButton}`}
            type="button"
            onClick={() => setSelectedVideo(featureVideo)}
            aria-label={featureVideo.title}
          >
            <Media
              src={featureVideo.image}
              alt=""
              sizes="(max-width: 900px) 100vw, 60vw"
            />
            <PlayGlyph />
            <span className={styles.duration}>{featureVideo.duration}</span>
          </button>
          <div className={styles.featureBody}>
            <span className={styles.chip}>{featureVideo.meta}</span>
            <h2 className={styles.featureTitle}>
              <button
                className={styles.featureTitleButton}
                type="button"
                onClick={() => setSelectedVideo(featureVideo)}
              >
                {featureVideo.title}
              </button>
            </h2>
            <p className={styles.featureExcerpt}>{featureVideo.title}</p>
          </div>
        </article>
      )}

      {!loading && longVideos.length > 0 && (
        <div className={styles.grid}>
          {longVideos.map((item) => (
            <VideoCard key={item.id} item={item} onSelect={setSelectedVideo} />
          ))}
        </div>
      )}

      {!loading && featureVideo && longVideos.length + 1 < videoTotal && (
        <button className={styles.loadMore} type="button" onClick={loadMoreVideos} disabled={loadingMore}>
          {loadingMore ? "लोड हो रहा है…" : "और वीडियो देखें"}
        </button>
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
              <VideoCard key={item.id} item={item} portrait onSelect={setSelectedVideo} />
            ))}
          </div>
        </>
      )}

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[4]} slotKey="hero_leaderboard" />
      </div>
      {selectedVideo && <VideoPopup video={selectedVideo} onClose={closePopup} />}
    </main>
  );
}

/** /shorts — the vertical short-video desk (Exclusively API Driven) */
export function ShortsLibrary() {
  const [shortsList, setShortsList] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [shortsTotal, setShortsTotal] = useState(0);
  const [shortsPage, setShortsPage] = useState(1);
  const closePopup = useCallback(() => setSelectedVideo(null), []);

  useEffect(() => {
    kamgarApi
      .getMediaVideos({ videoType: "SHORT", page: 1, limit: 40 })
      .then((res) => {
        if (res?.videos && res.videos.length > 0) {
          setShortsList(res.videos.map(adaptMediaVideo));
          setShortsTotal(res.total);
        } else {
          setShortsList([]);
          setShortsTotal(0);
        }
      })
      .catch(() => {
        setShortsList([]);
        setShortsTotal(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const loadMoreShorts = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const nextPage = shortsPage + 1;
      const res = await kamgarApi.getMediaVideos({ videoType: "SHORT", page: nextPage, limit: 40 });
      setShortsList((current) => [...current, ...res.videos.map(adaptMediaVideo)]);
      setShortsPage(nextPage);
    } catch {
      // Keep the current list available if a later page cannot be fetched.
    } finally {
      setLoadingMore(false);
    }
  };

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
            शीघ्र ही नए शॉर्ट्स वीडियो यहाँ उपलब्ध होंगे।
          </p>
        </div>
      )}

      {!loading && shortsList.length > 0 && (
        <div className={styles.shortGrid}>
          {shortsList.map((item) => (
            <VideoCard key={item.id} item={item} portrait onSelect={setSelectedVideo} />
          ))}
        </div>
      )}

      {!loading && shortsList.length < shortsTotal && (
        <button className={styles.loadMore} type="button" onClick={loadMoreShorts} disabled={loadingMore}>
          {loadingMore ? "लोड हो रहा है…" : "और शॉर्ट्स देखें"}
        </button>
      )}

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[3]} slotKey="hero_leaderboard" />
      </div>
      {selectedVideo && <VideoPopup video={selectedVideo} onClose={closePopup} />}
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
            शीघ्र ही नई फोटो गैलरी यहाँ उपलब्ध होगी।
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
