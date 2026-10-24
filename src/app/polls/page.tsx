import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PollsPage } from "@/components/pages/PollsPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `आज का सवाल व पुराने सर्वेक्षण संग्रह – ${site.name}`,
  description:
    "कामगार टाइम्स दैनिक जनमत सर्वेक्षण: आज का सवाल, जनमत परिणाम और विगत सर्वेक्षणों का संपूर्ण अभिलेखागार।",
};

export default function Polls() {
  return (
    <PageShell>
      <PollsPage />
    </PageShell>
  );
}
