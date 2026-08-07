import { motion } from 'framer-motion'

const steps = [
  {
    step: 'STEP 01',
    name: 'Discovery & Requirement Analysis',
    desc: 'Understanding your goals, users, and constraints',
  },
  {
    step: 'STEP 02',
    name: 'Planning & UI/UX Design',
    desc: 'Wireframes and interactive prototypes before code',
  },
  {
    step: 'STEP 03',
    name: 'Development',
    desc: 'Sprint-based build across frontend, backend, and infra',
  },
  {
    step: 'STEP 04',
    name: 'CI/CD & Cloud Deployment',
    desc: 'Docker builds, GitHub Actions pipelines, and AWS production rollout',
  },
  {
    step: 'STEP 05',
    name: 'Maintenance',
    desc: 'Monitoring, updates, and ongoing support',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-[100px]">
      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        <div className="mb-14 max-w-[640px]">
          <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
            <span className="block h-[1.5px] w-[22px] bg-[linear-gradient(90deg,var(--color-gold),var(--color-green))]" />
            How We Work
          </div>
          <h2 className="font-display text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.8px]">
            A process built to remove guesswork
          </h2>
        </div>

        <div className="mt-2.5 flex flex-col">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group grid grid-cols-[70px_1fr_28px] items-center gap-5 border-t border-line py-7 transition-[padding] duration-200 last:border-b hover:pl-2.5 sm:grid-cols-[90px_1fr_40px] sm:gap-7"
            >
              <div className="font-mono text-[13px] text-gold-deep">{item.step}</div>
              <div>
                <div className="font-display text-[19px] font-semibold">{item.name}</div>
                <span className="mt-1 block font-body text-[14.5px] font-normal text-gray">
                  {item.desc}
                </span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-gray-light transition-all group-hover:translate-x-1 group-hover:text-green">
                arrow_forward
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
