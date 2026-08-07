import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

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
      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          light
          tag="Why Axevro"
          title="Built for teams that can't afford to guess"
          description="Four things clients mention most when they explain why they came back."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-[38px]">
          {reasons.map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ x: 4 }}
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
        </div>
      </div>
    </section>
  )
}
