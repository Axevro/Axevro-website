import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import FooterSocialLinks from './FooterSocialLinks'

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
  { label: 'Portfolio', to: '/#portfolio' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact#contact' },
]

function FooterHeading({ children }) {
  return (
    <h4 className="mb-4 font-mono text-[11px] tracking-[1.2px] text-gold-bright uppercase sm:mb-[18px] sm:text-xs">
      {children}
    </h4>
  )
}

function FooterNavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block py-1.5 text-[14px] leading-snug text-[#9BA0A8] transition-colors hover:text-green-bright sm:mb-1 sm:py-1 sm:text-sm"
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-line-dark bg-black pt-12 text-white sm:pt-14 md:pt-[70px]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-9 px-4 pb-10 min-[480px]:grid-cols-2 sm:gap-10 sm:px-6 sm:pb-12 md:px-8 lg:grid-cols-[1.55fr_repeat(4,1fr)] lg:gap-8 lg:pb-14">
        <div className="min-[480px]:col-span-2 lg:col-span-1">
          <Link to="/" aria-label="Axevro home" className="inline-block">
            <Logo size="md" inverted />
          </Link>
          <p className="mt-3.5 max-w-[300px] text-[13.5px] leading-[1.65] text-[#9BA0A8] sm:text-sm sm:leading-[1.6]">
            Building digital excellence — web, mobile, cloud, and product
            engineering for teams that ship.
          </p>
        </div>

        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <nav className="flex flex-col" aria-label="Quick links">
            {quickLinks.map((item) => (
              <FooterNavLink key={item.label} to={item.to}>
                {item.label}
              </FooterNavLink>
            ))}
          </nav>
        </div>

        <div>
          <FooterHeading>Services</FooterHeading>
          <nav className="flex flex-col" aria-label="Services">
            {serviceLinks.map((item) => (
              <FooterNavLink key={item.label} to={item.to}>
                {item.label}
              </FooterNavLink>
            ))}
          </nav>
        </div>

        <div>
          <FooterHeading>Company</FooterHeading>
          <nav className="flex flex-col" aria-label="Company">
            {companyLinks.map((item) => (
              <FooterNavLink key={item.label} to={item.to}>
                {item.label}
              </FooterNavLink>
            ))}
          </nav>
        </div>

        <div className="min-w-0 min-[480px]:col-span-2 lg:col-span-1">
          <FooterHeading>Contact</FooterHeading>
          <div className="flex flex-col gap-1">
            <a
              href="mailto:axevro9@gmail.com"
              className="break-all py-1.5 text-[14px] font-medium text-green-bright transition-colors hover:text-gold-bright hover:underline sm:text-sm"
            >
              axevro9@gmail.com
            </a>
            <a
              href="tel:+917084788119"
              className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 py-1.5 text-[14px] font-medium text-green-bright transition-colors hover:text-gold-bright hover:underline sm:text-sm"
            >
              <span>7084788119</span>
              <span className="font-mono text-[10px] tracking-[1px] text-gold-bright/80 uppercase">
                Phone
              </span>
            </a>
          </div>

          <FooterSocialLinks />
          <Link
            to="/contact#contact"
            className="mt-3 inline-flex min-h-11 w-fit max-w-full items-center gap-1.5 text-[13.5px] font-medium text-[#9BA0A8] transition-colors hover:text-green-bright sm:mt-4"
          >
            Get in Touch
            <span className="material-symbols-outlined text-[16px]" aria-hidden>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 border-t border-line-dark px-4 pt-5 pb-[calc(6rem+env(safe-area-inset-bottom))] text-[12.5px] leading-relaxed text-[#63676F] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-6 sm:pt-6 sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:text-[13px] md:px-8 md:pb-10">
        <div className="pr-14 sm:pr-28 md:pr-0">© 2026 Axevro. All rights reserved.</div>
        <nav
          className="flex max-w-full flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2"
          aria-label="Legal"
        >
          <Link
            to="/privacy-policy"
            className="inline-flex min-h-11 w-fit items-center transition-colors hover:text-white"
          >
            Privacy Policy
          </Link>
          <span className="hidden text-[#4a4e56] sm:inline" aria-hidden>
            ·
          </span>
          <Link
            to="/terms-and-conditions"
            className="inline-flex min-h-11 w-fit items-center transition-colors hover:text-white"
          >
            Terms &amp; Conditions
          </Link>
          <span className="hidden text-[#4a4e56] sm:inline" aria-hidden>
            ·
          </span>
          <Link
            to="/cookies-policy"
            className="inline-flex min-h-11 w-fit items-center transition-colors hover:text-white"
          >
            Cookies Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
