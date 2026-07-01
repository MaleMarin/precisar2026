/**
 * Merge program page i18n namespaces into messages/*.json
 * Run: node scripts/merge-program-i18n.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { programsHub } from "./i18n/programsHub.mjs";
import { programsFuncionarios } from "./i18n/programsFuncionarios.mjs";
import { programsCiudades } from "./i18n/programsCiudades.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const namespaces = {
  programsHub,
  programsFuncionarios,
  programsCiudades,
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
