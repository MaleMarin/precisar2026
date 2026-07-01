/**
 * Merge legal + educación mediática i18n namespaces into messages/*.json
 * Run: node scripts/merge-legal-edu-i18n.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { legalPrivacidad } from "./i18n/legalPrivacidad.mjs";
import { legalPrivacidadConsulta2026 } from "./i18n/legalPrivacidadConsulta2026.mjs";
import { legalPrivacidadBotOnda } from "./i18n/legalPrivacidadBotOnda.mjs";
import { propuestaPoliticaAlfabetizacion } from "./i18n/propuestaPoliticaAlfabetizacion.mjs";
import { amiVsAlfabetizacionDigital } from "./i18n/amiVsAlfabetizacionDigital.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const namespaces = {
  legalPrivacidad,
  legalPrivacidadConsulta2026,
  legalPrivacidadBotOnda,
  propuestaPoliticaAlfabetizacion,
  amiVsAlfabetizacionDigital,
};

for (const locale of ["es", "en", "pt"]) {
  const filePath = path.join(root, "messages", `${locale}.json`);
  const messages = JSON.parse(fs.readFileSync(filePath, "utf8"));
  for (const [ns, byLocale] of Object.entries(namespaces)) {
    messages[ns] = byLocale[locale];
  }
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2) + "\n");
  console.log(`Updated messages/${locale}.json`);
}
