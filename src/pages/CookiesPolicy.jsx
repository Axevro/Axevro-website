import { LegalPage } from '../components/layout'
import { legalPages } from '../data/legal'

export default function CookiesPolicy() {
  return <LegalPage page={legalPages.cookies} />
}
