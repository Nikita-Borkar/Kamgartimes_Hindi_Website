"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import styles from "./layout.module.css";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "dainik-pulse-theme";
const EVENT = "dainik-pulse-theme-change";

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  const activeTheme = mounted ? theme : "light";

  const toggle = () => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(EVENT));
  };

  const label = activeTheme === "dark" ? "लाइट मोड" : "डार्क मोड";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${styles.dot} ${styles.toggle}`}
      aria-label={label}
      title={label}
      suppressHydrationWarning
    >
      <span aria-hidden="true">
        {activeTheme === "dark" ? (
          <Sun size={16} strokeWidth={2} />
        ) : (
          <Moon size={16} strokeWidth={2} />
        )}
      </span>
    </button>
  );
}
