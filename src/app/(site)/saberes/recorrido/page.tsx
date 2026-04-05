import type { Metadata } from "next";
import { SaberesRecorridoClient } from "./SaberesRecorridoClient";

export const metadata: Metadata = {
  title: "Saberes · Recorrido",
  description:
    "Vista muestra de una página interna inmersiva para la biblioteca Saberes: hero, capítulos y recursos destacados.",
};

export default function SaberesRecorridoPage() {
  return (
    <article className="prec-page -mt-px">
      <SaberesRecorridoClient />
    </article>
  );
}
