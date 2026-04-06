import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "pt", "en"],
  defaultLocale: "es",
  /** Siempre `/es/...`, `/pt/...`, `/en/...`: alineado con el middleware. */
  localePrefix: "always",
});
