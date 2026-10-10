import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { DonatePage } from "@/components/pages/DonatePage";
import { donatePage } from "@/data/marketing";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${donatePage.title} – ${site.name}`,
  description: donatePage.lede,
};

export default function Donate() {
  return (
    <PageShell>
      <DonatePage page={donatePage} />
    </PageShell>
  );
}