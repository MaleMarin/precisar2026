#!/usr/bin/env node
/**
 * Genera un documento exportable con textos literales por página (es),
 * con títulos claros: ruta URL, archivo y título de metadata si existe.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE = path.join(ROOT, "src/app/[locale]/(site)");
const EXTRA = [
  path.join(ROOT, "src/app/[locale]/consulta-observatorio/page.tsx"),
];

function walkPageTsx(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) out.push(...walkPageTsx(p));
    else if (name.name === "page.tsx") out.push(p);
  }
  return out;
}

/** Ruta pública aproximada: /{locale}/segmentos… (sin route group) */
function siteUrlPath(absFile) {
  const norm = absFile.replace(/\\/g, "/");
  const marker = "/(site)/";
  const idx = norm.indexOf(marker);
  if (idx === -1) {
    if (norm.includes("/consulta-observatorio/page.tsx")) return "consulta-observatorio";
    return path.relative(ROOT, absFile);
  }
  let p = norm.slice(idx + marker.length).replace(/\/page\.tsx$/, "");
  if (!p || p === "page.tsx") return "(inicio)";
  return p;
}

function slugToFallbackTitle(urlPath) {
  if (urlPath === "(inicio)") return "Inicio (portada)";
  const last = urlPath.split("/").filter(Boolean).pop() || "inicio";
  return last
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace(/\bUi\b/g, "UI");
}

function extractMetaField(src, field) {
  const re = new RegExp(`${field}:\\s*"((?:\\\\.|[^"\\\\])*)"`, "m");
  let m = src.match(re);
  if (m) return m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"');
  const re2 = new RegExp(`${field}:\\s*'((?:\\\\.|[^'\\\\])*)'`, "m");
  m = src.match(re2);
  if (m) return m[1].replace(/\\n/g, "\n").replace(/\\'/g, "'");
  return null;
}

function cleanMetaTitle(t) {
  return t.replace(/\s*·\s*Precisar\s*$/i, "").replace(/\s*—\s*Precisar\s*$/i, "").trim();
}

function looksLikeNoise(t) {
  if (t.length < 12) return true;
  if (/\b(clamp\(|sans-serif|vw\)|rem\)|'Avenir|"Avenir)/i.test(t)) return true;
  if (t.includes("@/") || /^next(\/|$)/.test(t)) return true;
  if (["_blank", "noreferrer"].includes(t)) return true;
  if (/var\(/.test(t) || /--[a-z-]+/.test(t)) return true;
  const wordish = (t.match(/[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]{3,}/g) || []).length;
  if (wordish < 2 && !/[áéíóúñ¿¡]/.test(t)) return true;
  if (
    /^(flex|grid|mt-|mb-|ml-|mr-|pt-|pb-|pl-|pr-|px-|py-|gap-|max-w|min-w|w-|h-|border|rounded|text-\[|font-|leading-|tracking-|inline|block|space-|list-|hover:|focus:|md:|lg:)/.test(
      t,
    )
  )
    return true;
  if (/^(prec-|ink)$/.test(t)) return true;
  if (/^\d+\s*\?/.test(t)) return true;
  if (/^\/[a-z0-9/-]+\/?$/.test(t) && !t.includes(" ")) return true;
  return false;
}

function extractStrings(src) {
  const found = new Set();
  const add = (s) => {
    const t = s.trim();
    if (t.length < 2) return;
    if (looksLikeNoise(t)) return;
    found.add(t);
  };

  const dq = /"((?:\\.|[^"\\])*)"/g;
  let m;
  while ((m = dq.exec(src)) !== null) add(m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"'));

  const sq = /'((?:\\.|[^'\\])*)'/g;
  while ((m = sq.exec(src)) !== null) add(m[1].replace(/\\n/g, "\n").replace(/\\'/g, "'"));

  const bt = /`([\s\S]*?)`/g;
  while ((m = bt.exec(src)) !== null) {
    const raw = m[1].replace(/\$\{[^}]+\}/g, " ").replace(/\s+/g, " ").trim();
    if (raw.length >= 2) add(raw);
  }

  const jsxBare = />\s*([^<>{]+?)\s*</g;
  while ((m = jsxBare.exec(src)) !== null) add(m[1]);

  return [...found].sort((a, b) => a.localeCompare(b, "es"));
}

function mdEscape(s) {
  return s.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n");
}

const pages = [
  ...walkPageTsx(SITE),
  ...EXTRA.filter((p) => fs.existsSync(p)),
].sort((a, b) => siteUrlPath(a).localeCompare(siteUrlPath(b), "es"));

const lines = [];
lines.push("# Textos del sitio Precisar (exportación)");
lines.push("");
lines.push(
  "Documento generado para revisión editorial. Los textos se extraen de literales en cada `page.tsx` (no incluye solo componentes importados, CMS ni datos dinámicos).",
);
lines.push("");
lines.push("**Regenerar:** en la raíz del repo, ejecutar `node scripts/export-textos-paginas.mjs`.");
lines.push("");
lines.push(`_Generado: ${new Date().toISOString().slice(0, 10)}._`);
lines.push("");

lines.push("---");
lines.push("");
lines.push("## Textos compartidos (i18n) — `messages/es.json`");
lines.push("");
lines.push("Aplican a navegación, secciones del inicio, migas de pan, pie, etc.");
lines.push("");
lines.push("```json");
lines.push(mdEscape(fs.readFileSync(path.join(ROOT, "messages/es.json"), "utf8").trim()));
lines.push("```");
lines.push("");

for (const abs of pages) {
  const rel = path.relative(ROOT, abs);
  const urlPath = siteUrlPath(abs);
  const src = fs.readFileSync(abs, "utf8");
  const metaTitleRaw = extractMetaField(src, "title");
  const metaDesc = extractMetaField(src, "description");
  const displayTitle = metaTitleRaw ? cleanMetaTitle(metaTitleRaw) : slugToFallbackTitle(urlPath);

  lines.push("---");
  lines.push("");
  lines.push(`## Página: ${displayTitle}`);
  lines.push("");
  if (urlPath === "(inicio)") {
    lines.push(`- **Ruta pública:** \`/{locale}\` (inicio; el locale es \`es\`, \`en\` o \`pt\`)`);
  } else {
    lines.push(`- **Ruta pública:** \`/{locale}/${urlPath}\``);
  }
  lines.push(`- **Archivo:** \`${rel}\``);
  if (metaTitleRaw) lines.push(`- **Metadata title (original):** ${metaTitleRaw}`);
  if (metaDesc) {
    lines.push(`- **Metadata description:** ${metaDesc}`);
  }
  lines.push("");

  const strs = extractStrings(src);
  lines.push("### Textos detectados en el archivo");
  lines.push("");
  if (strs.length === 0) {
    lines.push("_No se detectaron cadenas largas en este archivo (el contenido puede vivir en componentes hijos)._");
  } else {
    for (const s of strs) {
      const oneLine = mdEscape(s).replace(/\n/g, " ");
      lines.push(`- ${oneLine}`);
    }
  }
  lines.push("");
}

const outPath = path.join(ROOT, "docs", "textos-paginas-internas-es.md");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log("Escrito:", outPath);
console.log("Páginas:", pages.length);
