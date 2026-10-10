import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AuthPage } from "@/components/pages/AuthPage";
import { loginPage } from "@/data/auth";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${loginPage.title} – ${site.name}`,
  description: loginPage.lede,
};

export default function Login() {
  return (
    <PageShell>
      <AuthPage page={loginPage} mode="login" />
    </PageShell>
  );
}
