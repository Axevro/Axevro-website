import LegalPage from '../components/LegalPage'
import { legalPages } from '../data/legal'

export default function CookiesPolicy() {
  return <LegalPage page={legalPages.cookies} />
}
