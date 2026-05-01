import { notFound } from 'next/navigation'

import { LeccionPage } from '@/components/curso/LeccionPage'
import {
  encontrarCursoYPasoPorSlug,
  listarTodosLosPasosSlug,
} from '@/lib/cursos'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return listarTodosLosPasosSlug().map(slug => ({ slug }))
}

export default async function LeccionSlugPage({ params }: Props) {
  const { slug } = await params
  const hit = encontrarCursoYPasoPorSlug(slug)
  if (!hit) notFound()

  return (
    <LeccionPage
      key={slug}
      curso={hit.curso}
      pasoActual={hit.paso}
      pasoIndex={hit.pasoIndex}
    />
  )
}
