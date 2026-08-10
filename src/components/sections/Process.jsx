import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { processSteps } from '../../data/process'
import { revealItem, staggerContainer, viewportOnce } from '../../lib/motion'

export default function Process() {
  return (
    <section id="process" className="py-14 sm:py-20 md:py-[100px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          tag="How We Work"
          title="A process built to remove guesswork"
        />

        <motion.div
          className="flex flex-col border-t border-line"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {processSteps.map((item) => (
            <motion.div key={item.slug} variants={revealItem}>
              <Link
                to={`/process/${item.slug}`}
                className="group grid grid-cols-[56px_1fr_24px] items-start gap-3 border-b border-line py-5 transition-all duration-200 hover:bg-bg-alt/70 hover:pl-1 sm:grid-cols-[90px_1fr_40px] sm:items-center sm:gap-7 sm:py-7 sm:hover:pl-2"
              >
                <div className="font-mono text-[11px] text-gold-deep sm:text-[13px]">
                  {item.step}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[16px] font-semibold transition-colors group-hover:text-green-deep sm:text-[19px]">
                    {item.name}
                  </div>
                  <span className="mt-1 block text-[13px] leading-snug text-gray sm:text-[14.5px]">
                    {item.desc}
                  </span>
                </div>
                <span className="material-symbols-outlined mt-0.5 text-[18px] text-gray-light transition-all group-hover:translate-x-1 group-hover:text-green sm:mt-0">
                  arrow_forward
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
