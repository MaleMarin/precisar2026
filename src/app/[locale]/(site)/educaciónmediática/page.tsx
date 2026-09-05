import { permanentRedirect } from "next/navigation";
import { localePath } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

/** Ruta legada con tilde: envía al hub nuevo de Educación mediática. */
export default async function EducacionMediaticaLegacyRedirect({ params }: Props) {
  const { locale } = await params;
  permanentRedirect(localePath(locale, "/educacion-mediatica/comunicacion"));
}
