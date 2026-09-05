import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "pt", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  localeDetection: false,
  /** Los hreflang salen de `pageSeo` / metadata (URLs apex), no del host de la petición. */
  alternateLinks: false,
});
