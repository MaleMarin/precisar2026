import { redirectToHomeStackSection } from "@/lib/redirect-home-section";

type Props = { params: Promise<{ locale: string }> };

export default async function EducacionMediaticaIndexRedirect({ params }: Props) {
  const { locale } = await params;
  redirectToHomeStackSection(locale, "educacion-mediatica");
}
