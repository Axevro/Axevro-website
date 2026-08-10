export const siteImages = {
  mark: '/brand/axevro-mark.png',
  markSquare: '/brand/axevro-mark-square.png',
  logo: '/brand/axevro-logo.png',
  studio: '/images/studio-workspace.png',
  dashboard: '/images/project-dashboard.png',
  ecommerce: '/images/project-ecommerce.png',
  mobile: '/images/project-mobile.png',
}

export const portfolioProjects = [
  {
    tag: 'SaaS Platform',
    name: 'Velora — Analytics Dashboard',
    stack: 'React · Node.js · PostgreSQL',
    image: siteImages.dashboard,
    alt: 'Analytics dashboard product mockup',
    featured: true,
  },
  {
    tag: 'E-Commerce',
    name: 'Northpeak Outfitters',
    stack: 'Next.js · Stripe · Firebase',
    image: siteImages.ecommerce,
    alt: 'E-commerce website on laptop mockup',
  },
  {
    tag: 'Mobile App',
    name: 'Kairo — Booking App',
    stack: 'Flutter · Express · MongoDB',
    image: siteImages.mobile,
    alt: 'Mobile booking app smartphone mockup',
  },
]
