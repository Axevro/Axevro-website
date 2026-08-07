import { motion } from 'framer-motion'

const skills = [
  {
    icon: 'deployed_code',
    title: 'Docker',
    tag: 'Containers',
    desc: 'Reproducible environments, multi-stage builds, and containerized apps that ship the same way in every environment.',
    points: ['Image optimization', 'Compose stacks', 'Secure registries'],
  },
  {
    icon: 'account_tree',
    title: 'GitHub Actions',
    tag: 'CI / CD',
    desc: 'Automated pipelines for test, build, and deploy — so every merge is production-ready with less manual risk.',
    points: ['Build & test matrices', 'Preview deploys', 'Release automation'],
  },
  {
    icon: 'cloud',
    title: 'AWS',
    tag: 'Cloud',
    desc: 'Scalable cloud architecture on AWS — compute, storage, networking, and observability tailored to your product.',
    points: ['EC2 / ECS / Lambda', 'S3 · RDS · CloudFront', 'IAM & monitoring'],
  },
]

export default function CloudDevOps() {
  return (
    <section id="devops" className="relative overflow-hidden bg-green-deep py-[100px] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(700px 320px at 12% 0%, rgba(74,222,128,0.18), transparent 60%), radial-gradient(600px 280px at 88% 100%, rgba(201,162,39,0.12), transparent 55%)',
        }}
      />

      <div className="relative z-[1] mx-auto max-w-[1180px] px-6 md:px-8">
        <div className="mb-14 max-w-[640px]">
          <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-green-bright uppercase">
            <span className="block h-[1.5px] w-[22px] bg-green-bright" />
            Cloud &amp; DevOps
          </div>
          <h2 className="font-display text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.8px] text-white">
            Ship reliably with Docker, GitHub Actions &amp; AWS
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-[#A7D4BC]">
            Infrastructure and delivery skills built into every engagement — not
            bolted on after launch.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative border border-white/12 bg-black/25 p-7 backdrop-blur-sm transition-colors hover:border-green-bright/45 hover:bg-black/40"
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

              <h3 className="font-display text-[22px] font-semibold text-white">
                {skill.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-[#B7C4BC]">
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
