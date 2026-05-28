import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { InstitutionalTemplate } from "@/components/templates/PageTemplates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "marco.tecnologia" });
  return { title: t("title"), description: t("description") };
}

export default async function Page() {
  const t = await getTranslations("marco");
  const tTec = await getTranslations("marco.tecnologia");
  const paras = tTec.raw("paras") as string[];
  const items = tTec.raw("listItems") as string[];

  return (
    <InstitutionalTemplate title={tTec("title")} kicker={t("sharedKicker")}>
      {paras.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <h2>{tTec("listTitle")}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{tTec("closing")}</p>
    </InstitutionalTemplate>
  );
}
