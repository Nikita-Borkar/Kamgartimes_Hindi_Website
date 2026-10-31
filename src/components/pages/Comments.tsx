"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import type { ArticleComment } from "@/data/types";
import { kamgarApi, getAuthToken } from "@/services/apiClient";
import styles from "./article.module.css";

export function Comments({
  initial,
  articleId,
}: {
  initial: ArticleComment[];
  articleId?: string;
}) {
  const [list, setList] = useState(initial);
  const [draft, setDraft] = useState("");
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (articleId) {
      kamgarApi
        .getArticleComments(articleId)
        .then((res) => {
          if (res?.comments && Array.isArray(res.comments)) {
            const mapped: ArticleComment[] = res.comments.map((c) => ({
              id: c._id,
              name: c.user?.name || "पाठक",
              time: new Date(c.createdAt).toLocaleDateString("hi-IN"),
              text: c.body,
              likes: 0,
            }));
            setList(mapped);
          }
        })
        .catch(() => {});
    }
  }, [articleId]);

  async function submit() {
    const text = draft.trim();
    if (!text || isSubmitting) return;

    if (articleId) {
      if (!getAuthToken()) {
        alert("टिप्पणी करने के लिए कृपया लॉगिन करें। (Please login to post a comment)");
        return;
      }

      setIsSubmitting(true);
      try {
        const created = await kamgarApi.postArticleComment(articleId, { body: text });
        setList((current) => [
          {
            id: created._id,
            name: created.user?.name || "पाठक",
            time: "अभी",
            text: created.body,
            likes: 0,
          },
          ...current,
        ]);
        setDraft("");
      } catch (err: any) {
        alert(err.message || "टिप्पणी सबमिट करने में विफल।");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Local optimistic submit
      setList((current) => [
        {
          id: `local-${Date.now()}`,
          name: "पाठक",
          time: "अभी",
          text,
          likes: 0,
        },
        ...current,
      ]);
      setDraft("");
    }
  }

  return (
    <section
      className={styles.comments}
      id="comments"
      aria-label="पाठकों की टिप्पणियां"
    >
      <h2 className={styles.commentsHead}>
        <span className={styles.commentsBar} aria-hidden="true" />
        टिप्पणियां
        <span className={styles.commentsCount}>{list.length}</span>
      </h2>

      <form
        className={styles.commentForm}
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label className="srOnly" htmlFor="comment-input">
          अपनी टिप्पणी लिखें
        </label>
        <textarea
          id="comment-input"
          className={styles.commentTextarea}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="अपनी राय यहां लिखें…"
        />
        <button
          type="submit"
          className={styles.commentSubmit}
          disabled={!draft.trim() || isSubmitting}
        >
          {isSubmitting ? "भेजा जा रहा है..." : "टिप्पणी भेजें"}
        </button>
      </form>

      <ul className={styles.commentList}>
        {list.map((comment) => {
          const isLiked = Boolean(liked[comment.id]);
          return (
            <li key={comment.id} className={styles.comment}>
              <span className={styles.commentAvatar} aria-hidden="true">
                {comment.name.slice(0, 1)}
              </span>
              <div className={styles.commentBody}>
                <div className={styles.commentMeta}>
                  <span className={styles.commentName}>{comment.name}</span>
                  <span className={styles.commentTime}>{comment.time}</span>
                </div>
                <p className={styles.commentText}>{comment.text}</p>
                <button
                  type="button"
                  className={styles.commentLike}
                  aria-pressed={isLiked}
                  onClick={() =>
                    setLiked((current) => ({
                      ...current,
                      [comment.id]: !current[comment.id],
                    }))
                  }
                >
                  <ThumbsUp size={14} strokeWidth={2} aria-hidden="true" />
                  पसंद {comment.likes + (isLiked ? 1 : 0)}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
