import type { Metadata } from "next";
import { CulturaDigitalTirasClient } from "./CulturaDigitalTirasClient";

export const metadata: Metadata = {
  title: "Cultura Digital · Tiras",
  description:
    "Treinta y seis miradas sobre algoritmos, privacidad, desinformación, ciudadanía digital y prácticas conscientes en línea.",
};

export default function Page() {
  return <CulturaDigitalTirasClient />;
}
