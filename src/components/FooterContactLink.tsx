"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { FOOTER_CONTACT_ANCHOR_ID } from "@/lib/site";

export type FooterContactLinkProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Enlaza al formulario «Contáctanos» del pie (`#contacto` en `SiteFooter`), con scroll suave.
 * No cambia de ruta: mantiene la página actual y actualiza el hash.
 */
export function FooterContactLink({ className, style, children }: FooterContactLinkProps) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(FOOTER_CONTACT_ANCHOR_ID);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const { pathname, search } = window.location;
      window.history.replaceState(null, "", `${pathname}${search}#${FOOTER_CONTACT_ANCHOR_ID}`);
    }
  };

  return (
    <a href={`#${FOOTER_CONTACT_ANCHOR_ID}`} className={className} style={style} onClick={onClick}>
      {children}
    </a>
  );
}
