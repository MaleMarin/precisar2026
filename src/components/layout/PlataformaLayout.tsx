import { Sidebar } from './Sidebar'

type PlataformaLayoutProps = {
  children: React.ReactNode
}

export function PlataformaLayout({ children }: PlataformaLayoutProps) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden bg-[var(--fondo)]">
      <Sidebar />
      <main
        className="
        ml-[180px] box-border flex min-h-0 min-w-0 flex-1 flex-col
        w-[calc(100vw-180px)] max-w-[calc(100vw-180px)] overflow-x-hidden overflow-y-auto
      "
      >
        {children}
      </main>
    </div>
  )
}
