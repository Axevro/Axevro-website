import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import SafeImage from '../ui/SafeImage'
import { siteImages } from '../../data/images'

const points = [
  'Senior engineers, no outsourced juniors',
  'Docker, GitHub Actions & AWS in every delivery',
  "Post-launch support that doesn't disappear",
]

export default function Overview() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-[100px]">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-[60px] md:px-8 lg:gap-[70px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            tag="Who We Are"
            title="A studio built around one idea — digital excellence isn't a tagline, it's a process."
            description="Axevro partners with founders and enterprise teams to design, build, and scale web platforms, mobile apps, and custom software — combining senior engineering with product-minded design."
            className="mb-0"
          />
          <ul className="mt-7 flex flex-col gap-4">
            {points.map((point, index) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 + index * 0.08 }}
                className="flex items-start gap-3.5 text-[14.5px] text-ink-soft sm:text-[15px]"
              >
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px] text-green">
                  check_circle
                </span>
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="relative aspect-[4/3] overflow-hidden border border-line-dark bg-black sm:aspect-[1/0.85]"
        >
          <div className="absolute top-5 left-5 z-[2] h-8 w-8 border-t-2 border-l-2 border-gold sm:top-6 sm:left-6 sm:h-[34px] sm:w-[34px]" />
          <div className="absolute right-5 bottom-5 z-[2] h-8 w-8 border-r-2 border-b-2 border-green-bright/60 sm:right-6 sm:bottom-6" />

          <SafeImage
            src={siteImages.studio}
            alt="Axevro studio workspace with product engineering setup"
            className="absolute inset-0 h-full w-full object-cover"
            fallbackClassName="object-contain p-16 opacity-80"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,11,13,0.15) 0%, rgba(10,11,13,0.72) 100%), radial-gradient(420px 260px at 30% 20%, rgba(201,162,39,0.18), transparent 60%)',
            }}
          />

          <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col items-start gap-2 p-5 sm:p-7">
            <SafeImage
              src={siteImages.mark}
              alt=""
              className="h-10 w-auto object-contain drop-shadow-[0_12px_28px_rgba(201,162,39,0.35)] sm:h-12"
              loading="eager"
            />
            <div className="font-display text-lg font-bold tracking-[0.18em] text-white sm:text-xl">
              AXEVRO
            </div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-green-bright uppercase">
              Building Digital Excellence
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
