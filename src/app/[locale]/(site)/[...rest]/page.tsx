import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

/** Rutas desconocidas bajo `[locale]` (con o sin prefijo) → 404 localizado, sin redirigir. */
export default function LocaleCatchAllPage() {
  notFound();
}
