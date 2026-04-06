import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/precisar-design-tokens.css";
import "./globals.css";
import rootShell from "./root-layout.module.css";
import { GsapRouteFade } from "@/components/GsapRouteFade";
import { RevealInit } from "@/components/RevealInit";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { SITE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-sans-family",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.tagline,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE.name,
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.tagline,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} ${rootShell.htmlRoot}`}
    >
      <body className={rootShell.bodyRoot}>
        <SmoothScrollProvider>
          <RevealInit />
          <GsapRouteFade overlayColor="var(--bg)">{children}</GsapRouteFade>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
