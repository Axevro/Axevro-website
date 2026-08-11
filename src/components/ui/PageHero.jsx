import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { easeOut } from '../../lib/motion'
import SafeImage from './SafeImage'
import { siteImages } from '../../data/images'

export default function PageHero({
  eyebrow = 'Axevro',
  title,
  titleAccent,
  description,
  backTo = '/',
  backLabel = 'Back to home',
  actions,
  showBack = true,
}) {
  return (
    <section className="relative overflow-hidden bg-black pt-8 pb-14 text-white sm:pt-12 sm:pb-20 md:pt-14 md:pb-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 420px at 6% -8%, rgba(74,222,128,0.18), transparent 55%), radial-gradient(720px 340px at 96% 8%, rgba(201,162,39,0.16), transparent 50%), radial-gradient(560px 300px at 50% 120%, rgba(11,61,44,0.4), transparent 60%)',
        }}
      />
      <motion.div
        className="pointer-events-none absolute top-0 right-1/4 h-52 w-52 rounded-full bg-green/25 blur-[100px]"
        animate={{ opacity: [0.28, 0.55, 0.28], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/5 h-40 w-40 rounded-full bg-gold/20 blur-[90px]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.75), transparent 90%)',
        }}
      />

      <div className="relative z-[1] mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        {showBack ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            <Link
              to={backTo}
              className="mb-5 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[1.2px] text-green-bright uppercase transition-colors hover:text-gold-bright sm:mb-8 sm:text-xs"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              {backLabel}
            </Link>
          </motion.div>
        ) : null}

        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease: easeOut }}
          >
            <div className="mb-3 flex items-center gap-2.5 font-mono text-[11px] tracking-[1.5px] text-gold-bright uppercase sm:mb-4 sm:text-xs">
              <motion.span
                className="block h-[1.5px] w-[22px] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-gold-bright), var(--color-green-bright))',
                }}
              />
              {eyebrow}
            </div>

            <h1 className="font-display max-w-3xl text-[clamp(28px,7vw,54px)] leading-[1.08] font-semibold tracking-[-1.1px]">
              {title}
              {titleAccent ? (
                <>
                  {' '}
                  <span className="text-accent-gradient-bright">{titleAccent}</span>
                </>
              ) : null}
            </h1>

            {description ? (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="mt-4 max-w-2xl text-[14.5px] leading-[1.7] text-[#A8ACB4] sm:mt-5 sm:text-lg sm:leading-[1.65]"
              >
                {description}
              </motion.p>
            ) : null}

            {actions ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.26 }}
                className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap [&>a]:w-full [&>a]:justify-center sm:[&>a]:w-auto"
              >
                {actions}
              </motion.div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.18, ease: easeOut }}
            className="relative mx-auto hidden w-full max-w-[220px] lg:mx-0 lg:block lg:max-w-[260px]"
          >
            <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(31,157,85,0.28),transparent_70%)] blur-2xl" />
            <div
              className="relative flex aspect-square flex-col items-center justify-center border border-white/12 p-6"
              style={{
                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.01))',
              }}
            >
              <div className="absolute top-4 left-4 h-5 w-5 border-t border-l border-gold/70" />
              <div className="absolute right-4 bottom-4 h-5 w-5 border-r border-b border-green-bright/50" />
              <SafeImage
                src={siteImages.mark}
                alt=""
                className="h-20 w-auto object-contain drop-shadow-[0_16px_40px_rgba(201,162,39,0.28)]"
                loading="eager"
              />
              <div className="font-display mt-4 text-sm font-bold tracking-[0.22em] text-white">
                AXEVRO
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
