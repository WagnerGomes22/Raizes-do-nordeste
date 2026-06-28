import LegalContentPage from '@/components/legal/LegalContentPage'
import { termosUsoContent } from '@/data/legalContent'

export default function TermosUsoPage() {
  return (
    <LegalContentPage
      breadcrumbLabel="Termos de Uso"
      title={termosUsoContent.title}
      description={termosUsoContent.description}
      lastUpdated={termosUsoContent.lastUpdated}
      sections={termosUsoContent.sections}
    />
  )
}
