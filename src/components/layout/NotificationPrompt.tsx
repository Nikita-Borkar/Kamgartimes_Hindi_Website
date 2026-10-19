"use client";

import { useEffect, useState } from "react";
import styles from "./notification.module.css";

const DISMISS_KEY = "kamgar-notification-prompt-dismissed";
const SUBSCRIBED_KEY = "kamgar-notification-subscribed";

export function NotificationPrompt() {
  const [visible, setVisible] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Check if already subscribed
    try {
      if (localStorage.getItem(SUBSCRIBED_KEY) === "true") {
        setSubscribed(true);
      }
    } catch {
      // storage unavailable
    }

    // Check if dismissed in this session
    let dismissed = false;
    try {
      dismissed = Boolean(sessionStorage.getItem(DISMISS_KEY));
    } catch {
      dismissed = false;
    }

    if (!dismissed) {
      const timer = window.setTimeout(() => setVisible(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setVisible(true);
    window.addEventListener("open-notification-prompt", handleOpen);
    return () => window.removeEventListener("open-notification-prompt", handleOpen);
  }, []);

  const handleLater = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const handleSubscribe = async () => {
    try {
      if (typeof window !== "undefined" && "Notification" in window) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          localStorage.setItem(SUBSCRIBED_KEY, "true");
          setSubscribed(true);
        }
      } else {
        localStorage.setItem(SUBSCRIBED_KEY, "true");
        setSubscribed(true);
      }
    } catch {
      localStorage.setItem(SUBSCRIBED_KEY, "true");
      setSubscribed(true);
    }

    setSubscribed(true);
    window.setTimeout(() => {
      setVisible(false);
    }, 1200);
  };

  return (
    <>
      <div
        className={styles.promptOverlay}
        data-visible={visible}
        onClick={handleLater}
        aria-hidden="true"
      />

      <aside
        className={styles.promptCard}
        data-visible={visible}
        aria-hidden={!visible}
        aria-label="सूचना सदस्यता (Notification Subscription)"
      >
        <div className={styles.promptContent}>
          <div className={styles.promptLogoWrap}>
            <img
              src="/img/logo.png"
              alt="कामगार टाइम्स"
              className={styles.promptLogo}
              width={64}
              height={64}
            />
          </div>

          <div className={styles.promptBody}>
            <p className={styles.promptMessage}>
              Subscribe to our notifications for the latest news and updates. You can disable anytime.
            </p>

            <div className={styles.promptActions}>
              <button
                type="button"
                className={styles.laterBtn}
                onClick={handleLater}
              >
                Later
              </button>
              <button
                type="button"
                className={`${styles.subscribeBtn} ${subscribed ? styles.subscribedState : ""}`}
                onClick={handleSubscribe}
              >
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
