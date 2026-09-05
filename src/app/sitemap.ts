import type { MetadataRoute } from "next";
import {
  ARTICLES,
  articlesSortedByDate,
  PRECISANDO_PAGE_SIZE,
  uniqueCategories,
} from "@/data/articles";
import { categoryToSlug } from "@/lib/category-slug";
import { absoluteLocaleUrl, hreflangAlternates, SITE } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { SENTIDOS_DIGITALES } from "@/data/sentidos-digitales";
import { PRECISANDO_ARTICLES_UNDER_CONSTRUCTION } from "@/lib/precisando-access";

const last = new Date();

/** Rutas públicas 200, sin prefijo de locale y sin aliases que redirigen. */
const STATIC_PATHS = [
  "/",
  "/somos",
  "/contacto",
  "/programas/ciudades",
  "/programas/hub-digital-consciente",
  "/programas/aprender-digital",
  "/programas/pensamiento-critico",
  "/programas/funcionarios-publicos",
  "/programas/educacion-mediatica-digital-para-docentes",
  "/saberes/recorrido",
  "/saberes/recursos",
  "/precisando/explora",
  "/participa",
  "/participa/gracias",
  "/agenda",
  "/aqui-no-pasa",
  "/unapreguntaaldia",
  "/culturadigital",
  "/atelier",
  "/educacion-mediatica/comunicacion",
  "/educacion-mediatica/educacion",
  "/educacion-mediatica/tecnologia",
  "/educacion-mediatica/cultura",
  "/educacion-mediatica/propuesta-politica-alfabetizacion",
  "/educacion-mediatica/ami-vs-alfabetizacion-digital",
  "/experiencias/sentidos-digitales",
  "/legal/privacidad",
  "/legal/privacidad-bot-onda",
  "/legal/privacidad-consulta-2026",
] as const;

/** Fuera de `[locale]` (middleware no localiza). */
const ROOT_ONLY_PATHS = ["/consulta", "/consulta-viva", "/consulta-observatorio"] as const;

function pushLocalized(
  entries: MetadataRoute.Sitemap,
  pathNoLocale: string,
  opts: {
    lastModified?: Date;
    changeFrequency?: MetadataRoute.Sitemap[0]["changeFrequency"];
    priority?: number;
  },
) {
  const languages = hreflangAlternates(pathNoLocale);
  for (const locale of routing.locales) {
    entries.push({
      url: absoluteLocaleUrl(locale, pathNoLocale),
      lastModified: opts.lastModified ?? last,
      changeFrequency: opts.changeFrequency ?? "monthly",
      priority: opts.priority ?? 0.7,
      alternates: { languages },
    });
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    pushLocalized(entries, path, {
      lastModified: last,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
    });
  }

  for (const path of ROOT_ONLY_PATHS) {
    entries.push({
      url: `${SITE.url.replace(/\/$/, "")}${path}`,
      lastModified: last,
      changeFrequency: "monthly",
      priority: 0.55,
    });
  }

  if (!PRECISANDO_ARTICLES_UNDER_CONSTRUCTION) {
    for (const a of ARTICLES) {
      const pathNoLocale = `/precisando/${a.slug}`;
      pushLocalized(entries, pathNoLocale, {
        lastModified: new Date(a.pubDate),
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }

    for (const c of uniqueCategories()) {
      pushLocalized(entries, `/precisando/categoria/${categoryToSlug(c)}`, {
        changeFrequency: "weekly",
        priority: 0.55,
      });
    }

    const sorted = articlesSortedByDate();
    const totalPages = Math.max(1, Math.ceil(sorted.length / PRECISANDO_PAGE_SIZE));
    for (let p = 2; p <= totalPages; p++) {
      pushLocalized(entries, `/precisando/pagina/${p}`, {
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }

  for (const s of SENTIDOS_DIGITALES) {
    pushLocalized(entries, `/experiencias/sentidos-digitales/${s.slug}`, {
      changeFrequency: "yearly",
      priority: 0.45,
    });
  }

  for (let n = 1; n <= 25; n++) {
    pushLocalized(entries, `/aqui-no-pasa/modulos/${n}`, {
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
