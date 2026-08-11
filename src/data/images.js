export const siteImages = {
  mark: '/brand/axevro-mark.png',
  markSquare: '/brand/axevro-mark-square.png',
  logo: '/brand/axevro-logo.png',
  studio: '/images/studio-workspace.png',
  grobuzz: '/images/project-grobuzz.png',
  wellup: '/images/project-wellup.png',
  bullAndBear: '/images/project-bull-and-bear.png',
}

export const portfolioProjects = [
  {
    tag: 'Media Production',
    name: 'GroBuzz',
    summary:
      'Premium marketing site for a media production studio — dark gold branding, creative tooling showcase, and conversion-focused CTAs.',
    stack: 'React · Vite · Framer Motion',
    image: siteImages.grobuzz,
    alt: 'GroBuzz media production company homepage',
    url: 'https://grobuzz.in/',
    featured: true,
  },
  {
    tag: 'Healthcare',
    name: 'WellUp Home Healthcare',
    summary:
      'Trust-led nursing care website for Prayagraj — clear services, emergency CTAs, and a calm professional patient experience.',
    stack: 'React · Responsive UI · WhatsApp lead flow',
    image: siteImages.wellup,
    alt: 'WellUp Home Healthcare nursing services homepage',
    url: 'https://www.welluphomehealthcare.in/',
  },
  {
    tag: 'Fintech',
    name: 'Bull & Bear',
    summary:
      'Clean investment platform landing experience for stocks, derivatives, and mutual funds — product-first layout with strong signup CTA.',
    stack: 'React · Vite · Product UI',
    image: siteImages.bullAndBear,
    alt: 'Bull & Bear investment platform homepage',
    url: 'https://bull-and-bear-4sqc.vercel.app/',
  },
]
