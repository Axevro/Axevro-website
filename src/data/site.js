export const SITE = {
  name: 'Axevro',
  legalName: 'Axevro',
  tagline: 'Building Digital Excellence',
  description:
    'Axevro designs and engineers websites, mobile apps, and cloud platforms — with introductory pricing, clear process, and production-ready delivery.',
  url: 'https://axevro.com',
  email: 'axevro9@gmail.com',
  phonePrimary: '+917084788119',
  phoneWhatsApp: '+919693174749',
  locale: 'en_IN',
  twitter: '@axevro',
  ogImage: '/brand/axevro-mark-square.png',
  keywords: [
    'Axevro',
    'web development',
    'Flutter app development',
    'React development',
    'cloud DevOps',
    'AWS',
    'Docker',
    'CI/CD',
    'SEO',
    'software company India',
    'introductory pricing',
  ],
}

export const defaultSeo = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  path: '/',
}

export function absoluteUrl(path = '/') {
  const base = SITE.url.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized === '/' ? '' : normalized}`
}
