"use client";

import { useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import {
  Send,
  Upload,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
} from "lucide-react";
import { kamgarApi } from "@/services/apiClient";
import styles from "./sendNews.module.css";

export default function SendNewsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("लोकल न्यूज़ (Local)");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await kamgarApi.submitNewsTip({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        location: location.trim(),
        subject: `[${category}] ${headline.trim()}`,
        description: description.trim(),
      });

      setSuccessMessage(
        "आपकी खबर कामगार टाइम्स संपादकीय डेस्क को सफलतापूर्वक भेज दी गई है। तथ्य जांच और सत्यापन के बाद इसे प्रकाशित किया जाएगा।"
      );
      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setLocation("");
      setHeadline("");
      setDescription("");
    } catch (err: any) {
      setErrorMessage(
        err?.message || "समाचार भेजने में समस्या आई। कृपया पुनः प्रयास करें।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2 className={styles.formHeading}>समाचार का विवरण दर्ज करें</h2>

              {successMessage && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    background: "rgba(34, 197, 94, 0.12)",
                    border: "1px solid #22c55e",
                    color: "#166534",
                    fontSize: "0.95rem",
                    marginBottom: "1rem",
                  }}
                >
                  <CheckCircle2 size={20} color="#166534" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong>धन्यवाद!</strong>
                    <p style={{ margin: "4px 0 0" }}>{successMessage}</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "14px 16px",
                    borderRadius: "8px",
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid #ef4444",
                    color: "#991b1b",
                    fontSize: "0.95rem",
                    marginBottom: "1rem",
                  }}
                >
                  <AlertCircle size={20} color="#991b1b" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <strong>त्रुटि:</strong>
                    <p style={{ margin: "4px 0 0" }}>{errorMessage}</p>
                  </div>
                </div>
              )}

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="reporter-name">
                    <User size={15} />
                    <span>आपका नाम (Reporter Name) *</span>
                  </label>
                  <input
                    id="reporter-name"
                    type="text"
                    placeholder="जैसे: अमोल देशमुख"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="reporter-phone">
                    <Phone size={15} />
                    <span>मोबाइल नंबर / व्हाट्सएप *</span>
                  </label>
                  <input
                    id="reporter-phone"
                    type="tel"
                    placeholder="10 अंकों का मोबाइल नंबर"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="news-location">
                    <MapPin size={15} />
                    <span>घटनास्थल / शहर (Location) *</span>
                  </label>
                  <input
                    id="news-location"
                    type="text"
                    placeholder="जैसे: नागपुर, सावनेर"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="news-category">श्रेणी (Category)</label>
                  <select
                    id="news-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
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
                <input
                  id="news-headline"
                  type="text"
                  placeholder="मुख्य खबर एक पंक्ति में लिखें..."
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="news-detail">विस्तृत विवरण (Full Story Details) *</label>
                <textarea
                  id="news-detail"
                  rows={6}
                  placeholder="घटना की पूरी जानकारी, तारीख, समय और पृष्ठभूमि लिखें..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className={styles.noteBox}>
                <AlertCircle size={18} color="#d32f2f" />
                <span>नोट: कामगार टाइम्स कड़ी सत्यता जांच (Fact-Check) के बाद ही समाचार प्रकाशित करता है।</span>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>भेजा जा रहा है...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>समाचार भेजें (Submit News)</span>
                  </>
                )}
              </button>
            </form>

            <div className={styles.sidebar}>
              {/* Recruitment Promo Card */}
              <div className={styles.recruitmentCard}>
                <div className={styles.recruitBadge}>भरती २०२६-२७</div>
                <h3>कामगार टाइम्सचे अधिकृत वार्ताहर व्हा! 🎙️</h3>
                <p>
                  आपल्या परिसरातील प्रश्न, जनआंदोलने व स्थानिक बातम्यांना राज्यव्यापी मंच द्या.
                  महाराष्ट्र राज्य पत्रकार व तालुका/जिल्हा प्रतिनिधी पदांसाठी अर्ज सुरू आहेत.
                </p>
                <Link href="/join-us" className={styles.recruitBtn}>
                  नियुक्ती अर्ज भरा (Apply Online) ➔
                </Link>
              </div>

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
