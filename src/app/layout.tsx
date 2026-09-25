import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/site";

// Self-hosted so a production build never depends on fetching Google Fonts.
// Files are the latin woff2 subsets Google was serving; see src/fonts/README.md.
const display = localFont({
  src: [
    { path: "../fonts/barlow-condensed-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/barlow-condensed-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/barlow-condensed-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: [
    { path: "../fonts/newsreader-variable.woff2", weight: "400 600", style: "normal" },
    { path: "../fonts/newsreader-variable-italic.woff2", weight: "400 600", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
});
const mono = localFont({
  src: [
    { path: "../fonts/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ibm-plex-mono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Jay and Michelle Miller`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} | Jay and Michelle Miller`,
    description: SITE.description,
    images: [{ url: "/images/hero.jpg", width: 1280, height: 720, alt: "Dawn swim start, Honolulu" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { types: { "application/rss+xml": `${SITE.url}/feed.xml` } },
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <div className="horizon" aria-hidden="true" />
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
