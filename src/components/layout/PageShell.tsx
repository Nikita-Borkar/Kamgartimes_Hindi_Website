import { BackToTop } from "@/components/layout/BackToTop";
import { MainNav } from "@/components/layout/MainNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TopBar } from "@/components/layout/TopBar";

/**
 * Chrome for every page that is not the homepage. Reuses the masthead, the
 * sticky category nav and the footer verbatim, so an internal page carries the
 * exact same identity as the front page. The news-only tickers are left out on
 * purpose: they belong to the wire, not to an about or privacy page.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header id="top">
        <TopBar />
        <MainNav />
      </header>
      {children}
      <SiteFooter />
      <BackToTop />
    </>
  );
}
