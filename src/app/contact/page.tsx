import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { InfoPage } from "@/components/pages/InfoPage";
import { ContactMessageForm } from "@/components/forms/ContactMessageForm";
import { contactPage } from "@/data/pages";
import { site } from "@/data/site";
import { kamgarApi } from "@/services/apiClient";
import type { InfoPageData } from "@/data/types";

export const metadata: Metadata = {
  title: `${contactPage.title} – ${site.name}`,
  description: contactPage.lede,
};

export default async function Contact() {
  const pageData: InfoPageData = { ...contactPage };

  try {
    const [staticPage, settings] = await Promise.allSettled([
      kamgarApi.getStaticPage("contact-us"),
      kamgarApi.getSiteSettings(),
    ]);

    if (staticPage.status === "fulfilled" && staticPage.value?.title) {
      const sp = staticPage.value;
      pageData.title = sp.title;
      if (sp.excerpt) pageData.lede = sp.excerpt;
      if (sp.content) pageData.htmlContent = sp.content;
    }

    if (settings.status === "fulfilled" && settings.value) {
      const s = settings.value;
      const liveContacts = [...(pageData.contacts || [])];

      if (s.contactEmail) {
        liveContacts[0] = {
          id: "email",
          label: "ई-मेल (Email)",
          value: s.contactEmail,
          href: `mailto:${s.contactEmail}`,
        };
      }
      if (s.contactPhone) {
        liveContacts.push({
          id: "phone",
          label: "फ़ोन / हेल्पलाइन (Phone)",
          value: s.contactPhone,
          href: `tel:${s.contactPhone.replace(/\s+/g, "")}`,
        });
      }
      if (s.address) {
        liveContacts.push({
          id: "address",
          label: "कार्यालय पता (Office Address)",
          value: s.address,
        });
      }

      pageData.contacts = liveContacts;
    }
  } catch {}

  return (
    <PageShell>
      <InfoPage page={pageData} />
      <div style={{ maxWidth: "var(--shell-max, 1280px)", margin: "0 auto var(--space-12, 48px)", padding: "0 var(--shell-pad, 20px)" }}>
        <ContactMessageForm />
      </div>
    </PageShell>
  );
}
