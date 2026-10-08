"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import styles from "./layout.module.css";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "dainik-pulse-theme";
const EVENT = "dainik-pulse-theme-change";

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : "system";
}

function getServerSnapshot(): Theme {
  return "system";
}

/**
 * Theme is external state: it lives on <html data-theme>, written by the
 * inline script in app/layout.tsx. Reading it through useSyncExternalStore
 * keeps the button in sync without a mount effect or a cascading render.
 */
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

  const toggle = () => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(EVENT));
  };

  const label = theme === "dark" ? "उजळ रंग" : "गडद रंग";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`${styles.dot} ${styles.toggle}`}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">
        {theme === "dark" ? (
          <Sun size={16} strokeWidth={2} />
        ) : (
          <Moon size={16} strokeWidth={2} />
        )}
      </span>
    </button>
  );
}
