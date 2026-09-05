import { permanentRedirect } from "next/navigation";
import { localePath } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

/** Ruta histórica: el índice editorial vive bajo Precisando. */
export default async function ExploraLegacyRedirect({ params }: Props) {
  const { locale } = await params;
  permanentRedirect(localePath(locale, "/precisando/explora"));
}
