import { Search } from "lucide-react";
import { navItems } from "@/data/site";
import styles from "./layout.module.css";

export function MainNav() {
  return (
    <nav className={`${styles.nav} ${styles.sticky}`} data-sticky-nav aria-label="मुख्य">
      <div className={`${styles.shell} ${styles.navInner}`}>
        <div className={styles.navList}>
          {navItems.map((item) => (
            <a key={item.label} className={styles.navLink} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <button type="button" className={styles.search} aria-label="शोधा">
          <Search size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
