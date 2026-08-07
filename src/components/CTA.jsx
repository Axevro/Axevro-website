import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-black py-[110px] text-center">
      <svg
        className="pointer-events-none absolute top-0 left-1/2 w-[900px] -translate-x-1/2 opacity-55"
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

      <div className="relative z-[2] mx-auto max-w-[1180px] px-6 md:px-8">
        <h2 className="font-display mx-auto max-w-[640px] text-[clamp(30px,4vw,46px)] font-semibold tracking-[-1px] text-white">
          Ready to build something{' '}
          <span className="text-accent-gradient-bright">excellent</span>?
        </h2>
        <p className="mt-[18px] text-base text-[#9BA0A8]">
          Tell us about your project — most quotes go out within 48 hours.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="rounded-[2px] bg-gold px-[30px] py-4 text-[15px] font-bold text-black transition-colors hover:bg-gold-bright"
          >
            Request a Quote
          </Link>
          <Link
            to="/contact"
            className="rounded-[2px] border-[1.5px] border-white/25 px-[26px] py-4 text-[15px] font-semibold text-white transition-colors hover:border-green-bright"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
