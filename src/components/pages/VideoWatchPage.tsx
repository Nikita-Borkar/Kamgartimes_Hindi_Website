import Link from "next/link";
import { Clock, Eye, Play, ThumbsUp } from "lucide-react";
import type { VideoItem } from "@/data/types";
import { buildVideoBody } from "@/data/articleContent";
import { categoryHref, videoHref } from "@/lib/links";
import { Media } from "@/components/ui/Media";
import { VerticalAd } from "@/components/ui/VerticalAd";
import { AdSlot } from "@/components/ui/AdSlot";
import { verticalTowerAds, leaderboardAds } from "@/data/ads";
import { ArticleActions } from "./ArticleActions";
import { PlayerShell } from "./PlayerShell";
import styles from "./media.module.css";

function RelatedVideo({ item }: { item: VideoItem }) {
  return (
    <Link className={styles.card} href={videoHref(item.id)}>
      <span className={styles.thumb}>
        <Media src={item.image} alt="" sizes="120px" />
        <span className={styles.play} aria-hidden="true">
          <Play size={18} fill="currentColor" strokeWidth={1.5} />
        </span>
        <span className={styles.duration}>{item.duration}</span>
      </span>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <span className={styles.cardMeta}>{item.meta}</span>
    </Link>
  );
}

/**
 * Watch page for a long video or a short. The layout is the same for both:
 * player, title, meta, engagement bar, description, chapters and a related
 * rail. Shorts simply render in the same shell.
 */
export function VideoWatchPage({
  video,
  related,
}: {
  video: VideoItem;
  related: VideoItem[];
}) {
  const body = buildVideoBody(video);

  return (
    <main id="main" className={styles.main}>
      <nav className={styles.watchMeta} aria-label="पेज पथ">
        <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>
          मुख्य पृष्ठ
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href="/videos"
          style={{ color: "var(--muted)", textDecoration: "none" }}
        >
          वीडियो
        </Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: "var(--brand)" }}>{video.title}</span>
      </nav>

      <div className={styles.watch}>
        <div className={styles.watchMain}>
          <PlayerShell
            src={video.image}
            title={video.title}
            duration={video.duration}
            embedUrl={video.embedUrl}
            youtubeUrl={video.youtubeUrl}
          />

          <h1 className={styles.watchTitle}>{video.title}</h1>

          <div className={styles.watchMeta}>
            <span>
              <Eye size={15} strokeWidth={2} aria-hidden="true" />
              {body.stats.views}
            </span>
            <span>
              <Clock size={15} strokeWidth={2} aria-hidden="true" />
              {video.duration}
            </span>
            <span>
              <ThumbsUp size={15} strokeWidth={2} aria-hidden="true" />
              {body.stats.likes}
            </span>
            <span>{video.meta}</span>
          </div>

          <ArticleActions
            likes={body.stats.likes}
            dislikes={body.stats.dislikes}
            commentCount={body.stats.comments}
            shareCount={12}
            title={video.title}
          />

          <div className={styles.watchDesc}>
            {body.description.map((para) => (
              <p key={para} className={styles.watchPara}>
                {para}
              </p>
            ))}
          </div>

          <div className={styles.chapters} aria-label="वीडियो अध्याय">
            {body.chapters.map((chapter) => (
              <a key={chapter.time} className={styles.chapter} href="#comments">
                <span className={styles.chapterTime}>{chapter.time}</span>
                <span className={styles.chapterLabel}>{chapter.label}</span>
              </a>
            ))}
          </div>

          <div className={styles.tags}>
            {body.tags.map((tag) => (
              <Link key={tag} className={styles.tag} href={categoryHref(tag)}>
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <aside className={styles.watchSide} aria-label="अन्य वीडियो">
          <div className={styles.sideSticky}>
            <h2 className={styles.sideTitle}>
              <span className={styles.sideBar} aria-hidden="true" />
              अन्य वीडियो
            </h2>
            <div className={styles.sideList}>
              {related.map((item) => (
                <RelatedVideo key={item.id} item={item} />
              ))}
            </div>
            <div style={{ marginTop: "var(--space-6)" }}>
              <VerticalAd ad={verticalTowerAds[0]} />
            </div>
          </div>
        </aside>
      </div>

      <div className={styles.adSection}>
        <AdSlot ad={leaderboardAds[1]} />
      </div>
    </main>
  );
}
