import { Play } from "lucide-react";
import { videoDiscovery } from "@/data/news";
import { Media } from "@/components/ui/Media";
import { videoHref } from "@/lib/links";
import styles from "./sections.module.css";

export function VideoDiscovery() {
  return (
    <section
      className={styles.videoDiscovery}
      aria-label="तुमच्यासाठी आणि ट्रेंडिंग व्हिडिओ"
    >
      <header className={styles.videoDiscoveryHead}>
        <h2>तुमच्यासाठी व्हिडिओ</h2>
        <p>संपादकीय निवड, सर्व वाचकांसाठी</p>
      </header>

      <div className={styles.videoDiscoveryGrid}>
        <div className={styles.recommendedVideos}>
          <h3 className={styles.videoSubhead}>निवडक व्हिडिओ</h3>
          <div className={styles.recommendedGrid}>
            {videoDiscovery.recommended.map((video) => (
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
                  <span className={styles.discoveryDuration}>
                    {video.duration}
                  </span>
                </span>
                <h4 className={styles.discoveryTitle}>{video.title}</h4>
                <span className={styles.discoveryMeta}>{video.meta}</span>
              </a>
            ))}
          </div>
        </div>

        <aside className={styles.trendingVideos}>
          <h3 className={styles.videoSubhead}>आत्ता ट्रेंडिंग</h3>
          <ol className={styles.trendingVideoList}>
            {videoDiscovery.trending.map((video, index) => (
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
      </div>
    </section>
  );
}
