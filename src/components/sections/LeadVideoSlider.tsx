"use client";

import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, Video, VideoOff, Loader2 } from "lucide-react";
import { kamgarApi } from "@/services/apiClient";
import styles from "./sections.module.css";

export interface YouTubeVideoItem {
  id: string;
  youtubeId: string;
  category: string;
  headline: string;
  duration: string;
  views: string;
  timeAgo: string;
  thumbnail: string;
  isShort: boolean;
}

function extractYoutubeId(input?: string): string {
  if (!input) return "";
  const value = input.trim();
  const patterns = [
    /youtube\.com\/watch\?(?:.*&)?v=([A-Za-z0-9_-]{11})/i,
    /youtu\.be\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/live\/([A-Za-z0-9_-]{11})/i,
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match) return match[1];
  }
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;
  return "";
}

function formatTimeAgo(isoDate?: string): string {
  if (!isoDate) return "ताज़ा";
  try {
    const diff = Date.now() - new Date(isoDate).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "अभी-अभी";
    if (hours < 24) return `${hours} घंटे पहले`;
    const days = Math.floor(hours / 24);
    return `${days} दिन पहले`;
  } catch {
    return "ताज़ा";
  }
}

export function LeadVideoSlider() {
  const [videoList, setVideoList] = useState<YouTubeVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    kamgarApi
      .getMediaVideos({ limit: 20 })
      .then((res) => {
        if (res?.videos && res.videos.length > 0) {
          // Prioritize videos in category "कामगार टाइम्स यूट्यूब वीडियो" or matching slug
          const ytVideos = res.videos.filter(
            (v) =>
              v.category?.slug === "kamgartimes-utube-video" ||
              v.category?.name?.includes("कामगार टाइम्स यूट्यूब") ||
              v.category?.name?.includes("कामगार")
          );

          // If specific category not found, take any published videos
          const chosen = (ytVideos.length > 0 ? ytVideos : res.videos)
            .slice()
            .sort(
              (a, b) =>
                new Date(b.createdAt || 0).getTime() -
                new Date(a.createdAt || 0).getTime()
            )
            .slice(0, 3);

          const mapped: YouTubeVideoItem[] = chosen
            .map((v) => {
              const yId = (v as any).youtubeVideoID || extractYoutubeId(v.youtubeUrl);
              if (!yId) return null;
              return {
                id: v._id,
                youtubeId: yId,
                category: v.category?.name || "कामगार टाइम्स",
                headline: v.title,
                duration: v.videoType === "SHORT" ? "शॉर्ट्स" : "विशेष कवरेज",
                views: "विशेष रिपोर्ट",
                timeAgo: formatTimeAgo(v.createdAt),
                isShort: v.videoType === "SHORT",
                thumbnail:
                  v.thumbnailUrl ||
                  `https://img.youtube.com/vi/${yId}/hqdefault.jpg`,
              };
            })
            .filter((item): item is YouTubeVideoItem => item !== null);

          setVideoList(mapped);
        } else {
          setVideoList([]);
        }
      })
      .catch(() => {
        setVideoList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const activeVideo = videoList[activeIndex];

  // Auto rotate slider every 7s unless user is playing a video
  useEffect(() => {
    if (isPlaying || !autoRotate || videoList.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videoList.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPlaying, autoRotate, videoList.length]);

  const handleSelectVideo = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
  };

  const handleNext = () => {
    setAutoRotate(false);
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % videoList.length);
  };

  const handlePrev = () => {
    setAutoRotate(false);
    setIsPlaying(false);
    setActiveIndex((prev) => (prev - 1 + videoList.length) % videoList.length);
  };

  return (
    <div className={styles.videoSliderContainer}>
      {/* Header Bar */}
      <div className={styles.videoSliderHeader}>
        <div className={styles.videoHeaderLeft}>
          <span className={styles.liveYoutubeBadge}>
            <Video size={17} color="#ff0000" />
            <span>कामगार टाइम्स यूट्यूब वीडियो</span>
          </span>
          {videoList.length > 0 && (
            <span className={styles.videoCountBadge}>
              {activeIndex + 1} / {videoList.length}
            </span>
          )}
        </div>

        {videoList.length > 1 && (
          <div className={styles.videoSliderControls}>
            <div className={styles.sliderDotsInline}>
              {videoList.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  className={`${styles.sliderDot} ${
                    i === activeIndex ? styles.sliderDotActive : ""
                  }`}
                  onClick={() => handleSelectVideo(i)}
                  aria-label={`वीडियो ${i + 1}`}
                  suppressHydrationWarning
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.sliderControlBtn}
              onClick={handlePrev}
              aria-label="पिछला वीडियो"
              suppressHydrationWarning
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className={styles.sliderControlBtn}
              onClick={handleNext}
              aria-label="अगला वीडियो"
              suppressHydrationWarning
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className={styles.noDataLoading}>
          <Loader2 className="animate-spin" size={20} />
          <span>वीडियो लोड हो रहे हैं...</span>
        </div>
      )}

      {/* Empty / Error state - NO fallback or dummy data */}
      {!loading && videoList.length === 0 && (
        <div className={styles.noDataCard}>
          <VideoOff className={styles.noDataIcon} size={40} />
          <h4 className={styles.noDataTitle}>कामगार टाइम्स यूट्यूब वीडियो उपलब्ध नहीं हैं</h4>
          <p className={styles.noDataDesc}>
            शीघ्र ही नए यूट्यूब वीडियो यहाँ उपलब्ध होंगे।
          </p>
        </div>
      )}

      {/* Main Grid Stage with Live YouTube Video */}
      {!loading && activeVideo && (
        <div className={styles.videoStageGrid}>
          {/* Primary Main Video */}
          <div className={styles.primaryVideoCard}>
            {isPlaying ? (
              <div className={styles.iframeWrapper}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.headline}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.videoIframe}
                />
              </div>
            ) : (
              <div
                className={`${styles.videoCoverStage} ${activeVideo.isShort ? styles.videoCoverStageShort : ""}`}
                style={{ backgroundImage: `url(${activeVideo.thumbnail})` }}
                onClick={() => setIsPlaying(true)}
              >
                <div className={styles.videoGradientOverlay} />

                <span className={styles.videoCategoryBadge}>
                  {activeVideo.category}
                </span>

                <button
                  type="button"
                  className={styles.videoPlayBtn}
                  aria-label="वीडियो देखें"
                  onClick={() => setIsPlaying(true)}
                  suppressHydrationWarning
                >
                  <Play size={26} fill="#ffffff" color="#ffffff" />
                </button>

                <div className={styles.videoMetaContent}>
                  <h2 className={styles.videoStageTitle}>
                    {activeVideo.headline}
                  </h2>
                  <div className={styles.videoSubMetaRow}>
                    <span className={styles.videoDurationChip}>
                      {activeVideo.duration}
                    </span>
                    <span>•</span>
                    <span>{activeVideo.timeAgo}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Playlist stack if multiple videos exist */}
          {videoList.length > 1 && (
            <div className={styles.videoPlaylistStack}>
              {videoList.map((item, idx) => {
                if (idx === activeIndex) return null;
                return (
                  <div
                    key={item.id}
                    className={`${styles.playlistItemCard} ${item.isShort ? styles.playlistItemCardShort : ""}`}
                    onClick={() => handleSelectVideo(idx)}
                  >
                    <div
                      className={`${styles.playlistThumb} ${item.isShort ? styles.playlistThumbShort : ""}`}
                      style={{ backgroundImage: `url(${item.thumbnail})` }}
                    >
                      <span className={styles.playlistPlayMini}>
                        <Play size={12} fill="#ffffff" color="#ffffff" />
                      </span>
                    </div>
                    <div className={styles.playlistItemInfo}>
                      <span className={styles.playlistCat}>{item.category}</span>
                      <h4 className={styles.playlistItemTitle}>{item.headline}</h4>
                      <span className={styles.playlistTime}>{item.timeAgo}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
