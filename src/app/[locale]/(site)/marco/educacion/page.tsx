import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { InstitutionalTemplate } from "@/components/templates/PageTemplates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "marco.educacion" });
  return { title: t("title"), description: t("description") };
}

export default async function Page() {
  const t = await getTranslations("marco");
  const tEdu = await getTranslations("marco.educacion");
  const paras = tEdu.raw("paras") as string[];
  const actions = tEdu.raw("actions") as string[];
  const items = tEdu.raw("listItems") as string[];

  return (
    <InstitutionalTemplate title={tEdu("title")} kicker={t("sharedKicker")}>
      {paras.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <p>{tEdu("intermediate")}</p>
      <ul>
        {actions.map((action) => (
          <li key={action}>{action}</li>
        ))}
      </ul>
      <p>{tEdu("afterActions")}</p>
      <h2>{tEdu("listTitle")}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{tEdu("closing")}</p>
    </InstitutionalTemplate>
  );
}
