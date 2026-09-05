import type { Metadata } from "next";
import { NotFoundPage, notFoundMetadata } from "@/components/not-found/not-found-page";

export async function generateMetadata(): Promise<Metadata> {
  return notFoundMetadata();
}

export default async function SiteNotFound() {
  return <NotFoundPage />;
}
