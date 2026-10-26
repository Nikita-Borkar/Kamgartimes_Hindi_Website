import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import {
  Mic,
  Award,
  CheckCircle2,
  Building,
  MapPin,
  AlertCircle,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Newspaper,
  Users,
  Send,
} from "lucide-react";
import { ReporterApplicationForm } from "@/components/forms/ReporterApplicationForm";
import styles from "./joinUs.module.css";

const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe3YcUYioaYiblTyEV_hSoTFq6y-mAIEUKY4RiOZ7HqWKiqbg/viewform?embedded=true";
const GOOGLE_FORM_SHORT_URL = "https://forms.gle/NVazQBd6pmtQ8JBMA";

export const metadata: Metadata = {
  title: "पत्रकार / प्रतिनिधी नियुक्ती अर्ज २०२६-२०२७ – कामगार टाइम्स (महाराष्ट्र राज्य)",
  description:
    "कामगार टाइम्स (महाराष्ट्र राज्य) - सर्व जिल्हे, तालुके आणि शहरांमध्ये निष्पक्ष, निर्भीक पत्रकार व प्रतिनिधी नियुक्ती अर्ज 2026-2027. ऑनलाइन अर्ज करा.",
};

const openRoles = [
  {
    title: "जिल्हा प्रतिनिधी (District Bureau)",
    desc: "जिल्हा मुख्यालयातील प्रमुख बातम्या, प्रशासकीय घडामोडी व जनआंदोलनांचे नेतृत्व.",
    icon: Building,
  },
  {
    title: "तालुका व शहर प्रतिनिधी",
    desc: "तालुका व स्थानिक पातळीवरील नागरी समस्या, प्रशासन, विकासकामे व सामाजिक घडामोडी.",
    icon: MapPin,
  },
  {
    title: "ग्रामीण प्रतिनिधी (Rural Stringer)",
    desc: "गाव-खेड्यातील शेतकऱ्यांचे प्रश्न, कामगार, रोजगार हमी व स्थानिक पंचायतीच्या बातम्या.",
    icon: Users,
  },
  {
    title: "क्राइम व विधी वार्ताहर (Crime Reporter)",
    desc: "पोलीस कारवाई, गुन्हेगारी अन्वेषण, न्यायालयीन निर्णय व कायदा-सुव्यवस्था वृत्तसंकलन.",
    icon: ShieldCheck,
  },
  {
    title: "राजकीय प्रतिनिधी (Political Desk)",
    desc: "निवडणुका, राजकीय विश्लेषण, विधिमंडळ कामकाज व पक्षीय घडामोडींचे वार्तांकन.",
    icon: Mic,
  },
  {
    title: "विशेष वार्ताहर (Special Correspondent)",
    desc: "कामगार व औद्योगिक विशेष रिपोर्ट, शोध पत्रकारिता, मुलाखती व वैशिष्ट्यपूर्ण लेख.",
    icon: Award,
  },
];

const perks = [
  {
    title: "अधिकृत प्रेस ओळखपत्र (Press ID Card)",
    desc: "कामगार टाइम्सचे अधिकृत ओळखपत्र व आवश्यक अधिकार पत्र.",
  },
  {
    title: "राज्यव्यापी डिजिटल व प्रिंट व्यासपीठ",
    desc: "दररोज लाखो वाचकांपर्यंत पोहोचणाऱ्या पोर्टल व ई-पेपरवर बातम्या प्रसिद्धी.",
  },
  {
    title: "संपादकीय पाठबळ व मार्गदर्शन",
    desc: "अनुभवी संपादकीय टीमकडून वृत्तसंकलन व लेखनाचे डिजिटल मार्गदर्शन.",
  },
  {
    title: "सामाजिक प्रतिष्ठा व निर्भीक पत्रकारिता",
    desc: "श्रमिक व जनसामान्यांच्या हक्कासाठी आवाज उठवण्याचे व्यासपीठ.",
  },
];

