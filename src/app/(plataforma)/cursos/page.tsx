import { TopBar } from '@/components/layout/TopBar'

export default function CursosPage() {
  return (
    <div className="flex flex-col">
      <TopBar titulo="Mis cursos" userName="Demo" />
      <div className="p-8">
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            lineHeight: 1.7,
            fontSize: '1.125rem',
            color: 'rgba(0,0,0,0.6)',
          }}
        >
          Cargando cursos...
        </p>
      </div>
    </div>
  )
}
