import React from "react";
import Link from "next/link";
import { Newspaper, ArrowLeft, RefreshCw } from "lucide-react";
import styles from "./ui.module.css";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "इस श्रेणी में अभी कोई समाचार उपलब्ध नहीं है",
  description = "एडमिन पैनल से इस श्रेणी में अभी तक कोई लेख प्रकाशित नहीं हुआ है। नए अपडेट और ताज़ा खबरों के लिए कृपया थोड़ी देर बाद देखें।",
  actionLabel = "मुख्य पृष्ठ पर जाएं",
  actionHref = "/",
  secondaryLabel = "ताज़ा खबरें देखें",
  secondaryHref = "/category/ताज़ा-खबरें",
  icon,
}: EmptyStateProps) {
  return (
    <div className={styles.emptyStateCard}>
      <div className={styles.emptyStateIconWrap} aria-hidden="true">
        {icon || <Newspaper size={32} strokeWidth={1.8} />}
      </div>
      <h3 className={styles.emptyStateTitle}>{title}</h3>
      <p className={styles.emptyStateDesc}>{description}</p>
      <div className={styles.emptyStateActions}>
        {actionHref && (
          <Link href={actionHref} className={styles.emptyStateBtnPrimary}>
            <ArrowLeft size={16} />
            <span>{actionLabel}</span>
          </Link>
        )}
        {secondaryHref && (
          <Link href={secondaryHref} className={styles.emptyStateBtnSecondary}>
            <RefreshCw size={15} />
            <span>{secondaryLabel}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
