import { LegalPage } from '../components/layout'
import { legalPages } from '../data/legal'

export default function PrivacyPolicy() {
  return <LegalPage page={legalPages.privacy} />
}
