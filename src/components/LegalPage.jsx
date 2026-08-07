import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LinkedText from './LinkedText'

const relatedLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Cookies Policy', to: '/cookies-policy' },
]

export default function LegalPage({ page }) {
  const { title, updated, intro, sections, slug } = page

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-black pt-14 pb-14 text-white sm:pt-16 sm:pb-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(700px 280px at 10% 0%, rgba(74,222,128,0.16), transparent 55%), radial-gradient(520px 240px at 90% 20%, rgba(201,162,39,0.14), transparent 50%)',
            }}
          />
          <div className="relative z-[1] mx-auto max-w-[1180px] px-5 sm:px-6 md:px-8">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[1.2px] text-green-bright uppercase transition-colors hover:text-gold-bright sm:mb-8 sm:text-xs"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-3 flex items-center gap-2.5 font-mono text-[11px] tracking-[1.5px] text-gold-bright uppercase sm:mb-4 sm:text-xs">
                <span className="block h-[1.5px] w-[22px] bg-gold-bright" />
                Legal
              </div>
              <h1 className="font-display max-w-3xl text-[clamp(30px,6vw,52px)] leading-[1.1] font-semibold tracking-[-1px]">
                {title}
              </h1>
              <p className="mt-3 font-mono text-[12px] tracking-[0.4px] text-[#9BA0A8] sm:mt-4">
                Last updated: {updated}
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-[#A8ACB4] sm:mt-5 sm:text-base sm:leading-[1.65]">
                {intro}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-[88px]">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-6 md:grid-cols-[minmax(0,1fr)_260px] md:gap-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="min-w-0"
            >
              <div className="space-y-8 sm:space-y-10">
                {sections.map((section) => (
                  <section key={section.heading} className="scroll-mt-28">
                    <h2 className="font-display text-[clamp(18px,2.5vw,24px)] font-semibold tracking-[-0.3px] text-ink">
                      {section.heading}
                    </h2>
                    {section.body?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-3 text-[14.5px] leading-[1.75] text-gray sm:text-[15px]"
                      >
                        <LinkedText text={paragraph} />
                      </p>
                    ))}
                    {section.list?.length > 0 && (
                      <ul className="mt-4 space-y-2.5 border-l-2 border-green/25 pl-4 sm:pl-5">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-[14.5px] leading-[1.65] text-ink-soft sm:text-[15px]"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                            <span>
                              <LinkedText text={item} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.bodyAfter?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-3 text-[14.5px] leading-[1.75] text-gray sm:text-[15px]"
                      >
                        <LinkedText text={paragraph} />
                      </p>
                    ))}
                  </section>
                ))}
              </div>

              <div className="mt-10 border-t border-line pt-8 sm:mt-12">
                <p className="text-sm text-gray">
                  Need help or have a privacy request?{' '}
                  <Link
                    to="/contact"
                    className="font-semibold text-green-deep transition-colors hover:text-green"
                  >
                    Contact Axevro →
                  </Link>
                </p>
              </div>
            </motion.article>

            <aside className="md:sticky md:top-28 md:self-start">
              <div className="border border-line bg-bg-alt p-5 sm:p-6">
                <h3 className="font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                  Legal pages
                </h3>
                <nav className="mt-4 flex flex-col gap-2.5">
                  {relatedLinks.map((link) => {
                    const active = link.to.includes(slug)
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`rounded-[2px] px-3 py-2.5 text-sm transition-colors ${
                          active
                            ? 'bg-green/10 font-semibold text-green-deep'
                            : 'text-ink-soft hover:bg-white hover:text-green'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-6 border-t border-line pt-5">
                  <Link
                    to="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green"
                  >
                    Contact us
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
