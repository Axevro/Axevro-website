import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { packagePricing, pricingIntro } from '../data/pricing'
import { easeOut } from '../lib/motion'

const preview = packagePricing.slice(0, 6)

export default function PricingPreview() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-line bg-[linear-gradient(180deg,#fff_0%,#faf8f3_100%)] py-14 sm:py-20 md:py-[100px]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-gold), var(--color-green), transparent)',
        }}
      />

      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <div className="mb-3 inline-flex items-center gap-2 border border-green/20 bg-green/8 px-3 py-1.5 font-mono text-[10px] tracking-[1.2px] text-green-deep uppercase">
          <span className="h-1.5 w-1.5 bg-green" />
          Limited introductory window
        </div>

        <SectionHeading
          tag="Introductory Pricing"
          title="Professional builds at portfolio-friendly rates"
          description={pricingIntro.body}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="overflow-hidden border border-line bg-white shadow-[0_22px_60px_rgba(10,11,13,0.06)]"
        >
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-black text-white">
                  <th className="px-5 py-3.5 font-mono text-[11px] font-medium tracking-[1px] text-gold-bright uppercase">
                    Project
                  </th>
                  <th className="px-5 py-3.5 text-right font-mono text-[11px] font-medium tracking-[1px] text-gold-bright uppercase">
                    Development
                  </th>
                  <th className="px-5 py-3.5 text-right font-mono text-[11px] font-medium tracking-[1px] text-gold-bright uppercase">
                    Deployment
                  </th>
                  <th className="px-5 py-3.5 text-right font-mono text-[11px] font-medium tracking-[1px] text-gold-bright uppercase">
                    From
                  </th>
                </tr>
              </thead>
              <tbody>
                {preview.map((row, index) => (
                  <tr
                    key={row.project}
                    className={`border-b border-line last:border-0 transition-colors hover:bg-green/[0.04] ${
                      index % 2 === 1 ? 'bg-bg-alt/50' : ''
                    }`}
                  >
                    <td className="px-5 py-3.5 font-display text-[14.5px] font-semibold">
                      {row.project}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-[13.5px] tabular-nums text-ink-soft">
                      {row.development}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-[13.5px] tabular-nums text-ink-soft">
                      {row.deployment}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-[14.5px] font-semibold tabular-nums text-green-deep">
                      {row.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-line md:hidden">
            {preview.map((row) => (
              <div
                key={row.project}
                className="flex items-center justify-between gap-3 px-4 py-3.5"
              >
                <div className="min-w-0">
                  <div className="font-display text-[14px] font-semibold leading-snug">
                    {row.project}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-gray">
                    Dev {row.development} · Deploy {row.deployment}
                  </div>
                </div>
                <div className="shrink-0 font-mono text-[14px] font-semibold tabular-nums text-green-deep">
                  {row.total}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13.5px] text-gray sm:text-sm">
            Full list includes Flutter apps, backends, and intro price bands.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-green/35 hover:text-green-deep"
            >
              View full pricing
            </Link>
            <Link to="/contact" className="btn-primary justify-center">
              Get a quote
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
