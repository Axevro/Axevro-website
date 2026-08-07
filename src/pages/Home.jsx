import Hero from '../components/Hero'
import TrustedBy from '../components/TrustedBy'
import Overview from '../components/Overview'
import Services from '../components/Services'
import WhyChoose from '../components/WhyChoose'
import Technologies from '../components/Technologies'
import CloudDevOps from '../components/CloudDevOps'
import Process from '../components/Process'
import PricingPreview from '../components/PricingPreview'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <main>
        <Hero />
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
