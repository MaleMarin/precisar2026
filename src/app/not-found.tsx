import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";
import { SiteChrome } from "@/components/SiteChrome";
import { NotFoundPage, notFoundMetadata } from "@/components/not-found/not-found-page";
import { routing } from "@/i18n/routing";

async function resolveRootNotFoundLocale(): Promise<(typeof routing.locales)[number]> {
  const headerLocale = (await headers()).get("x-next-intl-locale");
  if (hasLocale(routing.locales, headerLocale)) return headerLocale;
  return routing.defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRootNotFoundLocale();
  setRequestLocale(locale);
  return notFoundMetadata();
}

export default async function RootNotFound() {
  const locale = await resolveRootNotFoundLocale();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SiteChrome>
        <NotFoundPage />
      </SiteChrome>
    </NextIntlClientProvider>
  );
}
