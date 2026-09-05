import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import { SaberesRecorridoClient } from "./SaberesRecorridoClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageSeo({
    locale,
    pathname: "/saberes/recorrido",
    title: "Saberes · Recorrido",
    description:
      "Vista muestra de una página interna inmersiva para la biblioteca Saberes: hero, capítulos y recursos destacados.",
  });
}

export default function SaberesRecorridoPage() {
  return (
    <article className="prec-page -mt-px">
      <SaberesRecorridoClient />
    </article>
  );
}
