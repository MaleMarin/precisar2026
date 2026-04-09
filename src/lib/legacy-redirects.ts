function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizePathname(pathname: string): string {
  try {
    return decodeURIComponent(pathname).normalize("NFC");
  } catch {
    return pathname.normalize("NFC");
  }
}

function stripTrailingSlash(path: string): string {
  if (path.length <= 1) return path;
  return path.replace(/\/+$/, "") || "/";
}

/**
 * Coincidencia de rutas legacy **sin** prefijo de locale.
 * El middleware debe ejecutar esto antes de redirigir a `/{locale}/…`, si no `next.config` redirects no alcanzan.
 */
export function matchLegacyRedirect(pathname: string): {
  destination: string;
  permanent: boolean;
} | null {
  const raw = stripTrailingSlash(normalizePathname(pathname.split("?")[0] || "/"));
  const rules = legacyRedirects();

  for (const rule of rules) {
    if (rule.source.includes(":n")) {
      const base = rule.source.replace("/:n", "");
      const re = new RegExp(`^${escapeRegex(base)}/(\\d+)$`);
      const m = raw.match(re);
      if (m) {
        return {
          destination: rule.destination.replace(":n", m[1]!),
          permanent: rule.permanent,
        };
      }
      continue;
    }

    const srcNorm = stripTrailingSlash(normalizePathname(rule.source));
    if (raw === srcNorm) {
      return { destination: rule.destination, permanent: rule.permanent };
    }
  }

  return null;
}

/**
 * Redirects 308 desde rutas antiguas (Wix). Sin patrones comodín genéricos que puedan
 * colisionar con rutas nuevas (`/blog`, `/post`, etc.).
 *
 * Tabla resumida en la entrega Fase 4B (respuesta del asistente).
 */
export function legacyRedirects() {
  return [
    { source: "/somosprecisar", destination: "/somos", permanent: true },
    { source: "/hubdigitaconsciente", destination: "/programas/hub-digital-consciente", permanent: true },
    { source: "/services-3", destination: "/programas/hub-digital-consciente", permanent: true },
    { source: "/ciudades", destination: "/programas/ciudades", permanent: true },
    { source: "/aprenderdigital", destination: "/programas/aprender-digital", permanent: true },
    { source: "/docentes", destination: "/programas/docentes", permanent: true },
    {
      source: "/leernoticiasenlaeradigital",
      destination: "/programas/leer-noticias-era-digital",
      permanent: true,
    },
    {
      source: "/funcionariospublicos",
      destination: "/programas/funcionarios-publicos",
      permanent: true,
    },
    { source: "/curso-desinformación", destination: "/aqui-no-pasa", permanent: true },
    {
      source: "/cursos/aqui-no-pasa/:n",
      destination: "/aqui-no-pasa/modulos/:n",
      permanent: true,
    },
    { source: "/comunicación", destination: "/marco/comunicacion", permanent: true },
    { source: "/educación", destination: "/marco/educacion", permanent: true },
    { source: "/tecnologia", destination: "/marco/tecnologia", permanent: true },
    { source: "/cultura", destination: "/marco/cultura", permanent: true },
    {
      source: "/privacidad2026",
      destination: "/legal/privacidad-consulta-2026",
      permanent: true,
    },
    {
      source: "/política-de-privacidad-bot-onda",
      destination: "/legal/privacidad-bot-onda",
      permanent: true,
    },
    {
      source: "/sentidos-digitales",
      destination: "/experiencias/sentidos-digitales",
      permanent: true,
    },
    { source: "/sentido-digital-del-tacto", destination: "/experiencias/sentidos-digitales/tacto", permanent: true },
    { source: "/sentido-digital-del-olfato", destination: "/experiencias/sentidos-digitales/olfato", permanent: true },
    { source: "/sentido-digital-visión", destination: "/experiencias/sentidos-digitales/vision", permanent: true },
    { source: "/sentido-digital-del-sabor", destination: "/experiencias/sentidos-digitales/sabor", permanent: true },
    { source: "/sentido-digital-del-equilibrio", destination: "/experiencias/sentidos-digitales/equilibrio", permanent: true },
    { source: "/sentido-digital-oído", destination: "/experiencias/sentidos-digitales/oido", permanent: true },
    { source: "/autotalleres", destination: "/programas", permanent: true },
    { source: "/onda", destination: "https://onda2026.vercel.app/chat", permanent: true },
    { source: "/coming-soon-01", destination: "/", permanent: true },
    { source: "/comunicaci%C3%B3n", destination: "/marco/comunicacion", permanent: true },
    { source: "/educaci%C3%B3n", destination: "/marco/educacion", permanent: true },
    { source: "/pol%C3%ADtica-de-privacidad-bot-onda", destination: "/legal/privacidad-bot-onda", permanent: true },
    {
      source: "/curso-desinformaci%C3%B3n",
      destination: "/aqui-no-pasa",
      permanent: true,
    },
    /** La instalación inmersiva vive en `/`; `/cinematic` queda como alias temporal. */
    { source: "/cinematic", destination: "/", permanent: false },
  ];
}
