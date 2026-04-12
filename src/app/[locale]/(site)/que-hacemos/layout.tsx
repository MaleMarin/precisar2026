import { Bebas_Neue, Instrument_Serif, Syne } from "next/font/google";
import type { ReactNode } from "react";
import { ProgramBreadcrumbs } from "@/components/programs/ProgramBreadcrumbs";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
});

export default function QueHacemosLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${bebas.variable} ${instrumentSerif.variable} ${syne.variable} min-w-0`}
      style={{
        backgroundColor: "#0A0C12",
        color: "#ffffff",
        fontFamily: "var(--font-syne), system-ui, sans-serif",
        minHeight: "100%",
      }}
    >
      <ProgramBreadcrumbs />
      {children}
    </div>
  );
}
