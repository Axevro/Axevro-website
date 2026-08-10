import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Footer } from '../components/layout'
import { PageHero } from '../components/ui'
import {
  introRanges,
  packagePricing,
  pricingHighlights,
  pricingIntro,
  pricingNotes,
} from '../data/pricing'
import { easeOut } from '../lib/motion'

function PriceCell({ label, value, emphasize = false }) {
  return (
    <div className="min-w-0">
      <div className="font-mono text-[10px] tracking-[1px] text-gold-deep uppercase">
        {label}
      </div>
      <div
        className={`mt-1 font-mono text-[15px] tabular-nums ${
          emphasize ? 'font-semibold text-green-deep' : 'text-ink-soft'
        }`}
      >
        {value}
      </div>
    </div>
  )
}

export default function Pricing() {
  return (
    <>
      <main>
        <PageHero
          eyebrow={pricingIntro.eyebrow}
          title="Professional work."
          titleAccent="Introductory rates."
          description={pricingIntro.body}
          actions={
            <>
              <Link to="/contact#contact" className="btn-primary">
                Start a project
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
              <a href="#packages" className="btn-secondary-dark">
                See packages
              </a>
            </>
          }
        />

        {/* Trust / value strip */}
        <section className="border-b border-line bg-bg-alt py-10 sm:py-12">
          <div className="mx-auto grid max-w-[1180px] gap-6 px-4 sm:grid-cols-3 sm:gap-8 sm:px-6 md:px-8">
            {pricingHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: easeOut }}
                className="flex gap-3.5"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-green/20 bg-green/8 text-green">
                  <span className="material-symbols-outlined text-[22px]">
                    {item.icon}
                  </span>
                </span>
                <div>
                  <h3 className="font-display text-[16px] font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.65] text-gray">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Package breakdown */}
        <section id="packages" className="scroll-mt-24 py-14 sm:py-16 md:py-[88px]">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: easeOut }}
              className="mb-8 max-w-2xl sm:mb-10"
            >
              <div className="mb-3 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
                <span
                  className="block h-[1.5px] w-[22px]"
                  style={{
                    background:
                      'linear-gradient(90deg, var(--color-gold), var(--color-green))',
                  }}
                />
                Starting from
              </div>
              <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-semibold tracking-[-0.6px]">
                Development + deployment packages
              </h2>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-gray sm:text-[15px]">
                Clear baselines with development and deployment shown separately.
                Deployment is listed on its own because release engineering
                typically carries higher effort.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="hidden overflow-hidden border border-line shadow-[0_20px_60px_rgba(10,11,13,0.05)] md:block"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-line bg-black text-white">
                      <th className="px-5 py-4 font-mono text-[11px] font-medium tracking-[1px] text-gold-bright uppercase lg:px-6">
                        Project
                      </th>
                      <th className="px-5 py-4 text-right font-mono text-[11px] font-medium tracking-[1px] text-gold-bright uppercase lg:px-6">
                        Development
                      </th>
                      <th className="px-5 py-4 text-right font-mono text-[11px] font-medium tracking-[1px] text-gold-bright uppercase lg:px-6">
                        Deployment
                      </th>
                      <th className="px-5 py-4 text-right font-mono text-[11px] font-medium tracking-[1px] text-gold-bright uppercase lg:px-6">
                        Total starting from
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {packagePricing.map((row, index) => (
                      <tr
                        key={row.project}
                        className={`border-b border-line last:border-0 transition-colors hover:bg-green/[0.04] ${
                          row.featured
                            ? 'bg-[linear-gradient(90deg,rgba(31,157,85,0.06),transparent_55%)]'
                            : index % 2 === 1
                              ? 'bg-bg-alt/50'
                              : 'bg-white'
                        }`}
                      >
                        <td className="px-5 py-4 lg:px-6">
                          <div className="flex items-center gap-2.5">
                            <span className="font-display text-[15px] font-semibold text-ink">
                              {row.project}
                            </span>
                            {row.featured ? (
                              <span className="font-mono text-[9px] tracking-[0.8px] text-green uppercase">
                                Popular
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-[14px] tabular-nums text-ink-soft lg:px-6">
                          {row.development}
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-[14px] tabular-nums text-ink-soft lg:px-6">
                          {row.deployment}
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-[15px] font-semibold tabular-nums text-green-deep lg:px-6">
                          {row.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-3 md:hidden">
              {packagePricing.map((row, index) => (
                <motion.article
                  key={row.project}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className={`border p-4 ${
                    row.featured
                      ? 'border-green/35 bg-[linear-gradient(180deg,rgba(31,157,85,0.07),#fff_48%)]'
                      : 'border-line bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-[16px] font-semibold text-ink">
                      {row.project}
                    </h3>
                    {row.featured ? (
                      <span className="font-mono text-[9px] tracking-[0.8px] text-green uppercase">
                        Popular
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
                    <PriceCell label="Development" value={row.development} />
                    <PriceCell label="Deployment" value={row.deployment} />
                  </div>
                  <div className="mt-3 border-t border-line pt-3">
                    <PriceCell
                      label="Total starting from"
                      value={row.total}
                      emphasize
                    />
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 border border-line bg-bg-alt p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <p className="max-w-xl text-[14px] leading-[1.65] text-ink-soft">
                Found a fit? We&apos;ll confirm scope and timelines in a clear
                proposal — usually within 48 hours.
              </p>
              <Link to="/contact#contact" className="btn-primary shrink-0 justify-center">
                Request a quote
              </Link>
            </div>
          </div>
        </section>

        {/* Intro ranges */}
        <section className="border-t border-line bg-bg-alt py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 max-w-2xl sm:mb-10"
            >
              <div className="mb-3 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
                <span className="block h-[1.5px] w-[22px] bg-green" />
                Intro ranges
              </div>
              <h2 className="font-display text-[clamp(24px,3.5vw,34px)] font-semibold tracking-[-0.6px]">
                Axevro intro price bands
              </h2>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-gray sm:text-[15px]">
                Useful planning ranges for early conversations — before we lock a
                detailed proposal.
              </p>
            </motion.div>

            <div className="hidden overflow-hidden border border-line bg-white shadow-[0_16px_48px_rgba(10,11,13,0.04)] md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-line bg-black text-white">
                    <th className="px-5 py-4 font-mono text-[11px] font-medium tracking-[1px] text-gold-bright uppercase lg:px-6">
                      Project
                    </th>
                    <th className="px-5 py-4 text-right font-mono text-[11px] font-medium tracking-[1px] text-gold-bright uppercase lg:px-6">
                      Axevro intro price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {introRanges.map((row, index) => (
                    <tr
                      key={row.project}
                      className={`border-b border-line last:border-0 transition-colors hover:bg-green/[0.04] ${
                        index % 2 === 1 ? 'bg-bg-alt/60' : 'bg-white'
                      }`}
                    >
                      <td className="px-5 py-3.5 font-display text-[15px] font-semibold lg:px-6">
                        {row.project}
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono text-[15px] font-semibold tabular-nums text-green-deep lg:px-6">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
              {introRanges.map((row, index) => (
                <motion.div
                  key={row.project}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="flex items-center justify-between gap-3 border border-line bg-white px-4 py-3.5"
                >
                  <span className="font-display text-[14px] font-semibold leading-snug">
                    {row.project}
                  </span>
                  <span className="shrink-0 font-mono text-[13px] font-semibold tabular-nums text-green-deep">
                    {row.price}
                  </span>
                </motion.div>
              ))}
            </div>

            <ul className="mt-8 space-y-2.5">
              {pricingNotes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2.5 text-[13.5px] leading-[1.65] text-gray sm:text-[14px]"
                >
                  <span className="material-symbols-outlined mt-0.5 text-[16px] text-green">
                    info
                  </span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative overflow-hidden bg-black py-16 text-center text-white sm:py-20 md:py-24">
          <div className="pointer-events-none absolute inset-0 surface-glow opacity-90" />
          <div className="relative mx-auto max-w-[640px] px-4 sm:px-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[11px] tracking-[1.5px] text-gold-bright uppercase"
            >
              Next step
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display mt-3 text-[clamp(26px,5vw,40px)] font-semibold"
            >
              Let&apos;s turn a starting price into a{' '}
              <span className="text-accent-gradient-bright">real plan</span>
            </motion.h2>
            <p className="mt-4 text-[14.5px] text-[#9BA0A8] sm:text-base">
              Share your project type — we&apos;ll confirm scope, timeline, and
              commercials within 48 hours.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contact#contact" className="btn-primary w-full sm:w-auto">
                Talk to Axevro
              </Link>
              <Link to="/#process" className="btn-secondary-dark w-full sm:w-auto">
                How we work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
