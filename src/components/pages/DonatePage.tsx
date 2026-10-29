"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, ShieldCheck, QrCode } from "lucide-react";
import type { DonatePageData } from "@/data/types";
import { BankDetails } from "./BankDetails";
import { PageHero } from "./PageHero";
import styles from "./pages.module.css";

/**
 * Donation page: editorial appeal in the body column, a sticky QR card on the
 * right, impact-allocation breakdown, and complete bank account details.
 */
export function DonatePage({ page }: { page: DonatePageData }) {
  const [copied, setCopied] = useState(false);

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(page.qr.upi);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        updated={page.updated}
        lede={page.lede}
      />

      <div className={styles.donateLayout}>
        {/* Left Column: Editorial mission, Why support, Pledge, Allocation & Bank details */}
        <div className={`${styles.body} reveal`}>
          <div className={styles.prose}>
            {page.intro.map((para) => (
              <p key={para} className={styles.para}>
                {para}
              </p>
            ))}
          </div>

          {page.sections.map((section) => (
            <section key={section.id} className={styles.section}>
              <h2 className={styles.sectionHead}>
                <span className={styles.sectionBar} aria-hidden="true" />
                {section.heading}
              </h2>
              <div className={styles.sectionBody}>
                {section.paragraphs?.map((para) => (
                  <p key={para} className={styles.para}>
                    {para}
                  </p>
                ))}
                {section.list && (
                  <ul className={styles.list}>
                    {section.list.map((item) => (
                      <li key={item} className={styles.listItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          {/* Allocation Breakdown (Where money goes) */}
          {page.facts && (
            <section className={`${styles.factsBand} reveal`}>
              <h2 className={styles.sectionHead}>
                <span className={styles.sectionBar} aria-hidden="true" />
                {page.facts.title}
              </h2>
              <dl className={styles.factsGrid}>
                {page.facts.items.map((item) => (
                  <div key={item.label} className={styles.fact}>
                    <dt className={styles.factLabel}>{item.label}</dt>
                    <dd className={styles.factValue}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Complete Bank Details */}
          {page.bank && <BankDetails data={page.bank} />}

          <p className={styles.note}>{page.note}</p>
        </div>

        {/* Right Column: High-visibility QR card with one-click copy & contribution guide */}
        <aside className={`${styles.donateCard} reveal`}>
          <div className={styles.donateBadge}>
            <QrCode size={14} />
            <span>त्वरित सहयोग • Instant UPI</span>
          </div>

          <h3 className={styles.donateCardTitle}>QR कोड स्कैन करके सहयोग भेजें</h3>
          <p className={styles.donateCardSubtitle}>
            Google Pay, PhonePe, Paytm, BHIM UPI आदि किसी भी ऐप से
          </p>

          <figure className={styles.qrImgWrap}>
            <Image
              className={styles.qrImgLarge}
              src={page.qr.src}
              alt={page.qr.alt}
              width={340}
              height={580}
            />
          </figure>

          <p className={styles.qrInstruction}>{page.qr.caption}</p>

          {/* One-Click Copy UPI Box */}
          <div className={styles.upiBox}>
            <div className={styles.upiLabelWrap}>
              <span className={styles.upiTitle}>कामगार टाइम्स आधिकारिक UPI ID</span>
              <span className={styles.upiValue}>{page.qr.upi}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyUpi}
              className={styles.copyBtn}
              aria-label="UPI ID कॉपी करें"
            >
              {copied ? (
                <>
                  <Check size={14} strokeWidth={2.5} /> कॉपी हुआ!
                </>
              ) : (
                <>
                  <Copy size={14} strokeWidth={2.5} /> कॉपी करें
                </>
              )}
            </button>
          </div>

          {/* Quick Amount Suggestion Chips */}
          <div className={styles.quickAmounts}>
            <span className={styles.quickAmountsLabel}>अनुशंसित सहयोग राशि:</span>
            <div className={styles.amountChips}>
              <span className={styles.amountChip}>₹100</span>
              <span className={styles.amountChip}>₹250</span>
              <span className={styles.amountChip}>₹500</span>
              <span className={styles.amountChip}>₹1,000</span>
              <span className={styles.amountChip}>₹2,500</span>
              <span className={styles.amountChip}>अपनी इच्छानुसार</span>
            </div>
          </div>

          {/* Bank Quick Summary */}
          <div className={styles.bankQuickSummary}>
            <div>
              <strong>बैंक:</strong> सेन्ट्रल बैंक ऑफ इंडिया (Central Bank of India)
            </div>
            <div>
              <strong>खाता संख्या:</strong> 5731427843 (IFSC: CBIN0283912)
            </div>
            <div className={styles.secureBadge}>
              <ShieldCheck size={14} />
              <span>100% सुरक्षित • सीधा आधिकारिक खाते में हस्तांतरण</span>
            </div>
          </div>
        </aside>
      </div>

    </main>
  );
}
