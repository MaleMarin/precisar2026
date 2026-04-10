"use client";

import { useEffect } from "react";
import { FOOTER_CONTACT_ANCHOR_ID } from "@/lib/site";

/** Al visitar /contacto, baja al formulario del pie sin redirigir a otra ruta. */
export function ContactoScrollClient() {
  useEffect(() => {
    const el = document.getElementById(FOOTER_CONTACT_ANCHOR_ID);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    const { pathname, search } = window.location;
    window.history.replaceState(null, "", `${pathname}${search}#${FOOTER_CONTACT_ANCHOR_ID}`);
  }, []);
  return null;
}
