import { motion } from 'framer-motion'

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
    <section className="relative overflow-hidden bg-black py-[100px] text-white">
      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        <div className="mb-14 max-w-[640px]">
          <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-bright uppercase">
            <span className="block h-[1.5px] w-[22px] bg-gold-bright" />
            Why Axevro
          </div>
          <h2 className="font-display text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.8px] text-white">
            Built for teams that can&apos;t afford to guess
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-[#9BA0A8]">
            Four things clients mention most when they explain why they came back.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-[38px] sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="border-t border-white/14 pt-[22px]"
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
