import type { Metadata } from "next";
import {
  Noto_Sans_Devanagari,
  Noto_Serif_Devanagari,
  Mukta,
} from "next/font/google";
import { site } from "@/data/site";
import { ScrollChrome } from "@/components/motion/ScrollChrome";
import { NotificationPrompt } from "@/components/layout/NotificationPrompt";
import { FloatingWidgets } from "@/components/layout/FloatingWidgets";
import { SiteMaintenanceNotice } from "@/components/layout/SiteMaintenanceNotice";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { kamgarApi } from "@/services/apiClient";
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

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await kamgarApi.getSiteSettings();
    const siteName = settings.siteName?.trim() || site.name;
    return {
      title: `${siteName} – मुख्य पृष्ठ`,
      description: settings.tagline?.trim() || site.description,
      icons: {
        icon: settings.logoUrl?.trim() || "/img/logo.png",
      },
    };
  } catch (error) {
    console.warn("Failed to load public site settings for metadata:", error);
    return {
      title: `${site.name} – मुख्य पृष्ठ`,
      description: site.description,
      icons: {
        icon: "/img/logo.png",
      },
    };
  }
}

const themeScript = `(function(){
  var d=document.documentElement;
  d.classList.remove('no-js');
  try{
    var t=localStorage.getItem('dainik-pulse-theme');
    if(t==='dark'){d.setAttribute('data-theme','dark');}
    else{d.setAttribute('data-theme','light');}
  }catch(e){d.setAttribute('data-theme','light');}

  if(typeof window!=='undefined'){
    try{
      var origError=console.error;
      console.error=function(){
        var msg='';
        for(var i=0;i<arguments.length;i++){
          msg+=' '+String(arguments[i]);
        }
        if(msg.indexOf('fdprocessedid')!==-1){
          return;
        }
        origError.apply(console,arguments);
      };

      if(window.MutationObserver){
        var observer=new MutationObserver(function(mutations){
          for(var i=0;i<mutations.length;i++){
            var m=mutations[i];
            if(m.type==='attributes'&&m.attributeName==='fdprocessedid'&&m.target){
              m.target.removeAttribute('fdprocessedid');
            }
          }
        });
        observer.observe(document.documentElement,{
          attributes:true,
          subtree:true,
          attributeFilter:['fdprocessedid']
        });
      }
    }catch(err){}
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="hi"
      className={`no-js ${sans.variable} ${serif.variable} ${mukta.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <SiteSettingsProvider>
          <a className="skipLink" href="#main">
            मुख्य सामग्री पर जाएं
          </a>
          <SiteMaintenanceNotice />
          <ScrollChrome />
          <NotificationPrompt />
          {children}
          <FloatingWidgets />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
