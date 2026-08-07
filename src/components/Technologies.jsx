import { motion } from 'framer-motion'

const featured = [
  { name: 'Docker', icon: 'deployed_code' },
  { name: 'GitHub Actions', icon: 'account_tree' },
  { name: 'AWS', icon: 'cloud' },
  { name: 'Authentication', icon: 'encrypted' },
  { name: 'SEO', icon: 'travel_explore' },
]

const tech = [
  'React',
  'Flutter',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'MongoDB',
  'Firebase',
  'Vercel',
  'GitHub',
  'Authentication',
  'SEO',
]

export default function Technologies() {
  return (
    <section id="stack" className="py-[100px]">
      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        <div className="mb-14 max-w-[640px]">
          <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
            <span className="block h-[1.5px] w-[22px] bg-[linear-gradient(90deg,var(--color-gold),var(--color-green))]" />
            Our Stack
          </div>
          <h2 className="font-display text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.8px]">
            Technologies we build with
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-gray">
            Modern product stacks with delivery, security, and discoverability
            built in — containers, automation, cloud, authentication, and SEO.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featured.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="flex items-center gap-3 border border-green/25 bg-[linear-gradient(135deg,rgba(31,157,85,0.08),rgba(201,162,39,0.06))] px-5 py-4"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] bg-green/12 text-green">
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
              </span>
              <div>
                <div className="font-display text-[15px] font-semibold text-ink">
                  {item.name}
                </div>
                <div className="font-mono text-[10px] tracking-[1px] text-green uppercase">
                  Core skill
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-2.5 flex flex-wrap gap-3">
          {tech.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="flex items-center gap-2.5 rounded-3xl border border-line px-5 py-3 text-sm font-medium text-ink-soft transition-all hover:border-green hover:bg-[rgba(31,157,85,0.06)] hover:text-green-deep"
            >
              <span className="h-[7px] w-[7px] rounded-full bg-green" />
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
