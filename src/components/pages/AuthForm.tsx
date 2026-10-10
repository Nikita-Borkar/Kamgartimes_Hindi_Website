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
            ? "नमुना लॉग इन यशस्वी. बॅकएंड जोडल्यानंतर खाते तपासले जाईल."
            : "नमुना नोंदणी पूर्ण. बॅकएंड जोडल्यानंतर खाते तयार होईल."}
        </p>
      ) : (
        <>
          {!isLogin && (
            <label className={styles.formField}>
              <span className={styles.formLabel}>पूर्ण नाव</span>
              <input
                className={styles.formInput}
                type="text"
                name="name"
                placeholder="पूर्ण नाव"
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
              <span className={styles.formLabel}>पासवर्डची खात्री करा</span>
              <input
                className={styles.formInput}
                type="password"
                name="confirm"
                placeholder="पासवर्डची खात्री करा"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </label>
          )}

          <button className={styles.formSubmit} type="submit">
            {isLogin ? "लॉग इन" : "नोंदणी करा"}
          </button>

          <p className={styles.formSwitch}>
            {isLogin ? "खाते नाही? " : "आधीच खाते आहे? "}
            <Link
              className={styles.formSwitchLink}
              href={isLogin ? "/register" : "/login"}
            >
              {isLogin ? "नोंदणी करा" : "लॉग इन"}
            </Link>
          </p>
        </>
      )}
    </form>
  );
}
