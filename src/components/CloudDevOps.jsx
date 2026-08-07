import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const skills = [
  {
    icon: 'deployed_code',
    title: 'Docker',
    tag: 'Containers',
    desc: 'Reproducible environments, multi-stage builds, and containerized apps that ship the same way in every environment.',
    points: ['Image optimization', 'Compose stacks', 'Secure registries'],
    to: '/services/docker',
  },
  {
    icon: 'account_tree',
    title: 'GitHub Actions',
    tag: 'CI / CD',
    desc: 'Automated pipelines for test, build, and deploy — so every merge is production-ready with less manual risk.',
    points: ['Build & test matrices', 'Preview deploys', 'Release automation'],
    to: '/services/cloud-devops',
  },
  {
    icon: 'cloud',
    title: 'AWS',
    tag: 'Cloud',
    desc: 'Scalable cloud architecture on AWS — compute, storage, networking, and observability tailored to your product.',
    points: ['EC2 / ECS / Lambda', 'S3 · RDS · CloudFront', 'IAM & monitoring'],
    to: '/services/cloud-devops',
  },
]

export default function CloudDevOps() {
  return (
    <section
      id="devops"
      className="relative overflow-hidden bg-green-deep py-16 text-white sm:py-20 md:py-[100px]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(700px 320px at 12% 0%, rgba(74,222,128,0.18), transparent 60%), radial-gradient(600px 280px at 88% 100%, rgba(201,162,39,0.12), transparent 55%)',
        }}
      />

      <div className="relative z-[1] mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          light
          tag="Cloud & DevOps"
          title="Ship reliably with Docker, GitHub Actions & AWS"
          description="Infrastructure and delivery skills built into every engagement — not bolted on after launch."
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative flex h-full flex-col border border-white/12 bg-black/25 p-5 backdrop-blur-sm transition-colors hover:border-green-bright/45 hover:bg-black/40 sm:p-7"
            >
              <div className="absolute top-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-green-bright),var(--color-gold))] transition-transform duration-300 group-hover:scale-x-100" />

              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-green-bright/30 bg-green-bright/10 text-green-bright">
                  <span className="material-symbols-outlined text-[24px]">
                    {skill.icon}
                  </span>
                </span>
                <span className="font-mono text-[11px] tracking-[1.2px] text-gold-bright uppercase">
                  {skill.tag}
                </span>
              </div>

              <h3 className="font-display text-[20px] font-semibold text-white sm:text-[22px]">
                {skill.title}
              </h3>
              <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-[#B7C4BC]">
                {skill.desc}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                {skill.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-[13.5px] text-[#D5E5DB]"
                  >
                    <span className="material-symbols-outlined text-[16px] text-green-bright">
                      check
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                to={skill.to}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-green-bright transition-all group-hover:gap-2.5"
              >
                Learn more
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
