#!/usr/bin/env node
/**
 * Añade «(integridad informativa)» tras cada aparición de «desinformación» / «Desinformación» / plural,
 * sin tocar URLs, slugs ni identificadores de código.
 *
 * Reglas:
 *  - Solo Spanish/Portuguese real word (con `ó` o `o`). Singular y plural.
 *  - Word boundary: no toca `hubDesinformacion` ni similares.
 *  - Salta si está dentro de slug/URL (rodeado por `-` o `/`).
 *  - Idempotente: no duplica «(integridad informativa)» si ya está.
 *  - No toca ALL CAPS («DESINFORMACIÓN»).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const FILES = [
  "src/app/[locale]/(site)/culturadigital/data.ts",
  "src/components/funcionarios/SesionesSection.tsx",
  "src/content/propuesta-politica-alfabetizacion/1-intro-objetivos-marco-c1.md",
  "src/content/precisando/la-educacion-mediatica-como-necesidad-imperante-para-todos.md",
  "src/app/[locale]/(site)/educacion-mediatica/propuesta-politica-alfabetizacion/page.tsx",
  "src/app/[locale]/(site)/programas/funcionarios-publicos/page.tsx",
  "src/app/[locale]/(site)/legal/privacidad-consulta-2026/page.tsx",
  "src/app/[locale]/(site)/programas/pensamiento-critico/page.tsx",
  "src/lib/consulta-viva/aggregations.ts",
  "messages/es.json",
  "public/downloads/precisar-textos-paginas-es.txt",
  "src/components/ciudades/ProgramasTab.tsx",
  "src/app/[locale]/(site)/programas/hub-digital-consciente/HubCylinder.tsx",
  "src/app/[locale]/(site)/programas/hub-digital-consciente/HubPersonalizacion.tsx",
  "src/app/[locale]/(site)/educacion-mediatica/ami-vs-alfabetizacion-digital/page.tsx",
  "src/content/precisando/comprendiendo-la-desinformación-un-recorrido-por-términos-y-técnicas-clave.md",
  "messages/pt.json",
  "src/components/hub/PersonalizacionGrid.tsx",
  "src/app/[locale]/(site)/educacion-mediatica/comunicacion/ComunicacionMediaticaTabs.tsx",
  "src/app/[locale]/(site)/programas/aprender-digital/AprenderModulosTabs.tsx",
  "src/app/[locale]/(site)/programas/educacion-mediatica-digital-para-docentes/page.tsx",
  "src/content/precisando/ciudades-mil-la-apuesta-por-el-desarrollo-urbano-y-la-cultura-de-la-información.md",
  "src/data/course-modules.ts",
  "docs/textos-paginas-internas-es.md",
  "src/content/precisando/foro-económico-mundial-la-desinformación-ya-es-el-riesgo-global-n-º-1.md",
  "src/content/precisando/a-veces-cambiar-de-nombre-no-es-borrar-el-pasado-sino-precisar-mejor-hacia-dónde-se-quiere-ir.md",
  "src/app/[locale]/(site)/marco/educacion/page.tsx",
  "src/app/[locale]/(site)/experiencias/sentidos-digitales/[slug]/OlfatoDigitalExperience.tsx",
  "src/app/[locale]/(site)/programas/aprender-digital/page.tsx",
  "src/lib/consulta-observatorio/model.ts",
  "src/components/motion/MotionHomeRails.tsx",
  "src/content/precisando/entender-los-filtros-burbuja-y-las-cámaras-de-eco-una-mirada-desde-la-antropología-digital.md",
  "src/content/precisando/la-misión-crítica-de-la-ami-la-unesco-redefine-su-estrategia-ante-la-era-de-la-ia-generativa.md",
  "src/components/funcionarios/FuncionariosHero.tsx",
  "src/content/precisando/pensamiento-crítico-en-tiempos-de-ruido-digital.md",
  "src/content/propuesta-politica-alfabetizacion/2-competencias-2-3-4.md",
  "src/app/[locale]/(site)/educaciónmediática/propuesta-politica-alfabetizacion/content/Part2.tsx",
  "src/content/precisando/el-uso-excesivo-o-inadecuado-de-las-redes-sociales-se-vincula-con-la-aceptación-y-difusión-de-notici.md",
  "src/components/hub/FormatosGrid.tsx",
  "src/content/precisando/migración-y-conflictos-internacionales-dominan-las-tendencias-de-desinformación-en-américa-latina.md",
  "src/app/[locale]/(site)/marco/comunicacion/page.tsx",
  "src/components/ciudades/ContenidosGrid.tsx",
  "src/content/precisando/democracia-en-la-era-dedigital-y-la-ia-desafíos-y-soluciones.md",
  "src/app/[locale]/(site)/educaciónmediática/propuesta-politica-alfabetizacion/content/Part1.tsx",
  "src/app/[locale]/(site)/educaciónmediática/propuesta-politica-alfabetizacion/content/Part4.tsx",
  "src/content/precisando/ocde-hechos-frente-a-falsedades-integridad-informativa.md",
  "src/app/[locale]/(site)/educacion-mediatica/comunicacion/page.tsx",
  "src/content/precisando/la-ética-de-la-ia-en-la-educación-una-guía-para-directivos-docentes-y-alumnos.md",
  "src/app/[locale]/(site)/programas/ciudades/page.tsx",
  "src/app/[locale]/(site)/programas/hub-digital-consciente/page.tsx",
  "src/content/precisando/precisar-desarrolla-muestras-itinerantes-de-cultura-digital-y-busca-aliados-para-su-implementación-e.md",
  "src/app/[locale]/(site)/que-hacemos/formacion-pensamiento-critico/page.tsx",
  "src/app/[locale]/(site)/educacion-mediatica/educacion/page.tsx",
  "src/app/[locale]/(site)/programas/funcionarios-publicos/FuncionariosCursoTabs.tsx",
  "src/app/[locale]/(site)/culturadigital/page.tsx",
  "src/app/[locale]/(site)/programas/ciudades/CiudadesPropuestasTabs.tsx",
  "src/data/articles.ts",
  "src/components/aprender/ModulosSection.tsx",
  "src/content/precisando/principios-globales-de-la-onu-para-la-integridad-de-la-información-claves-para-combatir-la-desinfor.md",
  "src/content/precisando/informe-de-noticias-digitales-2025del-instituto-reuters-fragmentación-ia-y-la-búsqueda-de-confianz.md",
  "src/app/[locale]/(site)/aqui-no-pasa/page.tsx",
  "src/components/hub/HubHero.tsx",
  "src/app/[locale]/(site)/programas/hub-digital-consciente/HubPosibilidades.tsx",
  "src/content/propuesta-politica-alfabetizacion/3-implementacion-fin.md",
  "src/data/una-pregunta-al-dia-content.ts",
];

// Word: «desinformación», «desinformaciones», «Desinformación», «Desinformaciones»
// Acepta acento opcional sobre la `o` (algunos archivos no lo llevan).
// Lookbehind/lookahead negativos para `-` o `/` (slugs/URLs).
// Lookahead negativo para `(integridad` (idempotente).
const PATTERN = /(?<![\p{L}\p{N}_\-/])([Dd]esinformaci[oó]n(?:es)?)(?![\p{L}\p{N}_\-/])(?!\s*\(integridad\sinformativa\))/gu;

const APPEND = " (integridad informativa)";

let total = 0;
const changed = [];

for (const rel of FILES) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    console.warn(`SKIP (no existe): ${rel}`);
    continue;
  }
  const original = fs.readFileSync(abs, "utf8");
  let count = 0;
  const updated = original.replace(PATTERN, (m) => {
    count += 1;
    return `${m}${APPEND}`;
  });
  if (count > 0) {
    fs.writeFileSync(abs, updated, "utf8");
    changed.push({ file: rel, count });
    total += count;
  }
}

console.log("Archivos modificados:", changed.length);
for (const { file, count } of changed) {
  console.log(`  ${count.toString().padStart(3)}  ${file}`);
}
console.log(`Reemplazos totales: ${total}`);
