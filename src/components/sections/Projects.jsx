import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import SafeImage from '../ui/SafeImage'
import { portfolioProjects } from '../../data/images'

function ProjectThumb({ image, alt, tall = false }) {
  return (
    <div
      className={`relative overflow-hidden bg-black ${
        tall ? 'aspect-[16/11] sm:aspect-[16/12]' : 'aspect-[16/10]'
      }`}
    >
      <SafeImage
        src={image}
        alt={alt}
        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        fallbackClassName="object-contain p-10 opacity-70"
        sizes="(max-width: 1024px) 100vw, 55vw"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 45%, rgba(10,11,13,0.55) 100%), radial-gradient(500px 240px at 15% 10%, rgba(201,162,39,0.12), transparent 55%)',
        }}
      />
    </div>
  )
}

export default function Projects() {
  const featured = portfolioProjects.find((p) => p.featured)
  const sideProjects = portfolioProjects.filter((p) => !p.featured)

  return (
    <section id="portfolio" className="py-14 sm:py-20 md:py-[100px]">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          tag="Featured Work"
          title="Recent projects"
          description="A look at the kind of products we design and ship — dashboards, commerce, and mobile."
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-6">
          {featured ? (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden border border-line bg-bg-alt transition-shadow hover:shadow-[0_18px_50px_rgba(10,11,13,0.08)] lg:row-span-2"
            >
              <div className="overflow-hidden">
                <ProjectThumb
                  image={featured.image}
                  alt={featured.alt}
                  tall
                />
              </div>
              <div className="p-5 sm:p-[22px]">
                <div className="font-mono text-[11.5px] tracking-[1px] text-gold-deep uppercase">
                  {featured.tag}
                </div>
                <h3 className="font-display mt-2 text-[18px] font-semibold sm:text-[19px]">
                  {featured.name}
                </h3>
                <p className="mt-3 text-[13.5px] text-gray">{featured.stack}</p>
              </div>
            </motion.article>
          ) : null}

          <div className="flex flex-col gap-5 lg:gap-6">
            {sideProjects.map((project, index) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.08 + index * 0.06 }}
                whileHover={{ y: -4 }}
                className="group overflow-hidden border border-line bg-bg-alt transition-shadow hover:shadow-[0_18px_50px_rgba(10,11,13,0.08)]"
              >
                <div className="overflow-hidden">
                  <ProjectThumb image={project.image} alt={project.alt} />
                </div>
                <div className="p-5 sm:p-[22px]">
                  <div className="font-mono text-[11.5px] tracking-[1px] text-gold-deep uppercase">
                    {project.tag}
                  </div>
                  <h3 className="font-display mt-2 text-[18px] font-semibold sm:text-[19px]">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] text-gray">{project.stack}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <Link
            to="/contact#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-deep transition-colors hover:text-green"
          >
            Discuss a similar project
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
