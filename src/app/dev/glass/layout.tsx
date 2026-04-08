import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Liquid Glass — preview",
  robots: { index: false, follow: false },
};

export default function DevGlassLayout({ children }: { children: ReactNode }) {
  return children;
}
