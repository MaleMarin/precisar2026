import { articlesSortedByDate } from "@/data/articles";
import { SITE } from "@/lib/site";

function escapeXml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** RSS 2.0 preparado para Precisando (metadatos desde `articles.ts`). */
export function precisandoRssXml(): string {
  const items = articlesSortedByDate()
    .slice(0, 50)
    .map((a) => {
      const link = `${SITE.url}/precisando/${encodeURI(a.slug)}`;
      return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(a.pubDate).toUTCString()}</pubDate>
      <description>${escapeXml(a.excerpt)}</description>
      <category>${escapeXml(a.category)}</category>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Precisando · ${escapeXml(SITE.name)}</title>
    <link>${escapeXml(`${SITE.url}/precisando`)}</link>
    <description>Entradas editoriales y análisis.</description>
    <language>es-CL</language>
    <atom:link href="${escapeXml(`${SITE.url}/precisando/feed.xml`)}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
