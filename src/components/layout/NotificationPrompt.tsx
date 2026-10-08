"use client";

import { BellRing } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./layout.module.css";

const DISMISS_KEY = "kamgar-notification-prompt-dismissed";

export function NotificationPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = Boolean(window.sessionStorage.getItem(DISMISS_KEY));
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => setVisible(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Dismiss the prompt for this render even when storage is unavailable.
    }
    setVisible(false);
  };

  return (
    <aside
      className={styles.notificationPrompt}
      data-visible={visible}
      aria-hidden={!visible}
      aria-label="बातम्यांच्या सूचना"
    >
      <BellRing
        size={22}
        className={styles.notificationIcon}
        aria-hidden="true"
      />
      <div className={styles.notificationCopy}>
        <strong>ब्रेकिंग न्यूज सूचना हव्यात?</strong>
        <p>
          सूचना सुविधा लवकरच उपलब्ध होईल. सध्या कोणतीही सूचना सुरू होणार नाही.
        </p>
      </div>
      <button
        type="button"
        className={styles.notificationDismiss}
        tabIndex={visible ? 0 : -1}
        onClick={dismiss}
      >
        समजलं
      </button>
    </aside>
  );
}
