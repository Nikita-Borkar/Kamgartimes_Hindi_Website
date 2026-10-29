"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import { Play, VideoOff, Loader2 } from "lucide-react";
import { kamgarApi } from "@/services/apiClient";
import { VideoPopup } from "@/components/ui/VideoPopup";
import ui from "@/components/ui/ui.module.css";
import styles from "./sections.module.css";
import type { VideoItem } from "@/data/types";
import type { MediaVideo } from "@/types/api";

function PlayGlyph() {
  return (
    <span className={styles.play} aria-hidden="true">
      <Play size={22} fill="currentColor" strokeWidth={1.5} />
    </span>
  );
}

function extractYoutubeId(input?: string): string {
  if (!input) return "";
  const patterns = [
    /youtube\.com\/watch\?(?:.*&)?v=([A-Za-z0-9_-]{11})/i,
    /youtu\.be\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/live\/([A-Za-z0-9_-]{11})/i,
  ];
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1];
  }
  if (/^[A-Za-z0-9_-]{11}$/.test(input.trim())) return input.trim();
  return "";
}

function VideoCard({
  item,
  short = false,
  onSelect,
}: {
  item: VideoItem;
  short?: boolean;
  onSelect: (item: VideoItem) => void;
}) {
  return (
    <button
      type="button"
      className={short ? styles.videoShortCard : styles.videoSmall}
      aria-label={item.title}
      onClick={() => onSelect(item)}
    >
      <span
        className={`${styles.thumb} ${short ? styles.thumbShort : styles.thumbLong}`}
      >
        <Media
          src={item.image}
          alt=""
          sizes={short ? "160px" : "(max-width: 900px) 100vw, 24vw"}
          className={styles.thumbMedia}
        />
        <PlayGlyph />
        <span className={styles.duration}>{item.duration}</span>
      </span>
      <h4 className={`${styles.videoMainTitle} ${ui.titleS}`}>{item.title}</h4>
      <div className={ui.meta}>{item.meta}</div>
    </button>
  );
}

/**
 * वीडियो - Exclusively integrated with GET /public/media/videos (Zero Dummy Data)
 */
