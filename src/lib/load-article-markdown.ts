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
 * Variantes: «…», cursiva, punto final, cierre » pegado (p. ej. entender.»).
 */
function stripResumenEditorialTagline(md: string): string {
  // Quitamos el h2 visible «Resumen editorial» para que solo quede el párrafo de resumen.
  const withoutHeading = md.replace(/^##\s+Resumen editorial\s*\n+/gim, "");
  const escaped = EDITORIAL_TAGLINE_ES.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const core = `${escaped}\\.?»?`;
  const line = new RegExp(
    `^\\s*(?:«\\s*)?${core}(?:\\s*»)?\\s*$`,
    "gim",
  );
  const italicStar = new RegExp(
    `^\\s*\\*(?:«\\s*)?${escaped}\\.?»?\\*(?:\\s*»)?\\s*$`,
    "gim",
  );
  const italicUnd = new RegExp(
    `^\\s*_(?:«\\s*)?${escaped}\\.?»?_(?:\\s*»)?\\s*$`,
    "gim",
  );
  let out = withoutHeading.replace(line, "").replace(italicStar, "").replace(italicUnd, "");
  // Cualquier línea que sea solo la frase (con variantes mínimas de puntuación/citas)
  const loose = new RegExp(
    `^\\s*(?:«\\s*)?${escaped}[.»\\s]*»?\\s*$`,
    "gim",
  );
  out = out.replace(loose, "");
  out = out.replace(/\n{3,}/g, "\n\n");
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
