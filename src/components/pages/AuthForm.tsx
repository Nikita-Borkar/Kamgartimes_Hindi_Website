"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { kamgarApi, setAuthTokens } from "@/services/apiClient";
import styles from "./pages.module.css";

type Mode = "login" | "register";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!isLogin && password !== confirm) {
      setErrorMsg("दोनों पासवर्ड मेल नहीं खाते। (Passwords do not match)");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const res = await kamgarApi.login({ email, password });
        if (res?.accessToken) {
          setAuthTokens(res.accessToken, res.refreshToken);
          setSuccessMsg(`स्वागत है, ${res.user?.name || "पाठक"}! Login सफल रहा।`);
          setTimeout(() => {
            router.push("/");
          }, 1200);
        }
      } else {
        const res = await kamgarApi.register({ name, email, password });
        setSuccessMsg(`Registration सफल रहा! अब आप Login कर सकते हैं।`);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err: any) {
      const msg = err.errors && err.errors.length ? err.errors.join(", ") : err.message;
      setErrorMsg(msg || "प्रमाणीकरण विफल। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {successMsg ? (
        <p className={styles.formSuccess} role="status">
          {successMsg}
        </p>
      ) : (
        <>
          {errorMsg ? (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                background: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #f87171",
                fontSize: "14px",
                marginBottom: "12px",
              }}
              role="alert"
            >
              {errorMsg}
            </div>
          ) : null}

          {!isLogin && (
            <label className={styles.formField}>
              <span className={styles.formLabel}>पूरा नाम</span>
              <input
                className={styles.formInput}
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="पासवर्ड (कम से कम 8 अक्षर)"
              required
              minLength={8}
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
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="पासवर्ड की पुष्टि करें"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </label>
          )}

          <button className={styles.formSubmit} type="submit" disabled={loading}>
            {loading ? "कृपया प्रतीक्षा करें..." : isLogin ? "Login" : "Register"}
          </button>

          <p className={styles.formSwitch}>
            {isLogin ? "खाता नहीं है? " : "पहले से खाता है? "}
            <Link
              className={styles.formSwitchLink}
              href={isLogin ? "/register" : "/login"}
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </>
      )}
    </form>
  );
}
