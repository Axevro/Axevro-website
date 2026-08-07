import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getServiceBySlug, services } from '../data/services'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return <Navigate to="/#services" replace />
  }

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-black pt-16 pb-20 text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(700px 280px at 10% 0%, rgba(74,222,128,0.16), transparent 55%), radial-gradient(520px 240px at 90% 20%, rgba(201,162,39,0.14), transparent 50%)',
            }}
          />
          <div className="relative z-[1] mx-auto max-w-[1180px] px-6 md:px-8">
            <Link
              to="/#services"
              className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs tracking-[1.2px] text-green-bright uppercase transition-colors hover:text-gold-bright"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to services
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-xs text-gold-bright">{service.num}</span>
                <span className="inline-flex h-10 w-10 items-center justify-center border border-green-bright/30 bg-green-bright/10 text-green-bright">
                  <span className="material-symbols-outlined text-[22px]">
                    {service.icon}
                  </span>
                </span>
              </div>
              <h1 className="font-display max-w-3xl text-[clamp(34px,5vw,56px)] leading-[1.08] font-semibold tracking-[-1.2px]">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-[1.65] text-[#A8ACB4]">
                {service.hero}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-[2px] border border-gold bg-gold px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-gold-bright"
                >
                  Start a Project
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-[2px] border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-green-bright hover:text-green-bright"
                >
                  Talk to us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-[88px]">
          <div className="mx-auto grid max-w-[1180px] gap-14 px-6 md:grid-cols-[1.2fr_0.8fr] md:px-8">
            <div>
              <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
                <span className="block h-[1.5px] w-[22px] bg-[linear-gradient(90deg,var(--color-gold),var(--color-green))]" />
                Overview
              </div>
              <h2 className="font-display text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.6px]">
                What you get
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-[1.75] text-gray">
                {service.overview}
              </p>

              <ul className="mt-8 space-y-3.5">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] text-ink-soft"
                  >
                    <span className="material-symbols-outlined mt-0.5 text-[20px] text-green">
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="border border-line bg-bg-alt p-7">
              <h3 className="font-display text-lg font-semibold">How we deliver</h3>
              <ol className="mt-5 space-y-4">
                {service.process.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-mono text-xs text-green">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-line pt-6">
                <div className="mb-3 font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                  Typical stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-green/25 bg-white px-3 py-1.5 text-xs font-medium text-green-deep"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-t border-line bg-bg-alt py-[88px]">
          <div className="mx-auto max-w-[1180px] px-6 md:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <div className="mb-3 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
                  <span className="block h-[1.5px] w-[22px] bg-green" />
                  More services
                </div>
                <h2 className="font-display text-[clamp(24px,3vw,34px)] font-semibold">
                  Explore related capabilities
                </h2>
              </div>
              <Link
                to="/#services"
                className="hidden text-sm font-semibold text-green-deep sm:inline-flex"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/services/${item.slug}`}
                  className="group border border-line bg-white p-6 transition-colors hover:border-green/35 hover:bg-white"
                >
                  <span className="material-symbols-outlined text-[22px] text-green">
                    {item.icon}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-semibold group-hover:text-green-deep">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black py-20 text-center text-white">
          <div className="mx-auto max-w-[720px] px-6">
            <h2 className="font-display text-[clamp(28px,4vw,40px)] font-semibold">
              Ready to start your{' '}
              <span className="text-accent-gradient-bright">{service.title}</span>{' '}
              project?
            </h2>
            <p className="mt-4 text-[#9BA0A8]">
              Tell us what you are building — most quotes go out within 48 hours.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex rounded-[2px] bg-gold px-8 py-4 text-sm font-bold text-black transition-colors hover:bg-gold-bright"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
