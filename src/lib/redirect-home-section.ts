import { permanentRedirect } from "next/navigation";

/** Redirige a la portada con ancla al panel apilado (`MotionStackPanels` `id`). */
export function redirectToHomeStackSection(locale: string, sectionId: string): never {
  permanentRedirect(`/${locale}#${sectionId}`);
}
