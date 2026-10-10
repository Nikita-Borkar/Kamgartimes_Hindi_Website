import type { AuthPageData } from "@/data/types";
import { AuthForm } from "./AuthForm";
import { PageHero } from "./PageHero";
import styles from "./pages.module.css";

/**
 * Login / register page: shared hero banner, a single centred account form.
 */
export function AuthPage({
  page,
  mode,
}: {
  page: AuthPageData;
  mode: "login" | "register";
}) {
  return (
    <main id="main" className={styles.main}>
      <PageHero eyebrow={page.eyebrow} title={page.title} lede={page.lede} />
      <div className={`${styles.authPanel} reveal`}>
        <AuthForm mode={mode} />
      </div>
    </main>
  );
}
