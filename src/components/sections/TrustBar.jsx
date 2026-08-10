import { motion } from 'framer-motion'
import { easeOut } from '../../lib/motion'

const items = [
  {
    icon: 'verified_user',
    title: 'Scoped before build',
    desc: 'Written proposal with deliverables — no surprise scope creep.',
  },
  {
    icon: 'payments',
    title: 'Transparent pricing',
    desc: 'Introductory rates with development and deployment listed separately.',
  },
  {
    icon: 'schedule',
    title: '48-hour response',
    desc: 'Most inquiries get a clear reply within two business days.',
  },
  {
    icon: 'cloud_done',
    title: 'Production-minded',
    desc: 'Security, CI/CD, and cloud readiness built into delivery.',
  },
]

export default function TrustBar({ className = '' }) {
  return (
    <section
      className={`border-y border-line bg-bg-alt py-10 sm:py-12 ${className}`}
      aria-label="Why clients trust Axevro"
    >
      <div className="mx-auto grid max-w-[1180px] gap-6 px-4 sm:grid-cols-2 sm:gap-8 sm:px-6 lg:grid-cols-4 md:px-8">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: easeOut }}
            whileHover={{ y: -3 }}
            className="flex gap-3.5"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-green/20 bg-white text-green shadow-[0_8px_24px_rgba(31,157,85,0.08)]">
              <span className="material-symbols-outlined text-[22px]" aria-hidden>
                {item.icon}
              </span>
            </span>
            <div>
              <h3 className="font-display text-[15px] font-semibold text-ink sm:text-[16px]">
                {item.title}
              </h3>
              <p className="mt-1 text-[13px] leading-[1.6] text-gray sm:text-[13.5px]">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
