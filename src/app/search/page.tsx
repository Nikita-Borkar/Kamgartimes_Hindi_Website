import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SearchPage } from "@/components/pages/SearchPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `शोध – ${site.name}`,
  description: "कामगार टाइम्सवरील बातम्या, विभाग आणि विषय शोधा.",
};

export default function SearchRoute() {
  return (
    <PageShell>
      <SearchPage />
    </PageShell>
  );
}
