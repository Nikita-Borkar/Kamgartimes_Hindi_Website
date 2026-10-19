import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SearchPage } from "@/components/pages/SearchPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `खोज – ${site.name}`,
  description: "कामगार टाइम्स पर समाचार, श्रेणी और विषय खोजें।",
};

export default function SearchRoute() {
  return (
    <PageShell>
      <SearchPage />
    </PageShell>
  );
}
