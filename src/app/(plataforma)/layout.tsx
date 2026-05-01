import { PlataformaLayout } from '@/components/layout/PlataformaLayout'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PlataformaLayout>{children}</PlataformaLayout>
}
