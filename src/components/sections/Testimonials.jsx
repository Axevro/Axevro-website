import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { testimonials } from '../../data/testimonials'
import { easeOut, revealItem, staggerContainer, viewportOnce } from '../../lib/motion'

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-bg-alt py-14 sm:py-20 md:py-[100px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          tag="Client Feedback"
          title="What founders say"
          description="Direct feedback from clients we partnered with on live production websites."
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mb-8 flex flex-col gap-3 border border-line bg-white px-4 py-3.5 sm:mb-10 sm:flex-row sm:items-center sm:gap-5 sm:px-5"
        >
          <div className="flex items-center gap-1 text-gold" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="material-symbols-outlined text-[18px]">
                star
              </span>
            ))}
          </div>
          <p className="text-[13.5px] leading-relaxed text-ink-soft sm:text-sm">
            Verified feedback from GroBuzz and WellUp Home Healthcare — projects
            live in our portfolio.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6"
        >
          {testimonials.map((item) => (
            <motion.article
              key={`${item.name}-${item.company}`}
              variants={revealItem}
              whileHover={{ y: -4 }}
              className="relative flex h-full flex-col overflow-hidden border border-line bg-white p-5 transition-shadow duration-300 hover:border-gold/30 hover:shadow-[0_18px_48px_rgba(10,11,13,0.08)] sm:p-7 md:p-8"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-gold), var(--color-green))',
                }}
              />

              <div className="mb-5 flex items-start justify-between gap-3">
                <span
                  className="font-display text-[42px] leading-none text-gold/80 sm:text-[48px]"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <span className="mt-1 inline-flex items-center border border-line bg-bg-alt px-2.5 py-1 font-mono text-[10.5px] tracking-[1px] text-gold-deep uppercase">
                  {item.company}
                </span>
              </div>

              <blockquote className="flex-1">
                <p className="text-[14.5px] leading-[1.75] text-ink-soft sm:text-[15px] sm:leading-[1.78]">
                  {item.quote}
                </p>
              </blockquote>

              <footer className="mt-7 flex flex-col gap-4 border-t border-line pt-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[12px] font-bold tracking-wide text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--color-gold-deep), var(--color-green))',
                    }}
                    aria-hidden
                  >
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-ink">{item.name}</div>
                    <div className="text-[12.5px] text-gray">{item.role}</div>
                  </div>
                </div>

                {item.projectUrl ? (
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 self-start text-[12.5px] font-semibold text-green-deep transition-colors hover:text-green sm:self-auto"
                  >
                    View project
                    <span className="material-symbols-outlined text-[15px]" aria-hidden>
                      open_in_new
                    </span>
                  </a>
                ) : null}
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
