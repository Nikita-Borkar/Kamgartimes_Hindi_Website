import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AuthPage } from "@/components/pages/AuthPage";
import { registerPage } from "@/data/auth";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${registerPage.title} – ${site.name}`,
  description: registerPage.lede,
};

export default function Register() {
  return (
    <PageShell>
      <AuthPage page={registerPage} mode="register" />
    </PageShell>
  );
}
