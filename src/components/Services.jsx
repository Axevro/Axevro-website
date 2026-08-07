import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { services } from '../data/services'
import SectionHeading from './SectionHeading'
import { easeOut } from '../lib/motion'

export default function Services() {
  return (
    <section id="services" className="pb-14 sm:pb-20 md:pb-[100px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          tag="What We Do"
          title="Full-stack capability, under one roof"
          description="From a landing page to a full SaaS platform — product engineering plus cloud delivery, working from the same playbook."
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: easeOut }}
              whileHover={{ y: -3 }}
              className="group relative flex min-h-[240px] flex-col bg-white px-5 py-7 transition-colors hover:bg-bg-alt sm:min-h-[260px] sm:px-8 sm:py-[38px]"
            >
              <div className="absolute top-0 left-0 h-0.5 w-0 bg-[linear-gradient(90deg,var(--color-gold),var(--color-green))] transition-all duration-300 group-hover:w-full" />
              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <span className="font-mono text-xs text-gold-deep">{service.num}</span>
                <motion.span
                  className="inline-flex h-9 w-9 items-center justify-center border border-green/15 bg-green/5 text-green transition-colors group-hover:border-green/30 group-hover:bg-green/10"
                  whileHover={{ rotate: 6, scale: 1.05 }}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {service.icon}
                  </span>
                </motion.span>
              </div>
              <h3 className="font-display mb-2.5 text-[17px] font-semibold sm:text-[19px]">
                {service.title}
              </h3>
              <p className="flex-1 text-[14px] leading-[1.65] text-gray sm:text-[14.5px]">
                {service.desc}
              </p>
              <Link
                to={`/services/${service.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green-deep transition-all group-hover:gap-2.5"
              >
                Learn more
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
