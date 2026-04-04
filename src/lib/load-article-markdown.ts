import fs from "fs";
import path from "path";

/** Cuerpo Markdown por slug (archivo opcional en `src/content/precisando/`). */
export function loadArticleMarkdown(slug: string): string | null {
  const file = path.join(process.cwd(), "src/content/precisando", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

/** Heurística: cuerpo local suficiente para ocultar el espejo en precisar.net. */
export function hasSubstantialLocalBody(markdown: string | null): boolean {
  if (!markdown) return false;
  const stripped = markdown.replace(/<!--[\s\S]*?-->/g, "").trim();
  return stripped.length >= 500;
}
