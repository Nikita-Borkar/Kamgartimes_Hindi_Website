"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { kamgarApi } from "@/services/apiClient";
import type { SiteSettings, SocialLink } from "@/types/api";
import { site } from "@/data/site";

interface SiteSettingsContextValue {
  settings: SiteSettings | null;
  siteName: string;
  tagline: string;
  logoUrl: string;
  socialLinks: SocialLink[];
  contactEmail: string;
  contactPhone: string;
  address: string;
  isMaintenanceMode: boolean;
  isLoading: boolean;
  getSocialUrl: (platform: string, fallbackUrl?: string) => string;
  refetch: () => Promise<void>;
}

const defaultSocialLinks: SocialLink[] = [
  { platform: "whatsapp", url: "https://chat.whatsapp.com/kamgartimes" },
  { platform: "youtube", url: "https://youtube.com/@kamgartimes" },
  { platform: "facebook", url: "https://facebook.com/kamgartimes" },
  { platform: "instagram", url: "https://instagram.com/kamgartimes" },
  { platform: "twitter", url: "https://twitter.com/kamgartimes" },
];

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  settings: null,
  siteName: site.name,
  tagline: site.tagline,
  logoUrl: "/img/logo_withtext.jpeg",
  socialLinks: defaultSocialLinks,
  contactEmail: "",
  contactPhone: "",
  address: "",
  isMaintenanceMode: false,
  isLoading: true,
  getSocialUrl: (_platform: string, fallbackUrl = "#") => fallbackUrl,
  refetch: async () => {},
});

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await kamgarApi.getSiteSettings();
      if (data && (data.siteName || data.logoUrl || data.socialLinks)) {
        setSettings(data);
      }
    } catch (err) {
      console.warn("Failed to load public site settings:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const siteName = settings?.siteName?.trim() || site.name;
  const tagline = settings?.tagline?.trim() || site.tagline;
  const logoUrl = settings?.logoUrl?.trim() || "/img/logo_withtext.jpeg";
  const contactEmail = settings?.contactEmail?.trim() || "";
  const contactPhone = settings?.contactPhone?.trim() || "";
  const address = settings?.address?.trim() || "";
  const isMaintenanceMode = Boolean(settings?.isMaintenanceMode);
  const socialLinks = useMemo(() => {
    return settings?.socialLinks && settings.socialLinks.length > 0
      ? settings.socialLinks
      : defaultSocialLinks;
  }, [settings?.socialLinks]);

  const getSocialUrl = useCallback(
    (platform: string, fallbackUrl = "#"): string => {
      if (!platform) return fallbackUrl;
      const targetPlatform = platform.toLowerCase();
      // Handle x / twitter normalization
      const matched = socialLinks.find((l) => {
        const plat = l.platform.toLowerCase();
        if (plat === targetPlatform) return true;
        if ((plat === "twitter" && targetPlatform === "x") || (plat === "x" && targetPlatform === "twitter")) {
          return true;
        }
        return false;
      });

      return matched?.url?.trim() || fallbackUrl;
    },
    [socialLinks]
  );

  const value = useMemo<SiteSettingsContextValue>(
    () => ({
      settings,
      siteName,
      tagline,
      logoUrl,
      socialLinks,
      contactEmail,
      contactPhone,
      address,
      isMaintenanceMode,
      isLoading,
      getSocialUrl,
      refetch: fetchSettings,
    }),
    [
      settings,
      siteName,
      tagline,
      logoUrl,
      socialLinks,
      contactEmail,
      contactPhone,
      address,
      isMaintenanceMode,
      isLoading,
      getSocialUrl,
      fetchSettings,
    ]
  );

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettingsContextValue {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
}
