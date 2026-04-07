import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

/** Ruta legada con tilde: envía al hub nuevo de Educación mediática. */
export default async function EducacionMediaticaLegacyRedirect({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/educacion-mediatica/comunicacion`);
}
