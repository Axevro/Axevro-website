import { motion } from 'framer-motion'
import { getWhatsAppUrl } from '../../data/contact'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Axevro on WhatsApp"
      initial={{ opacity: 0, scale: 0.8, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.45 }}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="group fixed z-[60] inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(37,211,102,0.4)] sm:px-4"
      style={{
        right: 'max(0.75rem, env(safe-area-inset-right))',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      <span className="relative flex">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/35 opacity-60" />
        <span className="material-symbols-outlined relative text-[22px]">chat</span>
      </span>
      <span className="hidden pr-1 sm:inline">WhatsApp</span>
    </motion.a>
  )
}
