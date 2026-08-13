import { Link } from 'react-router-dom'
import { Footer } from '../components/layout'

export default function NotFound() {
  return (
    <>
      <main
        id="main-content"
        className="relative overflow-hidden bg-black px-4 py-20 text-center text-white sm:px-6 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(700px 320px at 50% 0%, rgba(31,157,85,0.18), transparent 55%), radial-gradient(520px 240px at 80% 100%, rgba(201,162,39,0.12), transparent 50%)',
          }}
        />
        <div className="relative mx-auto max-w-[560px]">
          <p className="font-mono text-[11px] tracking-[1.5px] text-gold-bright uppercase">
            Error 404
          </p>
          <h1 className="font-display mt-3 text-[clamp(28px,7vw,46px)] font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#A8ACB4] sm:text-base">
            The page you requested doesn&apos;t exist or may have moved. Use the
            links below to continue exploring Axevro.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link to="/" className="btn-primary w-full justify-center sm:w-auto">
              Back to home
            </Link>
            <Link
              to="/contact#contact"
              className="btn-secondary-dark w-full justify-center sm:w-auto"
            >
              Contact us
            </Link>
          </div>
          <nav
            className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-[#9BA0A8]"
            aria-label="Helpful links"
          >
            <Link
              to="/careers"
              className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-gold-bright"
            >
              Careers
            </Link>
            <Link
              to="/pricing"
              className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-gold-bright"
            >
              Pricing
            </Link>
            <Link
              to="/#services"
              className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-gold-bright"
            >
              Services
            </Link>
            <Link
              to="/#portfolio"
              className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-gold-bright"
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-gold-bright"
            >
              Contact
            </Link>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  )
}
