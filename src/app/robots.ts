import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = new URL(SITE.url);
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: new URL("/sitemap.xml", base).toString(),
    host: base.host,
  };
}
