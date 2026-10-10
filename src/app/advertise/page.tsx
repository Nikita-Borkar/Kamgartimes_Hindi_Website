import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AdvertisePage } from "@/components/pages/AdvertisePage";
import { advertisePage } from "@/data/marketing";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${advertisePage.title} – ${site.name}`,
  description: advertisePage.promo.body,
};

export default function Advertise() {
  return (
    <PageShell>
      <AdvertisePage page={advertisePage} />
    </PageShell>
  );
}