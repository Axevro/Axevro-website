import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getWhatsAppUrl } from '../../data/contact'
import { easeOut } from '../../lib/motion'

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-black py-16 pb-24 text-center sm:py-24 sm:pb-24 md:py-[110px] md:pb-[110px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(700px 280px at 50% 0%, rgba(31,157,85,0.18), transparent 55%), radial-gradient(500px 240px at 80% 100%, rgba(201,162,39,0.12), transparent 50%)',
        }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green/20 blur-[100px]"
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg
        className="pointer-events-none absolute top-0 left-1/2 w-[min(900px,140%)] -translate-x-1/2 opacity-45"
        viewBox="0 0 900 300"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M60 260 C280 180 620 120 840 40"
          stroke="url(#cg)"
          strokeWidth="60"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="cg" x1="60" y1="260" x2="840" y2="40">
            <stop stopColor="#0B3D2C" stopOpacity="0" />
            <stop offset="0.5" stopColor="#1F9D55" stopOpacity="0.28" />
            <stop offset="1" stopColor="#4ADE80" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-[2] mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[11px] tracking-[1.5px] text-gold-bright uppercase"
        >
          Start with Axevro
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="font-display mx-auto mt-3 max-w-[680px] text-[clamp(26px,6vw,46px)] font-semibold tracking-[-1px] text-white"
        >
          Ready to build something{' '}
          <span className="text-accent-gradient-bright">excellent</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mx-auto mt-4 max-w-xl text-[14.5px] text-[#9BA0A8] sm:mt-[18px] sm:text-base"
        >
          Introductory pricing is open while we grow our portfolio. Share your
          project — most quotes go out within 48 hours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link to="/contact#contact" className="btn-primary w-full sm:w-auto">
              Request a Quote
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link to="/pricing" className="btn-secondary-dark w-full sm:w-auto">
              View Pricing
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-dark w-full sm:w-auto"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
