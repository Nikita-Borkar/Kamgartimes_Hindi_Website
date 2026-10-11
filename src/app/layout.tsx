import type { Metadata } from "next";
import { Noto_Sans_Devanagari, Noto_Serif_Devanagari, Mukta } from "next/font/google";
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

const mukta = Mukta({
  weight: ["400", "600", "700", "800"],
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-mukta",
});

export const metadata: Metadata = {
  title: `${site.name} – मुख्यपृष्ठ`,
  description: site.description,
  icons: {
    icon: "/img/logo.png",
  },
};

const themeScript = `(function(){var d=document.documentElement;d.classList.remove('no-js');try{var t=localStorage.getItem('dainik-pulse-theme');if(t==='light'||t==='dark'){d.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="mr"
      className={`no-js ${sans.variable} ${serif.variable} ${mukta.variable}`}
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
