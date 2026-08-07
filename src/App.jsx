import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import ProcessDetail from './pages/ProcessDetail'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import CookiesPolicy from './pages/CookiesPolicy'
import { easeOut } from './lib/motion'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.38, ease: easeOut }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/process/:slug" element={<ProcessDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <AnimatedRoutes />
      <WhatsAppFloat />
    </BrowserRouter>
  )
}

export default App
