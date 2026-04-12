import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "pt", "en"],
  defaultLocale: "es",
  /** Español sin prefijo (`/`); `pt` y `en` con prefijo (`/pt/...`, `/en/...`). */
  localePrefix: "as-needed",
});
