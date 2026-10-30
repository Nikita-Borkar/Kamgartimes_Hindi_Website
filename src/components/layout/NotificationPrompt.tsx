"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./notification.module.css";
import { getApiBase } from "@/services/apiClient";

const DISMISS_KEY = "kamgar-notification-prompt-dismissed";

function decodeVapidKey(value: string): Uint8Array {
  const key = value.trim();
  if (!/^[A-Za-z0-9_-]+$/.test(key) || key.length % 4 === 1) {
    throw new Error("The notification server returned a malformed VAPID public key. Check the backend VAPID_PUBLIC_KEY setting and restart the backend.");
  }

  try {
    const padded = `${key}${"=".repeat((4 - (key.length % 4)) % 4)}`;
    const raw = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(raw, (character) => character.charCodeAt(0));
    if (bytes.length !== 65 || bytes[0] !== 4) throw new Error("invalid key size");
    return bytes;
  } catch {
    throw new Error("The notification server returned a malformed VAPID public key. Check the backend VAPID_PUBLIC_KEY setting and restart the backend.");
  }
}

export function NotificationPrompt() {
  const [visible, setVisible] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("");

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
    if (working) return;
    setWorking(true);
    setMessage("");
    try {
      if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
        throw new Error("This browser does not support push notifications. Try a current version of Chrome, Edge, or Firefox.");
      }
      if (!window.isSecureContext) {
        throw new Error("Browser notifications require HTTPS. Open the secure HTTPS version of this website.");
      }
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setMessage(permission === "denied"
          ? "Notifications are blocked for this website. Allow them in your browser’s site settings, then try again."
          : "Please allow notifications in the browser prompt to subscribe.");
        return;
      }

      const keyResponse = await fetch(`${getApiBase()}/public/push/key`);
      if (!keyResponse.ok) throw new Error(`Notification server returned an error (${keyResponse.status}).`);
      const keyResult = await keyResponse.json();
      const publicKey = keyResult?.data?.publicKey as string | undefined;
      if (!publicKey) throw new Error("Push notifications are not configured on the server yet. The site administrator must add the VAPID keys.");

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
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || `Could not save your subscription (server error ${response.status}).`);
      }
      setSubscribed(true);
      setMessage("You’re subscribed. This popup will close shortly.");
      window.dispatchEvent(new CustomEvent("push-subscription-changed", { detail: { subscribed: true } }));
      window.setTimeout(() => setVisible(false), 1200);
    } catch (error) {
      console.error("Notification subscription failed:", error);
      setMessage(error instanceof Error ? error.message : "Subscription failed. Please try again.");
    } finally {
      setWorking(false);
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
      window.dispatchEvent(new CustomEvent("push-subscription-changed", { detail: { subscribed: false } }));
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
            {message && <p className={styles.notificationStatus} data-success={subscribed} role="status">{message}</p>}
            <div className={styles.promptActions}>
              <button type="button" className={styles.laterBtn} onClick={handleLater}>Later</button>
              <button
                type="button"
                className={`${styles.subscribeBtn} ${subscribed ? styles.subscribedState : ""}`}
                onClick={subscribed ? handleUnsubscribe : handleSubscribe}
                disabled={working}
              >
                {working ? "Subscribing…" : subscribed ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
