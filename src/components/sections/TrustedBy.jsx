import { motion } from 'framer-motion'

const brands = ['NORTHPEAK', 'VELORA', 'STRATUS LABS', 'BRIGHTFIELD', 'ORBITAL', 'KAIRO']

export default function TrustedBy() {
  return (
    <section className="border-y border-line bg-bg-alt py-10 sm:py-14">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <p className="mb-5 text-center font-mono text-[10px] tracking-[1.4px] text-gray-light uppercase sm:mb-[26px] sm:text-[11.5px] sm:tracking-[1.5px]">
          Trusted by teams building the next generation of digital products
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 opacity-55 sm:justify-between sm:gap-7">
          {brands.map((brand, index) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ opacity: 1, y: -2 }}
              className="font-display text-[14px] font-semibold tracking-wide text-ink-soft sm:text-[19px]"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
