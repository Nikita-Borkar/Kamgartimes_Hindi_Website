"use client";

import { Wrench } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import styles from "./layout.module.css";

export function SiteMaintenanceNotice() {
  const { isLoading, isMaintenanceMode, siteName } = useSiteSettings();

  if (isLoading || !isMaintenanceMode) return null;

  return (
    <aside className={styles.maintenanceNotice} role="status" aria-live="polite">
      <Wrench
        className={styles.maintenanceNoticeIcon}
        size={16}
        aria-hidden="true"
      />
      <strong>रखरखाव सूचना</strong>
      <span>
        {siteName} पर रखरखाव जारी है। आप वेबसाइट का उपयोग जारी रख सकते हैं।
      </span>
    </aside>
  );
}
