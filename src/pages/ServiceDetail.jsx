import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Footer } from '../components/layout'
import { PageHero } from '../components/ui'
import { getServiceBySlug, services } from '../data/services'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) {
    return <NotFound />
  }

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <>
      <main id="main-content">
        <PageHero
          eyebrow={`Service ${service.num}`}
          title={service.title}
          description={service.hero}
          backTo="/#services"
          backLabel="Back to services"
          actions={
            <>
              <Link to="/contact#contact" className="btn-primary">
                Start a Project
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
              <Link to="/pricing" className="btn-secondary-dark">
                View pricing
              </Link>
            </>
          }
        />

        <section className="py-14 sm:py-16 md:py-[88px]">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-4 sm:gap-12 sm:px-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-14 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="min-w-0"
            >
              <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
                <span
                  className="block h-[1.5px] w-[22px]"
                  style={{
                    background:
                      'linear-gradient(90deg, var(--color-gold), var(--color-green))',
                  }}
                />
                Overview
              </div>
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-green/20 bg-green/8 text-green">
                <span className="material-symbols-outlined text-[24px]">
                  {service.icon}
                </span>
              </div>
              <h2 className="font-display text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.6px]">
                What you get
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-gray sm:text-base">
                {service.overview}
              </p>

              <ul className="mt-8 space-y-3.5">
                {service.highlights.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 border border-transparent bg-bg-alt/60 px-3 py-3 text-[15px] text-ink-soft transition-colors hover:border-green/15"
                  >
                    <span className="material-symbols-outlined mt-0.5 text-[20px] text-green">
                      check_circle
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="panel-soft h-fit min-w-0 p-6 sm:p-7 md:sticky md:top-[88px]"
            >
              <h3 className="font-display text-lg font-semibold">How we deliver</h3>
              <ol className="mt-5 space-y-4">
                {service.process.map((step, index) => (
                  <li key={step} className="flex gap-3 border-b border-line pb-4 last:border-0 last:pb-0">
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
            </motion.aside>
          </div>
        </section>

        <section className="border-t border-line bg-bg-alt py-14 sm:py-16 md:py-[88px]">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
            <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
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
              {related.map((item, index) => (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    to={`/services/${item.slug}`}
                    className="group panel block h-full p-5 transition-all hover:border-green/35 hover:shadow-[0_14px_36px_rgba(10,11,13,0.06)] sm:p-6"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center border border-green/15 bg-green/5 text-green">
                      <span className="material-symbols-outlined text-[20px]">
                        {item.icon}
                      </span>
                    </span>
                    <h3 className="font-display mt-3 text-lg font-semibold group-hover:text-green-deep">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray">{item.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black py-14 pb-[calc(6rem+env(safe-area-inset-bottom))] text-center text-white sm:py-20 sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-20">
          <div className="pointer-events-none absolute inset-0 surface-glow opacity-80" />
          <div className="relative mx-auto max-w-[720px] px-4 sm:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-[clamp(24px,5.5vw,40px)] font-semibold"
            >
              Ready to start your{' '}
              <span className="text-accent-gradient-bright">{service.title}</span>{' '}
              project?
            </motion.h2>
            <p className="mt-4 text-[14.5px] text-[#9BA0A8] sm:text-base">
              Tell us what you are building — most quotes go out within 48 hours.
            </p>
            <Link to="/contact#contact" className="btn-primary mt-7 w-full sm:mt-8 sm:w-auto">
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
