import { getWhatsAppUrl } from '../data/contact'

export default function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Axevro on WhatsApp"
      className="group fixed right-4 bottom-4 z-[60] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-[#1ebe57] sm:right-6 sm:bottom-6"
    >
      <span className="material-symbols-outlined text-[22px]">chat</span>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
