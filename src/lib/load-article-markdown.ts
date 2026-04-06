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

/** Cuerpo Markdown por slug (archivo opcional en `src/content/precisando/`). */
export function loadArticleMarkdown(slug: string): string | null {
  const file = path.join(process.cwd(), "src/content/precisando", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return stripRssStubParagraph(stripHtmlComments(raw));
}
