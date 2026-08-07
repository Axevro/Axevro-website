import { motion } from 'framer-motion'

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
      'Best design-to-dev handoff we\'ve worked with — design specs matched the build exactly.',
    name: 'Anaya Rao',
    role: 'Product Lead, Orbital',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-bg-alt py-[100px]">
      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        <div className="mb-14 max-w-[640px]">
          <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
            <span className="block h-[1.5px] w-[22px] bg-gold" />
            Client Words
          </div>
          <h2 className="font-display text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.8px]">
            What clients say
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded border border-line bg-white p-8"
            >
              <p className="text-[15px] leading-[1.7] text-ink-soft">
                <span className="font-display mr-1 text-[28px] text-gold">
                  &quot;
                </span>
                {item.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-[38px] w-[38px] rounded-full bg-[linear-gradient(135deg,var(--color-gold-deep),var(--color-green))]" />
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
