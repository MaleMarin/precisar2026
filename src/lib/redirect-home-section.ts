import { permanentRedirect } from "next/navigation";
import { localePath } from "@/lib/site";

/** Redirige a la portada con ancla al panel apilado (`MotionStackPanels` `id`). */
export function redirectToHomeStackSection(locale: string, sectionId: string): never {
  permanentRedirect(`${localePath(locale, "/")}#${sectionId}`);
}
