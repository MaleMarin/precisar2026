import { TopBar } from '@/components/layout/TopBar'

export default function PerfilPage() {
  return (
    <>
      <TopBar titulo="Mi perfil" userName="Demo" />
      <section className="p-6">
        <p style={{ color: 'rgba(0,0,0,0.6)' }}>
          Aqui ira tu perfil cuando lo conectemos a datos reales.
        </p>
      </section>
    </>
  )
}
