import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from './Footer'
import PageHero from '../ui/PageHero'
import LinkedText from '../ui/LinkedText'

const relatedLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Cookies Policy', to: '/cookies-policy' },
]

export default function LegalPage({ page }) {
  const { title, updated, intro, sections, slug } = page

  return (
    <>
      <main id="main-content">
        <PageHero
          eyebrow="Legal"
          title={title}
          description={intro}
        />

        <section className="py-12 sm:py-16 md:py-[88px]">
          <div className="mx-auto grid max-w-[1180px] gap-8 px-4 sm:gap-10 sm:px-6 md:grid-cols-[minmax(0,1fr)_260px] md:gap-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="panel min-w-0 p-4 sm:p-7 md:p-8"
            >
              <p className="mb-8 font-mono text-[12px] tracking-[0.4px] text-gray">
                Last updated: {updated}
              </p>

              <div className="space-y-8 sm:space-y-10">
                {sections.map((section, index) => (
                  <motion.section
                    key={section.heading}
                    className="scroll-mt-28"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                  >
                    <h2 className="font-display break-words text-[clamp(18px,2.5vw,24px)] font-semibold tracking-[-0.3px] text-ink">
                      {section.heading}
                    </h2>
                    {section.body?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-3 break-words text-[14.5px] leading-[1.75] text-gray sm:text-[15px]"
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
                  </motion.section>
                ))}
              </div>

              <div className="mt-10 border-t border-line pt-8 sm:mt-12">
                <p className="text-sm text-gray">
                  Need help or have a privacy request?{' '}
                  <Link
                    to="/contact#contact"
                    className="font-semibold text-green-deep transition-colors hover:text-green"
                  >
                    Contact Axevro →
                  </Link>
                </p>
              </div>
            </motion.article>

            <aside className="min-w-0 md:sticky md:top-[88px] md:self-start">
              <div className="panel-soft p-5 sm:p-6">
                <h3 className="font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                  Legal pages
                </h3>
                <nav className="mt-4 flex flex-col gap-1.5">
                  {relatedLinks.map((link) => {
                    const active = link.to.includes(slug)
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`rounded-[2px] px-3 py-3 text-sm transition-colors ${
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
                    to="/contact#contact"
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
