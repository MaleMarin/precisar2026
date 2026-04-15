"use client";

import { usePathname } from "@/i18n/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./SiteChrome.module.css";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioHome = pathname === "/cinematic" || pathname === "/atelier";
  const isCulturaDigital = pathname.includes("/culturadigital");
  const isHome = pathname === "/" || pathname === "";
  const usePageInner = !isStudioHome && !isHome;

  return (
    <div className={styles.chrome}>
      {!isStudioHome ? <SiteHeader /> : null}
      <main
        className={
          isStudioHome
            ? styles.mainHome
            : [styles.mainDefault, isCulturaDigital ? styles.mainCulturaDigital : ""].filter(Boolean).join(" ")
        }
      >
        {usePageInner ? (
          <div className="mx-auto w-full min-w-0 max-w-screen-xl px-4 sm:px-6 lg:px-8">{children}</div>
        ) : (
          children
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
