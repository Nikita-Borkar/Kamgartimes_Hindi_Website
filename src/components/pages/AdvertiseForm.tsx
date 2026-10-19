"use client";

import { useState } from "react";
import styles from "./pages.module.css";

/**
 * Advertising enquiry form. No backend is wired yet, so the success state
 * stays honest about that instead of pretending the files were delivered.
 */
export function AdvertiseForm() {
  const [sent, setSent] = useState(false);

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
          धन्यवाद! आपका आवेदन दर्ज कर लिया गया है। विज्ञापन विभाग जल्द ही आपसे संपर्क करेगा।
        </p>
      ) : (
        <>
          <label className={styles.formField}>
            <span className={styles.formLabel}>नाम</span>
            <input
              className={styles.formInput}
              type="text"
              name="name"
              placeholder="अपना पूरा नाम दर्ज करें"
              required
              autoComplete="name"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>ईमेल</span>
            <input
              className={styles.formInput}
              type="email"
              name="email"
              placeholder="अपना ईमेल पता दर्ज करें"
              required
              autoComplete="email"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>फ़ोन नंबर</span>
            <input
              className={styles.formInput}
              type="tel"
              name="phone"
              placeholder="अपना मोबाइल नंबर दर्ज करें"
              required
              autoComplete="tel"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>पता</span>
            <input
              className={styles.formInput}
              type="text"
              name="address"
              placeholder="अपना पूरा पता दर्ज करें"
              autoComplete="street-address"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>
              अपना विज्ञापन अपलोड करें (तस्वीर, वीडियो)
            </span>
            <input
              className={styles.formFile}
              type="file"
              name="advertisement"
              accept="image/*,video/*"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>विज्ञापन का विवरण</span>
            <textarea
              className={styles.formTextarea}
              name="about"
              rows={4}
              placeholder="अपने विज्ञापन के बारे में जानकारी लिखें..."
            />
          </label>

          <button className={styles.formSubmit} type="submit">
            आवेदन भेजें
          </button>
        </>
      )}
    </form>
  );
}
