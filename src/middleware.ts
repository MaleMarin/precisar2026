import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { articleBySlug } from "@/data/articles";
import { PRECISANDO_SLUG_ALIASES } from "@/data/slug-aliases";
import { routing } from "@/i18n/routing";
import { matchLegacyRedirect } from "@/lib/legacy-redirects";
import { PRECISANDO_ARTICLES_UNDER_CONSTRUCTION } from "@/lib/precisando-access";

const intlMiddleware = createMiddleware(routing);

/** Rutas en la raíz de `app/` que no usan el segmento `[locale]`. */
const SKIP_LOCALE_PREFIX_SEGMENTS = new Set([
  "api",
  "_next",
  "opengraph-image",
  "dev",
  "consulta",
  "consulta-viva",
  "consulta-observatorio",
]);

const RESERVED_ROOT_SEGMENTS = new Set(
  [
    "api",
    "programas",
    "somos",
    "participa",
    "saberes",
    "precisando",
    "agenda",
    "legal",
    "marco",
    "experiencias",
    "aqui-no-pasa",
    "unapreguntaaldia",
    "culturadigital",
    "educaciónmediática",
    "ami-vs-alfabetización-digital",
    "consulta-observatorio",
    "_next",
  ].map((s) => s.normalize("NFC")),
);

function decodePathSegment(seg: string): string {
  try {
    return decodeURIComponent(seg).normalize("NFC");
  } catch {
    return seg;
  }
}

function firstPathSegment(pathname: string): string | undefined {
  return pathname.split("/").filter(Boolean)[0];
}

function hasLocalePrefix(pathname: string): boolean {
  const first = firstPathSegment(pathname);
  if (!first) return false;
  return routing.locales.some((l) => l.toLowerCase() === first.toLowerCase());
}

/** Primer segmento es un código de locale → se devuelve ese locale y el resto del path. */
function parseLocalePath(pathname: string): { locale: string; segments: string[] } {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { locale: routing.defaultLocale, segments: [] };
  const first = parts[0]!;
  const canonical = routing.locales.find((l) => l.toLowerCase() === first.toLowerCase());
  if (canonical) {
    return { locale: canonical, segments: parts.slice(1) };
  }
  return { locale: routing.defaultLocale, segments: parts };
}

/** Path interno (p. ej. `/programas/foo`) con prefijo solo si el locale no es el por defecto. */
function withLocalePath(locale: string, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized || "/";
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

function redirectHomePrecisando(request: NextRequest, locale: string) {
  const url = request.nextUrl.clone();
  url.pathname = locale === routing.defaultLocale ? "/" : `/${locale}`;
  url.hash = "precisando";
  return NextResponse.redirect(url, 307);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.includes(".")) return NextResponse.next();

  const head = firstPathSegment(pathname);
  if (head && SKIP_LOCALE_PREFIX_SEGMENTS.has(head)) {
    return NextResponse.next();
  }

  const numeric = pathname.match(/^\/(\d+)$/);
  if (numeric) {
    const n = Number.parseInt(numeric[1]!, 10);
    if (n >= 1 && n <= 25) {
      const url = request.nextUrl.clone();
      url.pathname = `/aqui-no-pasa/modulos/${n}`;
      return NextResponse.redirect(url, 308);
    }
  }

  if (!hasLocalePrefix(pathname)) {
    const legacy = matchLegacyRedirect(pathname);
    if (legacy) {
      if (legacy.destination.startsWith("http://") || legacy.destination.startsWith("https://")) {
        return NextResponse.redirect(legacy.destination, legacy.permanent ? 308 : 307);
      }
      const target = request.nextUrl.clone();
      const destPath =
        legacy.destination === "/" ? "/" : legacy.destination.startsWith("/")
          ? legacy.destination
          : `/${legacy.destination}`;
      target.pathname = destPath;
      return NextResponse.redirect(target, legacy.permanent ? 308 : 307);
    }
  }

  const { locale: pathLocale, segments: afterLocale } = parseLocalePath(pathname);

  if (afterLocale[0] === "programas" && afterLocale[1] === "docentes") {
    const url = request.nextUrl.clone();
    url.pathname = withLocalePath(pathLocale, "/programas/leer-noticias-era-digital");
    return NextResponse.redirect(url, 308);
  }
  if (afterLocale[0] === "que-hacemos" && afterLocale[1] === "docentes") {
    const url = request.nextUrl.clone();
    url.pathname = withLocalePath(pathLocale, "/programas/leer-noticias-era-digital");
    return NextResponse.redirect(url, 308);
  }

  if (
    PRECISANDO_ARTICLES_UNDER_CONSTRUCTION &&
    afterLocale[0] === "precisando" &&
    afterLocale.length === 2
  ) {
    const slugSeg = decodePathSegment(afterLocale[1]!);
    if (articleBySlug(slugSeg)) {
      return redirectHomePrecisando(request, pathLocale);
    }
  }

  if (afterLocale.length === 1) {
    const decoded = decodePathSegment(afterLocale[0]!);
    const aliasTarget = PRECISANDO_SLUG_ALIASES[decoded];
    if (aliasTarget) {
      if (PRECISANDO_ARTICLES_UNDER_CONSTRUCTION) {
        return redirectHomePrecisando(request, pathLocale);
      }
      const url = request.nextUrl.clone();
      url.pathname = withLocalePath(pathLocale, `/precisando/${encodeURI(aliasTarget)}`);
      return NextResponse.redirect(url, 308);
    }
    const postFromRoot = !RESERVED_ROOT_SEGMENTS.has(decoded) ? articleBySlug(decoded) : undefined;
    if (postFromRoot) {
      if (PRECISANDO_ARTICLES_UNDER_CONSTRUCTION) {
        return redirectHomePrecisando(request, pathLocale);
      }
      const url = request.nextUrl.clone();
      url.pathname = withLocalePath(pathLocale, `/precisando/${encodeURI(postFromRoot.slug)}`);
      return NextResponse.redirect(url, 308);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
