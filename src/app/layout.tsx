import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleTranslateScript from "@/components/GoogleTranslateScript";
import IntroVideo from "@/components/IntroVideo";
import SubscribePopup from "@/components/SubscribePopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "कामगार टाइम्स | Kamgar Times - जनसामान्यांचा बुलंद आवाज",
  description: "भारत का अग्रणी हिंदी समाचार एवं श्रम हितैषी डिजिटल पोर्टल। निष्पक्ष खबरें, श्रम अधिकार, सरकारी नौकरियां, और ताजा समाचार।",
  icons: {
    icon: "/images.jpg",
    shortcut: "/images.jpg",
    apple: "/images.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/images.jpg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
        <IntroVideo />
        <GoogleTranslateScript />
        <SubscribePopup />
        {children}
      </body>
    </html>
  );
}
