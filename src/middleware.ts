import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { articleBySlug, uniqueCategories } from "@/data/articles";
import { PRECISANDO_SLUG_ALIASES } from "@/data/slug-aliases";
import { routing } from "@/i18n/routing";
import { categoryToSlug } from "@/lib/category-slug";
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

/** Primer segmento es un código de locale → se devuelve ese locale y el resto del path. */
function parseLocalePath(pathname: string): { locale: string; segments: string[]; hadPrefix: boolean } {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { locale: routing.defaultLocale, segments: [], hadPrefix: false };
  const first = parts[0]!;
  const canonical = routing.locales.find((l) => l.toLowerCase() === first.toLowerCase());
  if (canonical) {
    return { locale: canonical, segments: parts.slice(1), hadPrefix: true };
  }
  return { locale: routing.defaultLocale, segments: parts, hadPrefix: false };
}

/** Path interno (p. ej. `/programas/foo`) con prefijo solo si el locale no es el por defecto. */
function withLocalePath(locale: string, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized || "/";
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

function cookieLocaleFromPath(pathname: string): string {
  const first = firstPathSegment(pathname)?.toLowerCase();
  if (first === "en" || first === "pt") return first;
  return routing.defaultLocale;
}

function requestHost(request: NextRequest): string {
  const raw = request.headers.get("host") ?? request.nextUrl.hostname;
  return raw.split(":")[0]?.toLowerCase() ?? "";
}

function isWwwHost(request: NextRequest): boolean {
  return requestHost(request) === "www.precisar.net";
}

/**
 * Un solo hop: www→apex + path canónico + cookie de locale alineada al destino.
 * Evita que `/es/somos` (cookie `en`) acabe en `/en/somos`.
 */
function publicRedirect(request: NextRequest, pathname: string, status: 308 | 307 = 308) {
  const dest = new URL(request.url);
  if (isWwwHost(request)) {
    dest.protocol = "https:";
    dest.hostname = "precisar.net";
    dest.port = "";
  }
  const hashAt = pathname.indexOf("#");
  dest.pathname = (hashAt < 0 ? pathname : pathname.slice(0, hashAt)) || "/";
  dest.hash = hashAt < 0 ? "" : pathname.slice(hashAt);
  const res = NextResponse.redirect(dest, status);
  res.cookies.set("NEXT_LOCALE", cookieLocaleFromPath(dest.pathname), {
    path: "/",
    sameSite: "lax",
  });
  return res;
}

function redirectHomePrecisando(request: NextRequest, locale: string) {
  const url = request.nextUrl.clone();
  if (isWwwHost(request)) {
    url.protocol = "https:";
    url.hostname = "precisar.net";
    url.port = "";
  }
  url.pathname = locale === routing.defaultLocale ? "/" : `/${locale}`;
  url.hash = "precisando";
  const res = NextResponse.redirect(url, 307);
  res.cookies.set("NEXT_LOCALE", locale, { path: "/", sameSite: "lax" });
  return res;
}

function maybeSaberesPlatformRedirect(unprefixedPath: string): string | null {
  if (unprefixedPath === "/inicio" || unprefixedPath === "/saberes/clic" || unprefixedPath.startsWith("/saberes/clic/")) {
    return "/saberes";
  }
  if (
    unprefixedPath === "/cursos" ||
    unprefixedPath.startsWith("/cursos/") ||
    unprefixedPath === "/curso" ||
    unprefixedPath.startsWith("/curso/") ||
    unprefixedPath === "/quiz" ||
    unprefixedPath.startsWith("/quiz/") ||
    unprefixedPath === "/perfil" ||
    unprefixedPath.startsWith("/perfil/") ||
    unprefixedPath === "/certificados" ||
    unprefixedPath.startsWith("/certificados/")
  ) {
    return "/saberes";
  }
  return null;
}

export function middleware(request: NextRequest) {
  // Segunda pasada de next-intl (rewrite interno a `/es/...`): no redirigir ni reaplicar i18n.
  if (request.headers.get("x-next-intl-locale")) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  if (pathname.includes(".")) return NextResponse.next();

  const head = firstPathSegment(pathname);
  if (head && SKIP_LOCALE_PREFIX_SEGMENTS.has(head)) {
    if (isWwwHost(request)) return publicRedirect(request, pathname, 308);
    return NextResponse.next();
  }

  const { locale: pathLocale, segments: afterLocale, hadPrefix } = parseLocalePath(pathname);
  const unprefixedPath = afterLocale.length ? `/${afterLocale.join("/")}` : "/";

  const saberesDest = maybeSaberesPlatformRedirect(unprefixedPath);
  if (saberesDest) {
    return publicRedirect(request, withLocalePath(pathLocale, saberesDest), 308);
  }

  const numeric = unprefixedPath.match(/^\/(\d+)$/);
  if (numeric) {
    const n = Number.parseInt(numeric[1]!, 10);
    if (n >= 1 && n <= 24) {
      return publicRedirect(request, withLocalePath(pathLocale, `/aqui-no-pasa/modulos/${n}`), 308);
    }
  }

  const legacy = matchLegacyRedirect(unprefixedPath);
  if (legacy) {
    if (legacy.destination.startsWith("http://") || legacy.destination.startsWith("https://")) {
      return NextResponse.redirect(legacy.destination, legacy.permanent ? 308 : 307);
    }
    return publicRedirect(
      request,
      withLocalePath(pathLocale, legacy.destination),
      legacy.permanent ? 308 : 307,
    );
  }

  if (afterLocale[0] === "blog" && afterLocale.length === 2) {
    const slugSeg = decodePathSegment(afterLocale[1]!);
    const aliasTarget = PRECISANDO_SLUG_ALIASES[slugSeg];
    const article = articleBySlug(aliasTarget ?? slugSeg);
    if (article) {
      return publicRedirect(request, withLocalePath(pathLocale, `/precisando/${encodeURI(article.slug)}`), 308);
    }
  }

  if (afterLocale[0] === "precisando" && afterLocale[1] === "categories" && afterLocale.length === 3) {
    const incoming = categoryToSlug(decodePathSegment(afterLocale[2]!));
    const cat = uniqueCategories().find((c) => categoryToSlug(c) === incoming);
    if (cat) {
      return publicRedirect(
        request,
        withLocalePath(pathLocale, `/precisando/categoria/${categoryToSlug(cat)}`),
        308,
      );
    }
  }

  if (afterLocale[0] === "programas" && afterLocale[1] === "docentes") {
    return publicRedirect(
      request,
      withLocalePath(pathLocale, "/programas/educacion-mediatica-digital-para-docentes"),
      308,
    );
  }
  if (afterLocale[0] === "programas" && afterLocale[1] === "leer-noticias-era-digital") {
    return publicRedirect(
      request,
      withLocalePath(pathLocale, "/programas/educacion-mediatica-digital-para-docentes"),
      308,
    );
  }
  if (afterLocale[0] === "que-hacemos" && afterLocale[1] === "docentes") {
    return publicRedirect(
      request,
      withLocalePath(pathLocale, "/programas/educacion-mediatica-digital-para-docentes"),
      308,
    );
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
      return publicRedirect(request, withLocalePath(pathLocale, `/precisando/${encodeURI(aliasTarget)}`), 308);
    }
    const postFromRoot = !RESERVED_ROOT_SEGMENTS.has(decoded) ? articleBySlug(decoded) : undefined;
    if (postFromRoot) {
      if (PRECISANDO_ARTICLES_UNDER_CONSTRUCTION) {
        return redirectHomePrecisando(request, pathLocale);
      }
      return publicRedirect(
        request,
        withLocalePath(pathLocale, `/precisando/${encodeURI(postFromRoot.slug)}`),
        308,
      );
    }
  }

  /**
   * `/es` y `/es/*` son español con prefijo. Canónico: sin `/es`.
   * Nunca delegar esto a next-intl: con cookie `NEXT_LOCALE=en` puede reescribir a `/en/*`.
   */
  if (hadPrefix && pathLocale === routing.defaultLocale) {
    return publicRedirect(request, unprefixedPath || "/", 308);
  }

  if (isWwwHost(request)) {
    return publicRedirect(request, pathname, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
