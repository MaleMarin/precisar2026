import fs from "fs";
import path from "path";

/** Los comentarios `<!-- ... -->` en .md no son HTML en react-markdown y se mostraban como texto. */
function stripHtmlComments(md: string): string {
  return md.replace(/<!--[\s\S]*?-->/g, "").replace(/^\n+/, "");
}

/** Aviso añadido por el importador RSS (ya no se muestra en la plantilla del artículo). */
function stripRssStubParagraph(md: string): string {
  let out = md.replace(
    /\r?\n-{3,}\s*\r?\n+\s*\*Este texto proviene del resumen RSS\.[\s\S]*?migración editorial\.\*\s*/g,
    "\n",
  );
  out = out.replace(
    /\*Este texto proviene del resumen RSS\.[\s\S]*?migración editorial\.\*\s*/g,
    "",
  );
  return out.replace(/\n{3,}/g, "\n\n").trim();
}

const EDITORIAL_TAGLINE_ES =
  "Lo que circula, lo que importa, lo que hay que entender";

/**
 * Quita la línea de marca duplicada bajo «## Resumen editorial» (Wix / migraciones).
 * Variantes: con o sin «», en cursiva markdown, punto final opcional.
 */
function stripResumenEditorialTagline(md: string): string {
  const escaped = EDITORIAL_TAGLINE_ES.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const core = `${escaped}\\.?`;
  const line = new RegExp(
    `^\\s*(?:«\\s*)?${core}(?:\\s*»)?\\s*$`,
    "gim",
  );
  const italicStar = new RegExp(`^\\s*\\*${core}\\*\\s*$`, "gim");
  const italicUnd = new RegExp(`^\\s*_${core}_\\s*$`, "gim");
  let out = md.replace(line, "").replace(italicStar, "").replace(italicUnd, "");
  out = out.replace(/\n{3,}/g, "\n\n");
  // «Resumen editorial» quedó sin párrafo: quitar el encabezado huérfano antes del siguiente ## o fin.
  out = out.replace(/^##\s+Resumen editorial\s*\n+(?=##\s)/gm, "");
  return out.trim();
}

/** Cuerpo Markdown por slug (archivo opcional en `src/content/precisando/`). */
export function loadArticleMarkdown(slug: string): string | null {
  const file = path.join(process.cwd(), "src/content/precisando", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return stripResumenEditorialTagline(stripRssStubParagraph(stripHtmlComments(raw)));
}
