import type { Metadata } from "next";
import { SentidosDigitalesLandingClient } from "./SentidosDigitalesLandingClient";

export const metadata: Metadata = {
  title: "Sentidos digitales",
  description:
    "Seis sentidos digitales: navegar con criterio, filtrar información, límites saludables y bienestar integral en pantalla.",
};

export default function Page() {
  return <SentidosDigitalesLandingClient />;
}
