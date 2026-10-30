"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./notification.module.css";
import { getApiBase } from "@/services/apiClient";

const DISMISS_KEY = "kamgar-notification-prompt-dismissed";

function decodeVapidKey(value: string): Uint8Array {
  const padded = `${value}${"=".repeat((4 - (value.length % 4)) % 4)}`;
  const raw = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (character) => character.charCodeAt(0));
}

export function NotificationPrompt() {
  const [visible, setVisible] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let active = true;
    const subTimer = window.setTimeout(async () => {
      try {
        const registration = await navigator.serviceWorker?.getRegistration("/");
        const subscription = await registration?.pushManager.getSubscription();
        if (active && subscription) setSubscribed(true);
      } catch {
        // Push is unavailable in this browser.
      }
    }, 0);

    let dismissed = false;
    try {
      dismissed = Boolean(sessionStorage.getItem(DISMISS_KEY));
    } catch {
      dismissed = false;
    }

    let showTimer: number | undefined;
    if (!dismissed) showTimer = window.setTimeout(() => setVisible(true), 1200);

    return () => {
      active = false;
      window.clearTimeout(subTimer);
      if (showTimer) window.clearTimeout(showTimer);
    };
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
      // Ignore unavailable session storage.
    }
    setVisible(false);
  };

  const handleSubscribe = async () => {
    try {
      if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
        throw new Error("This browser does not support push notifications.");
      }
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      const keyResponse = await fetch(`${getApiBase()}/public/push/key`);
      if (!keyResponse.ok) throw new Error("Could not load notification configuration.");
      const keyResult = await keyResponse.json();
      const publicKey = keyResult?.data?.publicKey as string | undefined;
      if (!publicKey) throw new Error("Push notifications are not configured on the server yet.");

      const registration = await navigator.serviceWorker.register("/sw.js");
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: decodeVapidKey(publicKey),
      });
      const response = await fetch(`${getApiBase()}/public/push/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription.toJSON()),
      });
      if (!response.ok) throw new Error("Could not save your notification subscription.");
      setSubscribed(true);
      window.setTimeout(() => setVisible(false), 1200);
    } catch (error) {
      console.error("Notification subscription failed:", error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration("/");
      const subscription = await registration?.pushManager.getSubscription();
      if (subscription) {
        const response = await fetch(`${getApiBase()}/public/push/unsubscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
        if (!response.ok) throw new Error("Could not remove your notification subscription.");
        await subscription.unsubscribe();
      }
      setSubscribed(false);
    } catch (error) {
      console.error("Notification unsubscribe failed:", error);
    }
  };

  return (
    <>
      <div className={styles.promptOverlay} data-visible={visible} onClick={handleLater} aria-hidden="true" />
      <aside
        className={styles.promptCard}
        data-visible={visible}
        aria-hidden={!visible}
        aria-label="सूचना सदस्यता (Notification Subscription)"
      >
        <div className={styles.promptContent}>
          <div className={styles.promptLogoWrap}>
            <Image src="/img/logo.png" alt="कामगार टाइम्स" className={styles.promptLogo} width={64} height={64} />
          </div>
          <div className={styles.promptBody}>
            <p className={styles.promptMessage}>
              Subscribe to receive a browser notification when a new article is published. You can unsubscribe anytime.
            </p>
            <div className={styles.promptActions}>
              <button type="button" className={styles.laterBtn} onClick={handleLater}>Later</button>
              <button
                type="button"
                className={`${styles.subscribeBtn} ${subscribed ? styles.subscribedState : ""}`}
                onClick={subscribed ? handleUnsubscribe : handleSubscribe}
              >
                {subscribed ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
