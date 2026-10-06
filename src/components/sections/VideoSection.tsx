import { videos } from "@/data/news";
import { Media } from "@/components/ui/Media";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stagger } from "@/components/motion/stagger";
import ui from "@/components/ui/ui.module.css";
import styles from "./sections.module.css";

function PlayGlyph() {
  return (
    <span className={styles.play} aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
        <path d="M7 4.5v15l13-7.5z" />
      </svg>
    </span>
  );
}

/**
 * व्हिडिओ. The only band on the page that inverts to --surface, so it reads
 * as a distinct desk without needing a border or a shadow.
 */
export function VideoSection() {
  const { feature, shorts } = videos;

  return (
    <section className={styles.videoPanel} aria-label="व्हिडिओ">
      <div className="reveal">
        <SectionHeader title="व्हिडिओ" action="अधिक पहा →" />
      </div>

      <div className={`${styles.videoGrid} reveal`}>
        <a
          className={styles.videoMain}
          href="#"
          aria-label={feature.title}
        >
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
          <h3 className={`${styles.videoMainTitle} ${ui.titleL}`}>
            {feature.title}
          </h3>
          <p className={ui.excerpt}>{feature.excerpt}</p>
        </a>

        {shorts.map((item, i) => (
          <a
            key={item.id}
            className={`${styles.videoSmall} reveal`}
            href="#"
            aria-label={item.title}
            style={stagger(i)}
          >
            <span className={`${styles.thumb} ${styles.thumbSmall}`}>
              <Media
                src={item.image}
                alt=""
                sizes="(max-width: 1100px) 100vw, 20vw"
                className={styles.thumbMedia}
              />
              <PlayGlyph />
              <span className={styles.duration}>{item.duration}</span>
            </span>
            <h3 className={`${styles.videoMainTitle} ${ui.titleS}`}>
              {item.title}
            </h3>
            <div className={ui.meta}>{item.meta}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
