"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./progressbar.module.css";

function ProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // When route changes, complete the bar and fade out
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Trickle effect while waiting for server response
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 65) return prev + Math.floor(Math.random() * 12 + 6);
          if (prev < 88) return prev + Math.floor(Math.random() * 3 + 1);
          return prev;
        });
      }, 200);
    }

    return () => clearInterval(interval);
  }, [loading]);

  // Intercept click on internal links for instant visual feedback
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Don't intercept if modifier keys are pressed (e.g. Cmd/Ctrl + Click for new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.defaultPrevented) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      if (targetAttr === "_blank" || !href) return;

      // Check if it's an internal route navigation
      const isInternal =
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("/#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:");

      if (isInternal) {
        const currentTarget = window.location.pathname + window.location.search;
        if (href !== currentTarget && href !== window.location.pathname) {
          setLoading(true);
          setProgress(22);
        }
      }
    };

    const handlePopState = () => {
      setLoading(true);
      setProgress(25);
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      className={styles.progressContainer}
      aria-hidden="true"
      style={{ opacity: progress === 100 ? 0 : 1 }}
    >
      <div
        className={styles.progressBar}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function NavigationProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarInner />
    </Suspense>
  );
}
