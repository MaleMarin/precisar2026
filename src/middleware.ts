import { NextResponse, type NextRequest } from "next/server";
import { articleBySlug } from "@/data/articles";
import { PRECISANDO_SLUG_ALIASES } from "@/data/slug-aliases";
import { routing } from "@/i18n/routing";

const LOCALE_SET = new Set(routing.locales.map((l) => l.toLowerCase()));

/** Rutas en la raíz de `app/` que no usan el segmento `[locale]`. */
const SKIP_LOCALE_PREFIX_SEGMENTS = new Set(["api", "_next", "opengraph-image"]);

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
  const first = firstPathSegment(pathname)?.toLowerCase();
  return first != null && LOCALE_SET.has(first);
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
    const n = Number.parseInt(numeric[1], 10);
    if (n >= 1 && n <= 25) {
      const url = request.nextUrl.clone();
      url.pathname = `/aqui-no-pasa/modulos/${n}`;
      return NextResponse.redirect(url, 308);
    }
  }

  if (!hasLocalePrefix(pathname)) {
    const url = request.nextUrl.clone();
    const suffix = pathname === "/" ? "" : pathname;
    url.pathname = `/${routing.defaultLocale}${suffix}`;
    return NextResponse.redirect(url, 308);
  }

  const parts = pathname.split("/").filter(Boolean);
  const localeSeg = parts[0];
  const afterLocale = parts.slice(1);

  if (afterLocale.length === 1) {
    const decoded = decodePathSegment(afterLocale[0]);
    const aliasTarget = PRECISANDO_SLUG_ALIASES[decoded];
    if (aliasTarget) {
      const url = request.nextUrl.clone();
      url.pathname = `/${localeSeg}/precisando/${encodeURI(aliasTarget)}`;
      return NextResponse.redirect(url, 308);
    }
    const postFromRoot = !RESERVED_ROOT_SEGMENTS.has(decoded) ? articleBySlug(decoded) : undefined;
    if (postFromRoot) {
      const url = request.nextUrl.clone();
      url.pathname = `/${localeSeg}/precisando/${encodeURI(postFromRoot.slug)}`;
      return NextResponse.redirect(url, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
