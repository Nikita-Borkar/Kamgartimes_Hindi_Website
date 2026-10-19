"use client";

import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, Volume2, Share2, Video, Eye } from "lucide-react";
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
}

export const kamgarYoutubeVideos: YouTubeVideoItem[] = [
  {
    id: "yt-1",
    youtubeId: "dQw4w9WgXcQ",
    category: "अपराध",
    headline: "तड़ीपारों पर पुलिस की कड़ी नज़र; 17 अपराधियों पर जिलाबदर की कार्रवाई",
    duration: "०५:४५",
    views: "३५K",
    timeAgo: "२ घंटे पहले",
    thumbnail: "/img/img05.jpg",
  },
  {
    id: "yt-2",
    youtubeId: "LXb3EKWsInQ",
    category: "राजनीति",
    headline: "चुनाव सुधार समिति पर सत्तापक्ष और विपक्ष के बीच बनी सहमति | विशेष रिपोर्ट",
    duration: "०४:२५",
    views: "१५K",
    timeAgo: "४ घंटे पहले",
    thumbnail: "/img/img01.png",
  },
  {
    id: "yt-3",
    youtubeId: "5qap5aO4i9A",
    category: "व्यापार",
    headline: "सेंसेक्स का नया सर्वकालिक रिकॉर्ड; बैंकिंग व आईटी सेक्टर में जबर्दस्त तेजी",
    duration: "०३:१०",
    views: "२२K",
    timeAgo: "५ घंटे पहले",
    thumbnail: "/img/img02.png",
  },
  {
    id: "yt-4",
    youtubeId: "dQw4w9WgXcQ",
    category: "तकनीक",
    headline: "अपना सिम कार्ड किसी और को दिया तो 50 लाख तक का जुर्माना! दूरसंचार विभाग की चेतावनी",
    duration: "०२:५०",
    views: "४८K",
    timeAgo: "६ घंटे पहले",
    thumbnail: "/img/img03.jpg",
  },
  {
    id: "yt-5",
    youtubeId: "LXb3EKWsInQ",
    category: "कामगार टाइम्स",
    headline: "श्रमिकों के न्यूनतम वेतन में भारी बढ़ोतरी; सरकार का बड़ा ऐतिहासिक निर्णय",
    duration: "०६:१५",
    views: "५०K",
    timeAgo: "१ दिन पहले",
    thumbnail: "/img/img04.jpg",
  },
];

export function LeadVideoSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const activeVideo = kamgarYoutubeVideos[activeIndex];

  // Auto rotate slider every 7s unless playing
  useEffect(() => {
    if (isPlaying || !autoRotate) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % kamgarYoutubeVideos.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPlaying, autoRotate]);

  const handleSelectVideo = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
  };

  const handleNext = () => {
    setAutoRotate(false);
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % kamgarYoutubeVideos.length);
  };

  const handlePrev = () => {
    setAutoRotate(false);
    setIsPlaying(false);
    setActiveIndex((prev) => (prev - 1 + kamgarYoutubeVideos.length) % kamgarYoutubeVideos.length);
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
          <span className={styles.videoCountBadge}>
            {activeIndex + 1} / {kamgarYoutubeVideos.length}
          </span>
        </div>

        <div className={styles.videoSliderControls}>
          <div className={styles.sliderDotsInline}>
            {kamgarYoutubeVideos.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className={`${styles.sliderDot} ${i === activeIndex ? styles.sliderDotActive : ""}`}
                onClick={() => handleSelectVideo(i)}
                aria-label={`वीडियो ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.sliderControlBtn}
            onClick={handlePrev}
            aria-label="पिछला वीडियो"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className={styles.sliderControlBtn}
            onClick={handleNext}
            aria-label="अगला वीडियो"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Grid Stage */}
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
              className={styles.videoCoverStage}
              style={{ backgroundImage: `url(${activeVideo.thumbnail})` }}
              onClick={() => setIsPlaying(true)}
            >
              <div className={styles.videoGradientOverlay} />

              <span className={styles.videoCategoryBadge}>{activeVideo.category}</span>

              <button
                type="button"
                className={styles.videoPlayBtn}
                aria-label="वीडियो देखें"
                onClick={() => setIsPlaying(true)}
              >
                <Play size={26} fill="#ffffff" color="#ffffff" />
              </button>

              <div className={styles.videoMetaContent}>
                <h2 className={styles.videoStageTitle}>{activeVideo.headline}</h2>
                <div className={styles.videoSubMetaRow}>
                  <span className={styles.videoTimeMeta}>
                    <Eye size={13} /> {activeVideo.views} व्यूज • {activeVideo.timeAgo}
                  </span>
                  <div className={styles.videoActionsGroup}>
                    <span className={styles.videoDurationPill}>
                      <Volume2 size={12} /> {activeVideo.duration}
                    </span>
                    <button
                      type="button"
                      className={styles.videoShareBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (navigator.share) {
                          navigator.share({ title: activeVideo.headline, url: window.location.href });
                        }
                      }}
                    >
                      <Share2 size={12} /> शेयर
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Stack Playlist */}
        <div className={styles.videoPlaylistStack}>
          {kamgarYoutubeVideos
            .map((video, idx) => ({ video, idx }))
            .filter(({ idx }) => idx !== activeIndex)
            .slice(0, 2)
            .map(({ video, idx }) => (
              <div
                key={video.id}
                className={styles.playlistItemCard}
                onClick={() => handleSelectVideo(idx)}
              >
                <div
                  className={styles.playlistThumb}
                  style={{ backgroundImage: `url(${video.thumbnail})` }}
                >
                  <div className={styles.playlistOverlay} />
                  <span className={styles.playlistMiniPlay}>
                    <Play size={14} fill="#ffffff" color="#ffffff" />
                  </span>
                  <span className={styles.playlistDuration}>{video.duration}</span>
                </div>
                <div className={styles.playlistInfo}>
                  <span className={styles.playlistCategory}>{video.category}</span>
                  <h3 className={styles.playlistTitle}>{video.headline}</h3>
                  <span className={styles.playlistMeta}>{video.timeAgo}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
