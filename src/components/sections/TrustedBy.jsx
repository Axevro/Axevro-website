import { motion } from 'framer-motion'

const brands = ['GROBUZZ', 'WELLUP HOME', 'BULL & BEAR']

export default function TrustedBy() {
  return (
    <section className="border-y border-line bg-bg-alt py-10 sm:py-14">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <p className="mb-5 text-center font-mono text-[10px] tracking-[1.4px] text-gray-light uppercase sm:mb-[26px] sm:text-[11.5px] sm:tracking-[1.5px]">
          Trusted by founders shipping real products with Axevro
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12 sm:gap-y-5">
          {brands.map((brand, index) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ opacity: 1, y: -2 }}
              className="font-display text-[13px] font-semibold tracking-[0.08em] text-ink-soft opacity-60 sm:text-[17px] sm:tracking-[0.12em]"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
