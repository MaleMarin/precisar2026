import { Sidebar } from './Sidebar'

export type PlataformaScrollMode = 'viewport' | 'document'

type PlataformaLayoutProps = {
  children: React.ReactNode
  /**
   * viewport: contenido principal con scroll propio (cursos dentro del panel).
   * document: el bloque crece con el contenido y hace scroll el documento/chrome (Saberes/Clic hero + footer debajo).
   */
  scrollMode?: PlataformaScrollMode
}

export function PlataformaLayout({
  children,
  scrollMode = 'viewport',
}: PlataformaLayoutProps) {
  const isDoc = scrollMode === 'document'

  return (
    <div
      className={`flex flex-col overflow-x-hidden bg-[var(--fondo)] ${isDoc ? 'min-h-[100dvh] min-w-0 w-full shrink-0' : 'min-h-0 min-w-0 flex-1'}`}
    >
      <Sidebar />
      <main
        className={[
          'ml-[180px] box-border flex min-w-0 flex-col',
          'w-[calc(100vw-180px)] max-w-[calc(100vw-180px)] overflow-x-hidden',
          isDoc
            ? 'min-h-0 min-w-0 flex-1 overflow-y-visible bg-[#f5f2ec]'
            : 'min-h-0 flex-1 overflow-y-auto',
        ].join(' ')}
      >
        {children}
      </main>
    </div>
  )
}
