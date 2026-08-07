import LegalPage from '../components/LegalPage'
import { legalPages } from '../data/legal'

export default function TermsAndConditions() {
  return <LegalPage page={legalPages.terms} />
}
