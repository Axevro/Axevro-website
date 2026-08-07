import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Logo from './Logo'

const stats = [
  { num: '120', suffix: '+', label: 'Projects Delivered' },
  { num: '98', suffix: '%', label: 'Client Retention' },
  { num: '30', suffix: '+', label: 'Technologies Used' },
  { num: '24', suffix: '/7', label: 'Support & Monitoring' },
]

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-black pt-[104px] text-white">
      <svg
        className="pointer-events-none absolute top-[60px] right-[-6%] z-[1] h-[640px] w-[640px] opacity-90"
        viewBox="0 0 640 640"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M120 460 C260 380 420 280 560 160"
          stroke="url(#hg)"
          strokeWidth="46"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="hg" x1="120" y1="460" x2="560" y2="160">
            <stop stopColor="#0B3D2C" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#1F9D55" stopOpacity="0.55" />
            <stop offset="1" stopColor="#4ADE80" stopOpacity="0.75" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-[2] mx-auto max-w-[1180px] px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-7"
          style={{ display: 'block' }}
        >
          <Logo size="lg" inverted />
          <p
            className="mt-3 font-mono text-[11px] tracking-[0.18em] text-gold-bright uppercase md:text-[12px]"
          >
            Building Digital Excellence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-[20px] border border-[rgba(201,162,39,0.4)] px-3.5 py-1.5 font-mono text-[12.5px] tracking-[1.5px] text-gold-bright uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-bright" />
          Web &amp; Mobile Product Studio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-display max-w-[800px] text-[clamp(38px,5.4vw,66px)] leading-[1.06] font-semibold tracking-[-1.5px]"
        >
          Building digital
          <br />
          products with{' '}
          <span className="text-accent-gradient">precision &amp; excellence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-[26px] max-w-[540px] text-lg leading-[1.65] text-[#A8ACB4]"
        >
          Axevro designs and engineers websites, apps, and platforms for teams who
          need to ship fast without cutting corners — from first wireframe to
          Dockerized AWS deployment with GitHub Actions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26 }}
          className="mt-[38px] flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={() => toast.success('Thanks — we will get back within 48 hours.')}
            className="inline-flex items-center gap-2.5 rounded-[2px] border border-gold bg-gold px-7 py-[15px] text-[15px] font-bold text-black transition-all hover:-translate-y-px hover:border-gold-bright hover:bg-gold-bright"
          >
            Start a Project
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <a
            href="#portfolio"
            className="rounded-[2px] border-[1.5px] border-white/25 px-6 py-[15px] text-[15px] font-semibold text-white transition-colors hover:border-green-bright hover:text-green-bright"
          >
            View Our Work
          </a>
        </motion.div>

        <div className="mt-[88px] flex flex-wrap border-t border-white/12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
              className={`flex-1 basis-1/2 py-[22px] md:basis-auto ${
                i % 2 === 0 ? 'border-r border-white/12' : ''
              } md:border-r md:border-white/12 md:last:border-r-0`}
            >
              <div className="font-mono text-[28px] font-medium">
                <span className="text-gold-bright">{stat.num}</span>
                {stat.suffix}
              </div>
              <div className="mt-1.5 text-[12.5px] tracking-[0.2px] text-[#8B8F97]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
