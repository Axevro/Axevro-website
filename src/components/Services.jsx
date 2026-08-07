import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { services } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="pb-[100px]">
      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        <div className="mb-14 max-w-[640px]">
          <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
            <span className="block h-[1.5px] w-[22px] bg-[linear-gradient(90deg,var(--color-gold),var(--color-green))]" />
            What We Do
          </div>
          <h2 className="font-display text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.8px]">
            Full-stack capability, under one roof
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-gray">
            From a landing page to a full SaaS platform — product engineering plus
            cloud delivery, working from the same playbook.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-white px-8 py-[38px] transition-colors hover:bg-bg-alt"
            >
              <div className="absolute top-0 left-0 h-0.5 w-0 bg-[linear-gradient(90deg,var(--color-gold),var(--color-green))] transition-all duration-300 group-hover:w-full" />
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs text-gold-deep">{service.num}</span>
                <span className="material-symbols-outlined text-[22px] text-green">
                  {service.icon}
                </span>
              </div>
              <h3 className="font-display mb-2.5 text-[19px] font-semibold">
                {service.title}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-gray">{service.desc}</p>
              <Link
                to={`/services/${service.slug}`}
                className="mt-[18px] inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-green-deep opacity-100 transition-all sm:translate-x-[-4px] sm:opacity-70 sm:group-hover:translate-x-0 sm:group-hover:opacity-100"
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
