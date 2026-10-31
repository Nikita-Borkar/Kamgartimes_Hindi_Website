"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, ListChecks, Tag, User } from "lucide-react";
import type { Article } from "@/data/types";
import { buildArticleBody } from "@/data/articleContent";
import { categoryHref } from "@/lib/links";
import { Media } from "@/components/ui/Media";
import { AdSlot } from "@/components/ui/AdSlot";
import { StoryCard } from "@/components/ui/StoryCard";
import { kamgarApi } from "@/services/apiClient";

import ui from "@/components/ui/ui.module.css";
import { ArticleActions } from "./ArticleActions";
import { ArticleToc, type TocItem } from "./ArticleToc";
import { Comments } from "./Comments";
import styles from "./article.module.css";

function renderPdfAttachments(content: string) {
  return content.replace(
    /<a\b[^>]*\bhref=(['"])(https:\/\/[^'"]+\.pdf(?:[?#][^'"]*)?)\1[^>]*>[\s\S]*?<\/a>/gi,
    (_match, _quote, url) =>
      `<iframe class="article-pdf-viewer" src="${url.replace(/&amp;/gi, "&").replace(/&/g, "&amp;")}" title="PDF दस्तावेज़" loading="lazy"></iframe>`,
  );
}

/**
 * The reading page. Integrated with public articles APIs (view, share, reactions, comments)
 */
export function ArticlePage({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const body = buildArticleBody(article);

  useEffect(() => {
    if (article.apiId) {
      kamgarApi.recordArticleView(article.apiId).catch(() => {});
    }
  }, [article.apiId]);

  const tocItems: TocItem[] = [
    { id: "key-points", label: "मुख्य बिंदु" },
    ...body.sections.map((section) => ({
      id: section.id,
      label: section.heading,
    })),
  ];

  return (
    <main id="main" className={styles.main}>
      <div className={styles.layout}>
        <article className={styles.read}>
          <nav className={styles.breadcrumb} aria-label="पेज पथ">
            <Link className={styles.breadcrumbLink} href="/">
              मुख्य पृष्ठ
            </Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">
              /
            </span>
            <Link
              className={styles.breadcrumbLink}
              href={categoryHref(article.category)}
            >
              {article.category}
            </Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">
              /
            </span>
            <span className={styles.breadcrumbCurrent}>{article.headline}</span>
          </nav>

          <header className={styles.head}>
            <div className={styles.kicker}>
              <Link
                className={`${ui.chip} ${styles.kickerChip}`}
                href={categoryHref(article.category)}
              >
                {article.category}
              </Link>
            </div>

            <h1 className={`${styles.title} reveal`}>{article.headline}</h1>

            {body.intro[0] ? (
              <p className={`${styles.standfirst} reveal`}>{body.intro[0]}</p>
            ) : null}

            <div className={styles.byline}>
              <span className={styles.bylineGroup}>
                <User size={15} strokeWidth={2} aria-hidden="true" />
                <span className={styles.bylineAuthor}>{body.author.name}</span>
                <span aria-hidden="true">·</span>
                {body.author.role}
              </span>
              <span className={styles.bylineGroup}>
                <Calendar size={15} strokeWidth={2} aria-hidden="true" />
                {body.published}
              </span>
              <span className={styles.bylineGroup}>
                <Clock size={15} strokeWidth={2} aria-hidden="true" />
                {body.readTime}
              </span>
            </div>

            <ArticleActions
              likes={body.stats.likes}
              dislikes={body.stats.dislikes}
              commentCount={body.stats.comments}
              shareCount={body.stats.shares}
              title={article.headline}
              articleId={article.apiId}
            />

          </header>


          <figure className={styles.hero}>
            <Media
              src={article.image}
              alt=""
              sizes="(max-width: 900px) 100vw, 820px"
              priority
              className={styles.heroMedia}
            />
            <figcaption className={styles.caption}>
              सांकेतिक चित्र · {article.headline}
            </figcaption>
          </figure>

          {article.content ? (
            <div className={styles.prose}>
              <div
                className={styles.contentHtml}
                dangerouslySetInnerHTML={{ __html: renderPdfAttachments(article.content) }}
              />
            </div>
          ) : (
            <>
              <p className={styles.lede}>{body.intro[1] ?? body.intro[0]}</p>

              {body.intro.length > 2 ? (
                <div className={styles.prose}>
                  {body.intro.slice(2).map((para) => (
                    <p key={para} className={styles.para}>
                      {para}
                    </p>
                  ))}
                </div>
              ) : null}

              <aside className={styles.keyPoints} id="key-points">
                <h2 className={styles.keyPointsTitle}>
                  <ListChecks size={20} strokeWidth={2} aria-hidden="true" />
                  मुख्य बिंदु
                </h2>
                <ul className={styles.pointList}>
                  {body.keyPoints.map((point) => (
                    <li key={point} className={styles.point}>
                      {point}
                    </li>
                  ))}
                </ul>
              </aside>

              {body.sections.map((section, idx) => (
                <div key={section.id}>
                  <section className={styles.section} id={section.id}>
                    <h2 className={styles.sectionHead}>
                      <span className={styles.sectionBar} aria-hidden="true" />
                      {section.heading}
                    </h2>
                    <div className={styles.sectionBody}>
                      {section.paragraphs.map((para) => (
                        <p key={para} className={styles.para}>
                          {para}
                        </p>
                      ))}
                      {section.points ? (
                        <ul className={styles.pointList}>
                          {section.points.map((point) => (
                            <li key={point} className={styles.point}>
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </section>

                </div>
              ))}
            </>
          )}

          <div className={styles.tags}>
            <span className={styles.tagsLabel}>
              <Tag size={14} strokeWidth={2} aria-hidden="true" />
              विषय
            </span>
            {body.tags.map((tag) => (
              <Link
                key={tag}
                className={styles.tag}
                href={categoryHref(article.category)}
              >
                {tag}
              </Link>
            ))}
          </div>

          <div className={styles.author}>
            <span className={styles.avatar} aria-hidden="true">
              {body.author.name.slice(0, 1)}
            </span>
            <div>
              <p className={styles.authorName}>{body.author.name}</p>
              <p className={styles.authorRole}>{body.author.role}</p>
            </div>
          </div>

          <Comments initial={body.comments} articleId={article.apiId} />
        </article>

        <aside className={styles.rail} aria-label="समाचार अनुभाग और विज्ञापन">
          <div className={styles.railSticky}>
            <ArticleToc items={tocItems} />
            <div className={styles.railAd}>
              <AdSlot slotKey="in_article_middle" ad={{ id: "article-inside", label: "Ad", image: "/img/artical-inside-ads.png", href: "#", variant: "articleInside" }} />
            </div>
          </div>
        </aside>
      </div>


      {related.length > 0 ? (
        <section className={styles.related} aria-label="संबंधित समाचार">
          <h2 className={styles.relatedTitle}>
            <span className={styles.relatedBar} aria-hidden="true" />
            संबंधित समाचार
          </h2>
          <div className={styles.relatedGrid}>
            {related.map((item) => (
              <StoryCard
                key={item.id}
                article={item}
                sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 320px"
              />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

export { pickRelated } from "@/lib/pickRelated";
