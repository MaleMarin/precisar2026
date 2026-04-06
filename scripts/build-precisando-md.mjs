/**
 * Genera `src/content/precisando/<slug>.md` desde el RSS de Precisar.
 *
 * Por defecto descarga https://www.precisar.net/blog-feed.xml y guarda copia en
 * `_audit/blog-feed.xml`. Con `--local` solo lee ese archivo (sin red).
 *
 * Si un ítem trae <content:encoded> (cuerpo HTML completo), se convierte a Markdown.
 * Si no, se usa <description> (a veces HTML). El umbral `BODY_MIN_LEN` solo afecta el log.
 *
 * Uso (desde la carpeta `web/`):
 *   node scripts/build-precisando-md.mjs
 *   node scripts/build-precisando-md.mjs --local
 *
 * Umbral `BODY_MIN_LEN` para marcar en consola si el cuerpo del feed es corto.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import TurndownService from "turndown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const auditPath = path.join(root, "..", "_audit", "blog-feed.xml");
const outDir = path.join(root, "src", "content", "precisando");

const FEED_URL = process.env.PRECISAR_RSS_URL ?? "https://www.precisar.net/blog-feed.xml";
const BODY_MIN_LEN = 500;

const useLocalOnly = process.argv.includes("--local");

const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

function stripNoiseHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .trim();
}

function htmlToMd(html) {
  if (!html || html.length < 3) return "";
  const cleaned = stripNoiseHtml(html);
  if (!cleaned) return "";
  try {
    return td.turndown(cleaned).replace(/\n{3,}/g, "\n\n").trim();
  } catch {
    return "";
  }
}

/** description en RSS: a veces texto plano, a veces HTML embebido */
function descriptionToMd(raw) {
  const t = raw.trim();
  if (!t) return "";
  if (/<[a-z][\s\S]*>/i.test(t)) return htmlToMd(t);
  return t.replace(/\s+/g, " ").trim();
}

function extractCdata(re, block) {
  const m = block.match(re);
  return m ? m[1].trim() : "";
}

/** content:encoded con o sin CDATA (namespace content:) */
function extractContentEncoded(block) {
  const withCdata = extractCdata(
    /<content:encoded>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/content:encoded>/i,
    block,
  );
  if (withCdata) return withCdata;
  const m = block.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i);
  return m ? m[1].trim() : "";
}

async function loadXml() {
  if (useLocalOnly) {
    if (!fs.existsSync(auditPath)) {
      console.error("No existe", auditPath, "— quita --local o deja que el script descargue el feed.");
      process.exit(1);
    }
    return fs.readFileSync(auditPath, "utf8");
  }

  const res = await fetch(FEED_URL, {
    headers: { "User-Agent": "Precisar-site-build/1.0 (RSS sync)" },
  });
  if (!res.ok) {
    console.error("Fetch falló", res.status, FEED_URL);
    process.exit(1);
  }
  const xml = await res.text();
  fs.mkdirSync(path.dirname(auditPath), { recursive: true });
  fs.writeFileSync(auditPath, xml, "utf8");
  console.log("Guardado audit:", auditPath);
  return xml;
}

const xml = await loadXml();
const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let withEncoded = 0;

for (const it of items) {
  const link = (it.match(/<link>([^<]+)<\/link>/) || [])[1];
  if (!link) continue;
  const slug = decodeURIComponent(new URL(link).pathname.slice(1));
  const title = extractCdata(/<title><!\[CDATA\[([\s\S]*?)\]\]>/, it) || (it.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim() || "";
  const descRaw = extractCdata(/<description><!\[CDATA\[([\s\S]*?)\]\]>/, it) || (it.match(/<description>([^<]*)<\/description>/) || [])[1]?.trim() || "";
  const pub = (it.match(/<pubDate>([^<]+)<\/pubDate>/) || [])[1] || "";
  const cat = extractCdata(/<category><!\[CDATA\[([\s\S]*?)\]\]>/, it) || (it.match(/<category>([^<]*)<\/category>/) || [])[1]?.trim() || "";

  const encodedHtml = extractContentEncoded(it);
  let mainMd;
  /** Solo omitimos el aviso RSS si el feed trae HTML completo (content:encoded) y alcanza tamaño. */
  let useStub;

  if (encodedHtml.length > 80) {
    withEncoded++;
    mainMd = htmlToMd(encodedHtml);
    useStub = mainMd.length < BODY_MIN_LEN;
  } else {
    mainMd = descriptionToMd(descRaw);
    useStub = true;
  }

  if (!mainMd) mainMd = descRaw.replace(/\s+/g, " ").trim();

  const head = `_Publicado: ${pub} · ${cat}_
`;

  const md = `${head}

${mainMd}`;

  const file = path.join(outDir, `${slug}.md`);
  fs.writeFileSync(file, md, "utf8");
  console.log(
    "wrote",
    slug,
    useStub ? "(cuerpo corto / description)" : "(cuerpo íntegro feed)",
    encodedHtml ? "[encoded]" : "[desc]",
  );
}

console.log("done,", items.length, "items;", withEncoded, "con content:encoded");
