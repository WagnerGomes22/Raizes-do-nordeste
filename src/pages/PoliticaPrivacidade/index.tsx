import LegalContentPage from '@/components/legal/LegalContentPage'
import { politicaPrivacidadeContent } from '@/data/legalContent'

export default function PoliticaPrivacidadePage() {
  return (
    <LegalContentPage
      breadcrumbLabel="Política de Privacidade"
      title={politicaPrivacidadeContent.title}
      description={politicaPrivacidadeContent.description}
      lastUpdated={politicaPrivacidadeContent.lastUpdated}
      sections={politicaPrivacidadeContent.sections}
    />
  )
}
