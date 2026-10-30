"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { footer, site } from "@/data/site";
import {
  getSafeSocialUrl,
  SocialPlatformIcon,
  socialPlatformLabel,
} from "@/components/ui/SocialIcons";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { kamgarApi } from "@/services/apiClient";
import { categoryHref, categoryRouteHref } from "@/lib/links";
import styles from "./layout.module.css";
import type { Category, StaticPageMenuItem } from "@/types/api";

/** Resolves a section label to its /category/[slug] route, or the video/media desks. */
function sectionHref(label: string) {
  if (label === "होम") return "/";
  if (label === "वीडियो") return "/videos";
  if (label === "शॉर्ट्स") return "/shorts";
  if (label === "फोटो" || label === "गैलरी" || label === "फोटो गैलरी") return "/gallery";
  if (label === "ई-पेपर") return "/e-paper";
  return categoryHref(label);
}

type FooterCategory = Pick<Category, "_id" | "name" | "slug" | "parent" | "order">;
type FooterCompanyLink = { label: string; href: string };
type FooterAction = { label: string; href: string };

const footerActionPageSlugs = ["donate-us", "pay-for-ads"] as const;

const fallbackCategories: FooterCategory[] = footer.sectionLinks.map((label) => ({
  _id: label,
  name: label,
  slug: "",
  parent: null,
}));

function footerCategoryHref(category: FooterCategory): string {
  if (!category.slug) return sectionHref(category.name);

  const slug = category.slug.toLowerCase();
  if (slug === "e-paper" || slug === "epaper") return "/e-paper";
  if (slug === "videos") return "/videos";
  if (slug === "shorts") return "/shorts";
  return categoryRouteHref(category.slug);
}

export function SiteFooter() {
  const {
    siteName,
    tagline,
    logoUrl,
    socialLinks,
    contactEmail,
    contactPhone,
    address,
  } = useSiteSettings();
  const [logoSrc, setLogoSrc] = useState<string>("/img/logo_withtext.jpeg");
  const [parentCategories, setParentCategories] =
    useState<FooterCategory[]>(fallbackCategories);
  const [companyPages, setCompanyPages] =
    useState<FooterCompanyLink[]>([]);
  const [footerActions, setFooterActions] = useState<FooterAction[]>([]);

  useEffect(() => {
    let active = true;

    kamgarApi
      .getCategoryTree()
      .then((tree) => {
        if (!Array.isArray(tree)) {
          throw new Error("The public category response was not a list.");
        }

        const categories = tree
          .filter((category) => category.parent == null)
          .sort(
            (left, right) =>
              (left.order ?? Number.MAX_SAFE_INTEGER) -
                (right.order ?? Number.MAX_SAFE_INTEGER) ||
              left.name.localeCompare(right.name, "hi")
          )
          .slice(0, 16);

        if (active) setParentCategories(categories);
      })
      .catch((error) => {
        console.warn("Failed to load public footer categories:", error);
      });

    kamgarApi
      .getStaticPages()
      .then(({ pages }) => {
        if (!Array.isArray(pages)) {
          throw new Error("The public static-pages response was not a list.");
        }

        const activePages = [...pages].sort(
          (left: StaticPageMenuItem, right: StaticPageMenuItem) =>
            (left.sortOrder ?? 0) - (right.sortOrder ?? 0) ||
            left.title.localeCompare(right.title, "hi")
        );
        const actionSlugs: Set<string> = new Set(footerActionPageSlugs);
        const backendLinks = activePages
          .filter((page: StaticPageMenuItem) => page.showInFooter)
          .filter((page: StaticPageMenuItem) => !actionSlugs.has(page.slug))
          .map((page: StaticPageMenuItem) => ({
            label: page.title,
            href: `/${encodeURIComponent(page.slug)}`,
          }));
        const backendActions = footer.actions
          .filter((action) => action.href !== "/join-us")
          .flatMap((action, index) => {
          const page = activePages.find(
            (candidate) => candidate.slug === footerActionPageSlugs[index]
          );
          return page
            ? [{ label: action.label, href: `/${encodeURIComponent(page.slug)}` }]
            : [];
          });
        if (active) {
          setCompanyPages(backendLinks);
          setFooterActions(backendActions);
        }
      })
      .catch((error) => {
        console.warn("Failed to load public footer pages:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (logoUrl && logoUrl !== "/img/logo_withtext.jpeg") {
      setLogoSrc(logoUrl);
    } else {
      setLogoSrc("/img/logo_withtext.jpeg");
    }
  }, [logoUrl]);

  return (
    <footer className={styles.footer}>
      <div className={`${styles.shell} ${styles.footerInner}`}>
        <div>
          <Link href="/" className={styles.footerLogoLink} aria-label={`${siteName} - ${tagline}`}>
            <Image
              src={logoSrc}
              alt={`${siteName} - ${tagline}`}
              className={styles.footerLogoImg}
              width={220}
              height={55}
              unoptimized
              onError={() => setLogoSrc("/img/logo_withtext.jpeg")}
            />
          </Link>
          <p className={styles.footerBlurb}>{tagline}</p>
          {(contactEmail || contactPhone || address) && (
            <address className={styles.footerContacts}>
              {contactEmail && (
                <a className={styles.footerContact} href={`mailto:${contactEmail}`}>
                  <Mail size={15} aria-hidden="true" />
                  <span>{contactEmail}</span>
                </a>
              )}
              {contactPhone && (
                <a
                  className={styles.footerContact}
                  href={`tel:${contactPhone.replace(/[^\d+]/g, "")}`}
                >
                  <Phone size={15} aria-hidden="true" />
                  <span>{contactPhone}</span>
                </a>
              )}
              {address && (
                <span className={styles.footerContact}>
                  <MapPin size={15} aria-hidden="true" />
                  <span>{address}</span>
                </span>
              )}
            </address>
          )}
          <div className={styles.socialsGroup}>
            {socialLinks.map((social, index) => {
              const href = getSafeSocialUrl(social.url);
              if (!href) return null;
              const label = socialPlatformLabel(social.platform);

              return (
                <a
                  key={`${social.platform}-${index}`}
                  className={styles.socialBtn}
                  href={href}
                  aria-label={label}
                  title={`${siteName} on ${label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialPlatformIcon platform={social.platform} size={20} />
                </a>
              );
            })}
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerColTitle}>श्रेणियां</h4>
          <nav className={styles.footerLinks} aria-label="समाचार श्रेणियां">
            {parentCategories.map((category) => (
              <Link
                key={category._id || category.slug || category.name}
                className={styles.footerLink}
                href={footerCategoryHref(category)}
              >
                {category.name}
              </Link>
            ))}
          </nav>
          <div className={styles.footerActions}>
            {footerActions.map((action) => (
              <Link
                key={action.href}
                className={styles.footerBtn}
                href={action.href}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <nav className={styles.footerCol} aria-label="कंपनी">
          <h4 className={styles.footerColTitle}>{footer.sections[0].title}</h4>
          {companyPages.map((link) => (
            <Link key={link.href} className={styles.footerLink} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div
        className={styles.copy}
      >
        <div className={styles.copyInner}>
          <p className={styles.copyText}>
            {footer.copyright.replace(site.name, siteName)}
          </p>
        </div>
      </div>
    </footer>
  );
}
