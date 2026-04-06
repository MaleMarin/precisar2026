import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import "@/styles/precisar-design-tokens.css";
import "./globals.css";
import rootShell from "./root-layout.module.css";
import { GsapRouteFade } from "@/components/GsapRouteFade";
import { RevealInit } from "@/components/RevealInit";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { SITE } from "@/lib/site";

const sans = DM_Sans({
  variable: "--font-sans-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Syne({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/** Display editorial (portada lab / piezas de alto impacto). */
const serifDisplay = Cormorant_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${sans.variable} ${display.variable} ${mono.variable} ${serifDisplay.variable} ${rootShell.htmlRoot}`}
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
