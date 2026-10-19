"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./pages.module.css";

type Mode = "login" | "register";

/**
 * Shared account form for /login and /register. No backend is wired yet, so
 * the success state is honest about that rather than pretending the account
 * exists.
 */
export function AuthForm({ mode }: { mode: Mode }) {
  const [sent, setSent] = useState(false);
  const isLogin = mode === "login";

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      {sent ? (
        <p className={styles.formSuccess} role="status">
          {isLogin
            ? "लॉग इन सफल रहा।"
            : "पंजीकरण सफल रहा।"}
        </p>
      ) : (
        <>
          {!isLogin && (
            <label className={styles.formField}>
              <span className={styles.formLabel}>पूरा नाम</span>
              <input
                className={styles.formInput}
                type="text"
                name="name"
                placeholder="पूरा नाम"
                required
                autoComplete="name"
              />
            </label>
          )}

          <label className={styles.formField}>
            <span className={styles.formLabel}>ईमेल</span>
            <input
              className={styles.formInput}
              type="email"
              name="email"
              placeholder="ईमेल"
              required
              autoComplete="email"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>पासवर्ड</span>
            <input
              className={styles.formInput}
              type="password"
              name="password"
              placeholder="पासवर्ड"
              required
              minLength={6}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </label>

          {!isLogin && (
            <label className={styles.formField}>
              <span className={styles.formLabel}>पासवर्ड की पुष्टि करें</span>
              <input
                className={styles.formInput}
                type="password"
                name="confirm"
                placeholder="पासवर्ड की पुष्टि करें"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </label>
          )}

          <button className={styles.formSubmit} type="submit">
            {isLogin ? "लॉग इन करें" : "पंजीकरण करें"}
          </button>

          <p className={styles.formSwitch}>
            {isLogin ? "खाता नहीं है? " : "पहले से खाता है? "}
            <Link
              className={styles.formSwitchLink}
              href={isLogin ? "/register" : "/login"}
            >
              {isLogin ? "पंजीकरण करें" : "लॉग इन करें"}
            </Link>
          </p>
        </>
      )}
    </form>
  );
}