export function VideoSection() {
  const [feature, setFeature] = useState<VideoItem | null>(null);
  const [longVideos, setLongVideos] = useState<VideoItem[]>([]);
  const [shorts, setShorts] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const closePopup = useCallback(() => setSelectedVideo(null), []);

  useEffect(() => {
    kamgarApi
      .getMediaVideos({ limit: 30 })
      .then((res) => {
        if (res?.videos && res.videos.length > 0) {
          // Categorize by videoType and category
          const apiShortsRaw = res.videos.filter(
            (v) =>
              v.videoType === "SHORT" ||
              v.category?.slug === "youtube-shorts" ||
              v.category?.name?.includes("शॉर्ट्स")
          );

          const apiLongsRaw = res.videos.filter(
            (v) =>
              v.videoType !== "SHORT" &&
              v.category?.slug !== "youtube-shorts" &&
              !v.category?.name?.includes("शॉर्ट्स")
          );

          const mapToVideoItem = (v: MediaVideo, defaultDuration: string): VideoItem => {
            const yId = v.youtubeVideoID || extractYoutubeId(v.youtubeUrl);
            const thumb =
              v.thumbnailUrl ||
              (yId ? `https://img.youtube.com/vi/${yId}/hqdefault.jpg` : "/img/logo.png");
            return {
              id: v._id,
              title: v.title,
              image: thumb,
              category: v.category?.name || "कामगार वार्ता",
              duration: v.videoType === "SHORT" ? "शॉर्ट्स" : defaultDuration,
              meta: v.category?.name || "विशेष वीडियो",
              excerpt: v.title,
              embedUrl: v.embedUrl,
              youtubeUrl: v.youtubeUrl,
            };
          };

          const mappedLongs = apiLongsRaw.map((v) => mapToVideoItem(v, "विशेष कवरेज"));
          const mappedShorts = apiShortsRaw.map((v) => mapToVideoItem(v, "शॉर्ट्स"));

          if (mappedLongs.length > 0) {
            setFeature(mappedLongs[0]);
            setLongVideos(mappedLongs.slice(1));
          } else {
            setFeature(null);
            setLongVideos([]);
          }

          setShorts(mappedShorts);
        } else {
          setFeature(null);
          setLongVideos([]);
          setShorts([]);
        }
      })
      .catch(() => {
        setFeature(null);
        setLongVideos([]);
        setShorts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const hasAnyVideo = feature !== null || longVideos.length > 0 || shorts.length > 0;

  return (
    <section className={styles.videoPanel} aria-label="वीडियो">
      <div className="reveal">
        <SectionHeader title="वीडियो" action="और देखें" href="/videos" />
      </div>

      {loading && (
        <div className={styles.noDataLoading}>
          <Loader2 className="animate-spin" size={22} />
          <span>वीडियो लोड हो रहे हैं...</span>
        </div>
      )}

      {!loading && !hasAnyVideo && (
        <div className={styles.noDataCard}>
          <VideoOff className={styles.noDataIcon} size={42} />
          <h4 className={styles.noDataTitle}>वीडियो उपलब्ध नहीं हैं</h4>
          <p className={styles.noDataDesc}>
            एडमिन पैनल से वीडियो अपलोड होने के बाद यहाँ प्रदर्शित किए जाएंगे।
          </p>
        </div>
      )}

      {!loading && hasAnyVideo && (
        <div className={styles.videoGroups}>
          {/* Subsection 1: विस्तृत वीडियो */}
          <section className={styles.videoGroup} aria-label="विस्तृत वीडियो">
            <div className={styles.videoGroupHead}>
              <h3>विस्तृत वीडियो</h3>
              <span>संपूर्ण रिपोर्ट और विश्लेषण</span>
            </div>

            {feature ? (
              <div className={styles.videoLongGrid}>
                <button
                  type="button"
                  className={styles.videoMain}
                  aria-label={feature.title}
                  onClick={() => setSelectedVideo(feature)}
                >
                  <span className={`${styles.thumb} ${styles.thumbMain}`}>
                    <Media
                      src={feature.image}
                      alt=""
                      sizes="(max-width: 900px) 100vw, 40vw"
                      className={styles.thumbMedia}
                    />
                    <PlayGlyph />
                    <span className={styles.duration}>{feature.duration}</span>
                  </span>
                  <div className={ui.cat}>{feature.category}</div>
                  <h4 className={`${styles.videoMainTitle} ${ui.titleM}`}>
                    {feature.title}
                  </h4>
                  <p className={ui.excerpt}>{feature.excerpt}</p>
                </button>
                {longVideos.map((item, i) => (
                  <div key={item.id} style={stagger(i)}>
                    <VideoCard item={item} onSelect={setSelectedVideo} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noDataCard}>
                <VideoOff className={styles.noDataIcon} size={32} />
                <h4 className={styles.noDataTitle}>विस्तृत वीडियो उपलब्ध नहीं हैं</h4>
                <p className={styles.noDataDesc}>
                  एडमिन पैनल से &apos;विस्तृत वीडियो&apos; श्रेणी में वीडियो अपलोड होने पर यहाँ दिखेंगे।
                </p>
              </div>
            )}
          </section>

          {/* Subsection 2: शॉर्ट्स */}
          <section className={styles.videoGroup} aria-label="शॉर्ट वीडियो">
            <div className={styles.videoGroupHead}>
              <h3>शॉर्ट्स</h3>
              <Link className={styles.videoGroupAction} href="/shorts">
                सभी शॉर्ट्स देखें <span aria-hidden="true">→</span>
              </Link>
            </div>

            {shorts.length > 0 ? (
              <div className={styles.videoShortGrid}>
                {shorts.map((item, i) => (
                  <div key={item.id} style={stagger(i)}>
                    <VideoCard item={item} short onSelect={setSelectedVideo} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noDataCard}>
                <Play className={styles.noDataIcon} size={32} />
                <h4 className={styles.noDataTitle}>शॉर्ट्स वीडियो उपलब्ध नहीं हैं</h4>
                <p className={styles.noDataDesc}>
                  एडमिन पैनल से &apos;शॉर्ट्स&apos; श्रेणी में वीडियो अपलोड होने पर यहाँ दिखेंगे।
                </p>
              </div>
            )}
          </section>
        </div>
      )}
      {selectedVideo && <VideoPopup video={selectedVideo} onClose={closePopup} />}
    </section>
  );
}
