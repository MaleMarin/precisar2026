import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-consulta-observatorio",
});

export default function ConsultaObservatorioLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${font.variable} flex min-h-screen w-full flex-1 flex-col overflow-hidden bg-[#4E0722] text-white antialiased`}
      style={{ fontFamily: "var(--font-consulta-observatorio), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
