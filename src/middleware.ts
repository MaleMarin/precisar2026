import { NextResponse, type NextRequest } from "next/server";
import { ARTICLE_SLUG_SET } from "@/data/articles";
import { PRECISANDO_SLUG_ALIASES } from "@/data/slug-aliases";

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

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.includes(".")) return NextResponse.next();

  const numeric = pathname.match(/^\/(\d+)$/);
  if (numeric) {
    const n = Number.parseInt(numeric[1], 10);
    if (n >= 1 && n <= 25) {
      const url = request.nextUrl.clone();
      url.pathname = `/aqui-no-pasa/modulos/${n}`;
      return NextResponse.redirect(url, 308);
    }
  }

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 1) {
    const decoded = decodePathSegment(parts[0]);
    const aliasTarget = PRECISANDO_SLUG_ALIASES[decoded];
    if (aliasTarget) {
      const url = request.nextUrl.clone();
      url.pathname = `/precisando/${encodeURI(aliasTarget)}`;
      return NextResponse.redirect(url, 308);
    }
    if (!RESERVED_ROOT_SEGMENTS.has(decoded) && ARTICLE_SLUG_SET.has(decoded)) {
      const url = request.nextUrl.clone();
      url.pathname = `/precisando/${encodeURI(decoded)}`;
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
