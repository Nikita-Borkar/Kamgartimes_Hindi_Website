"use client";

import { useEffect, useState } from "react";
import { Play, VideoOff, Loader2 } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { videoHref } from "@/lib/links";
import { kamgarApi } from "@/services/apiClient";
import { adaptMediaVideo } from "@/lib/apiAdapters";
import type { VideoItem } from "@/data/types";
import styles from "./sections.module.css";

export function VideoDiscovery() {
  const [recommended, setRecommended] = useState<VideoItem[]>([]);
  const [trending, setTrending] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    kamgarApi
      .getMediaVideos({ limit: 6 })
      .then((res) => {
        if (res?.videos && res.videos.length > 0) {
          const adapted = res.videos.map(adaptMediaVideo);
          if (adapted.length >= 2) {
            setRecommended(adapted.slice(0, 2));
            setTrending(adapted.slice(2));
          } else {
            setRecommended(adapted);
            setTrending([]);
          }
        } else {
          setRecommended([]);
          setTrending([]);
        }
      })
      .catch(() => {
        setRecommended([]);
        setTrending([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const hasAny = recommended.length > 0 || trending.length > 0;

  return (
    <section
      className={styles.videoDiscovery}
      aria-label="आपके लिए और ट्रेंडिंग वीडियो"
    >
      <header className={styles.videoDiscoveryHead}>
        <h2>आपके लिए वीडियो</h2>
        <p>संपादकीय पसंद, सभी पाठकों के लिए</p>
      </header>

      {loading && (
        <div className={styles.noDataLoading}>
          <Loader2 className="animate-spin" size={20} />
          <span>वीडियो लोड हो रहे हैं...</span>
        </div>
      )}

      {!loading && !hasAny && (
        <div className={styles.noDataCard}>
          <VideoOff className={styles.noDataIcon} size={36} />
          <h4 className={styles.noDataTitle}>वीडियो उपलब्ध नहीं हैं</h4>
          <p className={styles.noDataDesc}>
            शीघ्र ही नए वीडियो यहाँ उपलब्ध होंगे। कृपया थोड़ी देर बाद देखें।
          </p>
        </div>
      )}

      {!loading && hasAny && (
        <div className={styles.videoDiscoveryGrid}>
          {recommended.length > 0 && (
            <div className={styles.recommendedVideos}>
              <h3 className={styles.videoSubhead}>चुनिंदा वीडियो</h3>
              <div className={styles.recommendedGrid}>
                {recommended.map((video) => (
                  <a className={styles.discoveryCard} href={videoHref(video.id)} key={video.id}>
                    <span className={styles.discoveryThumb}>
                      <Media
                        src={video.image}
                        alt=""
                        sizes="(max-width: 900px) 100vw, 34vw"
                        className={styles.discoveryMedia}
                      />
                      <span className={styles.play} aria-hidden="true">
                        <Play size={20} fill="currentColor" strokeWidth={1.5} />
                      </span>
                      <span className={styles.duration}>
                        {video.duration}
                      </span>
                    </span>
                    <h4 className={styles.discoveryTitle}>{video.title}</h4>
                    <span className={styles.discoveryMeta}>{video.meta}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {trending.length > 0 && (
            <aside className={styles.trendingVideos}>
              <h3 className={styles.videoSubhead}>अभी ट्रेंडिंग</h3>
              <ol className={styles.trendingVideoList}>
                {trending.map((video, index) => (
                  <li key={video.id}>
                    <a className={styles.trendingVideo} href={videoHref(video.id)}>
                      <span className={styles.trendingRank}>{index + 1}</span>
                      <span className={styles.trendingThumb}>
                        <Media
                          src={video.image}
                          alt=""
                          sizes="100px"
                          className={styles.thumbMedia}
                        />
                        <span className={styles.discoveryDuration}>
                          {video.duration}
                        </span>
                      </span>
                      <span className={styles.trendingVideoText}>
                        <strong>{video.title}</strong>
                        <span>{video.meta}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      )}
    </section>
  );
}
