import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { WeatherPage } from "@/components/pages/WeatherPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `मौसम पूर्वानुमान व तापमान रिकॉर्ड (महाराष्ट्र) – ${site.name}`,
  description:
    "महाराष्ट्र के प्रमुख शहरों का लाइव मौसम पूर्वानुमान, बीते 7 दिनों का तापमान रिकॉर्ड, आर्द्रता, वर्षा और वायु गुणवत्ता (AQI) रिपोर्ट।",
};

export default function Weather() {
  return (
    <PageShell>
      <WeatherPage />
    </PageShell>
  );
}
