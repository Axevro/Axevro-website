import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'

const testimonials = [
  {
    quote:
      "Axevro rebuilt our platform in eight weeks and it hasn't gone down once since launch.",
    name: 'Priya Menon',
    role: 'Founder, Stratus Labs',
  },
  {
    quote:
      'The team scoped honestly, delivered on time, and never disappeared after handoff.',
    name: 'Daniel Ortiz',
    role: 'CTO, Brightfield',
  },
  {
    quote:
      "Best design-to-dev handoff we've worked with — design specs matched the build exactly.",
    name: 'Anaya Rao',
    role: 'Product Lead, Orbital',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-bg-alt py-14 sm:py-20 md:py-[100px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          tag="Client Words"
          title="What clients say"
          description="Teams choose Axevro for clear scope, steady delivery, and support that continues after launch."
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap items-center gap-4 border border-line bg-white px-4 py-3 sm:mb-10 sm:px-5"
        >
          <div className="flex items-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="material-symbols-outlined text-[18px]">
                star
              </span>
            ))}
          </div>
          <p className="text-[13.5px] text-ink-soft sm:text-sm">
            Built for founders and product teams who need reliable engineering partners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="flex h-full flex-col border border-line bg-white p-5 shadow-[0_1px_0_rgba(10,11,13,0.03)] transition-shadow hover:shadow-[0_18px_48px_rgba(10,11,13,0.08)] sm:p-8"
            >
              <p className="flex-1 text-[15px] leading-[1.7] text-ink-soft">
                <span className="font-display mr-1 text-[28px] leading-none text-gold">
                  &quot;
                </span>
                {item.quote}
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <div
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-gold-deep), var(--color-green))',
                  }}
                >
                  {item.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-[12.5px] text-gray">{item.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
