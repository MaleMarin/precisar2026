import { precisandoRssXml } from "@/lib/precisando-feed";

export function GET() {
  const body = precisandoRssXml();
  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
