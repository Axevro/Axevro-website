import { LegalPage } from '../components/layout'
import { legalPages } from '../data/legal'

export default function TermsAndConditions() {
  return <LegalPage page={legalPages.terms} />
}
