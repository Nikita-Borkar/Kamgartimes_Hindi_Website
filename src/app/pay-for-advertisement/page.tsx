"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Megaphone, CheckCircle2, Phone, Mail, FileText, Send, Building } from "lucide-react";
import styles from "./advertise.module.css";

export default function PayForAdvertisementPage() {
  const adPackages = [
    {
      title: "डिजिटल हेडर बॅनर (Header Banner)",
      price: "₹ 5,000 / महिना",
      features: [
        "वेबसाइटच्या मुख्य पानावर सर्वोच्च स्थान",
        "मोबाईल आणि डेस्कटॉप दोन्हीवर visible",
        "थेट वेबसाइट किंवा व्हॉट्सॲप लिंक जोडणी",
        "दरमहा ५०,०००+ इम्प्रेशन्सची हमी",
      ],
      tag: "सर्वात लोकप्रिय",
    },
    {
      title: "दैनिक ई-पेपर जाहिरात (E-Paper Ad)",
      price: "₹ 8,000 / महिना",
      features: [
        "डिजिटल ई-पेपरच्या पहिल्या किंवा शेवटच्या पानावर",
        "उच्च दर्जाची HD रिझोल्यूशन प्रिंट जाहिरात",
        "PDF डाऊनलोडमध्ये जाहिरात कायमस्वरूपी समाविष्ट",
        "विदर्भ व महाराष्ट्रातील सर्व वाचक वर्गापर्यंत पोहोच",
      ],
      tag: "बेस्ट व्हॅल्यू",
    },
    {
      title: "प्रायोजित बातमी (Sponsored Article)",
      price: "₹ 3,500 / बातमी",
      features: [
        "तुमच्या ब्रँड, उत्पादन किंवा उपक्रमाची सविस्तर स्टोरी",
        "गूगल सर्च व सोशल मीडियावर प्रमोशन",
        "अमर्याद मजकूर, फोटो व संपर्क माहिती",
        "कायमस्वरूपी वेबसाइटवर लाइव्ह",
      ],
      tag: "हाय एंगेजमेंट",
    },
    {
      title: "व्हिडिओ व शॉर्ट्स जाहिरात (Video Ad)",
      price: "₹ 10,000 / महिना",
      features: [
        "कामगार टाइम्स यूट्यूब व शॉर्ट्स व्हिडिओमध्ये",
        "१ मिनिटाचा प्रायोजित व्हिडिओ किंवा लोगो वॉटरमार्क",
        "५०,०००+ यूट्यूब प्रेक्षकांपर्यंत पोहोच",
        "व्हॉट्सॲप चॅनेलवर विशेष शेअरिंग",
      ],
      tag: "व्हिडिओ ब्रँडिंग",
    },
  ];

  return (
    <PageShell>
      <main id="main" className={styles.main}>
        <div className={styles.shell}>
          {/* Hero Banner */}
          <header className={styles.hero}>
            <div className={styles.badge}>
              <Megaphone size={16} />
              <span>जाहिरात दालन</span>
            </div>
            <h1 className={styles.heroTitle}>Pay for Advertisement</h1>
            <p className={styles.heroSub}>
              कामगार टाइम्स भारत व महाराष्ट्रातील असंगठित कामगार, कर्मचारी, व्यावसायिक आणि युवा वर्गाचे विश्वसनीय डिजिटल माध्यम आहे. तुमच्या ब्रँडला द्या नवी ओळख!
            </p>
          </header>

          {/* Ad Packages Grid */}
          <section className={styles.packagesSection}>
            <h2 className={styles.sectionHeading}>आमचे जाहिरात पॅकेजेस (Ad Packages)</h2>
            <div className={styles.grid}>
              {adPackages.map((pkg, i) => (
                <div key={i} className={styles.packageCard}>
                  <span className={styles.pkgTag}>{pkg.tag}</span>
                  <h3 className={styles.pkgTitle}>{pkg.title}</h3>
                  <div className={styles.pkgPrice}>{pkg.price}</div>
                  <ul className={styles.pkgFeatures}>
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <CheckCircle2 size={16} color="#22c55e" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#inquiry-form" className={styles.pkgBtn}>
                    जाहिरात बुक करा
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Booking & Inquiry Form */}
          <section className={styles.inquirySection} id="inquiry-form">
            <div className={styles.inquiryGrid}>
              <div className={styles.inquiryInfo}>
                <h2 className={styles.infoTitle}>थेट जाहिरात संपर्क करा</h2>
                <p className={styles.infoText}>
                  कोणत्याही प्रकारच्या व्यावसायिक जाहिराती, बॅनर किंवा सरकारी निविदा (Tenders) साठी आमच्या प्रतिनिधींशी थेट संपर्क साधू शकता.
                </p>

                <div className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <Phone size={20} color="#d32f2f" />
                    <div>
                      <strong>फोन / व्हॉट्सॲप:</strong>
                      <p>8055502228 / 9422100000</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <Mail size={20} color="#d32f2f" />
                    <div>
                      <strong>ईमेल:</strong>
                      <p>advertise@kamgartimes.com / contact@kamgartimes.com</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <Building size={20} color="#d32f2f" />
                    <div>
                      <strong>मुख्य कार्यालय:</strong>
                      <p>कामगार टाइम्स भवन, सिव्हिल लाईन्स, नागपूर - ४४०००१</p>
                    </div>
                  </div>
                </div>
              </div>

              <form className={styles.formCard} onSubmit={(e) => { e.preventDefault(); alert("तुमची जाहिरात चौकशी यशस्वीपणे प्राप्त झाली आहे. आमचे प्रतिनिधी लवकरच संपर्क साधतील."); }}>
                <h3 className={styles.formTitle}>जाहिरात चौकशी अर्ज</h3>

                <div className={styles.fieldGroup}>
                  <label htmlFor="ad-name">नाव / कंपनीचे नाव *</label>
                  <input id="ad-name" type="text" placeholder="उदा. राजेश शर्मा / सुयोग ट्रेडर्स" required />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="ad-phone">फोन नंबर *</label>
                  <input id="ad-phone" type="tel" placeholder="१० अंकी मोबाईल नंबर" required />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="ad-package">पॅकेज निवडा</label>
                  <select id="ad-package">
                    <option>हेडर बॅनर जाहिरात (₹5,000)</option>
                    <option>ई-पेपर जाहिरात (₹8,000)</option>
                    <option>प्रायोजित बातमी (₹3,500)</option>
                    <option>व्हिडिओ जाहिरात (₹10,000)</option>
                    <option>इतर सानुकूल जाहिरात (Custom Ad)</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="ad-msg">तपशील व संदेश</label>
                  <textarea id="ad-msg" rows={4} placeholder="जाहिरातीचा कालावधी आणि इतर तपशील..." />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Send size={16} />
                  <span>चौकशी पाठवा (Submit Inquiry)</span>
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </PageShell>
  );
}
