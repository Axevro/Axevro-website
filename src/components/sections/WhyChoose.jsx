import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { revealItem, staggerContainer, viewportOnce } from '../../lib/motion'

const reasons = [
  {
    num: '01',
    title: 'Senior-only teams',
    desc: 'Every engineer on your project has shipped production software before — not their first client.',
  },
  {
    num: '02',
    title: 'Fixed timelines',
    desc: 'Scoped sprints with clear milestones, so you always know what ships and when.',
  },
  {
    num: '03',
    title: 'Design-led builds',
    desc: 'Every project starts with design, not in code — so decisions get made before they get expensive.',
  },
  {
    num: '04',
    title: 'Cloud-ready delivery',
    desc: 'Docker, GitHub Actions, and AWS baked into delivery — so releases stay repeatable after handoff.',
  },
]

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-black py-14 text-white sm:py-20 md:py-[100px]">
      <div className="pointer-events-none absolute inset-0 surface-glow opacity-70" />
      <motion.div
        className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-green/15 blur-[100px]"
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          light
          tag="Why Axevro"
          title="Built for teams that can't afford to guess"
          description="Four things clients mention most when they explain why they came back."
        />

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-[38px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {reasons.map((item) => (
            <motion.div
              key={item.num}
              variants={revealItem}
              whileHover={{ x: 6, transition: { duration: 0.22 } }}
              className="border-t border-white/14 pt-5 sm:pt-[22px]"
            >
              <div className="mb-3.5 font-mono text-[13px] text-green-bright">
                {item.num}
              </div>
              <h3 className="font-display mb-2.5 text-[17px] font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-[1.65] text-[#8B8F97]">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
