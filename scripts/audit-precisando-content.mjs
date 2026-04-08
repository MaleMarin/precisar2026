/**
 * Compara `src/data/articles.ts` con `src/content/precisando/*.md`.
 *
 * Uso (desde `web/`):
 *   npm run precisando:audit              → JSON por stdout
 *   npm run precisando:audit:export       → JSON + CSV en `../_audit/`
 *
 * Opcional: node scripts/audit-precisando-content.mjs --export
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const articlesPath = path.join(root, "src/data/articles.ts");
const contentDir = path.join(root, "src/content/precisando");
const auditDir = path.join(root, "..", "_audit");

const MIN_CHARS = 800;
const exportToDisk = process.argv.includes("--export");

const src = fs.readFileSync(articlesPath, "utf8");

/** Metadatos en orden del catálogo (solo bloques tras `export const ARTICLES`). */
function parseArticlesMeta(ts) {
  const start = ts.indexOf("export const ARTICLES");
  const slice = start >= 0 ? ts.slice(start) : ts;
  const slugRe = /slug:\s*"([^"]+)"/g;
  const matches = [...slice.matchAll(slugRe)];
  const articles = [];
  for (let i = 0; i < matches.length; i++) {
    const slug = matches[i][1];
    const from = matches[i].index;
    const to = i + 1 < matches.length ? matches[i + 1].index : slice.length;
    const block = slice.slice(from, to);
    const titleM = block.match(/title:\s*\n\s*"([^"]+)"/) || block.match(/title:\s*"([^"]+)"/);
    const catM = block.match(/category:\s*"([^"]+)"/);
    const dateM = block.match(/pubDate:\s*"([^"]+)"/);
    articles.push({
      slug,
      title: titleM ? titleM[1] : "",
      category: catM ? catM[1] : "",
      pubDate: dateM ? dateM[1] : "",
    });
  }
  return articles;
}

const metaList = parseArticlesMeta(src);
const catalog = metaList.map((m) => m.slug);
const catalogSet = new Set(catalog);

const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
const mdSlugs = files.map((f) => f.replace(/\.md$/, ""));
const mdSet = new Set(mdSlugs);

const missingMd = catalog.filter((s) => !mdSet.has(s));
const orphanMd = mdSlugs.filter((s) => !catalogSet.has(s));

function bodyLen(slug) {
  const p = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(p)) return -1;
  let raw = fs.readFileSync(p, "utf8");
  raw = raw.replace(/<!--[\s\S]*?-->/g, "");
  raw = raw.replace(/\*Este texto proviene del resumen RSS[\s\S]*?migración editorial\.\*/g, "");
  const stripped = raw
    .replace(/^#\s+.+\n+/, "")
    .replace(/Fuente:\s*https?:\/\/\S+\s*/i, "")
    .trim();
  return stripped.length;
}

function tierFor(len) {
  if (len < 0) return "missing";
  if (len >= MIN_CHARS) return "long";
  return "short";
}

const checklist = metaList.map((m) => {
  const len = bodyLen(m.slug);
  return {
    slug: m.slug,
    title: m.title,
    category: m.category,
    pubDate: m.pubDate,
    bodyChars: len < 0 ? null : len,
    tier: tierFor(len),
    mdRelativePath: `web/src/content/precisando/${m.slug}.md`,
  };
});

const long = checklist.filter((r) => r.tier === "long").sort((a, b) => b.bodyChars - a.bodyChars);
const short = checklist.filter((r) => r.tier !== "long").sort((a, b) => (a.bodyChars ?? 0) - (b.bodyChars ?? 0));

const out = {
  generatedAt: new Date().toISOString(),
  catalogCount: catalog.length,
  mdFileCount: mdSlugs.length,
  thresholdChars: MIN_CHARS,
  missingMd,
  orphanMd,
  checklist,
  longBodies: long.map((r) => ({ slug: r.slug, len: r.bodyChars })),
  shortBodies: short.map((r) => ({ slug: r.slug, len: r.bodyChars ?? 0 })),
  summary: {
    conMdCompletoAparente: long.length,
    cuerpoCortoOResumen: short.filter((r) => r.tier === "short").length,
    sinArchivo: short.filter((r) => r.tier === "missing").length,
  },
};

function csvEscape(value) {
  if (value === null || value === undefined) return '""';
  const s = String(value).replace(/"/g, '""');
  return `"${s}"`;
}

function checklistToCsv(rows) {
  const header = [
    "slug",
    "title",
    "category",
    "pubDate",
    "bodyChars",
    "tier",
    "mdRelativePath",
  ];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        csvEscape(r.slug),
        csvEscape(r.title),
        csvEscape(r.category),
        csvEscape(r.pubDate),
        csvEscape(r.bodyChars ?? ""),
        csvEscape(r.tier),
        csvEscape(r.mdRelativePath),
      ].join(","),
    );
  }
  return lines.join("\n") + "\n";
}

if (exportToDisk) {
  fs.mkdirSync(auditDir, { recursive: true });
  const jsonPath = path.join(auditDir, "precisando-content-audit.json");
  const csvPath = path.join(auditDir, "precisando-content-checklist.csv");
  fs.writeFileSync(jsonPath, `${JSON.stringify(out, null, 2)}\n`, "utf8");
  fs.writeFileSync(csvPath, checklistToCsv(checklist), "utf8");
  console.error(`Escrito: ${jsonPath}`);
  console.error(`Escrito: ${csvPath}`);
}

console.log(JSON.stringify(out, null, 2));
