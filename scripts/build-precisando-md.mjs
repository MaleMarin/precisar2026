/**
 * Genera `src/content/precisando/<slug>.md` a partir de `_audit/blog-feed.xml`.
 * Ejecutar desde la raíz del repo: node web/scripts/build-precisando-md.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const xmlPath = path.join(root, "..", "_audit", "blog-feed.xml");
const outDir = path.join(root, "src", "content", "precisando");

const xml = fs.readFileSync(xmlPath, "utf8");
const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function cdata(re, block) {
  const m = block.match(re);
  return m ? m[1].replace(/\s+/g, " ").trim() : "";
}

for (const it of items) {
  const link = (it.match(/<link>([^<]+)<\/link>/) || [])[1];
  if (!link) continue;
  const slug = decodeURIComponent(new URL(link).pathname.slice(1));
  const title = cdata(/<title><!\[CDATA\[([\s\S]*?)\]\]>/, it);
  const desc = cdata(/<description><!\[CDATA\[([\s\S]*?)\]\]>/, it);
  const pub = (it.match(/<pubDate>([^<]+)<\/pubDate>/) || [])[1];
  const cat = cdata(/<category><!\[CDATA\[([\s\S]*?)\]\]>/, it);

  const md = `<!-- Fuente: precisar.net RSS (blog-feed.xml). Ampliar con cuerpo íntegro si hace falta. -->
_Publicado: ${pub} · ${cat}_

${desc}

---

*Este texto proviene del resumen RSS. Si necesitas el artículo completo con maquetación original, conserva la URL histórica en precisar.net hasta completar la migración editorial.*
`;
  const file = path.join(outDir, `${slug}.md`);
  fs.writeFileSync(file, md, "utf8");
  console.log("wrote", slug);
}

console.log("done,", items.length, "files");
