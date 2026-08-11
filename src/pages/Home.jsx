import {
  Hero,
  TrustBar,
  TrustedBy,
  Overview,
  Services,
  WhyChoose,
  Technologies,
  CloudDevOps,
  Process,
  PricingPreview,
  Projects,
  Testimonials,
  CTA,
} from '../components/sections'
import { Footer } from '../components/layout'

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <TrustBar />
        <TrustedBy />
        <Overview />
        <Services />
        <WhyChoose />
        <Technologies />
        <CloudDevOps />
        <Process />
        <PricingPreview />
        <Projects />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
