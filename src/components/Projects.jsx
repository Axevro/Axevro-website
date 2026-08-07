import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const featured = {
  tag: 'SaaS Platform',
  name: 'Velora — Analytics Dashboard',
  stack: 'React · Node.js · PostgreSQL',
  icon: 'monitoring',
}

const sideProjects = [
  {
    tag: 'E-Commerce',
    name: 'Northpeak Outfitters',
    stack: 'Next.js · Stripe · Firebase',
    icon: 'storefront',
  },
  {
    tag: 'Mobile App',
    name: 'Kairo — Booking App',
    stack: 'Flutter · Express · MongoDB',
    icon: 'smartphone',
  },
]

function ProjectThumb({ icon, tall = false }) {
  return (
    <div
      className={`relative overflow-hidden bg-black ${tall ? 'aspect-[16/12]' : 'aspect-[16/10]'}`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(500px 240px at 20% 20%, rgba(201,162,39,0.2), transparent 55%), radial-gradient(420px 220px at 80% 80%, rgba(31,157,85,0.28), transparent 55%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="inline-flex h-14 w-14 items-center justify-center border border-white/15 bg-white/5 text-green-bright backdrop-blur-sm">
          <span className="material-symbols-outlined text-[28px]">{icon}</span>
        </span>
        <img
          src="/axevro-mark.png?v=4"
          alt=""
          className="h-10 w-10 object-contain opacity-80"
        />
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="portfolio" className="py-14 sm:py-20 md:py-[100px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading tag="Featured Work" title="Recent projects" />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            whileHover={{ y: -4 }}
            className="group overflow-hidden border border-line bg-bg-alt transition-shadow hover:shadow-[0_18px_50px_rgba(10,11,13,0.08)] lg:row-span-2"
          >
            <div className="overflow-hidden">
              <motion.div
                className="origin-center"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.45 }}
              >
                <ProjectThumb icon={featured.icon} tall />
              </motion.div>
            </div>
            <div className="p-5 sm:p-[22px]">
              <div className="font-mono text-[11.5px] tracking-[1px] text-gold-deep uppercase">
                {featured.tag}
              </div>
              <h3 className="font-display mt-2 text-[18px] font-semibold sm:text-[19px]">
                {featured.name}
              </h3>
              <p className="mt-3 text-[13.5px] text-gray">{featured.stack}</p>
            </div>
          </motion.article>

          <div className="flex flex-col gap-5 lg:gap-6">
            {sideProjects.map((project, index) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.08 + index * 0.06 }}
                whileHover={{ y: -4 }}
                className="overflow-hidden border border-line bg-bg-alt transition-shadow hover:shadow-[0_18px_50px_rgba(10,11,13,0.08)]"
              >
                <div className="overflow-hidden">
                  <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.45 }}>
                    <ProjectThumb icon={project.icon} />
                  </motion.div>
                </div>
                <div className="p-5 sm:p-[22px]">
                  <div className="font-mono text-[11.5px] tracking-[1px] text-gold-deep uppercase">
                    {project.tag}
                  </div>
                  <h3 className="font-display mt-2 text-[18px] font-semibold sm:text-[19px]">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] text-gray">{project.stack}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-deep transition-colors hover:text-green"
          >
            Discuss a similar project
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
