import styles from "./layout.module.css";

const quotes = [
  { name: "NIFTY 50", value: "24,875.35", change: "+0.38%", trend: "up" },
  { name: "SENSEX", value: "81,725.91", change: "+0.21%", trend: "up" },
  { name: "NIFTY BANK", value: "55,312.40", change: "-0.14%", trend: "down" },
  { name: "NIFTY IT", value: "38,497.25", change: "+0.64%", trend: "up" },
] as const;

export function MarketTicker() {
  return (
    <section
      className={styles.marketTicker}
      aria-label="बाजार निर्देशांक, नमुना आकडे"
    >
      <div className={`${styles.shell} ${styles.marketInner}`}>
        <h2 className={styles.marketHeading}>
          बाजार निर्देशांक
          <span className={styles.marketNote}>नमुना आकडे</span>
        </h2>
        <ul className={styles.marketQuotes}>
          {quotes.map((quote) => (
            <li className={styles.marketQuote} key={quote.name}>
              <span className={styles.marketName}>{quote.name}</span>
              <span className={styles.marketNumbers}>
                <span className={styles.marketValue}>{quote.value}</span>
                <span
                  className={`${styles.marketChange} ${quote.trend === "up" ? styles.marketUp : styles.marketDown}`}
                >
                  {quote.change}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
