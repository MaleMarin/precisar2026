import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { PageShell } from "@/components/PageShell";
import { PdfCoverDownload } from "@/components/PdfCoverDownload";
import { PDF_DOWNLOAD_UI } from "@/lib/pdfDownloads";
import styles from "./PropuestaPolitica.module.css";

const CONTENT_DIR = path.join(process.cwd(), "src/content/propuesta-politica-alfabetizacion");
const CONTENT_FILES = [
  "1-intro-objetivos-marco-c1.md",
  "2-competencias-2-3-4.md",
  "3-implementacion-fin.md",
] as const;

export const metadata: Metadata = {
  title: "Propuesta de Política de Alfabetización Mediática y Digital",
  description:
    "Marco de competencias, objetivos estratégicos, implementación sectorial y llamado a la acción de Precisar para la alfabetización mediática en la sociedad digital.",
};

async function loadPolicyMarkdown(): Promise<string> {
  const chunks = await Promise.all(
    CONTENT_FILES.map((name) => readFile(path.join(CONTENT_DIR, name), "utf8")),
  );
  return chunks.join("\n\n");
}

export default async function PropuestaPoliticaAlfabetizacionPage() {
  const markdown = await loadPolicyMarkdown();

  return (
    <PageShell
      title="Propuesta de Política de Alfabetización Mediática y Digital"
      kicker="Educación mediática"
      bare
    >
      <div className={`prec-container ${styles.wrap}`}>
        <p className={styles.lead}>
          Documento de política pública y marco de competencias para promover la alfabetización mediática e
          informacional en contextos digitales contemporáneos.
        </p>

        <div className={styles.markdown}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>

        <PdfCoverDownload
          pdfHref={PDF_DOWNLOAD_UI.propuestaPoliticaAlfabetizacion.href}
          preview={PDF_DOWNLOAD_UI.propuestaPoliticaAlfabetizacion.preview}
          coverSrc={PDF_DOWNLOAD_UI.propuestaPoliticaAlfabetizacion.coverSrc}
          coverAlt={PDF_DOWNLOAD_UI.propuestaPoliticaAlfabetizacion.coverAlt}
          description="Descarga la versión completa en PDF para compartir en instituciones, talleres o espacios de conversación."
          ctaLabel="Descargar PDF"
          compact
          className={styles.pdfDownloadWrap}
        />
      </div>
    </PageShell>
  );
}
