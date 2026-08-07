import { Link } from 'react-router-dom'
import Logo from './Logo'

const quickLinks = [
  { label: 'About Us', to: '/#about' },
  { label: 'Portfolio', to: '/#portfolio' },
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
  { label: 'Testimonials', to: '/#testimonials' },
  { label: 'Contact', to: '/contact' },
  { label: 'Get a Quote', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line-dark bg-black pt-[70px] text-white">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-6 pb-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,1fr)] md:px-8">
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
            href="mailto:hello@axevro.com"
            className="mb-3 block text-sm text-[#9BA0A8] transition-colors hover:text-green-bright"
          >
            hello@axevro.com
          </a>
          <a
            href="tel:+10000000000"
            className="mb-3 block text-sm text-[#9BA0A8] transition-colors hover:text-green-bright"
          >
            +1 (000) 000-0000
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

      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 border-t border-line-dark px-6 py-6 text-[13px] text-[#63676F] md:px-8">
        <div>© 2026 Axevro. All rights reserved.</div>
        <div className="flex flex-wrap gap-2">
          <Link to="/#cta" className="hover:text-white">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link to="/#cta" className="hover:text-white">
            Terms &amp; Conditions
          </Link>
          <span>·</span>
          <Link to="/#cta" className="hover:text-white">
            Cookies Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
