#!/usr/bin/env node
/**
 * Genera documento descargable UTF-8:
 *   public/downloads/precisar-textos-paginas-es.txt  (abrir /descargar desde el sitio)
 * y copia en Markdown: docs/textos-paginas-internas-es.md
 * Regenerar: node scripts/export-textos-paginas.mjs
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
  if (/^\.\.?\/[^\\\s]+\.(css|tsx?|jsx?|json|svg)(\s|$)/i.test(t)) return true;
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

/** Solo valores string de messages/es.json, en orden de aparición. */
function stringsFromMessagesJson(raw) {
  const out = [];
  function walk(node) {
    if (typeof node === "string") out.push(node);
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === "object") Object.values(node).forEach(walk);
  }
  walk(JSON.parse(raw));
  return out;
}

const pages = [
  ...walkPageTsx(SITE),
  ...EXTRA.filter((p) => fs.existsSync(p)),
].sort((a, b) => siteUrlPath(a).localeCompare(siteUrlPath(b), "es"));

/** @type {{ title: string; body: string }[]} */
const sections = [];

sections.push({
  title: "Textos compartidos (navegación, inicio, pie)",
  body: stringsFromMessagesJson(fs.readFileSync(path.join(ROOT, "messages/es.json"), "utf8"))
    .map((s) => mdEscape(s).trim())
    .join("\n\n"),
});

for (const abs of pages) {
  const urlPath = siteUrlPath(abs);
  const src = fs.readFileSync(abs, "utf8");
  const metaTitleRaw = extractMetaField(src, "title");
  const metaDesc = extractMetaField(src, "description");
  const displayTitle = metaTitleRaw ? cleanMetaTitle(metaTitleRaw) : slugToFallbackTitle(urlPath);

  const strs = extractStrings(src);
  const parts = [];
  if (metaDesc) parts.push(mdEscape(metaDesc).trim());
  for (const s of strs) parts.push(mdEscape(s).trim());

  const body =
    parts.length === 0 ? "(Sin texto extraído en este archivo.)" : parts.join("\n\n");

  sections.push({ title: displayTitle, body });
}

const dateStr = new Date().toISOString().slice(0, 10);

function toDownloadTxt(items) {
  const sep = "=".repeat(76);
  const lines = [
    "PRECISAR · TEXTOS DEL SITIO (ESPAÑOL)",
    "",
    "Documento para descarga. Codificación: UTF-8.",
    `Versión generada: ${dateStr}.`,
    "",
  ];
  for (const { title, body } of items) {
    lines.push(sep);
    lines.push(title);
    lines.push(sep);
    lines.push("");
    lines.push(body.trimEnd());
    lines.push("");
    lines.push("");
  }
  return lines.join("\n");
}

function toMarkdown(items) {
  const lines = [];
  for (const { title, body } of items) {
    lines.push(`## ${title}`);
    lines.push("");
    lines.push(body.trimEnd());
    lines.push("");
  }
  return lines.join("\n");
}

const publicPath = path.join(ROOT, "public", "downloads", "precisar-textos-paginas-es.txt");
const docsPath = path.join(ROOT, "docs", "textos-paginas-internas-es.md");

fs.mkdirSync(path.dirname(publicPath), { recursive: true });
fs.mkdirSync(path.dirname(docsPath), { recursive: true });

fs.writeFileSync(publicPath, toDownloadTxt(sections), "utf8");
fs.writeFileSync(docsPath, toMarkdown(sections), "utf8");

console.log("Descarga (sitio):", path.relative(ROOT, publicPath));
console.log("Copia markdown:", path.relative(ROOT, docsPath));
console.log("URL en producción: /downloads/precisar-textos-paginas-es.txt");
console.log("Páginas:", pages.length);
