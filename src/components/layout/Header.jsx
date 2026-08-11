import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../ui/Logo'
import { easeOut } from '../../lib/motion'

const links = [
  { label: 'Home', to: '/', match: 'home' },
  { label: 'About', to: '/#about', match: 'about' },
  { label: 'Services', to: '/#services', match: 'services' },
  { label: 'Pricing', to: '/pricing', match: 'pricing' },
  { label: 'Process', to: '/#process', match: 'process' },
  { label: 'Contact', to: '/contact#contact', match: 'contact' },
]

const HOME_SECTION_IDS = [
  'home',
  'about',
  'services',
  'stack',
  'devops',
  'process',
  'pricing',
  'portfolio',
  'testimonials',
  'cta',
]

function resolveActiveMatch(pathname, hash, scrollSection) {
  if (pathname.startsWith('/pricing')) return 'pricing'
  if (pathname.startsWith('/contact')) return 'contact'
  if (pathname.startsWith('/services')) return 'services'
  if (pathname.startsWith('/process')) return 'process'
  if (
    pathname.startsWith('/privacy-policy') ||
    pathname.startsWith('/terms-and-conditions') ||
    pathname.startsWith('/cookies-policy')
  ) {
    return null
  }
  if (pathname !== '/') return null

  const section = (hash && hash.replace('#', '')) || scrollSection || 'home'

  const map = {
    home: 'home',
    about: 'about',
    services: 'services',
    devops: 'devops',
    process: 'process',
    pricing: 'pricing',
    stack: 'home',
    portfolio: 'home',
    testimonials: 'home',
    cta: 'home',
  }

  return map[section] ?? 'home'
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollSection, setScrollSection] = useState('home')
  const location = useLocation()
  const isHome = location.pathname === '/'

  const activeMatch = useMemo(
    () => resolveActiveMatch(location.pathname, location.hash, scrollSection),
    [location.pathname, location.hash, scrollSection],
  )

  const resolveTo = (to) => {
    if (to === '/') return '/'
    if (isHome && to.startsWith('/#')) return to.slice(1)
    return to
  }

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) {
      setScrollSection('home')
      return undefined
    }

    const nodes = HOME_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    )
    if (!nodes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setScrollSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-26% 0px -52% 0px',
        threshold: [0.1, 0.25, 0.4, 0.55],
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [isHome, location.pathname])

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-[100] w-full border-b transition-[background,box-shadow,border-color] duration-300 ${
          scrolled
            ? 'border-line bg-white/97 shadow-[0_10px_40px_rgba(10,11,13,0.08)] backdrop-blur-[14px]'
            : 'border-line/80 bg-white/92 shadow-[0_1px_0_rgba(10,11,13,0.04)] backdrop-blur-[12px]'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px opacity-60"
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--color-gold) 45%, var(--color-green) 55%, transparent)',
          }}
        />
        <nav className="relative z-10 mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 md:px-8">
          <Link
            to="/"
            aria-label="Axevro home"
            className="min-w-0 shrink"
            style={{ display: 'inline-block', width: 'max-content', lineHeight: 0 }}
            onClick={() => setOpen(false)}
          >
            <Logo
              size="sm"
              className="max-[380px]:origin-left max-[380px]:scale-[0.88]"
            />
          </Link>

          <div className="hidden items-center gap-0.5 text-[14px] font-medium lg:flex lg:text-[14.5px] xl:gap-1">
            {links.map((link) => {
              const active = activeMatch === link.match
              return (
                <Link
                  key={link.label}
                  to={resolveTo(link.to)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-2.5 py-1.5 transition-colors xl:px-3 ${
                    active ? 'text-green-deep' : 'text-ink-soft hover:text-green'
                  }`}
                >
                  <span className="relative z-[1]">{link.label}</span>
                  {active ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-x-1 inset-y-0 -z-0 rounded-[2px] bg-green/[0.08]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {active ? (
                    <motion.span
                      layoutId="nav-active-line"
                      className="absolute right-2.5 bottom-0 left-2.5 h-[2px] rounded-full bg-[linear-gradient(90deg,var(--color-gold),var(--color-green))]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className={`hidden rounded-[2px] border px-4 py-2.5 text-sm font-semibold transition-all sm:inline-flex lg:px-[22px] lg:py-[11px] ${
                  activeMatch === 'contact'
                    ? 'border-green bg-green text-white'
                    : 'border-black bg-black text-white hover:border-green hover:bg-green'
                }`}
              >
                Get a Quote
              </Link>
            </motion.div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-[2px] border border-line p-2 transition-colors hover:border-green/40 hover:bg-green/5 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <motion.span
                key={open ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -40 }}
                animate={{ opacity: 1, rotate: 0 }}
                className="material-symbols-outlined text-[22px]"
              >
                {open ? 'close' : 'menu'}
              </motion.span>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: easeOut }}
              className="relative z-10 max-h-[min(70vh,520px)] overflow-y-auto border-t border-line bg-white lg:hidden"
            >
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.045 } },
                }}
                className="flex flex-col gap-0.5 px-4 py-3 sm:px-6 sm:py-4"
              >
                {links.map((link) => {
                  const active = activeMatch === link.match
                  return (
                    <motion.div
                      key={link.label}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        show: { opacity: 1, x: 0 },
                      }}
                    >
                      <Link
                        to={resolveTo(link.to)}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`block rounded-[2px] px-3 py-2.5 text-[15px] font-medium transition-colors ${
                          active
                            ? 'bg-green/10 text-green-deep'
                            : 'text-ink-soft hover:bg-bg-alt hover:text-green'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          {link.label}
                          {active ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-green" />
                          ) : null}
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex w-full items-center justify-center rounded-[2px] bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green"
                  >
                    Get a Quote
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="h-16 shrink-0 sm:h-[72px]" aria-hidden="true" />
    </>
  )
}
