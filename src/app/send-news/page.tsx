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
              <span>सिटीझन रिपोर्टर</span>
            </div>
            <h1 className={styles.title}>अपनी ख़बर भेजें (बातमी पाठवा)</h1>
            <p className={styles.subtitle}>
              तुमच्या परिसरातील अन्यायाविरुद्ध आवाज उठवा! समस्या, अपघात, सांस्कृतिक कार्यक्रम किंवा कामगार आंदोलनाची बातमी, फोटो व व्हिडिओ थेट कामगार टाइम्स संपादकीय कक्षाला पाठवा.
            </p>
          </header>

          <div className={styles.cardLayout}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                alert("तुमची बातमी कामगार टाइम्स संपादकीय कक्षाकडे यशस्वीपणे पाठवली आहे. पडताळणीनंतर बातमी प्रसिद्ध केली जाईल.");
              }}
            >
              <h2 className={styles.formHeading}>बातमी तपशील प्रविष्ट करा</h2>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="reporter-name">
                    <User size={15} />
                    <span>तुमचे नाव (Reporter Name) *</span>
                  </label>
                  <input id="reporter-name" type="text" placeholder="उदा. अमोल देशमुख" required />
                </div>

                <div className={styles.field}>
                  <label htmlFor="reporter-phone">
                    <Phone size={15} />
                    <span>मोबाईल नंबर / व्हॉट्सॲप *</span>
                  </label>
                  <input id="reporter-phone" type="tel" placeholder="१० अंकी मोबाईल नंबर" required />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="news-location">
                    <MapPin size={15} />
                    <span>घटनास्थळ / शहर (Location) *</span>
                  </label>
                  <input id="news-location" type="text" placeholder="उदा. नागपूर, सावनेर" required />
                </div>

                <div className={styles.field}>
                  <label htmlFor="news-category">श्रेणी (Category)</label>
                  <select id="news-category">
                    <option>लोकल न्यूज़ (Local)</option>
                    <option>कामगार व श्रमिक (Labor Issue)</option>
                    <option>गुन्हेवार्ता (Crime)</option>
                    <option>सामाजिक समस्या (Social Issue)</option>
                    <option>कार्यक्रम व उत्सव (Event)</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="news-headline">बातमीचे शीर्षक (Headline) *</label>
                <input id="news-headline" type="text" placeholder="मुख्य बातमी एका ओळीत लिहा..." required />
              </div>

              <div className={styles.field}>
                <label htmlFor="news-detail">सविस्तर मजकूर (Full Story Details) *</label>
                <textarea id="news-detail" rows={6} placeholder="घटनेची पूर्ण माहिती, तारीख, वेळ आणि पार्श्वभूमी लिहा..." required />
              </div>

              <div className={styles.field}>
                <label>
                  <Upload size={15} />
                  <span>फोटो किंवा व्हिडिओ जोडा (Upload Media)</span>
                </label>
                <div className={styles.uploadBox}>
                  <Upload size={32} color="#94a3b8" />
                  <p>इथे फाइल ड्रॉप करा किंवा ब्राउझ करा (JPG, PNG, MP4 max 25MB)</p>
                  <input type="file" className={styles.fileInput} accept="image/*,video/*" />
                </div>
              </div>

              <div className={styles.noteBox}>
                <AlertCircle size={18} color="#d32f2f" />
                <span>टीप: कामगार टाइम्स कडक सत्यता पडताळणी (Fact-Check) नंतरच बातम्या प्रकाशित करते.</span>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <Send size={18} />
                <span>बातमी पाठवा (Submit News)</span>
              </button>
            </form>

            <div className={styles.sidebar}>
              <div className={styles.guideCard}>
                <h3>
                  <CheckCircle2 size={18} color="#22c55e" />
                  <span>बातमी कशी पाठवावी?</span>
                </h3>
                <ul>
                  <li>घटनेची अचूक तारीख, वेळ आणि ठिकाण नमूद करा.</li>
                  <li>शक्य असल्यास स्पष्ट फोटो किंवा छोटा व्हिडिओ क्लिप जोडा.</li>
                  <li>थेट संपर्क साधण्यासाठी तुमचा व्हॉट्सॲप नंबर नक्की द्या.</li>
                  <li>अफवा किंवा द्वेष पसरवणारा मजकूर पाठवू नका.</li>
                </ul>
              </div>

              <div className={styles.directWaCard}>
                <h3>व्हॉट्सॲपवर बातमी पाठवा 📱</h3>
                <p>फॉर्म न भरता थेट आमच्या व्हॉट्सॲप नंबरवर फोटो व मेसेज पाठवा:</p>
                <a
                  href="https://api.whatsapp.com/send?phone=918055502228&text=कामगार%20टाइम्स%20बातमी%20"
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
