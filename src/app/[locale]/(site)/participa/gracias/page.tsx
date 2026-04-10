import Link from "next/link";
import { ThanksTemplate } from "@/components/templates/PageTemplates";

export const metadata = { title: "Gracias" };

export default function Page() {
  return (
    <ThanksTemplate title="Gracias" kicker="Participa">
      <p>Muchas gracias por escribirnos. Te respondemos a la brevedad.</p>
      <p>
        <Link href="/" className="text-[var(--accent)]">
          Volver al inicio
        </Link>
        {" · "}
        <Link href="/participa" className="text-[var(--accent)]">
          Participa
        </Link>
      </p>
    </ThanksTemplate>
  );
}
