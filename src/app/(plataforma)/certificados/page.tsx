import { TopBar } from '@/components/layout/TopBar'

export default function CertificadosPage() {
  return (
    <>
      <TopBar titulo="Certificados" userName="Demo" />
      <section className="p-6">
        <p style={{ color: 'rgba(0,0,0,0.6)' }}>
          Aqui apareceran certificados cuando conectemos el seguimiento de
          cursos.
        </p>
      </section>
    </>
  )
}
