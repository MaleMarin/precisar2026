import { routing } from "@/i18n/routing";
import { PRECISANDO_ARTICLES_UNDER_CONSTRUCTION } from "@/lib/precisando-access";

/** Ancla del formulario «Contáctanos» en `SiteFooter` (`<form id="contacto">`). */
export const FOOTER_CONTACT_ANCHOR_ID = "contacto" as const;

export const SITE = {
  name: "Precisar",
  /**
   * Texto por defecto para compartir (WhatsApp, OG) y `app/layout.tsx` cuando una ruta no define el suyo.
   * La portada por idioma define título/descripción en `generateMetadata` (namespace `Metadata`).
   */
  socialDefault: {
    title: "Precisar · Potencia el uso de la tecnología",
    description: "Potencia el uso de la tecnología.",
    /** Texto principal de la imagen OG estática (`/opengraph-image`). */
    ogImageLine1: "Potencia el uso de la tecnología.",
  },
  /** Origen canónico (apex). Redirigir `www` → apex en middleware. */
  url: "https://precisar.net",
  contactEmail: "contacto@precisar.net",
  privacyEmail: "male@precisar.net",
} as const;

const SITE_ORIGIN = SITE.url.replace(/\/$/, "");

/**
 * Ruta interna con prefijo de idioma (`/es`, `/es/somos`). `pathname` sin locale (`/` o `/somos`).
 */
