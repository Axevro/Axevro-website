import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ScrollToTop,
  Header,
  SeoManager,
  WhatsAppFloat,
  ErrorBoundary,
  SkipToContent,
} from './components/layout'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import ProcessDetail from './pages/ProcessDetail'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import Pricing from './pages/Pricing'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import CookiesPolicy from './pages/CookiesPolicy'
import NotFound from './pages/NotFound'
import { pageTransition } from './lib/motion'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        exit={pageTransition.exit}
        transition={pageTransition.transition}
      >
        <ErrorBoundary key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/process/:slug" element={<ProcessDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <SkipToContent />
        <SeoManager />
        <ScrollToTop />
        <Header />
        <AnimatedRoutes />
        <WhatsAppFloat />
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
