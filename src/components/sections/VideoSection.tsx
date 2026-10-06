import { videos } from "@/data/news";
import { Media } from "@/components/ui/Media";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import { Play } from "lucide-react";
import ui from "@/components/ui/ui.module.css";
import styles from "./sections.module.css";
import type { VideoItem } from "@/data/types";

function PlayGlyph() {
  return (
    <span className={styles.play} aria-hidden="true">
      <Play size={22} fill="currentColor" strokeWidth={1.5} />
    </span>
  );
}

function VideoCard({
  item,
  short = false,
}: {
  item: VideoItem;
  short?: boolean;
}) {
  return (
    <a
      className={short ? styles.videoShortCard : styles.videoSmall}
      href="#"
      aria-label={item.title}
    >
      <span
        className={`${styles.thumb} ${short ? styles.thumbShort : styles.thumbLong}`}
      >
        <Media
          src={item.image}
          alt=""
          sizes={short ? "160px" : "(max-width: 1100px) 100vw, 24vw"}
          className={styles.thumbMedia}
        />
        <PlayGlyph />
        <span className={styles.duration}>{item.duration}</span>
      </span>
      <h4 className={`${styles.videoMainTitle} ${ui.titleS}`}>{item.title}</h4>
      <div className={ui.meta}>{item.meta}</div>
    </a>
  );
}

/**
 * व्हिडिओ. The only band on the page that inverts to --surface, so it reads
 * as a distinct desk without needing a border or a shadow.
 */
export function VideoSection() {
  const { feature, longVideos, shorts } = videos;

  return (
    <section className={styles.videoPanel} aria-label="व्हिडिओ">
      <div className="reveal">
        <SectionHeader title="व्हिडिओ" action="अधिक पहा →" />
      </div>

      <div className={`${styles.videoGroups} reveal`}>
        <section className={styles.videoGroup} aria-label="दीर्घ व्हिडिओ">
          <div className={styles.videoGroupHead}>
            <h3>दीर्घ व्हिडिओ</h3>
            <span>संपूर्ण वार्तांकन आणि विश्लेषण</span>
          </div>
          <div className={styles.videoLongGrid}>
            <a className={styles.videoMain} href="#" aria-label={feature.title}>
              <span className={`${styles.thumb} ${styles.thumbMain}`}>
                <Media
                  src={feature.image}
                  alt=""
                  sizes="(max-width: 1100px) 100vw, 40vw"
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
            </a>
            {longVideos.map((item, i) => (
              <div className="reveal" key={item.id} style={stagger(i)}>
                <VideoCard item={item} />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.videoGroup} aria-label="शॉर्ट व्हिडिओ">
          <div className={styles.videoGroupHead}>
            <h3>शॉर्ट्स</h3>
            <span>एका मिनिटात महत्त्वाच्या घडामोडी</span>
          </div>
          <div className={styles.videoShortGrid}>
            {shorts.map((item, i) => (
              <div className="reveal" key={item.id} style={stagger(i)}>
                <VideoCard item={item} short />
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
