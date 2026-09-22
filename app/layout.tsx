import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shahafstudio.vercel.app"),
  title: "שחף עמרם | שחף ערמם | Shahaf Amram | Web Developer",
  description:
    "Portfolio of Shahaf Amram, a 14-year-old web developer, bot developer, and software developer from Israel.",
  keywords: [
    "Shahaf Amram",
    "Web Developer",
    "Bot Developer",
    "Software Developer",
    "Developer Israel",
    "שחף עמרם",
    "שחף ערמם",
    "מפתח אתרים",
  ],
  openGraph: {
    title: "Shahaf Amram | Developer, Builder, Founder",
    description: "Premium portfolio for Shahaf Amram.",
    type: "website",
    url: "https://shahafstudio.vercel.app",
    siteName: "Shahaf Amram",
  },
  twitter: {
    card: "summary",
    title: "Shahaf Amram | Developer, Builder, Founder",
    description: "Web, bot, and software development by Shahaf Amram.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "sVGevsvKctYo7M-XNJrk1OsSU6X-fxAHHINA57hwK-o",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#05070b] text-white">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NP5NGB3W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NP5NGB3W');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CKZNVHVX0N"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CKZNVHVX0N');
          `}
        </Script>
      </body>
    </html>
  );
}
