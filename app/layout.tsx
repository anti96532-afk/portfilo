import type { Metadata } from "next";
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
      <body className="min-h-full bg-[#05070b] text-white">{children}</body>
    </html>
  );
}
