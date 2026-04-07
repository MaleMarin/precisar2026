import { redirectToHomeStackSection } from "@/lib/redirect-home-section";

type Props = { params: Promise<{ locale: string }> };

export default async function ParticipaIndexRedirect({ params }: Props) {
  const { locale } = await params;
  redirectToHomeStackSection(locale, "participa");
}
