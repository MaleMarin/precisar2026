import type { MetadataRoute } from "next";
import {
  ARTICLES,
  articlesSortedByDate,
  PRECISANDO_PAGE_SIZE,
  uniqueCategories,
} from "@/data/articles";
import { categoryToSlug } from "@/lib/category-slug";
import { SITE } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { SENTIDOS_DIGITALES } from "@/data/sentidos-digitales";
import { PRECISANDO_ARTICLES_UNDER_CONSTRUCTION } from "@/lib/precisando-access";

const base = SITE.url.replace(/\/$/, "");
const last = new Date();

/** Rutas sin prefijo de locale (`/` = inicio en `/es`, `/pt/…`, etc.). */
const STATIC_PATHS = [
  "/",
  "/somos",
  "/contacto",
  "/programas",
  "/programas/ciudades",
  "/programas/hub-digital-consciente",
  "/programas/aprender-digital",
  "/programas/pensamiento-critico",
  "/programas/funcionarios-publicos",
  "/programas/leer-noticias-era-digital",
  "/saberes",
  "/saberes/recorrido",
  "/saberes/una-pregunta-al-dia",
  "/precisando/explora",
  "/precisando",
  "/participa",
  "/participa/gracias",
  "/agenda",
  "/aqui-no-pasa",
  "/unapreguntaaldia",
  "/culturadigital",
  "/atelier",
  "/ami-vs-alfabetización-digital",
  "/educacion-mediatica/comunicacion",
  "/educacion-mediatica/educacion",
  "/educacion-mediatica/tecnologia",
  "/educacion-mediatica/cultura",
  "/educacion-mediatica/propuesta-politica-alfabetizacion",
  "/educaciónmediática",
  "/educaciónmediática/propuesta-politica-alfabetizacion",
  "/experiencias/sentidos-digitales",
  "/marco/comunicacion",
  "/marco/cultura",
  "/marco/educacion",
  "/marco/tecnologia",
  "/legal/privacidad-bot-onda",
  "/legal/privacidad-consulta-2026",
  "/que-hacemos/aprender-digital",
  "/que-hacemos/ciudades",
  "/que-hacemos/formacion-pensamiento-critico",
  "/que-hacemos/funcionarios-publicos",
  "/que-hacemos/hub-digital-consciente",
] as const;

/** Fuera de `[locale]` (middleware no añade `/es`). */
const ROOT_ONLY_PATHS = ["/consulta", "/consulta-viva", "/consulta-observatorio"] as const;

function localizedUrl(locale: string, pathNoLocale: string): string {
  const tail = pathNoLocale === "/" ? "" : pathNoLocale;
  return `${base}/${locale}${tail}`;
}

function hreflangForPath(pathNoLocale: string): Record<string, string> {
  const primary = routing.defaultLocale;
  const tail = pathNoLocale === "/" ? "" : pathNoLocale;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${base}/${l}${tail}`] as const),
  );
  return { ...languages, "x-default": `${base}/${primary}${tail}` };
}

function pushLocalized(
  entries: MetadataRoute.Sitemap,
  pathNoLocale: string,
  opts: {
    lastModified?: Date;
    changeFrequency?: MetadataRoute.Sitemap[0]["changeFrequency"];
    priority?: number;
  },
) {
  const primary = routing.defaultLocale;
  entries.push({
    url: localizedUrl(primary, pathNoLocale),
    lastModified: opts.lastModified ?? last,
    changeFrequency: opts.changeFrequency ?? "monthly",
    priority: opts.priority ?? 0.7,
    alternates: { languages: hreflangForPath(pathNoLocale) },
  });
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
      url: `${base}${path}`,
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
