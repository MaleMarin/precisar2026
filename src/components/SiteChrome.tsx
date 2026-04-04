"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./SiteChrome.module.css";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioHome = pathname === "/";

  return (
    <>
      {!isStudioHome ? <SiteHeader /> : null}
      <main className={isStudioHome ? styles.mainHome : styles.mainDefault}>{children}</main>
      {!isStudioHome ? <SiteFooter /> : null}
    </>
  );
}
