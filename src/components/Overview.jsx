import { motion } from 'framer-motion'

const points = [
  'Senior engineers, no outsourced juniors',
  'Docker, GitHub Actions & AWS in every delivery',
  "Post-launch support that doesn't disappear",
]

export default function Overview() {
  return (
    <section id="about" className="py-[100px]">
      <div className="mx-auto grid max-w-[1180px] items-center gap-[70px] px-6 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] text-gold-deep uppercase">
            <span className="block h-[1.5px] w-[22px] bg-gold" />
            Who We Are
          </div>
          <h2 className="font-display text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-semibold tracking-[-0.8px]">
            A studio built around one idea — digital excellence isn&apos;t a
            tagline, it&apos;s a process.
          </h2>
          <p className="mt-4 text-base leading-[1.7] text-gray">
            Axevro partners with founders and enterprise teams to design, build,
            and scale web platforms, mobile apps, and custom software —
            combining senior engineering with product-minded design.
          </p>
          <ul className="mt-7 flex flex-col gap-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3.5 text-[15px] text-ink-soft">
                <span className="material-symbols-outlined mt-0.5 text-[20px] text-green">
                  check_circle
                </span>
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="relative aspect-[1/0.85] overflow-hidden rounded border border-line-dark bg-black"
        >
          <div className="absolute top-6 left-6 z-[2] h-[34px] w-[34px] border-t-2 border-l-2 border-gold" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_42%,rgba(11,61,44,0.5)_52%,rgba(31,157,85,0.65)_60%,transparent_70%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/axevro-mark.png?v=2"
              alt="Axevro mark"
              className="h-36 w-36 object-contain drop-shadow-[0_18px_40px_rgba(201,162,39,0.28)] md:h-44 md:w-44"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
