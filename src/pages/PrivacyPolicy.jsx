import LegalPage from '../components/LegalPage'
import { legalPages } from '../data/legal'

export default function PrivacyPolicy() {
  return <LegalPage page={legalPages.privacy} />
}
