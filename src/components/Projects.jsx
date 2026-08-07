import { motion } from 'framer-motion'

const featured = {
  tag: 'SaaS Platform',
  name: 'Velora — Analytics Dashboard',
  stack: 'React · Node.js · PostgreSQL',
}

const sideProjects = [
  {
    tag: 'E-Commerce',
    name: 'Northpeak Outfitters',
    stack: 'Next.js · Stripe · Firebase',
  },
  {
    tag: 'Mobile App',
    name: 'Kairo — Booking App',
    stack: 'Flutter · Express · MongoDB',
  },
]

function ProjectThumb({ tall = false }) {
  return (
    <div
      className={`relative bg-black ${tall ? 'aspect-[16/13]' : 'aspect-[16/10]'}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_48%,rgba(201,162,39,0.35)_56%,rgba(31,157,85,0.55)_66%,transparent_78%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/axevro-mark.png?v=2"
          alt=""
          className="h-14 w-14 object-contain drop-shadow-[0_10px_24px_rgba(201,162,39,0.35)]"
        />
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="portfolio" className="py-[100px]">
      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        <div className="mb-14 max-w-[640px]">
          <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
            <span className="block h-[1.5px] w-[22px] bg-gold" />
            Featured Work
          </div>
          <h2 className="font-display text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.8px]">
            Recent projects
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="overflow-hidden rounded border border-line bg-bg-alt lg:row-span-2"
          >
            <ProjectThumb tall />
            <div className="p-[22px]">
              <div className="font-mono text-[11.5px] tracking-[1px] text-gold-deep uppercase">
                {featured.tag}
              </div>
              <h3 className="font-display mt-2 text-[19px] font-semibold">
                {featured.name}
              </h3>
              <p className="mt-3 text-[13.5px] text-gray">{featured.stack}</p>
            </div>
          </motion.article>

          <div className="flex flex-col gap-6">
            {sideProjects.map((project, index) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.08 + index * 0.06 }}
                className="overflow-hidden rounded border border-line bg-bg-alt"
              >
                <ProjectThumb />
                <div className="p-[22px]">
                  <div className="font-mono text-[11.5px] tracking-[1px] text-gold-deep uppercase">
                    {project.tag}
                  </div>
                  <h3 className="font-display mt-2 text-[19px] font-semibold">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] text-gray">{project.stack}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
