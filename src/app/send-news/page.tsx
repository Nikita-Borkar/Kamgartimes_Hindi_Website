"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Send, Upload, MapPin, Phone, User, CheckCircle2, AlertCircle } from "lucide-react";
import styles from "./sendNews.module.css";

export default function SendNewsPage() {
  return (
    <PageShell>
      <main id="main" className={styles.main}>
        <div className={styles.shell}>
          <header className={styles.hero}>
            <div className={styles.badge}>
              <Send size={16} />
              <span>सिटिजन रिपोर्टर</span>
            </div>
            <h1 className={styles.title}>अपनी ख़बर भेजें</h1>
            <p className={styles.subtitle}>
              अपने क्षेत्र के अन्याय के खिलाफ आवाज़ उठाएं! जनसमस्या, दुर्घटना, सांस्कृतिक कार्यक्रम या श्रमिक आंदोलन की खबर, फोटो व वीडियो सीधे कामगार टाइम्स संपादकीय कक्ष को भेजें।
            </p>
          </header>

          <div className={styles.cardLayout}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                alert("आपकी खबर कामगार टाइम्स संपादकीय डेस्क को सफलतापूर्वक भेज दी गई है। तथ्य जांच और सत्यापन के बाद समाचार प्रकाशित किया जाएगा।");
              }}
            >
              <h2 className={styles.formHeading}>समाचार का विवरण दर्ज करें</h2>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="reporter-name">
                    <User size={15} />
                    <span>आपका नाम (Reporter Name) *</span>
                  </label>
                  <input id="reporter-name" type="text" placeholder="जैसे: अमोल देशमुख" required />
                </div>

                <div className={styles.field}>
                  <label htmlFor="reporter-phone">
                    <Phone size={15} />
                    <span>मोबाइल नंबर / व्हाट्सएप *</span>
                  </label>
                  <input id="reporter-phone" type="tel" placeholder="10 अंकों का मोबाइल नंबर" required />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="news-location">
                    <MapPin size={15} />
                    <span>घटनास्थल / शहर (Location) *</span>
                  </label>
                  <input id="news-location" type="text" placeholder="जैसे: नागपुर, सावनेर" required />
                </div>

                <div className={styles.field}>
                  <label htmlFor="news-category">श्रेणी (Category)</label>
                  <select id="news-category">
                    <option>लोकल न्यूज़ (Local)</option>
                    <option>कामगार व श्रमिक (Labor Issue)</option>
                    <option>अपराध (Crime)</option>
                    <option>सामाजिक मुद्दे (Social Issue)</option>
                    <option>कार्यक्रम व उत्सव (Event)</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="news-headline">समाचार का शीर्षक (Headline) *</label>
                <input id="news-headline" type="text" placeholder="मुख्य खबर एक पंक्ति में लिखें..." required />
              </div>

              <div className={styles.field}>
                <label htmlFor="news-detail">विस्तृत विवरण (Full Story Details) *</label>
                <textarea id="news-detail" rows={6} placeholder="घटना की पूरी जानकारी, तारीख, समय और पृष्ठभूमि लिखें..." required />
              </div>

              <div className={styles.field}>
                <label>
                  <Upload size={15} />
                  <span>तस्वीर या वीडियो जोड़ें (Upload Media)</span>
                </label>
                <div className={styles.uploadBox}>
                  <Upload size={32} color="#94a3b8" />
                  <p>यहाँ फ़ाइल ड्रॉप करें या ब्राउज़ करें (JPG, PNG, MP4 max 25MB)</p>
                  <input type="file" className={styles.fileInput} accept="image/*,video/*" />
                </div>
              </div>

              <div className={styles.noteBox}>
                <AlertCircle size={18} color="#d32f2f" />
                <span>नोट: कामगार टाइम्स कड़ी सत्यता जांच (Fact-Check) के बाद ही समाचार प्रकाशित करता है।</span>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Send size={18} />
                <span>समाचार भेजें (Submit News)</span>
              </button>
            </form>

            <div className={styles.sidebar}>
              <div className={styles.guideCard}>
                <h3>
                  <CheckCircle2 size={18} color="#22c55e" />
                  <span>समाचार कैसे भेजें?</span>
                </h3>
                <ul>
                  <li>घटना की सही तारीख, समय और स्थान अवश्य लिखें।</li>
                  <li>संभव हो तो स्पष्ट फोटो या छोटा वीडियो क्लिप जोड़ें।</li>
                  <li>सीधे संपर्क के लिए अपना व्हाट्सएप नंबर अवश्य दें।</li>
                  <li>अफवाह या भड़काऊ सामग्री न भेजें।</li>
                </ul>
              </div>

              <div className={styles.directWaCard}>
                <h3>व्हाट्सएप पर समाचार भेजें 📱</h3>
                <p>फॉर्म भरे बिना सीधे हमारे व्हाट्सएप नंबर पर फोटो व संदेश भेजें:</p>
                <a
                  href="https://api.whatsapp.com/send?phone=918055502228&text=कामगार%20टाइम्स%20ख़बर%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waBtn}
                >
                  8055502228 (WhatsApp Chat)
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
