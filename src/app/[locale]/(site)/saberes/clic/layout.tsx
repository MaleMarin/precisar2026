import type { Metadata } from "next";
import { PlataformaLayout } from "@/components/layout/PlataformaLayout";

export const metadata: Metadata = {
  title: "Clic",
  description: "Microcursos de educación mediática y criterio digital.",
};

export default function SaberesClicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlataformaLayout scrollMode="document">{children}</PlataformaLayout>
  );
}