export default function JoinUsPage() {
  return (
    <PageShell>
      <main id="main" className={styles.main}>
        <div className={styles.shell}>
          {/* Hero Section */}
          <header className={styles.hero}>
            <div className={styles.heroContent}>
              <div className={styles.badge}>
                <Mic size={15} />
                <span>अधिकृत पत्रकार भरती २०२६-२०२७</span>
              </div>
              <h1 className={styles.title}>
                कामगार टाइम्स (महाराष्ट्र राज्य)
                <br />
                <span className={styles.titleHighlight}>
                  पत्रकार / प्रतिनिधी नियुक्ती अर्ज
                </span>
              </h1>
              <p className={styles.subtitle}>
                महाराष्ट्रातील सर्व जिल्हे, तालुके आणि शहरांमध्ये पत्रकार व प्रतिनिधी
                नियुक्त करण्यासाठी इच्छुक उमेदवारांकडून अर्ज मागविण्यात येत आहेत.
                पत्रकारिता क्षेत्रात काम करण्याची आवड असलेल्या, सामाजिक प्रश्नांची जाण
                असलेल्या आणि प्रामाणिकपणे वृत्तसंकलन करू इच्छिणाऱ्या व्यक्तींनी हा अर्ज भरावा.
              </p>

              <div className={styles.heroQuickBar}>
                <a href="#form-section" className={styles.primaryCtaBtn}>
                  <Send size={16} />
                  <span>थेट अर्ज भरा (Apply Online)</span>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=918055502228&text=कामगार%20टाइम्स%20पत्रकार%20नियुक्ती%20चौकशी"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waHelpBtn}
                >
                  <Phone size={16} />
                  <span>हेल्पलाइन: 8055502228</span>
                </a>
              </div>
            </div>
          </header>

          <div className={styles.contentGrid}>
            <div className={styles.mainContent}>
              {/* Open Roles Block */}
              <section className={styles.sectionBlock}>
                <h2 className={styles.sectionHeading}>
                  <Newspaper className={styles.sectionHeadingIcon} size={24} />
                  <span>उपलब्ध पदे (Available Positions)</span>
                </h2>
                <p className={styles.sectionDesc}>
                  आपल्या कार्यक्षेत्रानुसार आणि आवडीनुसार योग्य पदासाठी अर्ज सादर करा:
                </p>

                <div className={styles.rolesGrid}>
                  {openRoles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <div key={role.title} className={styles.roleCard}>
                        <div className={styles.roleIconBadge}>
                          <Icon size={20} />
                        </div>
                        <h3 className={styles.roleTitle}>{role.title}</h3>
                        <p className={styles.roleDesc}>{role.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Benefits Block */}
              <section className={styles.sectionBlock}>
                <h2 className={styles.sectionHeading}>
                  <Award className={styles.sectionHeadingIcon} size={24} />
                  <span>कामगार टाइम्स परिवारात सामील होण्याचे लाभ</span>
                </h2>
                <div className={styles.perksList}>
                  {perks.map((perk) => (
                    <div key={perk.title} className={styles.perkItem}>
                      <CheckCircle2 size={20} className={styles.perkIcon} />
                      <div className={styles.perkText}>
                        <h4>{perk.title}</h4>
                        <p>{perk.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Online Reporter Application Section */}
              <section id="form-section" className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <div>
                    <h2 className={styles.sectionHeading} style={{ margin: 0 }}>
                      <Send className={styles.sectionHeadingIcon} size={22} />
                      <span>थेट पोर्टल नियुक्ती अर्ज पत्र</span>
                    </h2>
                    <p style={{ margin: "4px 0 0", fontSize: "14px", color: "var(--muted)" }}>
                      आपली माहिती भरून थेट कामगार टाइम्स संपादकीय मंडळाकडे सादर करा:
                    </p>
                  </div>

                  <a
                    href={GOOGLE_FORM_SHORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLinkBtn}
                    title="Google Forms थेट लिंक उघडा"
                  >
                    <span>Google Forms वर उघडा</span>
                    <ExternalLink size={14} />
                  </a>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <ReporterApplicationForm />
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Selection Process Card */}
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>
                  <CheckCircle2 size={19} color="#d32f2f" />
                  <span>निवड प्रक्रिया (Selection Steps)</span>
                </h3>

                <ul className={styles.processList}>
                  <li className={styles.processStep}>
                    <div className={styles.stepNumber}>1</div>
                    <div className={styles.stepInfo}>
                      <h5>ऑनलाइन अर्ज</h5>
                      <p>गुगल फॉर्ममध्ये संपूर्ण वैयक्तिक व व्यावसायिक माहिती भरा.</p>
                    </div>
                  </li>
                  <li className={styles.processStep}>
                    <div className={styles.stepNumber}>2</div>
                    <div className={styles.stepInfo}>
                      <h5>अर्जांची छाननी</h5>
                      <p>संपादकीय मंडळ अर्जांची पात्रता व अनुभवाची पडताळणी करेल.</p>
                    </div>
                  </li>
                  <li className={styles.processStep}>
                    <div className={styles.stepNumber}>3</div>
                    <div className={styles.stepInfo}>
                      <h5>संवाद व मुलाखत</h5>
                      <p>पात्र उमेदवारांशी फोन किंवा प्रत्यक्ष संपर्क साधला जाईल.</p>
                    </div>
                  </li>
                  <li className={styles.processStep}>
                    <div className={styles.stepNumber}>4</div>
                    <div className={styles.stepInfo}>
                      <h5>नियुक्ती व प्रेस कार्ड</h5>
                      <p>अंतिम निवड झालेल्या प्रतिनिधींना अधिकृत ओळखपत्र जारी केले जाईल.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Note Card */}
              <div className={styles.alertNote}>
                <AlertCircle size={20} className={styles.alertNoteIcon} />
                <div>
                  <strong>महत्त्वाची नोंद:</strong>
                  <br />
                  अर्ज सादर केल्याने नियुक्ती निश्चित होत नाही. अर्जांची छाननी करून केवळ
                  पात्र उमेदवारांशी संपर्क साधण्यात येईल. पत्रकारितेतील नैतिक मूल्ये,
                  अचूक वृत्तसंकलन आणि सामाजिक बांधिलकी यांना प्राधान्य दिले जाईल.
                </div>
              </div>

              {/* Contact / Help Card */}
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>
                  <Phone size={19} color="#25d366" />
                  <span>संपर्क व माहिती कक्ष</span>
                </h3>

                <div className={styles.contactBox}>
                  <a
                    href="https://api.whatsapp.com/send?phone=918055502228&text=कामगार%20टाइम्स%20पत्रकार%20नियुक्ती%20चौकशी"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactItem}
                  >
                    <Phone size={16} color="#25d366" />
                    <span>WhatsApp / Call: 8055502228</span>
                  </a>

                  <a
                    href="mailto:contact@kamgartimes.com"
                    className={styles.contactItem}
                  >
                    <Mail size={16} color="#d32f2f" />
                    <span>contact@kamgartimes.com</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
