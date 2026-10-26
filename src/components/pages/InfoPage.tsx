import type { InfoPageData } from "@/data/types";
import { PageHero } from "./PageHero";
import { RelatedLinks } from "./RelatedLinks";
import styles from "./pages.module.css";

/**
 * One renderer for the four utility pages. The page supplies copy through
 * data/pages.ts; this component only owns the editorial layout: breadcrumb,
 * banner, serif lede, body column, optional quick-facts rail, contact grid and
 * the cross-link band. Reveal hooks come from motion.css so the pages share the
 * front page's stagger.
 */
export function InfoPage({ page }: { page: InfoPageData }) {
  const hasAside = Boolean(page.facts);

  return (
    <main id="main" className={styles.main}>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        updated={page.updated}
        lede={page.lede}
      />

      <div className={`${styles.layout} ${hasAside ? "" : styles.layoutSingle}`}>
        <div className={`${styles.body} reveal`}>
          {page.htmlContent ? (
            <div
              className={styles.prose}
              dangerouslySetInnerHTML={{ __html: page.htmlContent }}
              style={{ fontSize: "1.0625rem", lineHeight: 1.8, marginBottom: "var(--space-6)" }}
            />
          ) : page.intro ? (
            <div className={styles.prose}>
              {page.intro.map((para) => (
                <p key={para} className={styles.para}>
                  {para}
                </p>
              ))}
            </div>
          ) : null}

          {page.contacts && (
            <div className={styles.contacts}>
              {page.contacts.map((contact) => {
                const inner = (
                  <>
                    <span className={styles.contactLabel}>{contact.label}</span>
                    <span className={styles.contactValue}>{contact.value}</span>
                  </>
                );

                return contact.href ? (
                  <a key={contact.id} className={styles.contact} href={contact.href}>
                    {inner}
                  </a>
                ) : (
                  <div key={contact.id} className={styles.contact}>
                    {inner}
                  </div>
                );
              })}
            </div>
          )}

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

          {page.note && <p className={styles.note}>{page.note}</p>}

          {page.signature && (
            <div className={styles.signature}>
              <p className={styles.signatureName}>{page.signature.name}</p>
              <p className={styles.signatureRole}>{page.signature.role}</p>
              <p className={styles.signatureOrg}>{page.signature.organisation}</p>
            </div>
          )}
        </div>

        {page.facts && (
          <aside className={`${styles.aside} reveal`}>
            <h2 className={styles.asideTitle}>{page.facts.title}</h2>
            <dl className={styles.facts}>
              {page.facts.items.map((fact) => (
                <div key={fact.label} className={styles.fact}>
                  <dt className={styles.factLabel}>{fact.label}</dt>
                  <dd className={styles.factValue}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>

      <RelatedLinks currentHref={`/${page.slug}`} />
    </main>
  );
}
