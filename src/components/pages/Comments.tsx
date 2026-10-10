"use client";

import { useState } from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import type { ArticleComment } from "@/data/types";
import styles from "./article.module.css";

/**
 * Comments block. There is no backend yet, so a submitted comment is prepended
 * to the local list and the count updates with it; wire the submit handler to
 * the comments API when it exists. Likes are per-comment and optimistic.
 */
export function Comments({ initial }: { initial: ArticleComment[] }) {
  const [list, setList] = useState(initial);
  const [draft, setDraft] = useState("");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  function submit() {
    const text = draft.trim();
    if (!text) return;
    setList((current) => [
      {
        id: `local-${Date.now()}`,
        name: "वाचक",
        time: "आत्ता",
        text,
        likes: 0,
      },
      ...current,
    ]);
    setDraft("");
  }

  return (
    <section
      className={styles.comments}
      id="comments"
      aria-label="वाचकांच्या टिप्पण्या"
    >
      <h2 className={styles.commentsHead}>
        <span className={styles.commentsBar} aria-hidden="true" />
        टिप्पण्या
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
          तुमची टिप्पणी लिहा
        </label>
        <textarea
          id="comment-input"
          className={styles.commentTextarea}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="तुमचे मत येथे लिहा…"
        />
        <button
          type="submit"
          className={styles.commentSubmit}
          disabled={!draft.trim()}
        >
          टिप्पणी पाठवा
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
                  आवडले {comment.likes + (isLiked ? 1 : 0)}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {list.length === 0 ? (
        <p className={styles.caption}>
          <MessageCircle size={14} strokeWidth={2} aria-hidden="true" /> अजून
          कोणतीही टिप्पणी नाही. पहिली टिप्पणी तुम्ही करा.
        </p>
      ) : null}
    </section>
  );
}
