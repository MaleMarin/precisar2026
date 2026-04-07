import type { MetadataRoute } from "next";
import {
  ARTICLES,
  articlesSortedByDate,
  PRECISANDO_PAGE_SIZE,
  uniqueCategories,
} from "@/data/articles";
import { categoryToSlug } from "@/lib/category-slug";
import { SITE } from "@/lib/site";
import { SENTIDOS_DIGITALES } from "@/data/sentidos-digitales";

const STATIC_PATHS = [
  "/",
  "/somos",
  "/programas",
  "/programas/ciudades",
  "/programas/hub-digital-consciente",
  "/programas/aprender-digital",
  "/programas/docentes",
  "/programas/pensamiento-critico",
  "/programas/funcionarios-publicos",
  "/programas/leer-noticias-era-digital",
  "/saberes",
  "/saberes/recorrido",
  "/explora",
  "/precisando",
  "/participa",
  "/participa/gracias",
  "/agenda",
  "/aqui-no-pasa",
  "/unapreguntaaldia",
  "/culturadigital",
  "/educaciónmediática",
  "/educaciónmediática/propuesta-politica-alfabetizacion",
  "/ami-vs-alfabetización-digital",
  "/experiencias/sentidos-digitales",
  "/marco/comunicacion",
  "/marco/cultura",
  "/marco/educacion",
  "/marco/tecnologia",
  "/legal/privacidad-bot-onda",
  "/legal/privacidad-consulta-2026",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const last = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: last,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  for (const a of ARTICLES) {
    entries.push({
      url: `${base}/precisando/${encodeURI(a.slug)}`,
      lastModified: new Date(a.pubDate),
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const c of uniqueCategories()) {
    entries.push({
      url: `${base}/precisando/categoria/${categoryToSlug(c)}`,
      lastModified: last,
      changeFrequency: "weekly",
      priority: 0.55,
    });
  }

  const sorted = articlesSortedByDate();
  const totalPages = Math.max(1, Math.ceil(sorted.length / PRECISANDO_PAGE_SIZE));
  for (let p = 2; p <= totalPages; p++) {
    entries.push({
      url: `${base}/precisando/pagina/${p}`,
      lastModified: last,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }

  for (const s of SENTIDOS_DIGITALES) {
    entries.push({
      url: `${base}/experiencias/sentidos-digitales/${s.slug}`,
      lastModified: last,
      changeFrequency: "yearly",
      priority: 0.45,
    });
  }

  for (let n = 1; n <= 25; n++) {
    entries.push({
      url: `${base}/aqui-no-pasa/modulos/${n}`,
      lastModified: last,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
