import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import SafeImage from '../ui/SafeImage'
import { portfolioProjects } from '../../data/images'
import { easeOut, revealItem, staggerContainer, viewportOnce } from '../../lib/motion'

function stackItems(stack = '') {
  return stack
    .split('\u00b7')
    .map((part) => part.trim())
    .filter(Boolean)
}

function ProjectCard({ project }) {
  const tech = stackItems(project.stack)

  return (
    <motion.article
      variants={revealItem}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, ease: easeOut }}
      className="group relative flex h-full flex-col overflow-hidden border border-line bg-white/90 shadow-[0_1px_0_rgba(10,11,13,0.03)] backdrop-blur-[2px] transition-[border-color,box-shadow,transform] duration-300 hover:border-gold/40 hover:shadow-[0_22px_50px_rgba(17,19,24,0.07)]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,162,39,0.55), rgba(31,157,85,0.35), transparent)',
        }}
      />

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        aria-label={`${project.name} live site`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <SafeImage
            src={project.image}
            alt={project.alt}
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            fallbackClassName="object-contain p-10 opacity-70"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,11,13,0.08) 0%, transparent 34%, rgba(10,11,13,0.55) 100%)',
            }}
          />
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
            <span className="inline-flex items-center bg-black/45 px-2.5 py-1 font-mono text-[10px] tracking-[1.4px] text-gold-bright/95 uppercase backdrop-blur-md">
              {project.tag}
            </span>
          </div>
        </div>
      </a>

      <div className="flex flex-1 flex-col px-5 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-6">
        <h3 className="font-display text-[18px] leading-snug font-semibold tracking-tight text-ink sm:text-[19px]">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-gold-deep"
          >
            {project.name}
          </a>
        </h3>

        <p className="mt-3 flex-1 text-[13.5px] leading-[1.75] text-gray sm:text-[14px] sm:leading-[1.78]">
          {project.summary}
        </p>

        {tech.length > 0 ? (
          <ul className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {tech.map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                {i > 0 ? (
                  <span
                    className="h-[3px] w-[3px] rounded-full bg-gold/55"
                    aria-hidden
                  />
                ) : null}
                <span className="font-mono text-[11px] tracking-[0.3px] text-gold-deep">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 border-t border-line pt-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12.5px] font-semibold tracking-wide text-green-deep transition-all duration-300 group-hover:gap-2.5 hover:text-green"
          >
            View live site
            <span className="material-symbols-outlined text-[15px]" aria-hidden>
              arrow_outward
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden py-16 sm:py-20 md:py-[108px]"
      style={{
        background:
          'linear-gradient(180deg, #ffffff 0%, #faf8f3 42%, #f7f4ec 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 45% at 8% 18%, rgba(201,162,39,0.07), transparent 55%), radial-gradient(ellipse 55% 40% at 92% 78%, rgba(31,157,85,0.05), transparent 50%)',
        }}
      />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8">
        <SectionHeading
          tag="Featured Work"
          title="Selected client projects"
          description="Live products we designed and engineered for media, healthcare, and fintech — each shipped for real users."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-7"
        >
          {portfolioProjects.map((project) => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, ease: easeOut, delay: 0.1 }}
          className="mt-10 flex justify-center sm:mt-12"
        >
          <Link
            to="/contact#contact"
            className="inline-flex items-center gap-2 border border-line bg-white/80 px-5 py-2.5 text-sm font-semibold text-green-deep shadow-[0_1px_0_rgba(10,11,13,0.03)] transition-all duration-300 hover:border-gold/45 hover:text-green"
          >
            Start a project like these
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
