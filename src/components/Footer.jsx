import { Link } from 'react-router-dom'
import Logo from './Logo'
import { getWhatsAppUrl } from '../data/contact'

const quickLinks = [
  { label: 'About Us', to: '/#about' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'DevOps', to: '/#devops' },
  { label: 'Process', to: '/#process' },
]

const serviceLinks = [
  { label: 'Web Development', to: '/services/web-development' },
  { label: 'Authentication', to: '/services/authentication' },
  { label: 'SEO', to: '/services/seo' },
  { label: 'Cloud & DevOps', to: '/services/cloud-devops' },
]

const companyLinks = [
  { label: 'Stack', to: '/#stack' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
  { label: 'Get a Quote', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line-dark bg-black pt-14 text-white sm:pt-[70px]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-4 pb-12 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:pb-14 lg:grid-cols-[1.6fr_repeat(4,1fr)] md:px-8">
        <div>
          <Link to="/" aria-label="Axevro home">
            <Logo size="md" inverted />
          </Link>
          <p className="mt-3.5 max-w-[260px] text-sm leading-[1.6] text-[#9BA0A8]">
            Building digital excellence — web, mobile, cloud, and product
            engineering for teams that ship.
          </p>
        </div>

        <div>
          <h4 className="mb-[18px] font-mono text-xs tracking-[1px] text-gold-bright uppercase">
            Quick Links
          </h4>
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="mb-3 block text-sm text-[#9BA0A8] transition-colors hover:text-green-bright"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="mb-[18px] font-mono text-xs tracking-[1px] text-gold-bright uppercase">
            Services
          </h4>
          {serviceLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="mb-3 block text-sm text-[#9BA0A8] transition-colors hover:text-green-bright"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="mb-[18px] font-mono text-xs tracking-[1px] text-gold-bright uppercase">
            Company
          </h4>
          {companyLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="mb-3 block text-sm text-[#9BA0A8] transition-colors hover:text-green-bright"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 className="mb-[18px] font-mono text-xs tracking-[1px] text-gold-bright uppercase">
            Contact
          </h4>
          <a
            href="mailto:axevro9@gmail.com"
            className="mb-3 block text-sm font-medium text-green-bright transition-colors hover:text-gold-bright hover:underline"
          >
            axevro9@gmail.com
          </a>
          <a
            href="tel:+917084788119"
            className="mb-3 block text-sm font-medium text-green-bright transition-colors hover:text-gold-bright hover:underline"
          >
            7084788119
            <span className="ml-2 font-mono text-[10px] tracking-[1px] text-gold-bright/80 uppercase">
              Primary
            </span>
          </a>
          <a
            href="tel:+919693174749"
            className="mb-3 block text-sm font-medium text-green-bright transition-colors hover:text-gold-bright hover:underline"
          >
            9693174749
          </a>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#25D366] transition-colors hover:text-[#1ebe57] hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            WhatsApp
          </a>
          <Link
            to="/contact"
            className="mb-3 inline-flex items-center gap-1 text-sm text-[#9BA0A8] transition-colors hover:text-green-bright"
          >
            Get in Touch
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 border-t border-line-dark px-4 py-5 text-[12.5px] text-[#63676F] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6 sm:py-6 sm:text-[13px] md:px-8">
        <div>© 2026 Axevro. All rights reserved.</div>
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <Link to="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link to="/terms-and-conditions" className="hover:text-white">
            Terms &amp; Conditions
          </Link>
          <span className="hidden sm:inline">·</span>
          <Link to="/cookies-policy" className="hover:text-white">
            Cookies Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
