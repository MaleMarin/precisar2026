import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [];
}

/** Rutas desconocidas bajo `[locale]` (con o sin prefijo) → 404 localizado, sin redirigir. */
export default function LocaleCatchAllPage() {
  notFound();
}
