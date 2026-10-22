"use client";

import { PageShell } from "@/components/layout/PageShell";
import { Megaphone, CheckCircle2, Phone, Mail, Send, Building } from "lucide-react";
import styles from "./advertise.module.css";

export default function PayForAdvertisementPage() {
  const adPackages = [
    {
      title: "डिजिटल हेडर बैनर (Header Banner)",
      price: "₹ 5,000 / माह",
      features: [
        "वेबसाइट के मुख्य पृष्ठ पर सर्वोच्च स्थान",
        "मोबाइल और डेस्कटॉप दोनों पर स्पष्ट विज़िबिलिटी",
        "सीधे वेबसाइट या व्हाट्सएप लिंक की सुविधा",
        "प्रति माह 50,000+ इम्प्रेशन्स की गारंटी",
      ],
      tag: "सर्वाधिक लोकप्रिय",
    },
    {
      title: "दैनिक ई-पेपर विज्ञापन (E-Paper Ad)",
      price: "₹ 8,000 / माह",
      features: [
        "डिजिटल ई-पेपर के पहले या अंतिम पृष्ठ पर प्रमुख स्थान",
        "उच्च गुणवत्ता वाली HD रिज़ॉल्यूशन प्रिंट विज्ञापन",
        "PDF डाउनलोड में विज्ञापन स्थायी रूप से शामिल",
        "विदर्भ व संपूर्ण देश के लाखों पाठकों तक पहुंच",
      ],
      tag: "बेस्ट वैल्यू",
    },
    {
      title: "प्रायोजित समाचार (Sponsored Article)",
      price: "₹ 3,500 / समाचार",
      features: [
        "आपके ब्रांड, उत्पाद या सेवा की विस्तृत स्टोरी",
        "गूगल सर्च और सोशल मीडिया पर विशेष प्रमोशन",
        "असीमित विवरण, तस्वीरें और संपर्क जानकारी",
        "वेबसाइट पर स्थायी रूप से लाइव",
      ],
      tag: "हाई एंगेजमेंट",
    },
    {
      title: "वीडियो व शॉर्ट्स विज्ञापन (Video Ad)",
      price: "₹ 10,000 / माह",
      features: [
        "कामगार टाइम्स यूट्यूब और शॉर्ट्स वीडियो में स्थान",
        "1 मिनट का प्रायोजित वीडियो या लोगो वॉटरमार्क",
        "50,000+ यूट्यूब दर्शकों तक सीधी पहुंच",
        "व्हाट्सएप चैनल पर विशेष साझाकरण",
      ],
      tag: "वीडियो ब्रांडिंग",
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
              <span>विज्ञापन केंद्र</span>
            </div>
            <h1 className={styles.heroTitle}>विज्ञापन के लिए भुगतान (Pay for Advertisement)</h1>
            <p className={styles.heroSub}>
              कामगार टाइम्स देश और प्रदेश के असंगठित श्रमिकों, कर्मचारियों, व्यापारियों और युवाओं का विश्वसनीय डिजिटल मंच है। अपने ब्रांड को दें नई पहचान!
            </p>
          </header>

          {/* Ad Packages Grid */}
          <section className={styles.packagesSection}>
            <h2 className={styles.sectionHeading}>हमारे विज्ञापन पैकेज (Ad Packages)</h2>
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
                    विज्ञापन बुक करें
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Booking & Inquiry Form */}
          <section className={styles.inquirySection} id="inquiry-form">
            <div className={styles.inquiryGrid}>
              <div className={styles.inquiryInfo}>
                <h2 className={styles.infoTitle}>सीधे विज्ञापन संपर्क करें</h2>
                <p className={styles.infoText}>
                  किसी भी प्रकार के व्यावसायिक विज्ञापन, बैनर या सरकारी निविदा (Tenders) के लिए हमारे विज्ञापन विभाग से सीधे संपर्क करें।
                </p>

                <div className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <Phone size={20} color="#d32f2f" />
                    <div>
                      <strong>फ़ोन / व्हाट्सएप:</strong>
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
                      <p>कामगार टाइम्स भवन, सिविल लाइंस, नागपुर - 440001</p>
                    </div>
                  </div>
                </div>
              </div>

              <form className={styles.formCard} onSubmit={(e) => { e.preventDefault(); alert("आपकी विज्ञापन पूछताछ सफलतापूर्वक प्राप्त हो गई है। हमारे प्रतिनिधि जल्द ही आपसे संपर्क करेंगे।"); }}>
                <h3 className={styles.formTitle}>विज्ञापन पूछताछ फॉर्म</h3>

                <div className={styles.fieldGroup}>
                  <label htmlFor="ad-name">नाम / कंपनी का नाम *</label>
                  <input id="ad-name" type="text" placeholder="जैसे: राजेश शर्मा / सुयोग ट्रेडर्स" required />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="ad-phone">फ़ोन नंबर *</label>
                  <input id="ad-phone" type="tel" placeholder="10 अंकों का मोबाइल नंबर" required />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="ad-package">पैकेज चुनें</label>
                  <select id="ad-package">
                    <option>हेडर बैनर विज्ञापन (₹5,000)</option>
                    <option>ई-पेपर विज्ञापन (₹8,000)</option>
                    <option>प्रायोजित समाचार (₹3,500)</option>
                    <option>वीडियो विज्ञापन (₹10,000)</option>
                    <option>अन्य कस्टमाइज़ विज्ञापन (Custom Ad)</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="ad-msg">विवरण व संदेश</label>
                  <textarea id="ad-msg" rows={4} placeholder="विज्ञापन की अवधि और अन्य विवरण..." />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <Send size={16} />
                  <span>पूछताछ भेजें (Submit Inquiry)</span>
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </PageShell>
  );
}
