import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { absoluteLocaleUrl, hreflangAlternates, SITE } from "@/lib/site";

export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SITE.name,
} as const;

export function ogLocale(locale: string): string {
  if (locale === "pt") return "pt_BR";
  if (locale === "en") return "en_US";
  return "es_CL";
}

export function titleAlreadyBranded(title: string): boolean {
  const t = title.trim();
  const name = SITE.name;
  if (t === name) return true;
  const suffixes = [` · ${name}`, ` | ${name}`, ` — ${name}`, ` – ${name}`, ` - ${name}`];
  if (suffixes.some((suffix) => t.endsWith(suffix))) return true;
  return t.endsWith(` ${name}`);
}

export function documentTitle(title: string, options?: { home?: boolean }): string {
  const t = title.trim();
  if (options?.home || titleAlreadyBranded(t)) return t;
  return `${t} · ${SITE.name}`;
}

type PageSeoInput = {
  locale: string;
  pathname: string;
  title: string;
  description?: string;
  images?: NonNullable<Metadata["openGraph"]>["images"];
  type?: "website" | "article";
  publishedTime?: string;
  robots?: Metadata["robots"];
  home?: boolean;
};

export function pageSeo(input: PageSeoInput): Metadata {
  const canonical = absoluteLocaleUrl(input.locale, input.pathname);
  const title = documentTitle(input.title, { home: input.home });
  const description = input.description ?? SITE.socialDefault.description;
  const images = input.images ?? [DEFAULT_OG_IMAGE];

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates(input.pathname),
    },
    openGraph: {
      type: input.type ?? "website",
      locale: ogLocale(input.locale),
      siteName: SITE.name,
      title,
      description,
      url: canonical,
      images,
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    ...(input.robots ? { robots: input.robots } : {}),
  };
}

/** Rutas fuera de `[locale]` (Consulta y derivados): un solo idioma, sin /en ni /pt. */
export function rootPageSeo(input: {
  pathname: string;
  title: string;
  description?: string;
}): Metadata {
  const canonical = `${SITE.url}${input.pathname === "/" ? "" : input.pathname}`;
  const title = documentTitle(input.title);
  const description = input.description ?? SITE.socialDefault.description;
  const images = [DEFAULT_OG_IMAGE];

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        [routing.defaultLocale]: canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale(routing.defaultLocale),
      siteName: SITE.name,
      title,
      description,
      url: canonical,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
