import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { easeOut, staggerContainer, fadeUp } from '../../lib/motion'
import SafeImage from '../ui/SafeImage'
import { siteImages } from '../../data/images'

const stats = [
  { num: '3', suffix: '', label: 'Live client products' },
  { num: '48', suffix: 'h', label: 'Typical first reply' },
  { num: '9', suffix: '+', label: 'Core service areas' },
  { num: '5', suffix: '', label: 'Delivery stages' },
]

const fadeUpCustom = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: easeOut },
  }),
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-black text-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 480px at 12% -10%, rgba(31,157,85,0.18), transparent 55%), radial-gradient(700px 420px at 92% 8%, rgba(201,162,39,0.14), transparent 50%), radial-gradient(600px 360px at 70% 100%, rgba(11,61,44,0.35), transparent 60%)',
        }}
      />
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-green/20 blur-[100px]"
        animate={
          reduceMotion
            ? { opacity: 0.45 }
            : { opacity: [0.35, 0.55, 0.35], scale: [1, 1.12, 1] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
        }
      />
      <motion.div
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-gold/15 blur-[110px]"
        animate={
          reduceMotion
            ? { opacity: 0.35 }
            : { opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }
        }
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,0.7), transparent 85%)',
        }}
      />

      <motion.svg
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: easeOut }}
        className="pointer-events-none absolute top-[8%] right-[-18%] z-0 hidden h-[68vmin] w-[68vmin] sm:right-[-12%] md:block lg:right-[-4%]"
        viewBox="0 0 640 640"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M90 500 C250 390 400 270 560 140"
          stroke="url(#heroSwoosh)"
          strokeWidth="38"
          strokeLinecap="round"
          opacity="0.85"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease: easeOut }}
        />
        <defs>
          <linearGradient id="heroSwoosh" x1="90" y1="500" x2="560" y2="140">
            <stop stopColor="#0B3D2C" stopOpacity="0.15" />
            <stop offset="0.45" stopColor="#1F9D55" stopOpacity="0.45" />
            <stop offset="1" stopColor="#E8C468" stopOpacity="0.55" />
          </linearGradient>
        </defs>
      </motion.svg>

      <div className="hero-viewport relative z-10 mx-auto flex min-h-[calc(100svh-64px)] max-w-[1180px] flex-col justify-center px-4 pt-16 pb-8 sm:min-h-[calc(100svh-72px)] sm:px-6 sm:pt-24 sm:pb-10 md:px-8 md:pt-28 md:pb-14">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <div className="min-w-0 max-w-2xl">
            <motion.div
              custom={0.05}
              variants={fadeUpCustom}
              initial="hidden"
              animate="show"
              className="mb-5 flex items-center gap-3 sm:mb-7"
            >
              <motion.span
                className="h-px w-8 origin-left sm:w-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-gold), var(--color-green))',
                }}
              />
              <span className="font-mono text-[10px] tracking-[0.14em] text-gold-bright uppercase sm:text-[12px] sm:tracking-[0.22em]">
                Building Digital Excellence
              </span>
            </motion.div>

            <motion.p
              custom={0.12}
              variants={fadeUpCustom}
              initial="hidden"
              animate="show"
              className="font-display mb-3 text-[12px] font-semibold tracking-[0.24em] text-white/70 uppercase sm:mb-4 sm:text-sm sm:tracking-[0.28em]"
            >
              Axevro
            </motion.p>

            <motion.h1
              custom={0.18}
              variants={fadeUpCustom}
              initial="hidden"
              animate="show"
              className="font-display text-[clamp(2.1rem,7.5vw,4.35rem)] leading-[1.06] font-semibold tracking-[-0.04em] text-white"
            >
              Digital products
              <br className="hidden sm:block" /> crafted with{' '}
              <span className="text-accent-gradient">precision</span>
            </motion.h1>

            <motion.p
              custom={0.28}
              variants={fadeUpCustom}
              initial="hidden"
              animate="show"
              className="mt-5 max-w-[34rem] text-[14.5px] leading-[1.75] text-[#A7ADB6] sm:mt-6 sm:text-lg sm:leading-[1.7]"
            >
              We design and engineer websites, apps, and cloud platforms for teams
              who need to ship with confidence — from strategy to secure
              production.
            </motion.p>

            <motion.div
              custom={0.38}
              variants={fadeUpCustom}
              initial="hidden"
              animate="show"
              className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact#contact"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-[2px] bg-gold px-6 py-3.5 text-[14px] font-bold text-black transition-all hover:bg-gold-bright sm:w-auto sm:px-7 sm:py-4 sm:text-[15px]"
                >
                  Start a Project
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">
                    arrow_forward
                  </span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/pricing"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[2px] border border-white/18 px-6 py-3.5 text-[14px] font-semibold text-white/90 transition-colors hover:border-green-bright/70 hover:text-green-bright sm:w-auto sm:px-7 sm:py-4 sm:text-[15px]"
                >
                  View Pricing
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="hidden min-[400px]:block"
              >
                <a
                  href="#services"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[2px] border border-white/18 px-6 py-3.5 text-[14px] font-semibold text-white/90 transition-colors hover:border-green-bright/70 hover:text-green-bright sm:w-auto sm:px-7 sm:py-4 sm:text-[15px]"
                >
                  Explore Services
                </a>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: easeOut }}
            className="relative mx-auto flex w-full max-w-[340px] items-center justify-center sm:max-w-[420px] lg:max-w-none"
          >
            <motion.div
              className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(31,157,85,0.22),transparent_68%)] blur-2xl"
              animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.5, 0.85, 0.5] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
              }
            />
            <div className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[2px] border border-white/10 sm:max-w-[380px] lg:max-w-[420px]">
              <SafeImage
                src={siteImages.studio}
                alt="Axevro product studio workspace"
                className="absolute inset-0 h-full w-full object-cover"
                fallbackClassName="object-contain p-16 opacity-60"
                loading="eager"
                fetchPriority="high"
                width={840}
                height={1050}
                sizes="(max-width: 1024px) 90vw, 420px"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,11,13,0.25) 0%, rgba(10,11,13,0.82) 100%), radial-gradient(circle at 50% 30%, rgba(201,162,39,0.15), transparent 55%)',
                }}
              />
              <motion.div
                className="absolute top-4 left-4 h-6 w-6 border-t border-l border-gold/70 sm:top-5 sm:left-5 sm:h-8 sm:w-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              />
              <motion.div
                className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-green-bright/50 sm:right-5 sm:bottom-5 sm:h-8 sm:w-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-8 text-center sm:pb-10">
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                  }
                >
                  <SafeImage
                    src={siteImages.mark}
                    alt="Axevro"
                    className="mx-auto h-16 w-auto object-contain drop-shadow-[0_20px_50px_rgba(201,162,39,0.35)] sm:h-20 md:h-24"
                    loading="eager"
                  />
                </motion.div>
                <div className="font-display mt-4 text-xl font-bold tracking-[0.18em] text-white sm:text-2xl md:text-3xl">
                  AXEVRO
                </div>
                <div className="mt-2.5 flex items-center gap-2.5 sm:mt-3 sm:gap-3">
                  <span className="h-px w-6 bg-green/60 sm:w-8" />
                  <span className="font-mono text-[9px] tracking-[0.18em] text-green-bright uppercase sm:text-[10px] sm:tracking-[0.2em]">
                    Product Studio
                  </span>
                  <span className="h-px w-6 bg-gold/50 sm:w-8" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mt-12 border-t border-white/10 pt-5 sm:mt-14 sm:pt-6 md:mt-20"
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4 sm:gap-x-0 sm:gap-y-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className={`px-0 sm:px-4 md:px-6 ${
                  index > 0 ? 'sm:border-l sm:border-white/10' : ''
                }`}
              >
                <div className="font-mono text-[1.4rem] font-medium tracking-tight sm:text-[1.55rem] md:text-[1.75rem]">
                  <span className="text-gold-bright">{stat.num}</span>
                  <span className="text-white/85">{stat.suffix}</span>
                </div>
                <div className="mt-1 text-[11px] tracking-[0.02em] text-[#8B919A] sm:mt-1.5 sm:text-[12px] md:text-[12.5px]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
