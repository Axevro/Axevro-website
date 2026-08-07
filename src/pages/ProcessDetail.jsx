import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { getProcessBySlug, processSteps } from '../data/process'

export default function ProcessDetail() {
  const { slug } = useParams()
  const step = getProcessBySlug(slug)

  if (!step) {
    return <Navigate to="/#process" replace />
  }

  const currentIndex = processSteps.findIndex((item) => item.slug === step.slug)
  const prev = currentIndex > 0 ? processSteps[currentIndex - 1] : null
  const next =
    currentIndex < processSteps.length - 1
      ? processSteps[currentIndex + 1]
      : null

  return (
    <>
      <main>
        <PageHero
          eyebrow={step.step}
          title={step.name}
          description={step.hero}
          backTo="/#process"
          backLabel="Back to process"
          actions={
            <>
              <Link to="/contact" className="btn-primary">
                Start this phase
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
              {next ? (
                <Link to={`/process/${next.slug}`} className="btn-secondary-dark">
                  Next: {next.name}
                </Link>
              ) : (
                <Link to="/contact" className="btn-secondary-dark">
                  Talk to us
                </Link>
              )}
            </>
          }
        />

        <section className="py-14 sm:py-16 md:py-[88px]">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-4 sm:gap-12 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:gap-14 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
                <span
                  className="block h-[1.5px] w-[22px]"
                  style={{
                    background:
                      'linear-gradient(90deg, var(--color-gold), var(--color-green))',
                  }}
                />
                Phase overview
              </div>

              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-green/20 bg-green/8 text-green">
                <span className="material-symbols-outlined text-[24px]">
                  {step.icon}
                </span>
              </div>

              <h2 className="font-display text-[clamp(26px,3vw,36px)] font-semibold tracking-[-0.6px]">
                What happens in this step
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-gray sm:text-base">
                {step.overview}
              </p>

              <h3 className="font-display mt-10 text-xl font-semibold">
                Key focus areas
              </h3>
              <ul className="mt-5 space-y-3">
                {step.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border border-transparent bg-bg-alt/70 px-3 py-3 text-[15px] text-ink-soft transition-colors hover:border-green/15"
                  >
                    <span className="material-symbols-outlined mt-0.5 text-[20px] text-green">
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="panel-soft h-fit p-6 sm:p-7 md:sticky md:top-[88px]"
            >
              <h3 className="font-display text-lg font-semibold">
                Typical activities
              </h3>
              <ol className="mt-5 space-y-4">
                {step.activities.map((activity, index) => (
                  <li
                    key={activity}
                    className="flex gap-3 border-b border-line pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-xs text-green">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">
                      {activity}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-line pt-6">
                <div className="mb-2 font-mono text-[11px] tracking-[1px] text-gold-deep uppercase">
                  Outcome
                </div>
                <p className="text-sm leading-relaxed text-ink-soft">{step.outcome}</p>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="border-t border-line py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="panel-soft overflow-hidden"
            >
              <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
                <div className="border-b border-line p-5 sm:p-7 md:border-r md:border-b-0 md:p-8">
                  <div className="mb-3 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
                    <span
                      className="block h-[1.5px] w-[22px]"
                      style={{
                        background:
                          'linear-gradient(90deg, var(--color-gold), var(--color-green))',
                      }}
                    />
                    Engagement
                  </div>
                  <h2 className="font-display text-[clamp(24px,3.2vw,34px)] font-semibold tracking-[-0.6px]">
                    Introductory &amp; tailored proposals
                  </h2>
                  <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.75] text-gray sm:text-[15px]">
                    Axevro currently offers introductory pricing while we build
                    our client portfolio. See published starting points on our{' '}
                    <Link
                      to="/pricing"
                      className="font-semibold text-green-deep underline-offset-2 hover:underline"
                    >
                      pricing page
                    </Link>
                    , or request a custom proposal for your scope.
                  </p>

                  {step.elevatedCharges ? (
                    <div className="mt-6 border border-green/25 bg-green/5 p-4 sm:p-5">
                      <div className="mb-2 flex items-center gap-2 font-mono text-[11px] tracking-[1px] text-green-deep uppercase">
                        <span className="material-symbols-outlined text-[18px] text-green">
                          priority_high
                        </span>
                        Deployment note
                      </div>
                      <p className="text-[14px] leading-[1.7] text-ink-soft sm:text-[14.5px]">
                        For the{' '}
                        <strong className="font-semibold text-ink">
                          CI/CD &amp; Cloud Deployment
                        </strong>{' '}
                        phase, charges are listed separately and are typically
                        higher than development-only work — reflecting
                        containerization, pipelines, cloud architecture, and
                        production release ownership.
                      </p>
                    </div>
                  ) : (
                    <p className="mt-5 text-[14px] leading-[1.7] text-ink-soft sm:text-[14.5px]">
                      Deployment is priced as its own line item on our{' '}
                      <Link
                        to="/pricing"
                        className="font-semibold text-green-deep underline-offset-2 hover:underline"
                      >
                        pricing page
                      </Link>
                      . The{' '}
                      <Link
                        to="/process/cicd-cloud-deployment"
                        className="font-semibold text-green-deep underline-offset-2 hover:underline"
                      >
                        CI/CD &amp; Cloud Deployment
                      </Link>{' '}
                      phase generally carries higher charges than other stages.
                    </p>
                  )}
                </div>

                <div className="flex flex-col justify-between gap-6 p-5 sm:p-7 md:p-8">
                  <ul className="space-y-3.5">
                    {[
                      'Introductory rates while we grow our portfolio',
                      'Development and deployment shown separately',
                      'Final quote confirmed before work begins',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[14px] text-ink-soft sm:text-[14.5px]"
                      >
                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-green">
                          check_circle
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/pricing"
                      className="inline-flex items-center justify-center gap-2 border border-line bg-white px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-green/40 hover:text-green-deep"
                    >
                      View pricing
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-black px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green"
                    >
                      Request a proposal
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-line bg-bg-alt py-14 sm:py-16">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-3 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
                  <span className="block h-[1.5px] w-[22px] bg-green" />
                  Process map
                </div>
                <h2 className="font-display text-[clamp(24px,3vw,34px)] font-semibold">
                  Continue through the delivery path
                </h2>
              </div>
              <Link
                to="/#process"
                className="text-sm font-semibold text-green-deep hover:text-green"
              >
                View all steps →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {processSteps.map((item, index) => {
                const active = item.slug === step.slug
                return (
                  <motion.div
                    key={item.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                  >
                    <Link
                      to={`/process/${item.slug}`}
                      className={`panel block p-4 transition-all hover:-translate-y-0.5 hover:border-green/35 ${
                        active ? 'border-green/40 bg-green/5' : ''
                      }`}
                    >
                      <div className="font-mono text-[11px] text-gold-deep">
                        {item.step}
                      </div>
                      <div className="font-display mt-2 text-sm font-semibold leading-snug">
                        {item.name}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {prev ? (
                <Link
                  to={`/process/${prev.slug}`}
                  className="inline-flex items-center justify-center gap-2 border border-line bg-white px-4 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-green/30 hover:text-green"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_back
                  </span>
                  Previous: {prev.name}
                </Link>
              ) : null}
              {next ? (
                <Link
                  to={`/process/${next.slug}`}
                  className="inline-flex items-center justify-center gap-2 border border-green/25 bg-green/8 px-4 py-3 text-sm font-semibold text-green-deep transition-colors hover:bg-green/15"
                >
                  Next: {next.name}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </Link>
              ) : (
                <Link to="/contact" className="btn-primary">
                  Start your project
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
