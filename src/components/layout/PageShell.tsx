import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Chrome for every page that is not the homepage. Reuses the masthead, the
 * sticky category nav and the footer verbatim, so an internal page carries the
 * exact same identity as the front page. The news-only tickers are left out on
 * purpose: they belong to the wire, not to an about or privacy page.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
