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
          धन्यवाद! आपला अर्ज नोंदवला गेला. बॅकएंड जोडल्यानंतर हा फॉर्म जाहिरात
          विभागाला थेट संदेश पाठवेल.
        </p>
      ) : (
        <>
          <label className={styles.formField}>
            <span className={styles.formLabel}>Name</span>
            <input
              className={styles.formInput}
              type="text"
              name="name"
              placeholder="Name"
              required
              autoComplete="name"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>Email</span>
            <input
              className={styles.formInput}
              type="email"
              name="email"
              placeholder="Email"
              required
              autoComplete="email"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>Phone Number</span>
            <input
              className={styles.formInput}
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              autoComplete="tel"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>Address</span>
            <input
              className={styles.formInput}
              type="text"
              name="address"
              placeholder="Enter Your Address"
              autoComplete="street-address"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>
              Submit Your Advertisement (Images, Video)
            </span>
            <input
              className={styles.formFile}
              type="file"
              name="advertisement"
              accept="image/*,video/*"
            />
          </label>

          <label className={styles.formField}>
            <span className={styles.formLabel}>About Your Advertisement</span>
            <textarea
              className={styles.formTextarea}
              name="about"
              rows={4}
              placeholder="About Your Advertisement"
            />
          </label>

          <button className={styles.formSubmit} type="submit">
            Send Now
          </button>
        </>
      )}
    </form>
  );
}
