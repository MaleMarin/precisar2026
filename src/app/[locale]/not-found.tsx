import type { Metadata } from "next";
import { SiteChrome } from "@/components/SiteChrome";
import { NotFoundPage, notFoundMetadata } from "@/components/not-found/not-found-page";

export async function generateMetadata(): Promise<Metadata> {
  return notFoundMetadata();
}

/** 404 fuera del grupo `(site)`: monta chrome aquí porque ese layout no aplica. */
export default async function LocaleNotFound() {
  return (
    <SiteChrome>
      <NotFoundPage />
    </SiteChrome>
  );
}
