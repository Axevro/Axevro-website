import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

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
  'Docker',
]

export default function Technologies() {
  return (
    <section id="stack" className="py-14 sm:py-20 md:py-[100px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          tag="Our Stack"
          title="Technologies we build with"
          description="Modern product stacks with delivery, security, and discoverability built in — containers, automation, cloud, authentication, and SEO."
        />

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featured.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="flex items-center gap-3 border border-green/20 bg-[linear-gradient(135deg,rgba(31,157,85,0.08),rgba(201,162,39,0.06))] px-4 py-4 sm:px-5"
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

        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {tech.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.025 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2.5 border border-line bg-white px-3.5 py-2.5 text-[13px] font-medium text-ink-soft transition-all hover:border-green hover:bg-[rgba(31,157,85,0.06)] hover:text-green-deep sm:px-5 sm:py-3 sm:text-sm"
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
