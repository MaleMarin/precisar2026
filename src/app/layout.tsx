import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono, Inter, Syne } from "next/font/google";
import "@/styles/precisar-design-tokens.css";
import "./globals.css";
import rootShell from "./root-layout.module.css";
import { GsapRouteFade } from "@/components/GsapRouteFade";
import { RevealInit } from "@/components/RevealInit";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { SITE } from "@/lib/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

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

const glassUi = Inter({
  variable: "--font-glass-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f0f2f6" }, { color: "#0a0c12" }],
};

export const metadata: Metadata = {
  title: {
    default: SITE.socialDefault.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.socialDefault.description,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }],
    shortcut: ["/favicon.png"],
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE.name,
    title: SITE.socialDefault.title,
    description: SITE.socialDefault.description,
    url: SITE.url,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.socialDefault.title,
    description: SITE.socialDefault.description,
    images: [DEFAULT_OG_IMAGE],
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
      className={`${sans.className} ${sans.variable} ${display.variable} ${mono.variable} ${glassUi.variable} ${rootShell.htmlRoot}`}
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
