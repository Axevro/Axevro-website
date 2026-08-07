import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'DevOps', to: '/#devops' },
  { label: 'Portfolio', to: '/#portfolio' },
  { label: 'Process', to: '/#process' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const resolveTo = (to) => {
    if (to === '/') return '/'
    if (isHome && to.startsWith('/#')) return to.slice(1)
    return to
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/94 backdrop-blur-[10px]">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px opacity-50"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-gold) 45%, var(--color-green) 55%, transparent)',
        }}
      />
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-[18px] md:px-8">
        <Link
          to="/"
          aria-label="Axevro home"
          style={{ display: 'inline-block', width: 'max-content', lineHeight: 0 }}
        >
          <Logo size="sm" />
        </Link>

        <div className="hidden items-center gap-6 text-[14.5px] font-medium text-ink-soft lg:gap-[28px] md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={resolveTo(link.to)}
              className="relative py-1 transition-colors hover:text-green"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden rounded-[2px] border border-black bg-black px-[22px] py-[11px] text-sm font-semibold text-white transition-all hover:border-green hover:bg-green hover:text-white md:inline-flex"
        >
          Get a Quote
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-[2px] border border-line p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[22px]">
            {open ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={resolveTo(link.to)}
                  onClick={() => setOpen(false)}
                  className="py-2 text-[15px] font-medium text-ink-soft"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-[2px] bg-black px-5 py-3 text-sm font-semibold text-white"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
