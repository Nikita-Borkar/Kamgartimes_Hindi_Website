import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Noto_Serif_Devanagari } from "next/font/google";
import { site } from "@/data/site";
import { ScrollChrome } from "@/components/motion/ScrollChrome";
import "@/design/tokens.css";
import "@/design/base.css";
import "@/design/motion.css";

const sans = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--next-font-sans",
});

const serif = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--next-font-serif",
});

export const metadata: Metadata = {
  title: `${site.name} – मुख्यपृष्ठ`,
  description: site.description,
};

/**
 * Runs before first paint, so a reader who chose dark never sees a flash of
 * the light palette, and a reader without JS never gets a blank page. The
 * no-js class is what gates the scroll reveal, so removing it is the signal
 * that ScrollChrome is coming.
 */
const themeScript = `(function(){var d=document.documentElement;d.classList.remove('no-js');try{var t=localStorage.getItem('dainik-pulse-theme');if(t==='light'||t==='dark'){d.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="mr"
      className={`no-js ${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skipLink" href="#main">
          मजकुराकडे जा
        </a>
        <ScrollChrome />
        {children}
      </body>
    </html>
  );
}
