import { notFound } from 'next/navigation'
import { LeccionAntesDeCompartirPage } from '@/components/curso/LeccionAntesDeCompartirPage'
import { LECCIONES_ADC } from '@/lib/cursos/leccionesAntesDeCompartir'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return LECCIONES_ADC.map(item => ({ slug: item.slug }))
}

export default async function LeccionPage({ params }: Props) {
  const { slug } = await params
  const existe = LECCIONES_ADC.some(item => item.slug === slug)
  if (!existe) notFound()

  return <LeccionAntesDeCompartirPage slug={slug} />
}
