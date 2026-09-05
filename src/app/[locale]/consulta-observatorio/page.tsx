import { ConsultaObservatorioLive } from "@/components/consulta-observatorio/ConsultaObservatorioLive";

export default function ConsultaObservatorioLocalePage() {
  return (
    <main id="contenido-principal" tabIndex={-1} className="flex h-full min-h-screen w-full min-w-0 flex-1 flex-col">
      <ConsultaObservatorioLive />
    </main>
  );
}