export function localePath(locale: string, pathname: string): string {
  const tail =
    pathname === "/" || pathname === "" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${locale}${tail}`;
}

export function absoluteLocaleUrl(locale: string, pathname: string): string {
  return `${SITE_ORIGIN}${localePath(locale, pathname)}`;
}

/** `alternates.languages` + `x-default` (español) para páginas localizadas. */
export function hreflangAlternates(pathname: string): Record<string, string> {
  const byLocale = Object.fromEntries(
    routing.locales.map((l) => [l, absoluteLocaleUrl(l, pathname)] as const),
  );
  return {
    ...byLocale,
    "x-default": absoluteLocaleUrl(routing.defaultLocale, pathname),
  };
}

/**
 * Newsletter: asignar `NEXT_PUBLIC_NEWSLETTER_FORM_ACTION` (Mailchimp, Brevo, etc.)
 * cuando el proveedor esté definido. Mientras sea null, el bloque en /participa no envía a terceros.
 */
export const NEWSLETTER = {
  formActionUrl: process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION ?? null,
} as const;

/**
 * Logos: barra Precisar (PNG); pie con wordmark PNG (sin icono Onda bajo la marca — ver `SiteFooter`).
 */
export const FOOTER_MEDIA = {
  logoWordmark: "/logo-precisar/logo-precisar.png",
  /** Franja del pie: wordmark tipográfico (`public/precisar-footer-wordmark.png`). */
  footerBrandStrip: "/precisar-footer-wordmark.png",
  /** Wordmark Precisar en la barra (sobre hero: `.navLogoLight`). */
  headerLogoBlack: "/logo-precisar/logo-precisar.png",
  logoWordmarkFooter: "/precisar-footer-wordmark.png",
  /** Icono Bot Onda (barra, pie, enlaces al chat). */
  navOndaMark: "/logo-onda-ok.png",
  /** Fallback / otros usos (`public/3.png`). */
  symbol: "/3.png",
} as const;

function publicEnv(key: string): string | null {
  const v = process.env[key]?.trim();
  return v && v.length > 0 ? v : null;
}

/**
 * Video del hero. Por defecto: `/videos/hero.mp4` (archivo en `public/videos/`).
 * Sobreescribe con `.env.local`: `NEXT_PUBLIC_PRECISAR_HERO_MP4`, `WEBM`, `POSTER`.
 */
export const HOME_HERO_MEDIA = {
  videoMp4: publicEnv("NEXT_PUBLIC_PRECISAR_HERO_MP4") ?? "/videos/hero.mp4",
  videoWebm: publicEnv("NEXT_PUBLIC_PRECISAR_HERO_WEBM"),
  poster: publicEnv("NEXT_PUBLIC_PRECISAR_HERO_POSTER") ?? "/studio/poster-1.svg",
} as const;

export function homeHeroHasVideo(): boolean {
  return Boolean(HOME_HERO_MEDIA.videoMp4 || HOME_HERO_MEDIA.videoWebm);
}

export const EXTERNAL = {
  botOnda: "https://onda.precisar.net/chat",
  consultaCiudadana: "https://encuesta-informacion.web.app/consulta-2026/",
  /** Redes en pie y enlaces compartidos. */
  xTwitter: "https://x.com/precisar_",
  facebook: "https://www.facebook.com/precisar",
  instagram: "https://www.instagram.com/_precisar/",
  youtube:
    "https://www.youtube.com/channel/UCQKEOqwm3pxIeO6E1Hsokhw/videos",
  whatsappShare: "https://api.whatsapp.com/send/?text=https://precisar.net",
} as const;

export type NavItem = { label: string; href: string };

/**
 * IDs de los paneles apilados en portada (`MotionStackPanels`).
 * El menú principal enlaza a `/#…` para ir a cada “sesión” sin pasar por páginas índice.
 */
export const HOME_STACK_SECTION_IDS = {
  convoca: "convoca",
  programas: "programas",
  saberes: "saberes",
  botOnda: "bot-onda",
  precisando: "precisando",
  educacionMediatica: "educacion-mediatica",
  participa: "participa",
} as const;

/** Barra superior: anclas en la portada (mismos bloques que el stack bajo el hero). */
export const NAV_PRIMARY: NavItem[] = [
  { label: "Qué nos convoca", href: "/#convoca" },
  { label: "Programas", href: "/#programas" },
  { label: "Saberes", href: "/#saberes" },
  { label: "Bot Onda", href: "/#bot-onda" },
  { label: "Precisando", href: "/#precisando" },
  { label: "Educación mediática", href: "/#educacion-mediatica" },
  { label: "Participa", href: "/#participa" },
  { label: "Somos", href: "/somos" },
];

/** `href` del menú principal → clave `nav.*` en mensajes i18n (header y footer). */
export const NAV_PRIMARY_I18N_KEY: Record<
  string,
  | "queNosConvoca"
  | "somos"
  | "programas"
  | "saberes"
  | "botOnda"
  | "precisando"
  | "educacionMediatica"
  | "participa"
> = {
  "/#convoca": "queNosConvoca",
  "/somos": "somos",
  "/#programas": "programas",
  "/#saberes": "saberes",
  "/#bot-onda": "botOnda",
  "/#precisando": "precisando",
  "/#educacion-mediatica": "educacionMediatica",
  "/educacion-mediatica/comunicacion": "educacionMediatica",
  "/#participa": "participa",
};

/** Prefijos de rutas relacionados con el menú (referencia / búsquedas). */
export const NAV_PRIMARY_LEGACY_PATH_PREFIXES: string[] = [
  "/somos",
  "/programas",
  "/saberes",
  "/precisando",
  "/educacion-mediatica",
  "/participa",
];

/** Índice del ítem de `NAV_PRIMARY` según hash en portada, o -1. */
export function primaryNavIndexFromHash(hash: string): number {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return -1;

  const exact = NAV_PRIMARY.findIndex((item) => {
    const j = item.href.indexOf("#");
    if (j < 0) return false;
    return item.href.slice(j + 1) === id;
  });
  if (exact >= 0) return exact;

  if (id === "educacion-mediatica") {
    return NAV_PRIMARY.findIndex((item) => item.href === "/#educacion-mediatica");
  }

  return -1;
}

/** Índice del ítem de `NAV_PRIMARY` según ruta (páginas internas alineadas a cada sección). */
export function primaryNavIndexFromPathname(pathname: string): number {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return -1;

  if (
    p === "/educacion-mediatica" ||
    p.startsWith("/educacion-mediatica/") ||
    p === "/educaciónmediática" ||
    p.startsWith("/educaciónmediática/")
  ) {
    return NAV_PRIMARY.findIndex((item) => item.href === "/#educacion-mediatica");
  }

  if (p === "/que-hacemos" || p.startsWith("/que-hacemos/")) {
    return NAV_PRIMARY.findIndex((item) => item.href.endsWith("#programas"));
  }

  const sectionToHashHref: Record<string, string> = {
    "/programas": "/#programas",
    "/saberes": "/#saberes",
    "/precisando": "/#precisando",
    "/participa": "/#participa",
  };
  for (const [prefix, targetHref] of Object.entries(sectionToHashHref)) {
    if (p === prefix || p.startsWith(`${prefix}/`)) {
      return NAV_PRIMARY.findIndex((item) => item.href === targetHref);
    }
  }

  for (let i = 0; i < NAV_PRIMARY.length; i++) {
    const href = NAV_PRIMARY[i].href;
    if (href.startsWith("/#")) continue;
    const base = href.split("#")[0].replace(/\/+$/, "") || "/";
    if (base !== "/" && (p === base || p.startsWith(`${base}/`))) {
      return i;
    }
  }

  return -1;
}

/** Subprogramas y recursos (referencia; el mapa completo está en FOOTER_COLUMNS). */
export const NAV_SECONDARY: NavItem[] = [
  { label: "Hub Digital Consciente, muestras itinerantes", href: "/programas/hub-digital-consciente" },
  { label: "Ciudades Conectadas con Sentido", href: "/programas/ciudades" },
  { label: "Aprender Digital: Nunca es Tarde", href: "/programas/aprender-digital" },
  { label: "Formación pensamiento crítico digital", href: "/programas/pensamiento-critico" },
  { label: "Curso para Servidores Públicos", href: "/programas/funcionarios-publicos" },
  {
    label: "Educación mediática para que los docentes la usen dentro de la sala de aula",
    href: "/programas/leer-noticias-era-digital",
  },
  {
    label: "Bot Onda: Onda en Mano, Onda Civita y Onda Profes",
    href: EXTERNAL.botOnda,
  },
  { label: "Aquí No Pasa", href: "/aqui-no-pasa" },
];

/** Enlaces del bloque Saberes en landing Motion (experiencias primero, biblioteca al cierre). */
export const SABERES_NAV_LINKS: NavItem[] = [
  { label: "Una pregunta al día", href: "/unapreguntaaldia" },
  { label: "Sentidos digitales", href: "/experiencias/sentidos-digitales" },
  { label: "Cultura digital", href: "/culturadigital" },
  { label: "Saberes", href: "/saberes" },
];

const PRECISANDO_MAIN_FOOTER_HREF = PRECISANDO_ARTICLES_UNDER_CONSTRUCTION ? "/#precisando" : "/precisando/explora";

const PRECISANDO_BLOG_FOOTER_LINKS: NavItem[] = PRECISANDO_ARTICLES_UNDER_CONSTRUCTION
  ? [{ label: "Precisando — en construcción", href: "/#precisando" }]
  : [
      {
        label: "Chile respondió: informe «¿Cómo te informas hoy?» (enero 2026)",
        href: "/precisando/chile-respondio-verdad-incomoda-informe-enero-2026",
      },
      {
        label: "Democracia en la era digital y la IA",
        href: "/precisando/democracia-en-la-era-dedigital-y-la-ia-desafíos-y-soluciones",
      },
      {
        label: "¿Cómo te informas hoy? (consulta ciudadana)",
        href: "/precisando/cómo-te-informas-hoy-precisar-lanza-consulta-ciudadana-para-mejorar-el-acceso-a-la-información",
      },
      {
        label: "A veces cambiar de nombre… (editorial Precisar)",
        href: "/precisando/a-veces-cambiar-de-nombre-no-es-borrar-el-pasado-sino-precisar-mejor-hacia-dónde-se-quiere-ir",
      },
      { label: "Todos los artículos", href: "/precisando/explora" },
    ];

/**
 * Mapa del sitio (precisar.net) — pie, documentación y bloques tipo estudio.
 * Mantener alineado con rutas reales en `src/app/(site)/`.
 */
export const FOOTER_COLUMNS: { title: string; links: NavItem[] }[] = [
  {
    title: "Navegación principal",
    links: [
      { label: "Participa", href: "/participa" },
      { label: "Precisando", href: PRECISANDO_MAIN_FOOTER_HREF },
      { label: "Somos Precisar", href: "/somos" },
    ],
  },
  {
    title: "Qué hacemos",
    links: [
      { label: "Ver todos los programas", href: "/programas" },
      { label: "Ciudades Conectadas con Sentido", href: "/programas/ciudades" },
      { label: "Hub Digital Consciente, muestras itinerantes", href: "/programas/hub-digital-consciente" },
      { label: "Aprender Digital: Nunca es Tarde", href: "/programas/aprender-digital" },
      { label: "Formación en pensamiento crítico digital", href: "/programas/pensamiento-critico" },
      { label: "Curso para Servidores Públicos", href: "/programas/funcionarios-publicos" },
      {
        label: "Educación mediática para que los docentes la usen dentro de la sala de aula",
        href: "/programas/leer-noticias-era-digital",
      },
      {
        label: "Bot Onda: Onda en Mano, Onda Civita y Onda Profes",
        href: EXTERNAL.botOnda,
      },
    ],
  },
  {
    title: "Educación mediática",
    links: [
      { label: "Comunicación", href: "/educacion-mediatica/comunicacion" },
      { label: "Educación", href: "/educacion-mediatica/educacion" },
      { label: "Tecnología", href: "/educacion-mediatica/tecnologia" },
      { label: "Cultura", href: "/educacion-mediatica/cultura" },
      {
        label: "Propuesta de política de alfabetización mediática y digital",
        href: "/educacion-mediatica/propuesta-politica-alfabetizacion",
      },
    ],
  },
  {
    title: "Saberes",
    links: [
      { label: "Una pregunta al día", href: "/unapreguntaaldia" },
      { label: "Sentidos digitales", href: "/experiencias/sentidos-digitales" },
      { label: "Cultura digital", href: "/culturadigital" },
      { label: "Saberes", href: "/saberes" },
    ],
  },
  {
    title: "Ejes temáticos",
    links: [
      { label: "Comunicación", href: "/educacion-mediatica/comunicacion" },
      { label: "Educación", href: "/educacion-mediatica/educacion" },
      { label: "Tecnología", href: "/educacion-mediatica/tecnologia" },
      { label: "Cultura", href: "/educacion-mediatica/cultura" },
    ],
  },
  {
    title: "Blog — Precisando",
    links: PRECISANDO_BLOG_FOOTER_LINKS,
  },
  {
    title: "Legal y otros",
    links: [
      { label: "Política de privacidad (consulta 2026)", href: "/legal/privacidad-consulta-2026" },
      { label: "Privacidad Bot ONDA", href: "/legal/privacidad-bot-onda" },
      { label: "Bot ONDA (conversar)", href: EXTERNAL.botOnda },
      { label: "Consulta ciudadana (formulario)", href: EXTERNAL.consultaCiudadana },
    ],
  },
];

export const PDFS = {
  homeSaberes1:
    "https://www.precisar.net/_files/ugd/4c5e66_7b7d218709ff4052b58d9d9416715150.pdf",
  homeSaberes2:
    "https://www.precisar.net/_files/ugd/4c5e66_8b66a79c4ffd440e90dbd2d0474158a8.pdf",
  homeSaberes3:
    "https://www.precisar.net/_files/ugd/4c5e66_7ad4be65e84e4b7486b03de2cf0107ec.pdf",
  homeSaberes4:
    "https://www.precisar.net/_files/ugd/4c5e66_5cb6a7e00abd433b99f65d043f612653.pdf",
  ciudadesAmiUnesco:
    "https://www.precisar.net/_files/ugd/4c5e66_5c07eaf63a3a475b9b27c753d8da1c24.pdf",
  hubDesinformacion: "/hub-edicion-desinformacion.pdf",
  hubIaAlgoritmos: "/hub-edicion-ia-algoritmos.pdf",
  saberesIaAula1:
    "https://www.precisar.net/_files/ugd/4c5e66_ecfcd551d56e41fcaea57e21d5b9e20b.pdf",
  saberesIaAula2:
    "https://www.precisar.net/_files/ugd/4c5e66_7b7d218709ff4052b58d9d9416715150.pdf",
  /** PDF local: `public/30-preguntas-precisar.pdf` · portada PNG en `public/covers/30-preguntas-explora-vida-digital.png`. */
  saberes30Preguntas: "/30-preguntas-precisar.pdf",
  /**
   * Propuesta de política — coloca el archivo en `public/` con este nombre para habilitar la descarga.
   * Hasta entonces el enlace puede responder 404 hasta que subas el PDF.
   */
  propuestaPoliticaAlfabetizacion: "/propuesta-politica-alfabetizacion-mediatica-digital-precisar.pdf",
  saberesGuiaIa:
    "https://www.precisar.net/_files/ugd/4c5e66_601b191ddea74e71a326aa173fe28ab7.pdf",
  saberesUsoConscienteIa:
    "https://www.precisar.net/_files/ugd/4c5e66_7ad4be65e84e4b7486b03de2cf0107ec.pdf",
  saberesEducadores12:
    "https://www.precisar.net/_files/ugd/4c5e66_8b66a79c4ffd440e90dbd2d0474158a8.pdf",
  saberesVerificarImagenes:
    "https://www.precisar.net/_files/ugd/4c5e66_ae46236e41c2478dabe94a13e27c5fa6.pdf",
} as const;
