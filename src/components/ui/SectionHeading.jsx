import { motion } from 'framer-motion'
import { easeOut, fadeUp, viewportOnce } from '../../lib/motion'

export default function SectionHeading({
  tag,
  title,
  description,
  light = false,
  className = '',
}) {
  return (
    <motion.div
      className={`mb-10 max-w-[640px] sm:mb-12 md:mb-14 ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div
        variants={fadeUp}
        className={`mb-3 flex items-center gap-2.5 font-mono text-[11px] tracking-[1.5px] uppercase sm:mb-4 sm:text-xs ${
          light ? 'text-green-bright' : 'text-gold-deep'
        }`}
      >
        <motion.span
          className="block h-[1.5px] w-[22px] origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, delay: 0.08, ease: easeOut }}
          style={{
            background: light
              ? 'linear-gradient(90deg, var(--color-green-bright), var(--color-gold-bright))'
              : 'linear-gradient(90deg, var(--color-gold), var(--color-green))',
          }}
        />
        {tag}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className={`font-display text-[clamp(24px,5.5vw,40px)] leading-[1.15] font-semibold tracking-[-0.8px] ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className={`mt-3 text-[14.5px] leading-[1.7] sm:mt-4 sm:text-[15px] sm:text-base ${
            light ? 'text-[#A7D4BC]' : 'text-gray'
          }`}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
