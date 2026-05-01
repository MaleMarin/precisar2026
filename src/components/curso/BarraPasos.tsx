'use client'

type BarraPasosProps = {
  pasoActual: number
  totalPasos: number
  colorCurso: string
}

export function BarraPasos({
  pasoActual,
  totalPasos,
  colorCurso,
}: BarraPasosProps) {
  const total = Array.from({ length: totalPasos }, (_, i) => i)

  return (
    <div className="flex items-center gap-2">
      <div className="hidden items-center gap-2 md:flex">
        {total.map(idx => {
          const paso = idx + 1
          const completo = paso < pasoActual
          const actual = paso === pasoActual

          if (completo) {
            return (
              <div
                key={paso}
                style={{ backgroundColor: colorCurso }}
                className="flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
              >
                ✓
              </div>
            )
          }

          if (actual) {
            return (
              <div
                key={paso}
                style={{ borderColor: colorCurso, color: colorCurso }}
                className="flex h-4 w-4 items-center justify-center rounded-full border-2 bg-white text-[9px] font-bold"
              >
                {paso}
              </div>
            )
          }

          return (
            <div key={paso} className="h-4 w-4 rounded-full bg-[#E8E4DC]" />
          )
        })}
      </div>

      <div className="block font-[var(--font-ui)] text-[0.72rem] uppercase tracking-[0.08em] text-[#999] md:hidden">
        Paso {pasoActual} de {totalPasos}
      </div>
    </div>
  )
}
