import { Clock3 } from "lucide-react";
import styles from "./sections.module.css";

const updates = [
  {
    time: "१०:४२",
    text: "मेट्रोच्या नव्या मार्गासाठी प्रवासी संघटनांची सूचना",
  },
  { time: "१०:१५", text: "ठाणे स्थानकाजवळील प्रस्तावित जोडमार्गावर चर्चा" },
  { time: "०९:५२", text: "महापालिकेने सुधारित आराखडा सादर केला" },
  { time: "०९:३०", text: "पर्यावरण अहवालावरील बैठक आज दुपारी" },
];

export function LiveUpdates() {
  return (
    <aside className={styles.liveUpdates} aria-label="लाईव्ह अपडेट्स">
      <div className={styles.liveHeading}>
        <h2>
          <span className={styles.liveDot} aria-hidden="true" />
          लाईव्ह अपडेट्स
        </h2>
        <span className={styles.liveBadge}>नमुना</span>
      </div>

      <h3 className={styles.liveEventTitle}>
        मुंबई मेट्रो विस्ताराच्या नव्या आराखड्यावर बैठक
      </h3>
      <div className={styles.liveEventMeta}>
        <Clock3 size={14} aria-hidden="true" />
        <span>संपादकीय अपडेट्स</span>
      </div>

      <ol className={styles.liveList}>
        {updates.map((update) => (
          <li className={styles.liveItem} key={update.time}>
            <time className={styles.liveTime}>{update.time}</time>
            <p>{update.text}</p>
          </li>
        ))}
      </ol>
      <div className={styles.liveFoot}>
        नमुना अपडेट्स. प्रत्यक्ष फीड जोडल्यावर येथे ताज्या घडामोडी दिसतील.
      </div>
    </aside>
  );
}
