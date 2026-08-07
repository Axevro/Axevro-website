const brands = ['NORTHPEAK', 'VELORA', 'STRATUS LABS', 'BRIGHTFIELD', 'ORBITAL', 'KAIRO']

export default function TrustedBy() {
  return (
    <section className="border-b border-line bg-bg-alt py-14">
      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        <p className="mb-[26px] text-center font-mono text-[11.5px] tracking-[1.5px] text-gray-light uppercase">
          Trusted by teams building the next generation of digital products
        </p>
        <div className="flex flex-wrap items-center justify-between gap-7 opacity-60">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-display text-[19px] font-semibold text-ink-soft"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
