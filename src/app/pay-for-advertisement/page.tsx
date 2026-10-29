import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { toInfoPageData } from "@/lib/staticPageInfo";
import { kamgarApi } from "@/services/apiClient";
import { site } from "@/data/site";
import type { SiteSettings, StaticPage } from "@/types/api";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await kamgarApi.getStaticPage("pay-for-ads");
    return {
      title: `${page.seo?.metaTitle || page.title} – ${site.name}`,
      description: page.seo?.metaDescription || page.excerpt,
    };
  } catch {
    return { title: `विज्ञापन – ${site.name}` };
  }
}

export default async function PayForAdvertisementPage() {
  let page: StaticPage;
  let settings: SiteSettings | null;
  try {
    [page, settings] = await Promise.all([
      kamgarApi.getStaticPage("pay-for-ads"),
      kamgarApi.getSiteSettings().catch(() => null),
    ]);
  } catch {
    notFound();
  }

  const content = toInfoPageData(page, "विज्ञापन");
  content.contacts = [
    settings?.contactPhone
      ? {
          id: "phone",
          label: "फ़ोन",
          value: settings.contactPhone,
          href: `tel:${settings.contactPhone.replace(/\s+/g, "")}`,
        }
      : null,
    settings?.contactEmail
      ? {
          id: "email",
          label: "ईमेल",
          value: settings.contactEmail,
          href: `mailto:${settings.contactEmail}`,
        }
      : null,
    settings?.address
      ? { id: "address", label: "कार्यालय", value: settings.address }
      : null,
  ].filter((contact): contact is NonNullable<typeof contact> => contact !== null);

  return (
    <PageShell>
      <InfoPage page={content} />
    </PageShell>
  );
}
