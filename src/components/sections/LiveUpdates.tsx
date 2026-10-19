import { Clock3 } from "lucide-react";
import styles from "./sections.module.css";

const updates = [
  {
    time: "१०:४२",
    text: "मेट्रो के नए रूट विस्तार हेतु यात्री संगठनों ने सौंपे महत्वपूर्ण सुझाव",
  },
  { time: "१०:१५", text: "ठाणे और मुंबई उपनगरों के बीच कनेक्टिविटी सुधार पर उच्चस्तरीय बैठक" },
  { time: "०९:५२", text: "नगर निगम ने पेश किया पुनर्विकास और जल निकासी का संशोधित मास्टर प्लान" },
  { time: "०९:३०", text: "पर्यावरण मंजूरी और औद्योगिक नीति पर कैबिनेट उपसमिति की बैठक आज दोपहर" },
];

export function LiveUpdates() {
  return (
    <aside className={styles.liveUpdates} aria-label="लाइव अपडेट्स">
      <div className={styles.liveHeading}>
        <h2>
          <span className={styles.liveDot} aria-hidden="true" />
          लाइव अपडेट्स
        </h2>
        <span className={styles.liveBadge}>लाइव</span>
      </div>

      <h3 className={styles.liveEventTitle}>
        मुंबई मेट्रो विस्तार और औद्योगिक गलियारे की प्रगति पर विशेष बैठक
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
        ताज़ा लाइव अपडेट्स। समाचार अपडेट होते ही आपको तुरंत नवीनतम जानकारी मिलेगी।
      </div>
    </aside>
  );
}
